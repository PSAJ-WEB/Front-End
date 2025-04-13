import { createSignal, onMount, createEffect, Show } from "solid-js";
import { useNavigate, useSearchParams } from "@solidjs/router";
import "./FavoritePage.css";
import befooter from '../img/befooter.png';
import cartIcon from '../img/Tote.svg';
import heartfull from '../img/Heart (1).svg';
import accountIcon from '../img/UserCircle (2).svg';
import logo from '../img/logo.png';
import logowhite from '../img/logowhite.png';
import translate from '../img/Translate.svg';

interface Product {
    id: number;
    name: string;
    category: string;
    price: string;
    default_image: string | null;
    liked: boolean;
}

export default function FavoritesPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [favoriteProducts, setFavoriteProducts] = createSignal<Product[]>([]);
    const [loading, setLoading] = createSignal(true);
    const [error, setError] = createSignal("");
    const [userId, setUserId] = createSignal<string | null>(null);
    const [searchQuery, setSearchQuery] = createSignal("");
    const [profileImage, setProfileImage] = createSignal<string | null>(null);
    const [scrollToId, setScrollToId] = createSignal<number | null>(null);
    const [totalFavorites, setTotalFavorites] = createSignal(0);

    // Format image URL
    const formatImageUrl = (imagePath: string | null) => {
        if (!imagePath) return '/fallback-image.jpg';
        return imagePath.includes('http')
            ? imagePath
            : `http://127.0.0.1:8080/uploads/products/${imagePath}`;
    };

    // Highlight search matches in product names
    const highlightSearchMatch = (name: string) => {
        if (!searchQuery()) return name;
        const regex = new RegExp(`(${searchQuery()})`, 'gi');
        return name.replace(regex, '<span class="highlight">$1</span>');
    };

    // Fetch user profile image
    const fetchUserProfile = async (userId: string) => {
        try {
            const response = await fetch(`http://127.0.0.1:8080/user/${userId}`);
            if (response.ok) {
                const userData = await response.json();
                setProfileImage(userData.img ? `http://127.0.0.1:8080/uploads/${userData.img}` : null);
            }
        } catch (err) {
            console.error("Error fetching user profile:", err);
        }
    };

    // Fetch favorite products
    const fetchFavoriteProducts = async (search = "") => {
        const currentUserId = userId();
        if (!currentUserId) {
            setError("User ID tidak valid");
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError("");

            const url = `http://127.0.0.1:8080/user/${currentUserId}/likes${search ? `?search=${encodeURIComponent(search)}` : ''}`;

            const response = await fetch(url, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                }
            });

            if (!response.ok) {
                throw new Error(`Gagal memuat favorit: ${response.status}`);
            }

            const data = await response.json();
            setFavoriteProducts(data);
            if (!search) {
                setTotalFavorites(data.length);
            }
            setFavoriteCount(data.length);

            // If search query exists, scroll to first match
            if (search && data.length > 0) {
                setScrollToId(data[0].id);
            }
        } catch (err) {
            setError(err.message);
            console.error("Error:", err);
        } finally {
            setLoading(false);
        }
    };

    // Toggle like/unlike product
    const toggleFavorite = async (productId: number) => {
        try {
            const response = await fetch("http://127.0.0.1:8080/api/products/like", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_id: userId(),
                    product_id: productId
                }),
            });

            if (!response.ok) throw new Error("Gagal update favorit");

            await fetchFavoriteProducts(searchQuery());
        } catch (err) {
            console.error("Error:", err);
            setError("Gagal mengupdate favorit");
        }
    };

    
    // Handle search with debounce
    let searchTimeout: number;
    const handleSearch = (query: string) => {
        setSearchQuery(query);

        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        searchTimeout = setTimeout(() => {
            fetchFavoriteProducts(query);
        }, 300);
    };

    // Navigate with user_id
    const navigateWithUserId = (path: string) => {
        const id = userId();
        if (id) {
            navigate(`${path}?user_id=${id}`);
        } else {
            navigate(path);
        }
    };

    const goToCart = () => navigateWithUserId("/cart");
    const goToAccount = () => navigateWithUserId("/account");
    const goToProduct = (productId: number) => navigateWithUserId(`/products/${productId}`);
    const goToHome = () => navigateWithUserId("/");

    // Initialize on mount
    onMount(() => {
        const id = searchParams.user_id;
        if (id) {
            setUserId(id);
            fetchUserProfile(id);
            fetchFavoriteProducts().then(() => {
                // Setelah load awal, kita sudah punya totalFavorites
            });
        } else {
            setError("User ID tidak ditemukan");
            setLoading(false);
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
    // Scroll to product when scrollToId changes
    createEffect(() => {
        const id = scrollToId();
        if (id) {
            const element = document.getElementById(`product-${id}`);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest"
                    });
                }, 100);
            }
        }
    });
    const goToFavorites = () => navigateWithUserId("/favorites");

    const [favoriteCount, setFavoriteCount] = createSignal(0);
    return (
        <div class="favorites-container">
            {/* Header */}
            <header>
                <div class="logo">
                    <img src={logo} alt="Logo" />
                </div>
                <nav class="navbar">
                    <ul>
                        <li><a onClick={() => navigateWithUserId("/dashboard")}>Home</a></li>
                        <li><a onClick={() => navigateWithUserId("/products")}>Products</a></li>
                        <li><a onClick={() => navigateWithUserId("/about-us")}>About Us</a></li>
                        <li><a onClick={() => navigateWithUserId("/blogpage")}>Blog</a></li>
                    </ul>
                </nav>
                <div class="dash-auth-buttons">
                    <div class="favorites-indicator" onClick={goToFavorites}>
                        <img
                            src={heartfull}
                            alt="Favorites"
                            class="favorites-icon"
                            style={{ filter: "brightness(0) invert(0)" }}
                        />
                        <Show when={totalFavorites() > 0}>
                            <span class="favorites-badge">{totalFavorites()}</span>
                        </Show>
                    </div>
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

            <main class="favorites-main">
                <div class="favorites-header">
                    <h1 class="page-title">Favorites</h1>
                    <div class="search-container">
                        <input
                            type="text"
                            class="search-box"
                            placeholder="Type something here"
                            value={searchQuery()}
                            onInput={(e) => handleSearch(e.target.value)}
                        />
                        <button class="search-button">Search</button>
                    </div>
                </div>

                {/* Product Grid */}
                <Show when={!loading() && !error()}>
                    <div class="products-grid-fav">
                        <Show
                            when={favoriteProducts().length > 0}
                            fallback={
                                <div class="status-message empty">
                                    {searchQuery()
                                        ? "No matching favorites found"
                                        : "You haven't added any favorites yet"}
                                </div>
                            }
                        >
                            {favoriteProducts().map((product) => (
                                <div
                                    class="product-card-fav"
                                    id={`product-${product.id}`}
                                    onClick={() => goToProduct(product.id)}
                                >
                                    <div class="product-image-fav">
                                        <img
                                            src={formatImageUrl(product.default_image)}
                                            alt={product.name}
                                            onError={(e) => {
                                                e.currentTarget.src = '/fallback-image.jpg';
                                                e.currentTarget.onerror = null;
                                            }}
                                        />
                                    </div>
                                    <div class="product-info-fav">
                                        <div class="product-category-fav">{product.category}</div>
                                        <div
                                            class="product-name-fav"
                                            innerHTML={highlightSearchMatch(product.name)}
                                        />
                                        <div class="product-price-fav">{product.price}</div>
                                    </div>
                                    <button
                                        class="favorite-button active"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleFavorite(product.id);
                                        }}
                                        aria-label="Remove from favorites"
                                    >
                                        <img
                                            src={heartfull}
                                            alt="Remove from favorites"
                                            style={{
                                                width: "20px",
                                                height: "20px",
                                                "object-fit": "contain"
                                            }}
                                        />
                                    </button>
                                </div>
                            ))}
                        </Show>
                    </div>
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
                            <li><a onClick={goToHome}>Home</a></li>
                            <li><a onClick={() => navigateWithUserId("/products")}>Product</a></li>
                            <li><a onClick={() => navigateWithUserId("/about-us")}>About Us</a></li>
                            <li><a onClick={() => navigateWithUserId("/blogpage")}>Blog</a></li>
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