import { Component, createSignal, onMount } from 'solid-js';
import { useSearchParams } from '@solidjs/router';
import styles from './address.module.css';
import PopupAddress from './popupaddress';
import accountIcon from '../img/UserCircle (2).svg';
import { useNavigate, useParams, useLocation } from "@solidjs/router";
import trash from '../img/Trash.svg'
import logo from '../img/logo.png';
import logowhite from '../img/logowhite.png';
import translate from '../img/Translate.svg';
import befooter from '../img/befooter.png';
import cartIcon from '../img/Tote.svg';
import edit from '../img/edit.svg';

interface Address {
    id: number;
    recipient_name: string;
    phone_number: string;
    address: string;
    zip_code: string;
    is_default: boolean;
    address_type: 'home' | 'work' | 'school' | 'other';
    created_at: string;
}

interface AddressData {
    recipient_name: string;
    phone_number: string;
    address: string;
    zip_code: string;
    is_default: boolean;
}

const Address: Component = () => {
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [addresses, setAddresses] = createSignal<Address[]>([]);
    const [isPopupOpen, setIsPopupOpen] = createSignal(false);
    const [editingAddress, setEditingAddress] = createSignal<Address | null>(null);
    const [userId, setUserId] = createSignal("");
    const [profileData, setProfileData] = createSignal({
        fullName: '',
        email: '',
        birthday: '',
        gender: '',
        img: null,
    });
    const [profileImage, setProfileImage] = createSignal<string | null>(null);
    const [onlineUsers, setOnlineUsers] = createSignal([]);
    const [isLoading, setIsLoading] = createSignal(false);

    const updateUserActivity = () => {
        if (!userId()) return;

        fetch(`http://127.0.0.1:8080/user/${userId()}/activity`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        }).catch(console.error);
    };

    const navigateWithUserId = (path: string) => {
        const currentUserId = userId() || searchParams.user_id;
        if (currentUserId) {
            navigate(`${path}?user_id=${currentUserId}`);
            updateUserActivity();
        } else {
            navigate("/login");
        }
    };

    const goToCart = () => navigateWithUserId("/cart");
    const goToAccount = () => navigateWithUserId("/account");
    const goToDashboard = () => navigateWithUserId("/dashboard");
    const goToProducts = () => navigateWithUserId("/products");
    const goToAboutUs = () => navigateWithUserId("/about-us");
    const goToBlog = () => navigateWithUserId("/blogpage");
    const goToHistory = () => navigateWithUserId("/history");

    const fetchUserProfile = async (userId: string) => {
        try {
            const response = await fetch(`http://127.0.0.1:8080/user/${userId}`);
            if (response.ok) {
                const data = await response.json();
                setProfileData({
                    fullName: data.fullname || '',
                    email: data.email || '',
                    birthday: data.birthday || '',
                    gender: data.gender || '',
                    img: data.img || null,
                });
                if (data.img) {
                    setProfileImage(`http://127.0.0.1:8080/uploads/${data.img}`);
                }
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };

    onMount(async () => {
        const userIdFromParams = searchParams.user_id;
        if (!userIdFromParams) {
            navigate("/login");
            return;
        }
        
        // Pastikan userIdFromParams adalah string
        const userIdStr = String(userIdFromParams);
        setUserId(userIdStr);
        updateUserActivity();
        fetchUserProfile(userIdStr);
    
        try {
            const response = await fetch(`http://localhost:8080/user/${userIdStr}/addresses`);
            if (response.ok) {
                const data = await response.json();
                setAddresses(data);
                if (data.length === 0) {
                    navigate(`/address/empty?user_id=${userIdStr}`);
                }
            }
        } catch (error) {
            console.error("Error:", error);
        }
    });

    const handleAddNewAddress = () => {
        setEditingAddress(null);
        setIsPopupOpen(true);
    };

    const handleSaveAddress = async (addressData: AddressData & { address_type?: string }) => {
        try {
            const url = editingAddress()
                ? `http://localhost:8080/user/${userId()}/address/${editingAddress()?.id}`
                : `http://localhost:8080/user/${userId()}/address`;

            const method = editingAddress() ? "PUT" : "POST";

            const requestBody = {
                recipient_name: addressData.recipient_name,
                phone_number: addressData.phone_number,
                address: addressData.address,
                zip_code: addressData.zip_code,
                is_default: addressData.is_default,
                address_type: addressData.address_type || 'home'
            };

            const response = await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                const error = await response.text();
                throw new Error(error || "Failed to save address");
            }

            const updatedAddress = await response.json();

            const completeAddress: Address = {
                id: updatedAddress.id || editingAddress()?.id || 0,
                recipient_name: updatedAddress.recipient_name || addressData.recipient_name,
                phone_number: updatedAddress.phone_number || addressData.phone_number,
                address: updatedAddress.address || addressData.address,
                zip_code: updatedAddress.zip_code || addressData.zip_code,
                is_default: updatedAddress.is_default || addressData.is_default,
                address_type: updatedAddress.address_type || addressData.address_type || 'home',
                created_at: updatedAddress.created_at || editingAddress()?.created_at || new Date().toISOString()
            };

            setAddresses(prev => {
                if (editingAddress()) {
                    return prev.map(addr =>
                        addr.id === completeAddress.id ? completeAddress : addr
                    );
                } else {
                    return [...prev, completeAddress];
                }
            });

            setIsPopupOpen(false);
        } catch (error) {
            console.error("Error saving address:", error);
            alert(error.message || "Error saving address");
        }
    };

    const [isDeleting, setIsDeleting] = createSignal<number | null>(null);

    const handleDeleteAddress = async (addressId: number) => {
        if (!confirm("Are you sure you want to delete this address?")) return;

        setIsDeleting(addressId);
        try {
            const response = await fetch(
                `http://localhost:8080/user/${userId()}/address/${addressId}`,
                {
                    method: 'DELETE',
                }
            );

            if (response.ok) {
                setAddresses(addresses().filter(addr => addr.id !== addressId));
            } else {
                const error = await response.text();
                throw new Error(error || "Failed to delete address");
            }
        } catch (error) {
            console.error("Error deleting address:", error);
            alert(error.message || "Error deleting address");
        } finally {
            setIsDeleting(null);
        }
    };

    const getAddressLabel = (address: Address) => {
        const typeFormatted = address.address_type === 'school' ? 'School' :
            address.address_type === 'work' ? 'Work' :
                address.address_type === 'home' ? 'Home' : 'Other';

        return (
            <>
                <span class={styles.addressType}> - {typeFormatted}</span>
                {address.is_default && <span class={styles.mainLabel}> (Main)</span>}
            </>
        );
    };

    const handleChangeAddress = (address: Address) => {
        const editableAddressData = {
            recipient_name: address.recipient_name,
            phone_number: address.phone_number,
            address: address.address,
            zip_code: address.zip_code,
            is_default: address.is_default,
            address_type: address.address_type
        };

        setEditingAddress({
            ...editableAddressData,
            id: address.id,
            created_at: address.created_at
        });

        setIsPopupOpen(true);
    };

    return (
        <div class={styles.container}>
            <header>
                <div class="logo">
                    <img src={logo} alt="Logo" />
                </div>
                <nav class="navbar">
                    <ul>
                        <li><a onClick={goToDashboard}>Home</a></li>
                        <li><a onClick={goToProducts}>Products</a></li>
                        <li><a onClick={goToAboutUs}>About Us</a></li>
                        <li><a onClick={goToBlog}>Blog</a></li>
                    </ul>
                </nav>
                <div class="dash-auth-buttons">
                    <button class="dash-cart-btn" onClick={goToCart}>
                        <img src={cartIcon} alt="Cart" />
                    </button>
                    <div class="dash-account-btn" onClick={goToAccount}>
                        <img
                            src={profileImage() || accountIcon}
                            alt="Account"
                            style={{
                                width: '32px',
                                height: '32px',
                                "border-radius": '50%',
                                "object-fit": 'cover',
                                "border": '2px solid ' + (onlineUsers().some(u => u.id === userId()) ? '#4CAF50' : '#ccc')
                            }}
                        />
                        {onlineUsers().some(u => u.id === userId()) && (
                            <div class="online-status-dot"></div>
                        )}
                    </div>
                </div>
            </header>

            <div class={styles.header}>
                <h1 class={styles.title}>Profile</h1>
            </div>

            <div class={styles.content}>
                <nav class={styles.tabs}>
                    {/* My Profile Tab */}
                    <a
                        onClick={() => navigateWithUserId("/account")}
                        class={location.pathname === '/account' ? styles.Tab : styles.tab}
                    >
                        My Profile
                    </a>

                    {/* Address Tab */}
                    <a
                        onClick={() => navigateWithUserId("/address")}
                        class={location.pathname.startsWith('/address') ? styles.activeTab : styles.activeTab}
                    >
                        Address
                    </a>

                    {/* History Tab */}
                    <a
                        onClick={() => navigateWithUserId("/history")}
                        class={location.pathname === '/history' ? styles.activeTab : styles.tab}
                    >
                        History
                    </a>
                </nav>
                <div class={styles.addressSection}>
                    <div class={styles.addressHeader}>
                        <button
                            class={styles.addAddressButton}
                            onClick={handleAddNewAddress}
                        >
                            Add New Address
                        </button>
                    </div>

                    <div class={styles.addressList}>
                        {addresses().map((address, index) => (
                            <div class={styles.addressCard}>
                                <div class={styles.addressContent}>
                                    <h3 class={styles.addressName}>
                                        {address.recipient_name}
                                        {getAddressLabel(address)}
                                    </h3>
                                    <p class={styles.addressPhone}>{address.phone_number}</p>
                                    <p class={styles.addressText}>{address.address}</p>
                                    <p class={styles.addressText}>{address.zip_code}</p>
                                </div>
                                <div class={styles.addressActions}>
                                    <button
                                        class={styles.changeAddressButton}
                                        onClick={() => handleChangeAddress(address)}
                                    >
                                        Change Address
                                    </button>
                                    <button
                                        class={styles.deleteAddressButton}
                                        onClick={() => handleDeleteAddress(address.id)}
                                        disabled={isDeleting() === address.id}
                                    >
                                        {isDeleting() === address.id ? (
                                            "Deleting..."
                                        ) : (
                                            <img src={trash} alt="Delete" class={styles.deleteIcon} />
                                        )}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <img src={befooter} alt="Banner" class="full-width-image" />

            {/* Footer */}
            <footer>
                <div class="footer-top">
                    <div class="store-image">
                        <img src={logowhite} alt="Our Store" />
                    </div>
                    <div class="newsletter">
                        <p>Stay updated with our latest drops & exclusive deals</p>
                        <div class="subscribe-form">
                            <input type="email" placeholder="Enter your email" />
                            <button>Submit</button>
                        </div>
                    </div>
                </div>

                <div class="footer-links">
                    <div class="link-column">
                        <h4>Theyy Wearr.</h4>
                        <ul>
                            <li><a onClick={goToDashboard}>Home</a></li>
                            <li><a onClick={goToProducts}>Product</a></li>
                            <li><a onClick={goToAboutUs}>About Us</a></li>
                            <li><a onClick={goToBlog}>Blog</a></li>
                        </ul>
                    </div>
                    <div class="link-column">
                        <h4>About Us</h4>
                        <ul>
                            <li><a href="#">Company</a></li>
                            <li><a href="#">Community</a></li>
                            <li><a href="#">Careers</a></li>
                            <li><a href="#">Investors</a></li>
                        </ul>
                    </div>
                    <div class="link-column">
                        <h4>Get More</h4>
                        <ul>
                            <li><a href="#">Upgrade Premium</a></li>
                            <li><a href="#">Personal Plan</a></li>
                            <li><a href="#">Business Plan</a></li>
                            <li><a href="#">Enterprise Plan</a></li>
                        </ul>
                    </div>
                    <div class="link-column">
                        <h4>Connect With Us</h4>
                        <ul>
                            <li><a href="#">Twitter</a></li>
                            <li><a href="#">Facebook</a></li>
                            <li><a href="#">Youtube</a></li>
                            <li><a href="#">Instagram</a></li>
                        </ul>
                    </div>
                </div>

                <div class="footer-bottom">
                    <p>@ 2025 Theyy Wearr. Inc</p>
                    <p>Terms and privacy</p>
                    <div class="translate-section">
                        <img src={translate} alt="Translate Icon" />
                        <span>English</span>
                    </div>
                </div>
            </footer>

            {/* Popup Address Component */}
            <PopupAddress
                isOpen={isPopupOpen()}
                onClose={() => setIsPopupOpen(false)}
                onSave={handleSaveAddress}
                editAddress={editingAddress()}
            />
        </div>
    );
};

export default Address;