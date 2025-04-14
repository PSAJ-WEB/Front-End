import { createSignal, createEffect, Show } from 'solid-js';
import styles from './PendingPayment.module.css';
import heart from '../img/Heart.svg';
import heartfull from '../img/Heart (1).svg';
import befooter from '../img/befooter.png';
import cartIcon from '../img/Tote.svg';
import accountIcon from '../img/UserCircle (2).svg';
import { useNavigate, useSearchParams } from "@solidjs/router";
import logo from '../img/logo.png';
import logowhite from '../img/logowhite.png';
import translate from '../img/Translate.svg';
import logoqris from '../img/logoqris.png';
import qrcode from '../img/qris.jpg';

interface OrderData {
    id: number;
    order_date: string;
    status: string;
    total_amount: string;
    subtotal: string;
    delivery_fee: string;
    address?: {
        recipient_name: string;
        phone_number: string;
        address: string;
        zip_code: string;
        address_type: string;
    };
    notes?: string;
}

interface CartItem {
    id: number;
    product_name: string;
    product_image: string | null;
    color: string;
    color_code: string;
    quantity: number;
    price: string;
}

const PendingPaymentPage = () => {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.order_id;
    const userId = searchParams.user_id;
    const navigate = useNavigate();

    const [orderData, setOrderData] = createSignal<OrderData | null>(null);
    const [loading, setLoading] = createSignal(true);
    const [error, setError] = createSignal<string | null>(null);
    const [notes, setNotes] = createSignal('');
    const [clicked, setClicked] = createSignal(false);
    const [profileImage, setProfileImage] = createSignal<string | null>(null);
    const [cartCount, setCartCount] = createSignal(0);
    const [favoriteCount, setFavoriteCount] = createSignal(0);

    const fetchOrderData = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8080/user/${userId}/order/${orderId}`);
            if (!response.ok) throw new Error('Failed to fetch order details');
            const data = await response.json();
            console.log('Fetched order data:', data); // Logging data
            setOrderData(data.order);
            setNotes(data.notes || '');
        } catch (err) {
            setError(err.message);
            console.error('Error fetching order data:', err);
        } finally {
            setLoading(false);
        }
    };

    const fetchUserProfile = async () => {
        if (!userId) return;
        try {
            const response = await fetch(`http://127.0.0.1:8080/user/${userId}`);
            if (response.ok) {
                const data = await response.json();
                if (data.img) {
                    setProfileImage(`http://127.0.0.1:8080/uploads/${data.img}`);
                }
            }
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    };

    const fetchCartCount = async () => {
        if (!userId) return;
        try {
            const response = await fetch(`http://127.0.0.1:8080/user/${userId}/cart/count`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            setCartCount(data.count || 0);
        } catch (error) {
            console.error('Error fetching cart count:', error);
        }
    };

    const fetchFavoriteCount = async () => {
        if (!userId) return;
        try {
            const response = await fetch(`http://127.0.0.1:8080/user/${userId}/likes`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.json();
            setFavoriteCount(data.length || 0);
        } catch (error) {
            console.error('Error fetching favorite count:', error);
        }
    };

    const handleNotesUpdate = async () => {
        try {
            const response = await fetch(
                `http://127.0.0.1:8080/user/${userId}/order/${orderId}/notes`,
                {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ notes: notes() }),
                }
            );
            if (!response.ok) throw new Error('Failed to update notes');
            console.log('Notes updated successfully');
        } catch (err) {
            console.error('Error updating notes:', err);
        }
    };

    createEffect(async () => {
        if (!orderId || !userId) {
            navigate("/");
            return;
        }

        await Promise.all([
            fetchOrderData(),
            fetchUserProfile(),
            fetchCartCount(),
            fetchFavoriteCount()
        ]);
    });

    const goToCart = () => navigate(`/cart?user_id=${userId}`);
    const goToAccount = () => navigate(`/account?user_id=${userId}`);
    const goToFavoritePage = () => {
        setClicked(true);
        navigate(`/favorite?user_id=${userId}`);
    };
    const navigateWithUserId = (path: string) => navigate(`${path}?user_id=${userId}`);

    return (
        <div class={styles.Container}>
            {/* Header */}
            <header>
                <div class="logo">
                    <img src={logo} alt="Logo" />
                </div>
                <nav class="navbar-blog">
                    <ul>
                        <li><a onClick={() => navigateWithUserId("/dashboard")}>Home</a></li>
                        <li><a onClick={() => navigateWithUserId("/products")}>Products</a></li>
                        <li><a onClick={() => navigateWithUserId("/about-us")}>About Us</a></li>
                        <li><a onClick={() => navigateWithUserId("/blogpage")}>Blog</a></li>
                    </ul>
                </nav>
                <div class="dash-auth-buttons">
                    <button class="fav" onClick={goToFavoritePage}>
                        <img src={clicked() ? heartfull : heart} alt="heart" />
                        {favoriteCount() > 0 && <span class="favorites-badge">{favoriteCount()}</span>}
                    </button>
                    <button class="dash-cart-btn" onClick={goToCart}>
                        <img src={cartIcon} alt="Cart" />
                        {cartCount() > 0 && <span class="cart-badge">{cartCount()}</span>}
                    </button>
                    <button class="dash-account-btn" onClick={goToAccount}>
                        <img
                            src={profileImage() || accountIcon}
                            alt="Account"
                            style={{
                                width: '32px',
                                height: '32px',
                                "border-radius": '50%',
                                "object-fit": 'cover'
                            }}
                        />
                    </button>
                </div>
            </header>

            <main class={styles.main}>
                <h1 class={styles.title}>Checkout</h1>

                <Show when={!loading()} fallback={<div>Loading...</div>}>
                    <Show when={orderData()} fallback={<div>No order data found</div>}>
                        <div class={styles.contentLayout}>
                            <div class={styles.leftContent}>
                                <section class={styles.section}>
                                    <h2 class={styles.sectionTitle}>Address</h2>
                                    <div class={styles.addressCard}>
                                        <Show when={orderData()?.address} fallback={<p>No address selected</p>}>
                                            <div class={styles.addressDetails}>
                                                <p class={styles.addressName}>
                                                    {orderData()?.address?.recipient_name} - {orderData()?.address?.address_type}
                                                </p>
                                                <p class={styles.addressPhone}>{orderData()?.address?.phone_number}</p>
                                                <p class={styles.addressStreet}>{orderData()?.address?.address}</p>
                                                <p class={styles.addressPostal}>{orderData()?.address?.zip_code}</p>
                                            </div>
                                        </Show>
                                        <button 
                                            class={styles.changeAddressBtn}
                                            onClick={() => navigate(`/user/${userId}/addresses`)}
                                        >
                                            Change Address
                                        </button>
                                    </div>
                                </section>

                                <section class={styles.section}>
                                    <div class={styles.paymentMethodHeader}>
                                        <h2 class={styles.sectionTitle}>Payment Method</h2>
                                        <img src={logoqris} alt="QRIS" class={styles.paymentLogo} />
                                    </div>
                                </section>

                                <section class={styles.section}>
                                    <h2 class={styles.sectionTitle}>Order Summary</h2>
                                    <div class={styles.orderSummary}>
                                        <div class={styles.orderItem}>
                                            <span>Subtotal</span>
                                            <span>IDR {orderData()?.subtotal}</span>
                                        </div>
                                        <div class={styles.orderItem}>
                                            <span>Delivery</span>
                                            <span>IDR {orderData()?.delivery_fee}</span>
                                        </div>
                                        <div class={`${styles.orderItem} ${styles.orderTotal}`}>
                                            <span>Total</span>
                                            <span>IDR {orderData()?.total_amount}</span>
                                        </div>
                                    </div>
                                </section>

                                <section class={styles.section}>
                                    <h2 class={styles.sectionTitle}>Notes</h2>
                                    <textarea
                                        class={styles.notesTextarea}
                                        value={notes()}
                                        onInput={(e) => setNotes(e.currentTarget.value)}
                                        onBlur={handleNotesUpdate}
                                    />
                                </section>

                                <button class={styles.pendingPaymentButton}>
                                    Pending Payment
                                </button>
                            </div>

                            <div class={styles.rightContent}>
                                <section class={styles.qrisSection}>
                                    <h2 class={styles.sectionTitle}>QRIS</h2>
                                    <div class={styles.qrisCard}>
                                        <img 
                                            src={`http://127.0.0.1:8080${qrcode}`} 
                                            alt="QRIS QR Code" 
                                            class={styles.qrCode} 
                                        />
                                    </div>
                                </section>
                            </div>
                        </div>
                    </Show>
                </Show>
            </main>

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
                            <li><a href="#">Home</a></li>
                            <li><a href="#">Product</a></li>
                            <li><a href="#">About Us</a></li>
                            <li><a href="#">Blog</a></li>
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

export default PendingPaymentPage;