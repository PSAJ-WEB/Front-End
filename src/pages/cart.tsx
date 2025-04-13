import { createSignal, createEffect, Show } from "solid-js";
import { useNavigate, useParams } from "@solidjs/router";
import { useSearchParams } from '@solidjs/router';
import { formatPrice } from "../pages/formatprice";
import logo from '../img/logo.png';
import logowhite from '../img/logowhite.png';
import translate from '../img/Translate.svg';
import heart from '../img/Heart.svg';
import heartfull from '../img/Heart (1).svg';
import befooter from '../img/befooter.png';
import cartIcon from '../img/Tote.svg';
import accountIcon from '../img/UserCircle (2).svg';


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
        try {
            const response = await fetch(`http://localhost:8080/user/${params.userId}/cart`);
            if (!response.ok) throw new Error("Failed to fetch cart");
            const data = await response.json();
            setCartItems(data.items);
            setTotalPrice(data.total_price);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching cart:", error);
            setLoading(false);
        }
    });

    const updateQuantity = async (id: number, newQuantity: number) => {
        if (newQuantity < 1) return;

        try {
            const response = await fetch(`http://localhost:8080/user/${params.userId}/cart/${id}`, {
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

    const removeItem = async (id: number) => {
        try {
            const response = await fetch(`http://localhost:8080/user/${params.userId}/cart/${id}`, {
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
        setSelectAll(!selectAll());
        if (!selectAll()) {
            setSelectedItems(cartItems().map(item => item.id));
        } else {
            setSelectedItems([]);
        }
    };

    const recalculateTotal = () => {
        const selected = cartItems().filter(item => selectedItems().includes(item.id));
        const newTotal = selected.reduce((total, item) => {
            return total + (parseFloat(item.price) * item.quantity);
        }, 0);
        setTotalPrice(newTotal);
    };

    createEffect(() => {
        recalculateTotal();
    });

    const handleCheckout = async () => {
        if (selectedItems().length === 0) return;

        try {
            // Create an order with selected items
            const orderItems = cartItems()
                .filter(item => selectedItems().includes(item.id))
                .map(item => ({
                    product_name: item.product_name,
                    product_image: item.product_image,
                    color: item.color,
                    color_code: item.color_code,
                    quantity: item.quantity,
                    price: parseFloat(item.price)
                }));

            const response = await fetch(`http://localhost:8080/user/${params.userId}/order`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ items: orderItems })
            });

            if (!response.ok) throw new Error("Failed to create order");

            // Remove ordered items from cart
            await fetch(`http://localhost:8080/user/${params.userId}/cart/clear`, {
                method: "DELETE"
            });

            // Refresh cart
            setCartItems([]);
            setSelectedItems([]);
            setTotalPrice(0);

            // Navigate to orders page or success page
            navigate(`/user/${params.userId}/orders`);
        } catch (error) {
            console.error("Error during checkout:", error);
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
                    <button class="dash-cart-btn" onClick={goToCart}>
                        <img src={cartIcon} alt="Cart" />
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

                <Show when={!loading()} fallback={<div>Loading cart...</div>}>
                    <Show when={cartItems().length > 0} fallback={<div class="empty-cart-message">Your cart is empty</div>}>
                        <div class="cart-items">
                            {cartItems().map((item) => (
                                <div class="cart-item">
                                    <div class="item-select">
                                        <input
                                            type="checkbox"
                                            checked={selectedItems().includes(item.id)}
                                            onChange={() => toggleSelectItem(item.id)}
                                        />
                                    </div>
                                    <div class="item-image">
                                        <Show when={item.product_image} fallback={<div class="image-placeholder">No Image</div>}>
                                            <img src={item.product_image} alt={item.product_name} />
                                        </Show>
                                    </div>
                                    <div class="item-details">
                                        <div class="item-name">{item.product_name}</div>
                                        <div class="item-color">
                                            <span>Color</span>
                                            <div class="color-circle" style={{ background: item.color_code }}></div>
                                            <span>{item.color}</span>
                                        </div>
                                        <div class="item-quantity">
                                            <span>Quantity</span>
                                            <div class="quantity-controls">
                                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                                                <input type="text" value={item.quantity} readonly />
                                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                            </div>
                                        </div>
                                        <div class="item-price">{formatPrice(parseFloat(item.price))}</div>
                                    </div>
                                    <div class="item-remove">
                                        <button onClick={() => removeItem(item.id)}>
                                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M3 6H5H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div class="cart-footer">
                            <div class="cart-info">
                                <div class="select-all">
                                    <input
                                        type="checkbox"
                                        checked={selectAll()}
                                        onChange={toggleSelectAll}
                                    />
                                    <label>Select All</label>
                                </div>
                                <div class="total-orders">
                                    <span>Total Orders</span>
                                    <span class="total-price">{formatPrice(totalPrice())}</span>
                                </div>
                            </div>

                            <button
                                class="checkout-button"
                                disabled={selectedItems().length === 0}
                                onClick={handleCheckout}
                            >
                                Checkout
                            </button>
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