import { createSignal } from 'solid-js';
import styles from './SuccesPayment.module.css';
import befooter from '../img/befooter.png';
import heart from '../img/Heart.svg';
import heartfull from '../img/Heart (1).svg';
import cartIcon from '../img/Tote.svg';
import accountIcon from '../img/UserCircle (2).svg';
import { useNavigate } from "@solidjs/router";
import logo from '../img/logo.png';
import logowhite from '../img/logowhite.png';
import { createEffect, onCleanup } from "solid-js";
import { useLocation, useSearchParams } from "@solidjs/router";
import translate from '../img/Translate.svg';
import logoqris from '../img/logoqris.png';
import qrcode from '../img/qrcode.png';

const PendingPaymentPage = () => {
    const navigate = useNavigate();

    interface CartItem {
            id: number;
            product_id: number;
            product_name: string;
            product_image: string | null;
            color: string;
            color_code: string;
            price: string;
            quantity: number;
          }
        
          const [searchParams] = useSearchParams();
          const [cartItems, setCartItems] = createSignal<CartItem[]>([]);
          const [currentUserId, setCurrentUserId] = createSignal<string | null>(null);
          const userId = searchParams.user_id;
        
          const navigateWithUserId = (path: string) => {
            const id = currentUserId() || userId;
            if (id) {
              navigate(`${path}?user_id=${id}`);
              updateUserActivity(id);
            } else {
              navigate(path);
            }
          };
        
          const updateUserActivity = async (userId: string) => {
            try {
              await fetch(`http://127.0.0.1:8080/user/${userId}/activity`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
              });
            } catch (error) {
              console.error('Failed to update activity:', error);
            }
          };

    const [clicked, setClicked] = createSignal(false);

    const goToFavoritePage = () => {
        setClicked(true);
        navigate("/favorite");
    };

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

    const [notes, setNotes] = createSignal('Extra packing, please!');

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
                                    <span>368.300 IDR</span>
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
                                value={notes()}
                                onInput={(e) => setNotes(e.target.value)}
                            />
                        </section>

                        <button class={styles.pendingPaymentButton}>
                            Payment Succesfully
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