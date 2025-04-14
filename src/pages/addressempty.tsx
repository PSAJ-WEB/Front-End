import { createSignal, onMount } from "solid-js";
import { useNavigate, useSearchParams, useLocation } from "@solidjs/router";
import styles from './address.module.css';
import cartIcon from '../img/Tote.svg';
import accountIcon from '../img/UserCircle (2).svg';
import heart from '../img/Heart.svg';
import heartfull from '../img/Heart (1).svg';
import logo from '../img/logo.png';
import logowhite from '../img/logowhite.png';
import befooter from '../img/befooter.png';
import translate from '../img/Translate.svg';
import './addressempty.css'

const AddressEmpty = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const userId = searchParams.user_id;

    const [recipientName, setRecipientName] = createSignal("");
    const [phoneNumber, setPhoneNumber] = createSignal("");
    const [address, setAddress] = createSignal("");
    const [zipCode, setZipCode] = createSignal("");
    const [isDefault, setIsDefault] = createSignal(false);
    const [isSubmitting, setIsSubmitting] = createSignal(false);
    const [error, setError] = createSignal("");

    // Consolidated navigation function
    const navigateWithUserId = (path: string) => {
        if (userId) {
            navigate(`${path}?user_id=${userId}`);
            updateUserActivity();
        } else {
            navigate(path);
        }
    };

    const updateUserActivity = () => {
        if (!userId) return;

        fetch(`http://127.0.0.1:8080/user/${userId}/activity`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        }).catch(console.error);
    };

    const [clicked, setClicked] = createSignal(false);

    const goToFavoritePage = () => {
        setClicked(true);
        navigate("/favorite");
    };

    // Navigation functions
    const goToCart = () => navigateWithUserId("/cart");
    const goToAccount = () => navigateWithUserId("/account");
    const goToAddress = () => navigateWithUserId("/address");
    const goToHistory = () => navigateWithUserId("/history");
    const goToDashboard = () => navigateWithUserId("/dashboard");
    const goToProducts = () => navigateWithUserId("/products");
    const goToAboutUs = () => navigateWithUserId("/about-us");
    const goToBlog = () => navigateWithUserId("/blogpage");

    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError("");

        // Enhanced validation
        if (!recipientName() || recipientName().trim().length < 2) {
            setError("Recipient name must be at least 2 characters");
            setIsSubmitting(false);
            return;
        }

        if (!phoneNumber() || !/^\d{8,15}$/.test(phoneNumber())) {
            setError("Phone number must be 8-15 digits");
            setIsSubmitting(false);
            return;
        }

        if (!address() || address().trim().length < 10) {
            setError("Address must be at least 10 characters");
            setIsSubmitting(false);
            return;
        }

        if (!zipCode() || !/^\d{5,10}$/.test(zipCode())) {
            setError("Zip code must be 5-10 digits");
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:8080/user/${userId}/address`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    recipient_name: recipientName(),
                    phone_number: phoneNumber(),
                    address: address(),
                    zip_code: zipCode(),
                    is_default: isDefault(),
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Failed to add address");
            }

            // Clear form and navigate on success
            setRecipientName("");
            setPhoneNumber("");
            setAddress("");
            setZipCode("");
            setIsDefault(false);
            navigateWithUserId("/address");
        } catch (error) {
            console.error("Error adding address:", error);
            setError(error.message || "Failed to add address. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
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
                    <button class="fav" onClick={goToFavoritePage}>
                        <img
                            src={clicked() ? heartfull : heart}
                            alt="heart"
                        />
                    </button>
                    <button class="dash-cart-btn" onClick={goToCart}>
                        <img src={cartIcon} alt="Cart" />
                    </button>
                    {/* Tombol Account dengan Navigasi */}
                    <button class="dash-account-btn" onClick={goToAccount}>
                        <img src={accountIcon} alt="Account" />
                    </button>
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
                        class={location.pathname === '/account' ? styles.activeTab : styles.tab}
                    >
                        My Profile
                    </a>

                    {/* Address Tab */}
                    <a
                        onClick={() => navigateWithUserId("/address")}
                        class={location.pathname.startsWith('/address') ? styles.activeTab : styles.tab}
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
                    {error() && <div class="error-message">{error()}</div>}
                    <form class="addressForm" onSubmit={handleSubmit}>
                        <div class="formGroup">
                            <label for="recipient-name">Recipient Name</label>
                            <input
                                type="text"
                                id="recipient-name"
                                placeholder="Recipient Name"
                                value={recipientName()}
                                onInput={(e) => setRecipientName(e.currentTarget.value)}
                                required
                            />
                        </div>

                        <div class="formGroup">
                            <label for="phone-number">Phone Number</label>
                            <input
                                type="tel"
                                id="phone-number"
                                placeholder="Phone Number"
                                value={phoneNumber()}
                                onInput={(e) => setPhoneNumber(e.currentTarget.value)}
                                required
                            />
                        </div>

                        <div class="formGroup">
                            <label for="address-input">Address</label>
                            <textarea
                                id="address-input"
                                class="address-input"
                                placeholder="Address Label, City and Sub-district"
                                value={address()}
                                onInput={(e) => setAddress(e.currentTarget.value)}
                                rows="4"
                                required
                            ></textarea>
                        </div>

                        <div class="formGroup">
                            <label for="zip-code">Zip Code</label>
                            <input
                                type="text"
                                id="zip-code"
                                placeholder="Zip Code"
                                value={zipCode()}
                                onInput={(e) => setZipCode(e.currentTarget.value)}
                                required
                            />
                        </div>

                        <div class="checkboxGroup">
                            <input
                                type="checkbox"
                                id="default-address"
                                checked={isDefault()}
                                onChange={(e) => setIsDefault(e.currentTarget.checked)}
                            />
                            <label for="default-address">Set as default</label>
                        </div>

                        <button
                            type="submit"
                            class="addAddressButton"
                            disabled={isSubmitting()}
                        >
                            {isSubmitting() ? "Adding..." : "Add Address"}
                        </button>
                    </form>
                </div>
            </div>

            <img src={befooter} alt="Banner" class="full-width-image" />

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
        </div>
    );
};

export default AddressEmpty;