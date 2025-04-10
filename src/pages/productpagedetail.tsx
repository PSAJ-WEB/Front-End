import { createSignal, onMount, For } from "solid-js";
import { useParams, useNavigate, useSearchParams } from "@solidjs/router";
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

    const [product, setProduct] = createSignal<ProductDetail | null>(null);
    const [loading, setLoading] = createSignal(true);
    const [error, setError] = createSignal<string | null>(null);
    const [selectedColorIndex, setSelectedColorIndex] = createSignal(0);
    const [quantity, setQuantity] = createSignal(1);
    const [isLoading, setIsLoading] = createSignal(false);

    const handleQuantityChange = (increment) => {
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

            const [productRes, colorsRes, likesRes] = await Promise.all([
                fetch(`http://127.0.0.1:8080/api/products/${productId}`),
                fetch(`http://127.0.0.1:8080/api/product-colors?product_id=${productId}`),
                userId ? fetch(`http://127.0.0.1:8080/user/${userId}/likes`) : Promise.resolve(null)
            ]);

            if (!productRes.ok) throw new Error(`Product error: ${productRes.status}`);
            if (!colorsRes.ok) throw new Error(`Colors error: ${colorsRes.status}`);

            const productData = await productRes.json();
            const colorsData = await colorsRes.json();

            const productDetail: ProductDetail = {
                id: productData.id,
                name: productData.name,
                category: productData.category,
                price: productData.price,
                default_image: productData.default_image?.includes('http')
                    ? productData.default_image
                    : `http://127.0.0.1:8080/uploads/products/${productData.default_image}`,
                description: productData.description || "No description available",
                rating: productData.rating || 5.0,
                sold: productData.sold || 0,
                colors: colorsData.map((color: any) => ({
                    color: color.color,
                    color_code: getColorCode(color.color),
                    image: color.image?.includes('http')
                        ? color.image
                        : `http://127.0.0.1:8080/uploads/products/${color.image}`
                })),
                liked: false,
                likes_count: productData.likes_count || 0
            };

            if (userId && likesRes?.ok) {
                const likedProducts = await likesRes.json();
                productDetail.liked = likedProducts.some((lp: any) => lp.id === productId);
            }

            setProduct(productDetail);
        } catch (err) {
            setError(err.message);
            console.error('Error fetching product details:', err);
        } finally {
            setLoading(false);
        }
    };

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

    onMount(() => {
        fetchProductDetail();
    });

    if (loading()) {
        return <div class="loading">Loading...</div>;
    }

    if (error()) {
        return <div class="error">Error: {error()}</div>;
    }

    if (!product()) {
        return <div class="not-found">Product not found</div>;
    }

    const currentProduct = product()!;

    return (
        <div class="product-page">
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
                    <button class="dash-cart-btn" onClick={() => navigateWithUserId("/cart")}>
                        <img src={cartIcon} alt="Cart" />
                    </button>
                    <button class="dash-account-btn" onClick={() => navigateWithUserId("/account")}>
                        <img src={accountIcon} alt="Account" />
                    </button>
                </div>
            </header>

            {/* Product Details Section */}

            {/* Product Details Section */}
            <section class="product-detail">
                <div class="product-images">
                    <div class="main-image-detail">
                        <img
                            src={currentProduct.colors[selectedColorIndex()].image}
                            alt={currentProduct.name}
                            onError={(e) => {
                                e.currentTarget.src = '/fallback-image.jpg';
                                e.currentTarget.onerror = null;
                            }}
                        />
                    </div>
                    <div class="thumbnail-image">
                        <For each={currentProduct.colors}>
                            {(color, index) => (
                                <div
                                    class={`thumbnails ${index() === selectedColorIndex() ? 'active' : ''}`}
                                    onClick={() => setSelectedColorIndex(index())}
                                >
                                    <img
                                        src={color.image}
                                        alt={`${currentProduct.name} color ${color.color}`}
                                        onError={(e) => {
                                            e.currentTarget.src = '/fallback-image.jpg';
                                            e.currentTarget.onerror = null;
                                        }}
                                    />
                                </div>
                            )}
                        </For>
                    </div>
                </div>

                <div class="product-info">
                    <div class="category">{currentProduct.category}</div>
                    <h1 class="product-name">{currentProduct.name}</h1>

                    <div class="rating">
                        <span class="stars">
                            {"⭐".repeat(Math.floor(currentProduct.rating))}
                        </span>
                        <span class="rating-value">{currentProduct.rating.toFixed(1)}</span>
                        <span class="sold">{currentProduct.sold} sold</span>
                    </div>

                    <div class="price-detail">{currentProduct.price}</div>

                    <div class="description">
                        <h2>Description</h2>
                        <p>{currentProduct.description}</p>
                    </div>

                    <div class="color-selection">
                        <h2>Color</h2>
                        <div class="color-options-detail">
                            <For each={currentProduct.colors}>
                                {(color, index) => (
                                    <div
                                        class={`color ${index() === selectedColorIndex() ? 'selected' : ''}`}
                                        style={{ background: color.color_code }}
                                        onClick={() => setSelectedColorIndex(index())}
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
                        <button class="add-to-cart">Add to Cart</button>
                    </div>

                    <div
                        class="heart-icon"
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleLike();
                        }}
                        classList={{ 'loading': isLoading() }}
                    >
                        <img src={currentProduct.liked ? heartfull : heart} alt="Like" />
                        {(currentProduct.likes_count ?? 0) > 0 && (
                            <span class="like-count">{currentProduct.likes_count}</span>
                        )}
                    </div>
                </div>
            </section>
            <img src={befooter} alt="Banner" class="full-width-image" />

            {/* Footer */}
            <footer>
                {/* ... (kode footer) ... */}
            </footer>
        </div>
    );
};

export default ProductPageDetail;