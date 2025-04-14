import { createSignal, createEffect, Show } from 'solid-js';
import styles from './CheckoutPage.module.css';
import befooter from '../img/befooter.png';
import cartIcon from '../img/Tote.svg';
import accountIcon from '../img/UserCircle (2).svg';
<<<<<<< HEAD
import { useNavigate, useSearchParams } from "@solidjs/router";
=======
import heart from '../img/Heart.svg';
import heartfull from '../img/Heart (1).svg';
import { useNavigate } from "@solidjs/router";
>>>>>>> c9b33a21a5205dda27f3c00a9a8370f12142c011
import logo from '../img/logo.png';
import logowhite from '../img/logowhite.png';
import { onCleanup, } from "solid-js";
import { formatPrice } from "../pages/formatprice";
import { useLocation, useParams, useSearchParams } from "@solidjs/router";
import translate from '../img/Translate.svg';
import logoqris from '../img/logoqris.png';

interface Address {
    id: number;
    recipient_name: string;
    phone_number: string;
    address: string;
    zip_code: string;
    is_default: boolean;
    address_type: string;
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

const CheckoutPage = () => {
    const params = useParams<{ userId: string }>();
    const [searchParams] = useSearchParams<{ order_id?: string }>();

    const userId = params.userId;
    // const orderId = searchParams.order_id;
    const navigate = useNavigate();

<<<<<<< HEAD
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
=======
    const [address, setAddress] = createSignal<Address | null>(null);
    const [cartItems, setCartItems] = createSignal<CartItem[]>([]);
    const [profileImage, setProfileImage] = createSignal<string | null>(null);
    const [subtotal, setSubtotal] = createSignal(0);
    const [deliveryFee] = createSignal(11); // Fixed delivery fee
    const [notes, setNotes] = createSignal('');
    const [loading, setLoading] = createSignal(true);
    const [error, setError] = createSignal<string | null>(null);
    // const [clicked, setClicked] = createSignal(false);
>>>>>>> c9b33a21a5205dda27f3c00a9a8370f12142c011

    // const goToFavoritePage = () => {
    //     setClicked(true);
    //     navigate("/favorite");
    // };

    // Fungsi untuk navigasi ke halaman Cart
    const goToCart = () => {
        navigate("/cart");
    };

    const location = useLocation();

    const handlePlaceOrder = async () => {
        if (!address()) {
            alert("Please select an address first");
            return;
        }

        if (cartItems().length === 0) {
            alert("Your cart is empty");
            return;
        }

        try {
            // Prepare order items
            const orderItems = cartItems().map(item => ({
                product_name: item.product_name,
                product_image: item.product_image,
                color: item.color,
                color_code: item.color_code,
                quantity: item.quantity,
                price: parseFloat(item.price),
            }));

            // Create order
            const orderRes = await fetch(`http://127.0.0.1:8080/user/${userId}/order`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items: orderItems,
                    total_amount: subtotal() + deliveryFee()
                }),
            });

            if (!orderRes.ok) {
                const errorData = await orderRes.json();
                throw new Error(errorData.message || "Failed to create order");
            }

            const orderData = await orderRes.json();

            // Clear cart
            await fetch(`http://127.0.0.1:8080/user/${userId}/cart/clear`, {
                method: "DELETE",
            });

            // Redirect to order confirmation
            navigate(`/order-confirmation/${userId}?order_id=${orderData.order_id}`);

        } catch (err) {
            setError(err.message);
            console.error("Order submission error:", err);
            alert("Failed to place order. Please try again.");
        }
    };

    // At the top of your component
    const [orderId, setOrderId] = createSignal("");
    const [totalPrice, setTotalPrice] = createSignal(0);


    createEffect(async () => {
        if (!userId) {
            navigate("/account");
            return;
        }

        fetchFavoriteCount();
        fetchCartCount();
        fetchUserProfile();

        try {
            setLoading(true);

            // Fetch cart items
            const cartRes = await fetch(`http://127.0.0.1:8080/user/${userId}/cart`);
            if (!cartRes.ok) throw new Error("Failed to fetch cart items");

            const cartData = await cartRes.json();
            console.log("Full cart data:", cartData);

            // Process items and calculate totals
            const items = cartData.items || [];

            // Calculate subtotal from items
            const subtotal = items.reduce((sum, item) => {
                // Extract numeric price (remove " IDR" and parse)
                const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
                return sum + (price * item.quantity);
            }, 0);

            // For now, set total_price same as subtotal (add shipping/tax later)
            const total_price = subtotal;

            console.log("Calculated subtotal:", subtotal);
            console.log("Calculated total price:", total_price);

            setCartItems(items);
            setSubtotal(subtotal);
            setTotalPrice(total_price);

            // Rest of your effect (profile image, address, order creation)...
            // Fetch user profile image
            const profileRes = await fetch(`http://127.0.0.1:8080/user/${userId}`);
            if (profileRes.ok) {
                const profileData = await profileRes.json();
                if (profileData.img) {
                    setProfileImage(`http://127.0.0.1:8080/uploads/${profileData.img}`);
                }
            }

            // Fetch default address
            const addressRes = await fetch(`http://127.0.0.1:8080/user/${userId}/address/default`);
            if (!addressRes.ok) throw new Error("Failed to fetch address");
            const addressData = await addressRes.json();
            setAddress(addressData);

            // Create order with calculated totals
            const orderRes = await fetch(`http://127.0.0.1:8080/user/${userId}/order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    items: items,
                    address: addressData,
                    subtotal: subtotal,
                    total_price: total_price
                })
            });

            if (!orderRes.ok) throw new Error("Failed to create order");

            const orderData = await orderRes.json();
            setOrderId(orderData.orderId);

        } catch (err) {
            setError(err.message);
            console.error("Checkout error:", err);
        } finally {
            setLoading(false);
        }
        fetchCartCount();
        fetchUserProfile();
    });

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
    const handleSubmit = async (e: Event) => {
        e.preventDefault();
        if (!address()) {
            alert("Please select an address first");
            return;
        }
    
        try {
            setLoading(true);
    
            // Prepare order data
            const orderItems = cartItems().map(item => ({
                product_id: item.id,
                product_name: item.product_name,
                product_image: item.product_image,
                color: item.color,
                color_code: item.color_code,
                quantity: item.quantity,
                price: item.price.toString(), // Ensure price is string
                category: "general" // Add required category field
            }));
    
            // Create order
            const orderRes = await fetch(`http://127.0.0.1:8080/user/${userId}/order`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    items: orderItems,
                    address_id: address()?.id,
                    notes: notes(),
                    total_amount: (subtotal() + deliveryFee()).toString() // Convert to string
                }),
            });
    
            if (!orderRes.ok) {
                const errorData = await orderRes.json();
                throw new Error(errorData.message || "Failed to create order");
            }
    
            const orderData = await orderRes.json();
    
            // Clear cart
            await fetch(`http://127.0.0.1:8080/user/${userId}/cart/clear`, {
                method: "DELETE",
            });
    
            // Navigate to pending payment page with order details
            navigate(`/checkout/pending?order_id=${orderData.id}&user_id=${userId}`);
    
        } catch (err) {
            setError(err.message);
            console.error("Order submission error:", err);
            alert("Failed to place order. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const goToFavoritePage = () => {
        setClicked(true);
        navigateWithUserId("/favorite");
    };
    const [clicked, setClicked] = createSignal(false);
    const [currentUserId, setCurrentUserId] = createSignal<string | null>(null);

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


    const [cartCount, setCartCount] = createSignal(0);

    const fetchCartCount = async () => {
        if (!userId) return;

        try {
            const response = await fetch(`http://127.0.0.1:8080/user/${userId}/cart/count`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
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
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setFavoriteCount(data.count || 0);
        } catch (error) {
            console.error('Error fetching favorite count:', error);
        }
    };

    const navigateWithUserId = (path: string) => {
        const id = currentUserId() || userId;
        if (id) {
            navigate(`${path}?user_id=${id}`);
            updateUserActivity(id);
        } else {
            navigate(path);
        }
    };
    const goToProducts = () => navigateWithUserId("/products");

    const [favoriteCount, setFavoriteCount] = createSignal(0);

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
<<<<<<< HEAD
                        <li><a onClick={() => navigateWithUserId("/products")}>Products</a></li>
                        <li><a onClick={() => navigateWithUserId("/about-us")}>About Us</a></li>
                        <li><a onClick={() => navigateWithUserId("/blogpage")}>Blog</a></li>
=======
                        <li><a onClick={() => navigateWithUserId("/products")} >Products</a></li>
                        <li><a onClick={() => navigateWithUserId("/about-us")} >About Us</a></li>
                        <li><a onClick={() => navigateWithUserId("/blogpage")} >Blog</a></li>
>>>>>>> 2e6c0d4f7f2116fcd00181a81d1656cc8a7cc5fa
                    </ul>
                </nav>

                <div class="dash-auth-buttons">
                    <button class="fav" onClick={goToFavoritePage}>
                        <img
                            src={clicked() ? heartfull : heart}
                            alt="heart"
                        />
                        {favoriteCount() > 0 && (
                            <span class="favorites-badge">{favoriteCount()}</span>
                        )}
                    </button>

                    {/* Tombol Cart dengan Badge */}
                    <button class="dash-cart-btn" onClick={goToCart}>
                        <img src={cartIcon} alt="Cart" />
                        {cartCount() > 0 && (
                            <span class="cart-badge">{cartCount()}</span>
                        )}
                    </button>

                    {/* Tombol Account */}
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

                <section class={styles.section}>
                    <h2 class={styles.sectionTitle}>Address</h2>
                    <Show when={!loading()} fallback={<div>Loading address...</div>}>
                        <Show when={address()} fallback={
                            <div class={styles.noAddress}>
                                <p>No shipping address found</p>
                                <button
                                    class={styles.addAddressBtn}
                                    onClick={() => navigate(`/user/${userId}/addresses`)}
                                >
                                    Add Address
                                </button>
                            </div>
                        }>
                            <div class={styles.addressCard}>
                                <div class={styles.addressHeader}>
                                    <span class="address-type">
                                        <strong>
                                            {address()?.recipient_name} - {address()?.address_type} {address()?.is_default && "(Main)"}
                                        </strong>
                                    </span>
                                </div>

                                <div class={styles.addressDetails}>
                                    {/* <p><strong>{address()?.recipient_name}</strong></p> */}
                                    <p>{address()?.phone_number}</p>
                                    <p>{address()?.address}</p>
                                    <p>{address()?.zip_code}</p>
                                </div>
                                <button
                                    class={styles.changeAddressBtn}
                                    onClick={() => navigate(`/user/${userId}/addresses`)}
                                >
                                    Change Address
                                </button>
                            </div>
                        </Show>
                    </Show>
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
                            <span>Subtotal ({cartItems().reduce((total, item) => total + item.quantity, 0)} items)</span>
                            <span>{formatPrice(subtotal())}</span>
                        </div>
                        <div class={styles.orderItem}>
                            <span>Delivery Fee</span>
                            <span>{formatPrice(deliveryFee())}</span>
                        </div>
                        <div class={`${styles.orderItem} ${styles.orderTotal}`}>
                            <span>Total</span>
                            <span>{formatPrice(subtotal() + deliveryFee())}</span>
                        </div>
                    </div>
                </section>

                <section class={styles.section}>
                    <h2 class={styles.sectionTitle}>Notes</h2>
                    <textarea
                        class={styles.notesTextarea}
                        placeholder="Notes (optional)"
                        value={notes()}
                        onInput={(e) => setNotes(e.currentTarget.value)}
                    />
                </section>

                <button
                    class={styles.checkoutButton}
                    onClick={handlePlaceOrder}
                    disabled={loading() || !address() || cartItems().length === 0}
                >
                    {loading() ? "Processing..." : "Checkout"}
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