import { createSignal, onMount, For, Show, createEffect } from "solid-js";
import { useParams, useNavigate, useSearchParams } from "@solidjs/router";
import star from '../img/Star.svg';
import logo from '../img/logo.png';
import logowhite from '../img/logowhite.png';
import translate from '../img/Translate.svg';
import cartIcon from '../img/Tote.svg';
import accountIcon from '../img/UserCircle (2).svg';
import heart from '../img/Heart.svg';
import heartfull from '../img/Heart (1).svg';
import befooter from '../img/befooter.png';
import "./productpagedetail.css";

interface ProductDetail {
    id: number;
    name: string;
    category: string;
    price: string;
    default_image: string;
    description: string;
    rating: number;
    sold: number;
    colors: {
        color: string;
        color_code: string;
        image: string;
    }[];
    liked?: boolean;
    likes_count?: number;
}

const ProductPageDetail = () => {
    const params = useParams();
    const [searchParams] = useSearchParams();
    const userId = searchParams.user_id;
    const navigate = useNavigate();
    const productId = parseInt(params.id);
    createEffect(() => {
        // Update main image when color selection changes
        if (product()) {
            setMainImage(product()!.colors[selectedColorIndex()].image);
        }
    });
    const [product, setProduct] = createSignal<ProductDetail | null>(null);
    const [loading, setLoading] = createSignal(true);
    const [error, setError] = createSignal<string | null>(null);
    const [selectedColorIndex, setSelectedColorIndex] = createSignal(0);
    const [quantity, setQuantity] = createSignal(1);
    const [isLoading, setIsLoading] = createSignal(false);
    const [profileImage, setProfileImage] = createSignal<string | null>(null);

    const handleQuantityChange = (increment: boolean) => {
        if (increment) {
            setQuantity(quantity() + 1);
        } else if (quantity() > 1) {
            setQuantity(quantity() - 1);
        }
    };

    const fetchProductDetail = async () => {
        try {
            setLoading(true);
            setError(null);

            const url = userId
                ? `http://127.0.0.1:8080/api/products/${productId}?user_id=${userId}`
                : `http://127.0.0.1:8080/api/products/${productId}`;

            const response = await fetch(url);
            if (!response.ok) throw new Error(`Product error: ${response.status}`);

            const productData = await response.json();

            if (!productData.product) {
                throw new Error("Product data not found in response");
            }
            const defaultImage = productData.product.default_image?.includes('http')
                ? productData.product.default_image
                : `http://127.0.0.1:8080/uploads/products/${productData.product.default_image}`;

            setMainImage(defaultImage);

            // Cari index warna yang sesuai dengan default_image
            let defaultColorIndex = 0;
            if (productData.colors && productData.colors.length > 0) {
                const defaultImageName = productData.product.default_image?.split('/').pop();
                defaultColorIndex = productData.colors.findIndex(
                    (color: any) => color.image.includes(defaultImageName)
                        ?? 0);
            }

            const productDetail: ProductDetail = {
                id: productData.product.id,
                name: productData.product.name,
                category: productData.product.category,
                price: productData.product.price,
                default_image: productData.product.default_image?.includes('http')
                    ? productData.product.default_image
                    : `http://127.0.0.1:8080/uploads/products/${productData.product.default_image}`,
                description: productData.product.description || "No description available",
                rating: parseFloat(productData.product.rating) || 0,
                sold: productData.product.sold || 0,
                colors: productData.colors.map((color: any) => ({
                    color: color.color,
                    color_code: getColorCode(color.color),
                    image: color.image?.includes('http')
                        ? color.image
                        : `http://127.0.0.1:8080/uploads/products/${color.image}`
                })),
                liked: productData.product.liked || false, // Gunakan nilai dari backend
                likes_count: productData.product.likes_count || 0
            };

            setProduct(productDetail);
            setSelectedColorIndex(defaultColorIndex); // Set index warna default
        } catch (err) {
            setError(err.message);
            console.error('Error fetching product details:', err);
        } finally {
            setLoading(false);
        }
    };

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

    const getColorCode = (colorName: string) => {
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
            lightgrey: '#CC7633',
            ashgrey: '#CC7633',
            blacky: '#222427',
            denim: '#7F90A1',
            grey: 'rgba(100, 89, 87, 1)',

            // Gradient colors
            gradient1: 'linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(221, 176, 104, 1))',
            gradient2: 'linear-gradient(to bottom, rgba(123, 110, 106, 1), rgba(221, 176, 104, 1))',
            gradient3: 'linear-gradient(to bottom, rgba(190, 128, 114, 1), rgba(221, 176, 104, 1))',
            gradient4: 'linear-gradient(to bottom, rgba(233, 217, 197, 1), rgba(221, 176, 104, 1))',

            // Special glasses gradients
            glasses1: 'radial-gradient(circle, hsla(220, 15%, 24%, 1) 30%, hsla(53, 4%, 82%, 1) 100%)',
            glasses2: 'radial-gradient(circle, #717A71 30%, #CDC6AA 100%)',
            glasses3: 'radial-gradient(circle, #FFD16E 15%, #2B1F1A 70%)',
        };

        return colorMap[colorName.toLowerCase()] || '#CCCCCC';
    };

    const toggleLike = async () => {
        if (!userId) {
            navigate("/account");
            return;
        }

        setIsLoading(true);
        try {
            const response = await fetch("http://127.0.0.1:8080/api/products/like", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_id: userId,
                    product_id: productId,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setProduct(prev => prev ? {
                    ...prev,
                    liked: data.is_liked,
                    likes_count: data.likes_count
                } : null);
            }
        } catch (error) {
            console.error("Error toggling like:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const navigateWithUserId = (path: string) => {
        if (userId) {
            navigate(`${path}?user_id=${userId}`);
        } else {
            navigate(path);
        }
    };

    const addToCart = async () => {
        if (!userId) {
            navigate("/account");
            return;
        }

        const currentProduct = product();
        if (!currentProduct) return;

        try {
            const response = await fetch(`http://127.0.0.1:8080/user/${userId}/cart`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    product_id: currentProduct.id,
                    color: currentProduct.colors[selectedColorIndex()].color,
                    color_code: currentProduct.colors[selectedColorIndex()].color_code,
                    quantity: quantity(),
                }),
            });

            if (response.ok) {
                alert("Product added to cart successfully!");
            } else {
                throw new Error("Failed to add to cart");
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            alert("Failed to add to cart");
        }
    };

    const [favoriteCount, setFavoriteCount] = createSignal(0);
    const fetchFavoriteCount = async () => {
        if (!userId) return;

        try {
            const response = await fetch(`http://127.0.0.1:8080/user/${userId}/likes`);
            if (response.ok) {
                const data = await response.json();
                setFavoriteCount(data.count || 0);
            }
        } catch (error) {
            console.error('Error fetching favorite count:', error);
        }
    };
    onMount(() => {
        fetchProductDetail();
        if (userId) {
            fetchUserProfile();
            fetchFavoriteCount();

            // Tambahkan fetch untuk cek apakah produk ini sudah dilike user
            fetch(`http://127.0.0.1:8080/user/${userId}/likes`)
                .then(res => res.json())
                .then(likedProducts => {
                    const isLiked = likedProducts.some((p: any) => p.id === productId);
                    setProduct(prev => prev ? { ...prev, liked: isLiked } : null);
                })
                .catch(console.error);
        }
    });
    const [onlineUsers, setOnlineUsers] = createSignal<{ id: string }[]>([]);
    const [mainImage, setMainImage] = createSignal<string>("");

    const [clicked, setClicked] = createSignal(false);

    const goToCart = () => navigateWithUserId("/cart");
    const goToFavoritePage = () => {
        setClicked(true);
        navigate("/favorite");
    }; const goToAccount = () => navigateWithUserId("/account");
    const goToDashboard = () => navigateWithUserId("/dashboard");
    const goToProducts = () => navigateWithUserId("/products");
    const goToAboutUs = () => navigateWithUserId("/about-us");
    const goToBlog = () => navigateWithUserId("/blogpage");
    return (
        <div class="product-page">
            {/* Header */}
            <header>
                <div class="logo">
                    <img src={logo} alt="Logo" />
                </div>
                <nav class="navbar">
                    <ul>
                        <li><a onClick={goToDashboard}>Home</a></li>
                        <li><a onClick={goToProducts} class="active">Products</a></li>
                        <li><a onClick={goToAboutUs}>About Us</a></li>
                        <li><a onClick={goToBlog}>Blog</a></li>
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
                    <div class="dash-account-btn" onClick={goToAccount}>
                        <img
                            src={profileImage() || accountIcon}
                            alt="Account"
                            style={{
                                width: '32px',
                                height: '32px',
                                "border-radius": '50%',
                                "object-fit": 'cover',
                                "border": '2px solid ' + (onlineUsers().some(u => u.id === userId) ? '#4CAF50' : '#ccc')
                            }}
                        />
                        {onlineUsers().some(u => u.id === userId) && (
                            <div class="online-status-dot"></div>
                        )}
                    </div>
                </div>
            </header >

            {/* Product Details Section */}
            <Show when={!error() && product()} fallback={<div class="error">Error: {error() || "Product not found"}</div>}>
                <section class="product-detail">
                    <div class="product-images">
                        <div class="main-image-detail">
                            <img
                                src={mainImage() || product()!.default_image}
                                alt={product()!.name}
                                onError={(e) => {
                                    e.currentTarget.src = '/fallback-image.jpg';
                                    e.currentTarget.onerror = null;
                                }}
                            />
                        </div>
                        <div class="thumbnail-images">
                            <For each={product()!.colors}>
                                {(color, index) => (
                                    <div
                                        class={`thumbnail ${index() === selectedColorIndex() ? 'active' : ''}`}
                                        onClick={() => {
                                            setSelectedColorIndex(index());
                                            setMainImage(color.image);
                                        }}
                                    >
                                        <img
                                            src={color.image}
                                            alt={`${product()!.name} color ${color.color}`}
                                            onError={(e) => {
                                                e.currentTarget.src = product()!.default_image || '/fallback-image.jpg';
                                                e.currentTarget.onerror = null;
                                            }}
                                        />
                                    </div>
                                )}
                            </For>
                        </div>
                    </div>

                    <div class="product-info">
                        <div class="category">{product()!.category}</div>
                        <h1 class="product-name">{product()!.name}</h1>

                        <div class="rating">
                            <img src={star} alt="Star" class="star-icon" />
                            <span class="stars">
                                {"⭐".repeat(Math.floor(product()!.rating))}
                            </span>
                            <span class="rating-value">{product()!.rating.toFixed(1)}</span>
                            <span class="sold">{product()!.sold} sold</span>

                            <div
                                class="heart-icon"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    toggleLike();
                                }}
                                classList={{ 'loading': isLoading() }}
                            >
                                <img src={product()!.liked ? heartfull : heart} alt="Like" />
                                {(product()!.likes_count ?? 0) > 0 && (
                                    <span class="like-count">{product()!.likes_count}</span>
                                )}
                            </div>
                        </div>
                        <div class="price-detail">{product()!.price}</div>

                        <div class="description">
                            <h2>Description</h2>
                            <p>{product()!.description}</p>
                        </div>

                        <div class="color-selection">
                            <h2>Color</h2>
                            <div class="color-options-detail">
                                <For each={product()!.colors}>
                                    {(color, index) => (
                                        <div
                                            class={`color ${index() === selectedColorIndex() ? 'selected' : ''}`}
                                            style={{ background: color.color_code }}
                                            onClick={() => setSelectedColorIndex(index())}
                                            title={color.color} // Add tooltip with color name
                                        />
                                    )}
                                </For>
                            </div>
                        </div>

                        <div class="quantity-section">
                            <h2>Quantity</h2>
                            <div class="quantity-selector">
                                <button
                                    class="quantity-btn"
                                    onClick={() => handleQuantityChange(false)}
                                >
                                    −
                                </button>
                                <input
                                    type="number"
                                    min="1"
                                    value={quantity()}
                                    onInput={(e) => setQuantity(Math.max(1, parseInt(e.currentTarget.value) || 1))}
                                />
                                <button
                                    class="quantity-btn"
                                    onClick={() => handleQuantityChange(true)}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <div class="action-buttons">
                            <button class="buy-now">Buy Now</button>
                            <button class="add-to-cart" onClick={addToCart}>Add to Cart</button>
                        </div>
                    </div>
                </section>
            </Show>


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
                            <li><a onClick={goToDashboard}>Home</a></li>
                            <li><a onClick={goToProducts}>Product</a></li>
                            <li><a onClick={goToAboutUs}>About Us</a></li>
                            <li><a onClick={goToBlog}>Blog</a></li>
                        </ul>
                    </div>
                    <div class="link-column">
                        <h4>About Us</h4>
                        <ul>
                            <li><a onClick={goToAboutUs}>Company</a></li>
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

export default ProductPageDetail;