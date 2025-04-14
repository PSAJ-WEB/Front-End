import { createSignal } from 'solid-js';
import styles from './PendingPayment.module.css';
import heart from '../img/Heart.svg';
import heartfull from '../img/Heart (1).svg';
import befooter from '../img/befooter.png';
import cartIcon from '../img/Tote.svg';
import accountIcon from '../img/UserCircle (2).svg';
import { useNavigate, useSearchParams } from "@solidjs/router";
import logo from '../img/logo.png';
import logowhite from '../img/logowhite.png';
import { createEffect, onCleanup } from "solid-js";
import { useLocation } from "@solidjs/router";
import translate from '../img/Translate.svg';
import logoqris from '../img/logoqris.png';
import qrcode from '../img/qris.jpg';

const PendingPaymentPage = () => {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.order_id;
    const userId = searchParams.user_id;
    const navigate = useNavigate();

    const [orderData, setOrderData] = createSignal(null);
    const [loading, setLoading] = createSignal(true);
    const [error, setError] = createSignal(null);
    const [notes, setNotes] = createSignal('');

    // Fetch order data on component mount
    createEffect(async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8080/user/${userId}/order/${orderId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch order details');
            }
            const data = await response.json();
            setOrderData(data);
            setNotes(data.notes || '');
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    });

    // Handle notes update
    const handleNotesUpdate = async () => {
        try {
            const response = await fetch(
                `http://127.0.0.1:8080/user/${userId}/order/${orderId}/notes`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ notes: notes() }),
                }
            );

            if (!response.ok) {
                throw new Error('Failed to update notes');
            }
            // Show success message
        } catch (err) {
            console.error('Error updating notes:', err);
        }
    };
    const navigateWithUserId = (path: string) => {
        const id = currentUserId() || userId;
        if (id) {
            navigate(`${path}?user_id=${id}`);
        } else {
            navigate(path);
        }
    };
    const [currentUserId, setCurrentUserId] = createSignal<string | null>(null);


    if (loading()) return <div>Loading...</div>;
    if (error()) return <div>Error: {error()}</div>;
    if (!orderData()) return <div>No order data found</div>;

    const goToCart = () => navigateWithUserId("/cart");
    const goToAccount = () => navigateWithUserId("/account");
    const goToFavoritePage = () => {
        setClicked(true);
        navigateWithUserId("/favorite");
    };
    const [clicked, setClicked] = createSignal(false);

    return (
        <div class={styles.Container}>
            {/* Header */}
            <header>
                <div class="logo">
                    <img src={logo} alt="Logo" />
                </div>
                <nav class="navbar-blog">
                    <ul>
                        <li><a href="/dashboard">Home</a></li>
                        <li><a href="/products">Products</a></li>
                        <li><a href="/about-us">About Us</a></li>
                        <li><a href="/blogpage">Blog</a></li>
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

            <main class={styles.main}>
                <h1 class={styles.title}>Checkout</h1>

                <div class={styles.contentLayout}>
                    <div class={styles.leftContent}>
                        <section class={styles.section}>
                            <h2 class={styles.sectionTitle}>Address</h2>
                            <div class={styles.addressCard}>
                                {orderData().address ? (
                                <div class={styles.addressDetails}>
                                    <p class={styles.addressName}>
                                        {orderData().address.recipient_name} - {orderData().address.address_type}
                                    </p>
                                    <p class={styles.addressPhone}>{orderData().address.phone_number}</p>
                                    <p class={styles.addressStreet}>{orderData().address.address}</p>
                                    <p class={styles.addressPostal}>{orderData().address.zip_code}</p>
                                </div>
                                ) :(
                                <p>No address selected</p>
                                )}
                                <button class={styles.changeAddressBtn}>Change Address</button>
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
                                    <span>{orderData().subtotal} IDR</span>
                                </div>
                                <div class={styles.orderItem}>
                                    <span>Delivery</span>
                                    <span>{orderData().delivery_fee} IDR</span>
                                </div>
                                <div class={`${styles.orderItem} ${styles.orderTotal}`}>
                                    <span>Total</span>
                                    <span>{orderData().total_amount} IDR</span>
                                </div>
                            </div>
                        </section>

                        <section class={styles.section}>
                            <h2 class={styles.sectionTitle}>Notes</h2>
                            <textarea
                                class={styles.notesTextarea}
                                value={notes()}
                                onInput={(e) => setNotes(e.target.value)}
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
                                <img src={qrcode} alt="QRIS QR Code" class={styles.qrCode} />
                            </div>
                        </section>
                    </div>
                </div>
            </main><img src={befooter} alt="Banner" class="full-width-image" />

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