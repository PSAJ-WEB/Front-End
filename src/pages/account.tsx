import { Component, createSignal, onMount } from 'solid-js';
import { useSearchParams } from '@solidjs/router';
import styles from './account.module.css';
import accountIcon from '../img/UserCircle.svg';
import { useNavigate } from "@solidjs/router";
import logo from '../img/logo.png';
import profile from '../img/UserCircle (2).svg';
import logowhite from '../img/logowhite.png';
import befooter from '../img/befooter.png';
import translate from '../img/Translate.svg';
import cartIcon from '../img/Tote.svg';
import edit from '../img/edit.svg';

const Account: Component = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = createSignal(false);
    const [profileData, setProfileData] = createSignal({
        fullName: '',
        email: '',
        birthday: '',
        gender: '',
        img: null,
    });
    const [profileImage, setProfileImage] = createSignal<string | null>(null);
    const [onlineUsers, setOnlineUsers] = createSignal([]);

    const [searchParams] = useSearchParams();
    const userId = searchParams.user_id;

    // Helper function to navigate with user_id
    const navigateWithUserId = (path: string) => {
        navigate(`${path}?user_id=${userId}`);
        updateUserActivity();
    };

    // Function to update user activity
    const updateUserActivity = () => {
        if (!userId) return;

        fetch(`http://127.0.0.1:8080/user/${userId}/activity`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        }).catch(console.error);
    };

    const goToCart = () => {
        navigateWithUserId("/cart");
    };

    const goToAccount = () => {
        navigateWithUserId("/account");
    };

    const goToDashboard = () => {
        navigateWithUserId("/dashboard");
    };

    const goToProducts = () => {
        navigateWithUserId("/products");
    };

    const goToAboutUs = () => {
        navigateWithUserId("/about-us");
    };

    const goToBlog = () => {
        navigateWithUserId("/blogpage");
    };

    // Di Account.tsx
    const goToAddress = () => navigateWithUserId("/address");
    const goToHistory = () => {
        navigateWithUserId("/history");
    };

    // Di bagian onMount di Account component, perbaiki seperti ini:
    onMount(async () => {
        if (!userId) {
            console.error('No user ID found');
            return;
        }

        updateUserActivity(); // Update activity when component mounts

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
                // Tambahkan base URL di sini
                setProfileImage(`http://127.0.0.1:8080/uploads/${data.img}`);
            }
        } else {
            console.error('Failed to fetch user data');
        }
    });

    const handleSave = async (e: Event) => {
        e.preventDefault();
        setIsLoading(true);

        if (!userId) {
            console.error('No user ID found');
            return;
        }

        const updateData = {
            fullname: profileData().fullName,
            birthday: profileData().birthday,
            gender: profileData().gender,
            img: profileData().img // Sertakan gambar yang sudah diupload
        };

        try {
            const response = await fetch(`http://127.0.0.1:8080/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData),
            });

            if (response.ok) {
                const result = await response.json();
                console.log(result.message);
                alert('Profile updated successfully!');
                // Navigasi ke dashboard setelah save berhasil
                goToDashboard();
            } else {
                console.error('Failed to update profile');
                alert('Failed to update profile. Please try again.');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Error updating profile. Please try again.');
        }
        setIsLoading(false);
    };

    const handleImageUpload = async (e: Event) => {
        setIsLoading(true);
        const file = (e.target as HTMLInputElement).files?.[0];
        if (file && userId) {
            // Validasi tipe file
            const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/svg+xml', 'image/gif', 'image/webp'];
            if (!validTypes.includes(file.type)) {
                alert('Hanya file gambar (JPEG, PNG, JPG, SVG, GIF, WEBP) yang diizinkan');
                return;
            }

            // Validasi ukuran file (max 2MB)
            if (file.size > 2 * 1024 * 1024) {
                alert('Ukuran file maksimal 2MB');
                return;
            }

            const formData = new FormData();
            formData.append('file', file);

            try {
                const response = await fetch(`http://127.0.0.1:8080/profile/${userId}/upload`, {
                    method: 'POST',
                    body: formData,
                });

                const result = await response.json();

                if (response.ok) {
                    // Dapatkan URL gambar dari server
                    const imageUrl = `http://127.0.0.1:8080/uploads/${result.filename}`;

                    // Update state untuk menampilkan gambar baru
                    setProfileImage(imageUrl);
                    setProfileData({ ...profileData(), img: imageUrl });

                    alert('Foto profil berhasil diupload!');
                } else {
                    throw new Error(result.message || 'Upload gagal');
                }
            } catch (error) {
                console.error('Upload error:', error);
                alert(error.message || 'Error uploading gambar');
            }
        }
        setIsLoading(false);
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
                                "border": '2px solid ' + (onlineUsers().some(u => u.id === userId) ? '#4CAF50' : '#ccc')
                            }}
                        />
                        {onlineUsers().some(u => u.id === userId) && (
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
                <div class={styles.profileSection}>
                    <div class={styles.avatar}>
                        <label for="profileImageInput" style={{
                            cursor: 'pointer',
                            display: 'block',
                            width: '300px',
                            height: '400px',
                            position: 'relative'
                        }}>
                            <img
                                src={profileImage() || accountIcon}
                                alt="Profile"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    "object-fit": 'cover'
                                }}
                                onError={(e) => {
                                    e.currentTarget.src = accountIcon;
                                    e.currentTarget.style.objectFit = 'contain';
                                    e.currentTarget.style.padding = '20px';
                                }}
                            />
                            <div style={{
                                position: 'absolute',
                                bottom: '5px',
                                right: '5px',
                                "background-color": 'rgba(0,0,0,0)',
                                padding: '4px',
                                display: 'flex',
                                "align-items": 'center',
                                "justify-content": 'center',
                                width: '30px',
                                height: '30px'
                            }}>
                                <img
                                    src={edit}
                                    alt="Edit"
                                    style={{
                                        width: '18px',
                                        height: '18px',
                                        filter: 'brightness(0) invert(1)' // Untuk membuat icon putih
                                    }}
                                />
                            </div>
                        </label>
                        <input
                            type="file"
                            id="profileImageInput"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleImageUpload}
                        />
                    </div>

                    <form class={styles.form} onSubmit={handleSave}>
                        <div class={styles.formGroup}>
                            <label>Full Name</label>
                            <input
                                type="text"
                                value={profileData().fullName}
                                onChange={(e) => setProfileData({ ...profileData(), fullName: e.currentTarget.value })}
                            />
                        </div>

                        <div class={styles.formGroup}>
                            <label>Email</label>
                            <input
                                type="text"
                                value={profileData().email}
                                readOnly
                            />
                        </div>

                        <div class={styles.formGroup}>
                            <label>Birthday</label>
                            <input
                                type="date"
                                value={profileData().birthday}
                                onChange={(e) => setProfileData({ ...profileData(), birthday: e.currentTarget.value })}
                                class={styles.birthdayInput}
                            />
                        </div>

                        <div class={styles.formGroup}>
                            <label>Gender</label>
                            <div class={styles.radioGroup}>
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Female"
                                        checked={profileData().gender === 'Female'}
                                        onChange={(e) => setProfileData({ ...profileData(), gender: e.currentTarget.value })}
                                    />
                                    Female
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="gender"
                                        value="Male"
                                        checked={profileData().gender === 'Male'}
                                        onChange={(e) => setProfileData({ ...profileData(), gender: e.currentTarget.value })}
                                    />
                                    Male
                                </label>
                            </div>
                        </div>

                        <div class={styles.buttonSection}>
                            <button type="submit" class={styles.saveButton} disabled={isLoading()}>
                                {isLoading() ? 'Saving...' : 'Save'}
                            </button>
                        </div>
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

export default Account;