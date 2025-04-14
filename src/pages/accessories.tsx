import { createSignal, createEffect, Show, onMount } from "solid-js";
import { useNavigate, useSearchParams } from "@solidjs/router";
import logo from '../img/logo.png';
import logowhite from '../img/logowhite.png';
import translate from '../img/Translate.svg';
import heart from '../img/Heart.svg';
import heartfull from '../img/Heart (1).svg';
import befooter from '../img/befooter.png';
import cartIcon from '../img/Tote.svg';
import accountIcon from '../img/UserCircle (2).svg';
import './accessories.css';

interface ProductColor {
    color: string;
    color_name?: string;
    color_code?: string;
    image: string;
}

interface Product {
    id: number;
    name: string;
    category: string;
    price: string;
    default_image: string;
    current_image: string;
    colors: ProductColor[];
    liked: boolean;
    likes_count: number;
}
const Accessories = () => {
    const toggleLike = (index) => {
        const updatedProducts = products().map((product, i) => {
            if (i === index) {
                return { ...product, liked: !product.liked };
            }
            return product;
        });
        setProducts(updatedProducts);
    };
    const [products, setProducts] = createSignal<Product[]>([]);

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [currentUserId, setCurrentUserId] = createSignal<string | null>(null);
    const userId = searchParams.user_id;
    const [searchQuery, setSearchQuery] = createSignal("");
    const [showAuthPopup, setShowAuthPopup] = createSignal(false);
    const [onlineUsers, setOnlineUsers] = createSignal([]);
    const [profileImage, setProfileImage] = createSignal<string | null>(null);

    const [favoriteCount, setFavoriteCount] = createSignal(0);
    const [clicked, setClicked] = createSignal(false);
    const goToFavoritePage = () => {
        setClicked(true);
        navigateWithUserId("/favorite");
    };

    const formatImageUrl = (imagePath: string) => {
        if (!imagePath) return '/fallback-image.jpg';
        return imagePath.includes('http')
            ? imagePath
            : `http://127.0.0.1:8080/uploads/products/${imagePath}`;
    };
    onMount(async () => {
        const activeUserId = currentUserId() || userId || null;
        if (activeUserId) {
            setCurrentUserId(activeUserId);
            const userResponse = await fetch(`http://127.0.0.1:8080/user/${activeUserId}`);
            if (userResponse.ok) {
                const userData = await userResponse.json();
                setProfileImage(userData.img ? `http://127.0.0.1:8080/uploads/${userData.img}` : null);
            }   
        }
        await fetchProducts();
    });
    const fetchProducts = async () => {
        try {
            setIsLoading(true);
            const activeUserId = currentUserId() || userId;

            const [productsRes, colorsRes, likesRes] = await Promise.all([
                fetch('http://127.0.0.1:8080/api/products'),
                fetch('http://127.0.0.1:8080/api/product-colors'),
                activeUserId
                    ? fetch(`http://127.0.0.1:8080/user/${activeUserId}/likes`)
                    : Promise.resolve(null)
            ]);

            if (!productsRes.ok || !colorsRes.ok) {
                throw new Error('Failed to fetch products or colors');
            }

            const productsData = await productsRes.json();
            const colorsData = await colorsRes.json();
            const likedProducts = likesRes ? await likesRes.json() : [];

            const formattedProducts = productsData
                .filter(product => product.category === 'Accessories') // Only get Bags category
                .map(product => {
                    const productColors = colorsData.filter(color => color.product_id === product.id);
                    const isLiked = likedProducts.some(liked => liked.id === product.id);

                    return {
                        id: product.id,
                        name: product.name,
                        category: product.category,
                        price: product.price,
                        default_image: formatImageUrl(product.default_image),
                        current_image: formatImageUrl(product.default_image),
                        colors: productColors.length > 0
                            ? productColors.map(color => ({
                                color: color.color_name || color.color,
                                color_code: getColorCode(color.color_name || color.color),
                                image: formatImageUrl(color.image)
                            }))
                            : [{
                                color: 'default',
                                color_code: '#CCCCCC',
                                image: formatImageUrl(product.default_image)
                            }],
                        liked: isLiked,
                        likes_count: product.likes_count || 0
                    };
                });

            setProducts(formattedProducts);
        } catch (err) {
            console.error('Error fetching products:', err);
        } finally {
            setIsLoading(false);
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
    // Fungsi untuk menyorot huruf yang cocok
    const highlightText = (text, query) => {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, "gi");
        return text.replace(regex, "<span class='highlight'>$1</span>");
    };

    createEffect(() => {
        const query = searchQuery().toLowerCase();
        if (query) {
            const matchedProduct = products().find(product =>
                product.name.toLowerCase().includes(query)
            );
            if (matchedProduct) {
                // Gunakan setTimeout untuk memastikan DOM sudah di-render
                setTimeout(() => {
                    const productElement = document.getElementById(matchedProduct.name);
                    if (productElement) {
                        // Scroll ke produk dengan animasi smooth
                        productElement.scrollIntoView({ behavior: "smooth", block: "center" });

                        // Tambahkan class highlight sementara
                        productElement.classList.add("highlight-product");
                        setTimeout(() => {
                            productElement.classList.remove("highlight-product");
                        }, 1000); // Hapus highlight setelah 1 detik
                    }
                }, 0);
            }
        }
    });

    const filteredProducts = () => {
        const query = searchQuery().toLowerCase();
        if (!query) return products();
        return products().filter(product =>
            product.name.toLowerCase().includes(query)
        );
    };

    const setMainImage = (index, image) => {
        const updatedProducts = products().map((product, i) => {
            if (i === index) {
                return { ...product, image };
            }
            return product;
        });
        setProducts(updatedProducts);
    };

    const goToCart = () => navigateWithUserId("/cart");
    const goToAccount = () => navigateWithUserId("/account");
    const [isLoading, setIsLoading] = createSignal(false);
    // const [searchQuery, setSearchQuery] = createSignal("");
    const goToProductDetail = (productId: number) => {
        if (userId) {
            navigate(`/products/detail/${productId}?user_id=${userId}`);
        } else {
            navigate(`/products/detail/${productId}`);
        }
        // Scroll ke atas halaman
        window.scrollTo(0, 0);
    };
    //   const [searchParams] = useSearchParams();
    //   const userId = searchParams.user_id;
    //   const [clicked, setClicked] = createSignal(false);

    const getColorCode = (colorName) => {
        const colorMap = {
            // Basic colors
            red: '#8A191F',
            mint: '#A1BEAB',
            pink: '#E0A091',
            green: '#00FF00',
            black: '#000000',
            white: '#FFFFFF',
            blue: '#2196F3',
            orange: '#CC7633',
            navy: '#1F2A39',
            cream: '#FFFDD0',

            // Specific product colors
            glasses: '#D8CDBD',
            belt2: '#493635',
            belt3: '#302E2F',
            clothes1: '#D2CFC5',
            clothes2: '#A79686',
            clothes3: '#C1997D',
            beige3: '#F5ECE1',
            grey2: '#B8ABA3',
            denim2: '#798999',
            blackfaux: '#2C2430',
            domgrey: '#413F41',
            blackgrey: '#212129',
            brown: '#704324',
            brown2: '#8C6446',
            brownlight: '#A88B63',
            beige2: '#DDD1B2',
            pinkmuda: '#E4BABB',
            beige: '#E5D2B2',
            ijo: '#594D0F',
            lightgrey: '#CC7633', // Note: Same as orange
            ashgrey: '#CC7633',  // Note: Same as orange
            blacky: '#222427',
            denim: '#7F90A1',
            grey: 'rgba(100, 89, 87, 1)',

            // Gradient colors (returning first color as fallback)
            gradient1: 'linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(221, 176, 104, 1))',
            gradient2: 'linear-gradient(to bottom, rgba(123, 110, 106, 1), rgba(221, 176, 104, 1))',
            gradient3: 'linear-gradient(to bottom, rgba(190, 128, 114, 1), rgba(221, 176, 104, 1))',
            gradient4: 'linear-gradient(to bottom, rgba(233, 217, 197, 1), rgba(221, 176, 104, 1))',


            // Special glasses gradients (returning first color as fallback)
            glasses1: 'radial-gradient(circle, hsla(220, 15%, 24%, 1) 30%, hsla(53, 4%, 82%, 1) 100%)',
            glasses2: 'radial-gradient(circle, #717A71 30%, #CDC6AA 100%)',
            glasses3: 'radial-gradient(circle, #FFD16E 15%, #2B1F1A 70%)',
        };

        return colorMap[colorName.toLowerCase()] || '#CCCCCC';
    };
    return (
        <div class="landing-page">
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
                    <div class="favorites-indicator" onClick={goToFavoritePage}>
                        <img
                            src={heart}
                            alt="Favorites"
                            class="favorites-icon"
                        />
                        <Show when={favoriteCount() > 0}>
                            <span class="favorites-badge">{favoriteCount()}</span>
                        </Show>
                    </div>
                    <button class="dash-cart-btn" onClick={goToCart}>
                        <img src={cartIcon} alt="Cart" />
                    </button>
                    <div class="dash-account-btn" onClick={goToAccount}>
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
                        {onlineUsers().some(u => u.id === userId) && (
                            <div class="online-status-dot"></div>
                        )}
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section class="heroproduct">
                <div class="hero-content-product">
                    <div class="overlay-lines"></div>
                    <h1>Discover Your Signature Style</h1>
                    <p>Find the perfect bags and outfits that complement your personality.</p>
                    <button class="shpnow">Shop Now</button>
                </div>
                <div class="productpage">
                    <span>Handpicked Styles Premium Quality Trend-Forward Fashion Elevate Your Wardrobe Today</span>
                    <span>Handpicked Styles Premium Quality Trend-Forward Fashion Elevate Your Wardrobe Today</span>
                    <span>Handpicked Styles Premium Quality Trend-Forward Fashion Elevate Your Wardrobe Today</span>
                    <span>Handpicked Styles Premium Quality Trend-Forward Fashion Elevate Your Wardrobe Today</span>
                    <span>Handpicked Styles Premium Quality Trend-Forward Fashion Elevate Your Wardrobe Today</span>
                </div>
            </section>

            {/* Fresh Drops Section */}
            <section class="product">
                <div class="section-header">
                    <h2>Accessories</h2>
                    <div class="search-container">
                        <input
                            type="text"
                            class="search-box"
                            placeholder="Type something here"
                            value={searchQuery()}
                            onInput={(e) => setSearchQuery(e.target.value)}
                        />
                        <button class="search-button">Search</button>
                    </div>
                </div>

                <div class="products-grid3">
                    {products().filter(p => !searchQuery() ||
                        p.name.toLowerCase().includes(searchQuery().toLowerCase())).map((product, index) => (
                            <div
                                id={`product-${product.id}`}
                                class={`pro-card`}
                                key={product.id}
                                onClick={() => goToProductDetail(product.id)}
                                onMouseLeave={() => setMainImage(product.id, null)}
                            >
                                <div class="product-img">
                                    <img
                                        src={product.current_image} // Tidak perlu fallback karena sudah di-handle di setMainImage
                                        alt={product.name}
                                        onError={(e) => {
                                            e.currentTarget.src = '/fallback-image.jpg';
                                            e.currentTarget.onerror = null;
                                        }}
                                    />
                                </div>
                                <span
                                    class="favorite-button"
                                    onClick={(e) => toggleLike(product.id, index, e)}
                                    classList={{ 'loading': isLoading() }}
                                >
                                    <img
                                        src={product.liked ? heartfull : heart}
                                        alt={product.liked ? "Unlike" : "Like"}
                                    />
                                </span>
                                <p class="section-product">{product.category}</p>
                                <h3 innerHTML={product.name}></h3>
                                <p class="price">{product.price}</p>
                                <div class="color-optionss">
                                    {product.colors.map((color) => (
                                        <span
                                            class="color"
                                            style={{
                                                background: color.color_code || getColorCode(color.color),
                                            }}
                                            onMouseEnter={() => setMainImage(product.id, color.image)}
                                            onMouseLeave={() => setMainImage(product.id, null)} // Pastikan ini di-set ke null
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                </div>
            </section>

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

export default Accessories;