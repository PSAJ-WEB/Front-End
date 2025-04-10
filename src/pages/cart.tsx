import { createSignal, createEffect } from "solid-js";
import "./cart.css";
import befooter from '../img/befooter.png';
import cartIcon from '../img/Tote.svg';
import accountIcon from '../img/UserCircle (2).svg';
import { useNavigate } from "@solidjs/router";
import logo from '../img/logo.png';
import logowhite from '../img/logowhite.png';
import { useLocation } from "@solidjs/router";
import translate from '../img/Translate.svg';
import tas1groupred from '../img/1) Litchi Pattern Pillow Handbag/1 LPPH RED (Cover).svg';
import lunettesdesoleilm from '../img/Lunettes De Soleil M.svg';

interface CartItem {
    id: number;
    category: string;
    name: string;
    color: string;
    price: number;
    quantity: number;
    image: string;
}

export default function CartPage() {
    const [cartItems, setCartItems] = createSignal<CartItem[]>([
        {
            id: 1,
            category: "Bags",
            name: "Litchi Pattern Pillow Handbag",
            color: "#9e1a1a",
            price: 256000,
            quantity: 1,
            image: tas1groupred,
        },
        {
            id: 2,
            category: "Accessories",
            name: "Lunettes De Soleil M",
            color: "#333333",
            price: 112300,
            quantity: 2,
            image: lunettesdesoleilm,
        },
    ]);

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

    const [selectAll, setSelectAll] = createSignal(false);
    const [selectedItems, setSelectedItems] = createSignal<number[]>([]);

    createEffect(() => {
        if (selectAll()) {
            setSelectedItems(cartItems().map((item) => item.id));
        } else if (selectedItems().length === cartItems().length) {
            setSelectedItems([]);
        }
    });

    const updateQuantity = (id: number, newQuantity: number) => {
        if (newQuantity < 1) return;

        setCartItems(
            cartItems().map((item) =>
                item.id === id ? { ...item, quantity: newQuantity } : item
            )
        );
    };

    const removeItem = (id: number) => {
        setCartItems(cartItems().filter((item) => item.id !== id));
        setSelectedItems(selectedItems().filter(itemId => itemId !== id));
    };

    const toggleSelectItem = (id: number) => {
        if (selectedItems().includes(id)) {
            setSelectedItems(selectedItems().filter((itemId) => itemId !== id));
        } else {
            setSelectedItems([...selectedItems(), id]);
        }
    };

    const toggleSelectAll = () => {
        setSelectAll(!selectAll());
    };

    const calculateTotal = () => {
        return cartItems()
            .filter((item) => selectedItems().includes(item.id))
            .reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("id-ID").format(price) + " IDR";
    };

    return (
        <div class="Container">
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

            <main class="main-content">
                <h1 class="page-title">Shopping Cart</h1>

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
                                <img src={item.image} alt={item.name} />
                            </div>
                            <div class="item-details">
                                <div class="item-category">{item.category}</div>
                                <div class="item-name">{item.name}</div>
                                <div class="item-color">
                                    <span>Color</span>
                                    <div class="color-circle" style={{ background: item.color }}></div>
                                </div>
                                <div class="item-quantity">
                                    <span>Quantity</span>
                                    <div class="quantity-controls">
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                                        <input type="text" value={item.quantity} readonly />
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                    </div>
                                </div>
                                <div class="item-price">{formatPrice(item.price)}</div>
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
                            <span class="total-price">{formatPrice(calculateTotal())}</span>
                        </div>
                    </div>

                    <button class="checkout-button">Checkout</button>
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
}