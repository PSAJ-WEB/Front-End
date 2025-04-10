import { Component, createSignal, onMount } from "solid-js";
import styles from "./history.module.css";
import { useNavigate, useSearchParams } from "@solidjs/router";
import logo from '../img/logo.png';
import profile from '../img/UserCircle (2).svg';
import logowhite from '../img/logowhite.png';
import befooter from '../img/befooter.png';
import translate from '../img/Translate.svg';
import cartIcon from '../img/Tote.svg';

const HistoryEmpty: Component = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const userId = searchParams.user_id;
    const accountIcon = profile;
    const [profileImage, setProfileImage] = createSignal<string | null>(null);
    const [onlineUsers, setOnlineUsers] = createSignal<{ id: string }[]>([]);
    const navigateWithUserId = (path: string) => {
        if (userId) {
            navigate(`${path}?user_id=${userId}`);
        } else {
            navigate(path);
        }
    };

    onMount(async () => {
        if (!userId) return;
    
        try {
            // Fetch user profile image
            const profileResponse = await fetch(`http://127.0.0.1:8080/user/${userId}`);
            if (!profileResponse.ok) {
                throw new Error('Failed to fetch profile');
            }
    
            const data = await profileResponse.json();
            if (data.img) {
                setProfileImage(`http://127.0.0.1:8080/uploads/${data.img}`);
            }
    
            // Update user activity
            updateUserActivity();
    
            // Optional: Fetch online users if needed
            const onlineUsersResponse = await fetch('http://127.0.0.1:8080/online-users');
            if (onlineUsersResponse.ok) {
                const users = await onlineUsersResponse.json();
                setOnlineUsers(users);
            }
        } catch (error) {
            console.error('Error in HistoryEmpty onMount:', error);
        }
    });
    const updateUserActivity = (): void => {
        if (!userId) return;
    
        fetch(`http://127.0.0.1:8080/user/${userId}/activity`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        }).catch(error => {
            console.error('Error updating user activity:', error);
        });
    };

    const goToProducts = () => navigateWithUserId("/products");
    const goToAccount = () => navigateWithUserId("/account");
    const goToAddress = () => navigateWithUserId("/address");
    const goToHistory = () => navigateWithUserId("/history");
    const goToDashboard = () => navigateWithUserId("/dashboard");
    const goToAboutUs = () => navigateWithUserId("/about-us");
    const goToBlog = () => navigateWithUserId("/blogpage");
    const goToCart = () => navigateWithUserId("/cart");

    return (
        <div class={styles.Container}>
            {/* Keep the same header as your History component */}
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
                    <a onClick={goToAccount} class={styles.tab}>My Profile</a>
                    <a onClick={goToAddress} class={styles.tab}>Address</a>
                    <a onClick={goToHistory} class={styles.activeTab}>History</a>
                </nav>

                <div class={styles.emptyHistoryContainer}>
                    <div class={styles.emptyHistory}>
                        <p>No order history found.</p>
                        <button class={styles.shopNowButton} onClick={goToProducts}>
                            Shop Now
                        </button>
                    </div>
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

export default HistoryEmpty;