import { createSignal } from 'solid-js';
import styles from './CheckoutPage.module.css';
import befooter from '../img/befooter.png';
import cartIcon from '../img/Tote.svg';
import accountIcon from '../img/UserCircle (2).svg';
import { useNavigate } from "@solidjs/router";
import logo from '../img/logo.png';
import logowhite from '../img/logowhite.png';
import { createEffect, onCleanup } from "solid-js";
import { useLocation } from "@solidjs/router";
import translate from '../img/Translate.svg';
import logoqris from '../img/logoqris.png';

const CheckoutPage = () => {
    const navigate = useNavigate();

    // Fungsi untuk navigasi ke halaman Cart
    const goToCart = () => {
        navigate("/cart");
    };

    const location = useLocation();

    createEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });


    // Fungsi untuk navigasi ke halaman Account
    const goToAccount = () => {
        navigate("/account");
    };
    const goToReadMore = () => {
        navigate("/blogpage/readmore5fahion");
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, 100); // Memberi jeda agar navigasi selesai dulu
    };

    const [notes, setNotes] = createSignal('');

    const handleSubmit = (e: Event) => {
        e.preventDefault();
        // Handle checkout process here
        console.log('Processing checkout...');
    };

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

                <section class={styles.section}>
                    <h2 class={styles.sectionTitle}>Address</h2>
                    <div class={styles.addressCard}>
                        <div class={styles.addressDetails}>
                            <p class={styles.addressName}>Diva Faizah Dwiyanti - Home (Main)</p>
                            <p class={styles.addressPhone}>0813-9023-6662</p>
                            <p class={styles.addressStreet}>Jl. Melati, Bawuk, Karangritung, Kec. Sumbang, Kabupaten Banyumas, Jawa Tengah</p>
                            <p class={styles.addressPostal}>53183</p>
                        </div>
                        <button class={styles.changeAddressBtn}>Change Address</button>
                    </div>
                </section>

                <section class={styles.section}>
                <h2 class={styles.sectionTitle}>Payment Method</h2> 
                    <div class={styles.paymentMethod}>
                        <div class={styles.paymentOption}>
                            <img src={logoqris} alt="QRIS" class={styles.paymentLogo} />
                        </div>
                    </div>
                </section>

                <section class={styles.section}>
                    <h2 class={styles.sectionTitle}>Order Summary</h2>
                    <div class={styles.orderSummary}>
                        <div class={styles.orderItem}>
                            <span>Subtotal</span>
                            <span>480.600 IDR</span>
                        </div>
                        <div class={styles.orderItem}>
                            <span>Delivery</span>
                            <span>11.400 IDR</span>
                        </div>
                        <div class={`${styles.orderItem} ${styles.orderTotal}`}>
                            <span>Total</span>
                            <span>492.000 IDR</span>
                        </div>
                    </div>
                </section>

                <section class={styles.section}>
                    <h2 class={styles.sectionTitle}>Notes</h2>
                    <textarea
                        class={styles.notesTextarea}
                        placeholder="Notes (optional)"
                        value={notes()}
                        onInput={(e) => setNotes(e.target.value)}
                    />
                </section>

                <button class={styles.checkoutButton} onClick={handleSubmit}>
                    Checkout
                </button>
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

export default CheckoutPage;