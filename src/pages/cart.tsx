import { createSignal, createEffect, Show } from "solid-js";
import { useNavigate, useParams } from "@solidjs/router";
import { useSearchParams } from '@solidjs/router';
import { formatPrice } from "../pages/formatprice";
import logo from '../img/logo.png';
import logowhite from '../img/logowhite.png';
import translate from '../img/Translate.svg';
import trash from '../img/Trash.svg'
import heart from '../img/Heart.svg';
import heartfull from '../img/Heart (1).svg';
import befooter from '../img/befooter.png';
import cartIcon from '../img/Tote.svg';
import accountIcon from '../img/UserCircle (2).svg';
import './cart.css'


interface CartItem {
    id: number;
    product_id: number;
    product_name: string;
    product_category: string;  // Changed from category to product_category
    product_image: string | null;
    color: string;
    color_code: string;
    price: string;
    quantity: number;
}

export default function CartPage() {
    const [searchParams] = useSearchParams();
    const [cartItems, setCartItems] = createSignal<CartItem[]>([]);
    const [currentUserId, setCurrentUserId] = createSignal<string | null>(null);
    const userId = searchParams.user_id;
    const [loading, setLoading] = createSignal(true);
    const [selectAll, setSelectAll] = createSignal(false);
    const [selectedItems, setSelectedItems] = createSignal<number[]>([]);
    const [totalPrice, setTotalPrice] = createSignal(0);
    const [profileImage, setProfileImage] = createSignal<string | null>(null);
    const params = useParams();
    const orderId = searchParams.order_id;
    const navigate = useNavigate();

    const [error, setError] = createSignal<string | null>(null);
    const [clicked, setClicked] = createSignal(false);

    // Navigation functions with user ID
    const navigateWithUserId = (path: string) => {
        const id = currentUserId() || userId;
        if (id) {
            navigate(`${path}?user_id=${id}`);
            updateUserActivity(id);
        } else {
            navigate(path);
        }
    };



    const goToDashboard = () => navigateWithUserId("/");
    const goToCart = () => navigateWithUserId("/cart");
    const goToAccount = () => navigateWithUserId("/account");
    const goToProducts = () => navigateWithUserId("/products");
    const goToAboutUs = () => navigateWithUserId("/about-us");
    const goToBlog = () => navigateWithUserId("/blogpage");
    const goToHandbags = () => navigateWithUserId("/bags");
    const goToClothes = () => navigateWithUserId("/clothes");
    const goToAccessories = () => navigateWithUserId("/accessories");
    const goToViewMore = () => navigateWithUserId("/viewmore");
    const goToReadMore = (slug: string) => navigateWithUserId(`/blogpage/readmore/${slug}`);
    const goToFavoritePage = () => {
        setClicked(true);
        navigateWithUserId("/favorite");
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

    // Fetch cart items from backend
    createEffect(async () => {
        if (!userId) {
            navigate("/account");
            return;
        }
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

        try {
            setLoading(true);
            const response = await fetch(`http://127.0.0.1:8080/user/${userId}/cart`);

            if (!response.ok) throw new Error("Failed to fetch cart");

            const data = await response.json();
            console.log("Cart data:", data);

            // Ensure we're using the items array from the response
            setCartItems(data.items || []);
            setTotalPrice(data.total_price || 0);
        } catch (error) {
            console.error("Error fetching cart:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    });
    const updateQuantity = async (id: number, newQuantity: number) => {
        if (!userId) {
            console.error("No user ID found");
            return;
        }

        if (newQuantity < 1) return;

        try {
            const response = await fetch(`http://127.0.0.1:8080/user/${userId}/cart/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ quantity: newQuantity })
            });

            if (!response.ok) throw new Error("Failed to update quantity");

            // Optimistic update
            setCartItems(prev => prev.map(item =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            ));

            // Recalculate total
            recalculateTotal();
        } catch (error) {
            console.error("Error updating quantity:", error);
        }
    };

    const [deletingId, setDeletingId] = createSignal<number | null>(null);

    const removeItem = async (id: number) => {
        if (!userId) {
            console.error("No user ID found");
            return;
        }

        if (!confirm("Are you sure you want to remove this item from your cart?")) {
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:8080/user/${userId}/cart/${id}`, {
                method: "DELETE"
            });

            if (!response.ok) throw new Error("Failed to remove item");

            // Optimistic update
            setCartItems(prev => prev.filter(item => item.id !== id));
            setSelectedItems(prev => prev.filter(itemId => itemId !== id));

            // Recalculate total
            recalculateTotal();
        } catch (error) {
            console.error("Error removing item:", error);
            alert("Failed to remove item. Please try again.");
        }
    };
    const toggleSelectItem = (id: number) => {
        if (selectedItems().includes(id)) {
            setSelectedItems(selectedItems().filter(itemId => itemId !== id));
        } else {
            setSelectedItems([...selectedItems(), id]);
        }
    };

    const toggleSelectAll = () => {
        const newSelectAll = !selectAll();
        setSelectAll(newSelectAll);

        if (newSelectAll) {
            // Select semua item
            setSelectedItems(cartItems().map(item => item.id));
        } else {
            // Unselect semua item
            setSelectedItems([]);
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

    const [onlineUsers, setOnlineUsers] = createSignal<{ id: string }[]>([]);

    const recalculateTotal = () => {
        const selected = cartItems().filter(item => selectedItems().includes(item.id));
        const newTotal = selected.reduce((total, item) => {
            // Ensure price is treated as a number
            const price = typeof item.price === 'string' ? parseFloat(item.price) : item.price;
            return total + (price * item.quantity);
        }, 0);
        setTotalPrice(newTotal);
    };
    createEffect(() => {
        if (userId) {
            fetchCartCount();
            fetchUserProfile();

            // Fetch online users (if needed)
            fetch('http://127.0.0.1:8080/online-users')
                .then(res => res.json())
                .then(setOnlineUsers)
                .catch(console.error);
        }
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

    // Jalankan recalculateTotal setiap kali selectedItems atau cartItems berubah
    createEffect(() => {
        recalculateTotal();

        // Update status selectAll berdasarkan apakah semua item terpilih
        if (cartItems().length > 0) {
            setSelectAll(selectedItems().length === cartItems().length);
        }
    });

    const handleCheckout = async () => {
        if (selectedItems().length === 0) {
            alert("Please select at least one item to checkout");
            return;
        }

        if (!userId) {
            console.error("No user ID found");
            navigate("/account");
            return;
        }

        try {
            // Prepare order items with proper data types
            const orderItems = cartItems()
                .filter(item => selectedItems().includes(item.id))
                .map(item => ({
                    product_id: item.product_id,
                    product_name: item.product_name,
                    product_image: item.product_image || null,
                    color: item.color,
                    color_code: item.color_code,
                    quantity: item.quantity,
                    // Clean the price by removing the currency and normalizing the format
                    price: item.price.replace(/[^\d.,]/g, '').replace('.', '').replace(',', '.'),
                    category: item.product_category || 'general'
                }));
            // Calculate total amount
            const totalAmount = orderItems.reduce((sum, item) => {
                const price = parseFloat(item.price);
                return sum + (price * item.quantity);
            }, 0);

            console.log("Submitting order:", {
                total_amount: totalAmount.toFixed(2),
                items: orderItems
            });

            const orderData = {
                total_amount: totalAmount.toFixed(2),
                items: orderItems,
                address_id: null,
                notes: null
            };
            console.log("Order data to be sent:", JSON.stringify(orderData, null, 2));

            // Then send it
            const response = await fetch(`http://127.0.0.1:8080/user/${userId}/order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData)
            });


            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                throw new Error(errorData?.message || "Failed to create order");
            }

            const result = await response.json();
            console.log("Order created:", result);

            // Update UI
            setCartItems(prev => prev.filter(item => !selectedItems().includes(item.id)));
            setSelectedItems([]);
            setTotalPrice(0);
            fetchCartCount();

            // Navigate to checkout page
            navigate(`/checkout/${userId}?order_id=${orderId}`);
                        } catch (error) {
            console.error("Error during checkout:", error);
            alert(`Checkout failed: ${error.message}`);
        }
    };
    return (
        <div class="Container">
            {/* Your existing header */}
            {/* Header */}
            <header>
                <div class="logo">
                    <img src={logo} alt="Logo" />
                </div>
                <nav class="navbar">
                    <ul>
                        <li><a onClick={() => navigateWithUserId("/dashboard")}>Home</a></li>
                        <li><a onClick={() => navigateWithUserId("/products")} class="active">Products</a></li>
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
                        {cartCount() > 0 && (
                            <span class="cart-badge">{cartCount()}</span>
                        )}
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

            <main class="main-content">
                <h1 class="page-title">Shopping Cart</h1>

                <Show when={!loading()} fallback={<div class="load">Loading cart...</div>}>
                    <Show when={cartItems().length > 0} fallback={<div class="empty-cart-message">Your cart is empty</div>}>
                        <div class="cart-items-container">
                            <div class="cart-items">
                                <div class="select-all-container">
                                    <div class="select-all">
                                        <input id="select-all" type="checkbox" checked={selectAll()} onChange={toggleSelectAll} />
                                        <label for="select-all">Select All</label>
                                    </div>
                                </div>
                                {cartItems().map((item) => (
                                    <div class="cart-item" key={item.id}>
                                        <div class="item-select">
                                            <input
                                                type="checkbox"
                                                checked={selectedItems().includes(item.id)}
                                                onChange={() => toggleSelectItem(item.id)}
                                            />
                                        </div>
                                        <div class="item-image">
                                            <Show when={item.product_image} fallback={<div class="image-placeholder">No Image</div>}>
                                                <img
                                                    src={item.product_image.includes('http')
                                                        ? item.product_image
                                                        : `http://127.0.0.1:8080/uploads/products/${item.product_image}`}
                                                    alt={item.product_name}
                                                    onError={(e) => {
                                                        e.currentTarget.src = '/fallback-image.jpg';
                                                        e.currentTarget.onerror = null;
                                                    }}
                                                />
                                            </Show>
                                        </div>
                                        <div class="item-details">
                                            <div class="item-category">{item.product_category}</div>                                        <div class="item-color">
                                                <div class="item-name">{item.product_name}</div>
                                                <span>Color</span>
                                                <div class="color-circle" style={{ background: item.color_code, "border": "1px solid #ddd" }} ></div>
                                                {/* <span>{item.color}</span> */}
                                            </div>
                                            <div class="item-quantity">
                                                <span class="quantity-label">Quantity</span>
                                                <div class="quantity-controls">
                                                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>−</button>
                                                    <span>{item.quantity}</span>
                                                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                                </div>
                                            </div>


                                            <div class="item-price">
                                                {item.price}
                                            </div>
                                        </div>
                                        <button class="remove-btn" onClick={() => removeItem(item.id)} disabled={deletingId() === item.id}>
                                            {deletingId() === item.id ? (
                                                <span class="loading-spinner"></span> // Add appropriate spinner styling
                                            ) : (
                                                <img src={trash} alt="Remove item" />
                                            )}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div class="cart-footer">
                            <div class="cart-info">
                                <div class="total-orders">
                                    <span>
                                        Total Orders {selectedItems().length > 0}
                                    </span>
                                    <span class="total-price">{formatPrice(totalPrice())}</span>
                                </div>

                                <button
                                    class="checkout-button"
                                    disabled={selectedItems().length === 0}
                                    onClick={handleCheckout}
                                >
                                    Checkout {selectedItems().length > 0}
                                </button>
                            </div>
                        </div>
                    </Show>
                </Show>
            </main>

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
}