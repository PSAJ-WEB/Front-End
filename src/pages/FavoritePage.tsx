import { createSignal } from "solid-js";
import "./FavoritePage.css";
import befooter from '../img/befooter.png';
import cartIcon from '../img/Tote.svg';
import accountIcon from '../img/UserCircle (2).svg';
import { useNavigate } from "@solidjs/router";
import logo from '../img/logo.png';
import logowhite from '../img/logowhite.png';
import { createEffect, onCleanup } from "solid-js";
import { useLocation } from "@solidjs/router";
import translate from '../img/Translate.svg';
import tas2groupbrown from '../img/2 ) Retro Small Square Handbag/1 RSSH BROWN (Cover).svg';
import tas4groupblack from '../img/4) Frosted Bowling Handbag/1 FBH BLACK (Cover).svg';
import clothes1 from '../img/Theyy Wearr Blouses Catalogue/Line Drawing Floral Pattern Blouse.svg';
import metalsunglasses from '../img/Metal Sunglasses.svg';
import thinbeltsquarebuckle from '../img/Thin Belt with Square Buckle.svg'

interface Product {
    id: number;
    category: string;
    name: string;
    price: number;
    image: string;
    colors: string[];
    isFavorite: boolean;
}

export default function FavoritesPage() {
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

    const [favoriteProducts, setFavoriteProducts] = createSignal<Product[]>([
        {
            id: 1,
            category: "Bags",
            name: "Retro Small Square Handbag",
            price: 174000,
            image: tas2groupbrown,
            colors: ["#000000", "#8B4513", "#808000", "#F5DEB3"],
            isFavorite: true
        },
        {
            id: 2,
            category: "Bags",
            name: "Frosted Bowling Handbag",
            price: 192000,
            image: tas4groupblack,
            colors: ["#000000", "#5D4037", "#8B4513", "#CD853F"],
            isFavorite: true
        },
        {
            id: 3,
            category: "Clothes",
            name: "Drawing Floral Pattern Blouse",
            price: 300000,
            image: clothes1,
            colors: ["#F5F5DC"],
            isFavorite: true
        },
        {
            id: 4,
            category: "Accessories",
            name: "Metal Sunglasses",
            price: 86900,
            image: metalsunglasses,
            colors: ["#808080"],
            isFavorite: true
        },
        {
            id: 5,
            category: "Accessories",
            name: "Thin Belt Square Buckle",
            price: 110400,
            image: thinbeltsquarebuckle,
            colors: ["#000000"],
            isFavorite: true
        }
    ]);

    const toggleFavorite = (id: number) => {
        setFavoriteProducts(
            favoriteProducts().map(product =>
                product.id === id ? { ...product, isFavorite: !product.isFavorite } : product
            )
        );
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("id-ID").format(price) + " IDR";
    };

    const handleSearch = (e: Event) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const searchInput = form.querySelector('input') as HTMLInputElement;
        const searchTerm = searchInput.value;
        // Implementation for search functionality would go here
        console.log(`Searching for: ${searchTerm}`);
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
                <div class="favorites-header">
                    <h1 class="page-title">Favorites</h1>
                    <form class="search-form" onSubmit={handleSearch}>
                        <input type="text" placeholder="Type something here" />
                        <button type="submit">Search</button>
                    </form>
                </div>

                <div class="products-grid">
                    {favoriteProducts().map((product) => (
                        <div class="product-card">
                            <div class="product-image">
                                <img src={product.image} alt={product.name} />
                                <button
                                    class={`favorite-button ${product.isFavorite ? 'active' : ''}`}
                                    onClick={() => toggleFavorite(product.id)}>
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill={product.isFavorite ? "#FF4848" : "none"} xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                                            stroke={product.isFavorite ? "#FF4848" : "currentColor"}
                                            stroke-width="2"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                        />
                                    </svg>
                                </button>
                            </div>
                            <div class="product-info">
                                <div class="product-category">{product.category}</div>
                                <div class="product-name">{product.name}</div>
                                <div class="product-price">{formatPrice(product.price)}</div>
                                <div class="product-colors">
                                    {product.colors.map((color) => (
                                        <div class="color-circle" style={{ "background-color": color }}></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
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