import { createSignal, onMount } from "solid-js";
import styles from "./history.module.css";
import { useNavigate, useSearchParams, useLocation } from "@solidjs/router";
import heart from '../img/Heart.svg';
import heartfull from '../img/Heart (1).svg';
import logo from '../img/logo.png';
import profile from '../img/UserCircle (2).svg';
import logowhite from '../img/logowhite.png';
import befooter from '../img/befooter.png';
import translate from '../img/Translate.svg';
import cartIcon from '../img/Tote.svg';
import tas1groupred from '../img/1) Litchi Pattern Pillow Handbag/1 LPPH RED (Cover).svg';
import tas2groupbrown from '../img/2 ) Retro Small Square Handbag/1 RSSH BROWN (Cover).svg';

interface OrderItem {
    id: string;
    name: string;
    color: string;
    colorCode: string;
    quantity: number;
    price: number;
    date: string;
    time: string;
    image: string;
}

export default function History() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const location = useLocation();
    const userId = searchParams.user_id;

    const [clicked, setClicked] = createSignal(false);

    const goToFavoritePage = () => {
        setClicked(true);
        navigate("/favorite");
    };

    // Consolidated navigation function
    // Navigation functions
    const goToCart = () => navigateWithUserId("/cart");
    const goToAccount = () => navigateWithUserId("/account");
    const goToAddress = () => navigateWithUserId("/address");
    const goToHistory = () => navigateWithUserId("/history");
    const goToDashboard = () => navigateWithUserId("/dashboard");
    const goToProducts = () => navigateWithUserId("/products");
    const goToAboutUs = () => navigateWithUserId("/about-us");
    const goToBlog = () => navigateWithUserId("/blogpage");

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("id-ID").format(amount);
    };

    const navigateWithUserId = (path: string) => {
        if (userId) {
            navigate(`${path}?user_id=${userId}`);
            updateUserActivity();
        } else {
            navigate(path);
        }
    };

    const [profileImage, setProfileImage] = createSignal<string | null>(null);
    const [onlineUsers, setOnlineUsers] = createSignal<{ id: string }[]>([]);
    const accountIcon = profile; // You can keep your existing profile import
    const [orderHistory] = createSignal<OrderItem[]>([]);

    onMount(async () => {
        if (!userId) return;

        try {
            // Fetch user profile image
            const profileResponse = await fetch(`http://127.0.0.1:8080/user/${userId}`);
            if (profileResponse.ok) {
                const data = await profileResponse.json();
                if (data.img) {
                    setProfileImage(`http://127.0.0.1:8080/uploads/${data.img}`);
                }
            }

            // Fetch order history (replace with your actual API endpoint)
            const ordersResponse = await fetch(`http://127.0.0.1:8080/user/${userId}/orders`);
            if (ordersResponse.ok) {
                const orders = await ordersResponse.json();
                if (orders.length === 0) {
                    navigate(`/history/empty?user_id=${userId}`);
                } else {
                    // If you had a way to set orders, you would do it here
                    // setOrderHistory(orders);
                }
            }
        } catch (error) {
            console.error('Error:', error);
            // If there's an error fetching orders, redirect to empty state
            navigate(`/history/empty?user_id=${userId}`);
        }
    });
    const updateUserActivity = () => {
        if (!userId) return;

        fetch(`http://127.0.0.1:8080/user/${userId}/activity`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        }).catch(console.error);
    };
    return (
        <div class={styles.Container}>
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
                    <a
                        onClick={goToAccount}
                        class={location.pathname === '/account' ? styles.activeTab : styles.tab}
                    >
                        My Profile
                    </a>
                    <a
                        onClick={goToAddress}
                        class={location.pathname === '/address' ? styles.activeTab : styles.tab}
                    >
                        Address
                    </a>
                    <a
                        onClick={goToHistory}
                        class={location.pathname === '/history' ? styles.activeTab : styles.tab}
                    >
                        History
                    </a>
                </nav>

                <div class={styles.orderHistory}>
                    {orderHistory().length === 0 ? (
                        <div class={styles.emptyHistory}>
                            <p>No purchase history yet...</p>
                            <button
                                class={styles.shopNowButton}
                                onClick={goToProducts}
                            >
                                Shop Now
                            </button>
                        </div>
                    ) : (
                        orderHistory().map((order) => (
                            <div class={styles.orderItem}>
                                <div class={styles.orderImageContainer}>
                                    <img src={order.image} alt={order.name} class={styles.orderImage} />
                                </div>

                                <div class={styles.orderDetails}>
                                    <h3 class={styles.productName}>{order.name}</h3>
                                    <div class={styles.colorInfo}>
                                        <span
                                            class={styles.colorDot}
                                            style={{ "background-color": order.colorCode }}
                                        ></span>
                                        <span class={styles.colorName}>{order.color}</span>
                                    </div>
                                    <div class={styles.quantity}>Qty: {order.quantity}</div>
                                    <div class={styles.orderDate}>
                                        Order Completed at {order.date} {order.time}
                                    </div>
                                </div>

                                <div class={styles.orderPriceSection}>
                                    <div class={styles.orderPriceLabel}>Total Orders</div>
                                    <div class={styles.orderPrice}>{formatCurrency(order.price)} IDR</div>
                                    <button class={styles.buyAgainButton}>Buy Again</button>
                                </div>
                            </div>
                        ))
                    )}
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
        </div>
    );
}