import { createSignal, createEffect, onMount, onCleanup } from "solid-js";
import AuthPopup from "../pages/authpopup";
import { useSearchParams } from '@solidjs/router';
import { useNavigate } from "@solidjs/router";
import logo from '../img/logo.png';
import logowhite from '../img/logowhite.png';
import translate from '../img/Translate.svg';
import trendy from '../img/Infinity.svg';
import totebag from '../img/Tote.svg';
import truck from '../img/Truck.svg';
import returns from '../img/ArrowsClockwise.svg'
import line from '../img/Union.png';
import cartIcon from '../img/Tote.svg';
import accountIcon from '../img/UserCircle (2).svg'
import styleinmotion from '../img/styleinmotion.png';
import fashiontips from '../img/fashiontips.png';
import mixnmatch from '../img/mixnmatch.png';
import behindthedesign from '../img/behindthedesign.png';
import befooter from '../img/befooter.png';
import cover1 from '../img/cover1.png';
import cover2 from '../img/cover2.png';
import cover3 from '../img/cover3.png';
import cover4 from '../img/cover4.png';
import video1 from '../img/1.mp4';
import video2 from '../img/2.mp4';
import video3 from '../img/3.mp4';
import video4 from '../img/4.mp4';
import heart from '../img/Heart.svg';
import heartfull from '../img/Heart (1).svg';
import './dashboard.css';

interface ProductColor {
    color: string;
    color_name?: string;
    color_code?: string;
    image: string;
}

// interface Product {
//     id: number;
//     name: string;
//     category: string;
//     price: string;
//     default_image: string;
//     current_image: string;
//     colors: ProductColor[];
//     liked: boolean;
// }

const Dashboard = () => {
    const [searchParams] = useSearchParams();
    const [currentUserId, setCurrentUserId] = createSignal<string | null>(null);
    const userId = searchParams.user_id;
    const [showAuthPopup, setShowAuthPopup] = createSignal(false);
    const [onlineUsers, setOnlineUsers] = createSignal([]);
    const [products, setProducts] = createSignal([]);
    const [isLoading, setIsLoading] = createSignal(false);
    const [profileImage, setProfileImage] = createSignal<string | null>(null);
    const [searchQuery, setSearchQuery] = createSignal("");
    const navigate = useNavigate();

    const videoData = [
        { src: video1, cover: cover1, title: "Exclusive Designs, Timeless, and Effortlessly Stylish", date: "2024-03-30" },
        { src: video2, cover: cover2, title: "Best-Selling Bags You Can't Miss!", date: "2024-01-17" },
        { src: video3, cover: cover3, title: "Theyy Wearr's Kebaya Kutu Baru Collection", date: "2024-01-12" },
        { src: video4, cover: cover4, title: "Elevate Your Look with Our Signature Bags", date: "2024-01-11" }
    ];

    const [error, setError] = createSignal<string | null>(null);

    const [loading, setLoading] = createSignal(true);

    const goToDashboard = () => navigateWithUserId("/");
    const goToCart = () => navigateWithUserId("/cart");
    const goToAccount = () => navigateWithUserId("/account");
    const goToProducts = () => navigateWithUserId("/products");
    const goToAboutUs = () => navigateWithUserId("/about-us");
    const goToBlog = () => navigateWithUserId("/blogpage");

    const formatImageUrl = (imagePath: string) => {
        if (!imagePath) return '/fallback-image.jpg';
        return imagePath.includes('http')
            ? imagePath
            : `http://127.0.0.1:8080/uploads/products/${imagePath}`;
    };
    // User activity tracking
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

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const activeUserId = currentUserId() || userId;

            // Fetch products dan colors sekaligus
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

            // Filter dan format produk
            const formattedProducts = productsData
                .filter(product => product.category === 'Bags')
                .slice(0, 3)
                .map(product => {
                    // Cari colors yang sesuai dengan product.id
                    const productColors = colorsData.filter(color => color.product_id === product.id);
                    // Cek apakah produk ini difavoritkan oleh user
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
            setError(err.message);
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    // Helper function to convert color names to hex codes
    const getColorCode = (colorName) => {
        const colorMap = {
            red: '#8A191F',
            mint: '#A1BEAB',
            pink: '#E0A091',
            black: '#000000',
            brown: '#704324',
            ijo: '#594D0F',
            beige: '#E5D2B2',
            grey: 'rgba(100, 89, 87, 1)',
            gradient1: 'linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(221, 176, 104, 1))',
            gradient2: 'linear-gradient(to bottom, rgba(123, 110, 106, 1), rgba(221, 176, 104, 1))',
            gradient3: 'linear-gradient(to bottom, rgba(190, 128, 114, 1), rgba(221, 176, 104, 1))',
            gradient4: 'linear-gradient(to bottom, rgba(233, 217, 197, 1), rgba(221, 176, 104, 1))',
            // Add other colors as needed
        };
        return colorMap[colorName.toLowerCase()] || '#CCCCCC';
    };

    // Toggle like function
    // Di dalam Dashboard component, tambahkan logika berikut:

    const toggleLike = async (productId: number) => {
        // 1. Check authentication
        const activeUserId = currentUserId() || userId;
        if (!activeUserId) {
            setShowAuthPopup(true);
            return;
        }

        try {
            setIsLoading(true);

            // 2. Make the API call without token (assuming session-based auth)
            const response = await fetch(`http://127.0.0.1:8080/api/products/like`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Cookie akan dikirim otomatis jika menggunakan session-based auth
                },
                body: JSON.stringify({
                    user_id: activeUserId,
                    product_id: productId
                }),
                credentials: 'include' // Penting untuk mengirim cookie
            });

            // 3. Handle response
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error response:', errorData);

                // Jika unauthorized, mungkin session expired
                if (response.status === 401) {
                    setShowAuthPopup(true);
                }

                throw new Error(errorData.message || 'Failed to toggle like');
            }

            const data = await response.json();
            setProducts(prevProducts =>
                prevProducts.map(product =>
                    product.id === productId
                        ? {
                            ...product,
                            liked: data.is_liked,
                            likes_count: data.likes_count,
                        }
                        : product
                )
            );
        } catch (error) {
            console.error('Error toggling like:', error);
            // Bisa tambahkan notifikasi error ke user
        } finally {
            setIsLoading(false);
        }
    };


    // Initialize component
    // Navigation functions
    const navigateWithUserId = (path: string) => {
        const id = currentUserId() || userId;
        if (id) {
            navigate(`${path}?user_id=${id}`); // Tambahkan user_id ke route
            updateUserActivity(id);
        } else {
            navigate(path);
        }
    };


    // Initialize component
    onMount(async () => {
        try {
            const activeUserId = currentUserId() || userId || null;
            if (!activeUserId) {
                console.log("No user ID available");
                await fetchProducts();
                return;
            }
            setCurrentUserId(activeUserId);

            // Load user profile
            const userResponse = await fetch(`http://127.0.0.1:8080/user/${activeUserId}?_=${Date.now()}`);
            if (userResponse.ok) {
                const userData = await userResponse.json();
                setProfileImage(userData.img ? `http://127.0.0.1:8080/uploads/${userData.img}` : null);
            }

            // Load online users
            const onlineRes = await fetch('http://127.0.0.1:8080/online-users');
            if (onlineRes.ok) {
                setOnlineUsers(await onlineRes.json());
            }

            // Update initial activity
            await updateUserActivity(activeUserId);

            // Fetch products with user context
            await fetchProducts();

            // Set up activity tracking - dipindahkan ke dalam createEffect
            createEffect(() => {
                const interval = setInterval(() => {
                    if (activeUserId) {
                        updateUserActivity(activeUserId);
                    }
                }, 60000);

                onCleanup(() => clearInterval(interval));
            });
        } catch (error) {
            console.error('Failed to initialize component:', error);
        }
    });

    const setMainImage = (productId: number, image: string | null) => {
        setProducts(prevProducts =>
            prevProducts.map(product =>
                product.id === productId
                    ? {
                        ...product,
                        current_image: image || product.default_image // Pastikan fallback ke default_image jika null
                    }
                    : product
            )
        );
    };

    // Highlight search text
    const highlightText = (text: string, query: string) => {
        if (!query) return text;
        const regex = new RegExp(`(${query})`, "gi");
        return text.replace(regex, "<span class='highlight'>$1</span>");
    };

    const goToFavoritePage = () => {
        setClicked(true);
        navigate("/favorite");
    };

    const [clicked, setClicked] = createSignal(false);

    return (
        <div class="landing-page">
            <AuthPopup
                show={showAuthPopup()}
                onClose={() => setShowAuthPopup(false)}
            />

            {/* Header */}
            <header>
                <div class="logo">
                    <img src={logo} alt="Logo" />
                </div>
                <nav class="navbar">
                    <ul>
                        <li><a onClick={goToDashboard} class="active">Home</a></li>
                        <li><a onClick={goToProducts}>Products</a></li>
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
            <section class="herolan">
                <div class="overlay-lines">
                    <img src={line} />
                    <div class="desc">
                        <h3>Accessoris</h3>
                        <h2>Lunettes De Soleil M</h2>
                        <p>112.300 IDR</p>
                    </div>
                </div>
                <div class="hero-content">
                    <div class="overlay-lines"></div>
                    <h1>Wear Confidence, Own the Moment</h1>
                    <p>Discover exquisite fashion pieces that accentuate your style and confidence. Elevate your everyday look with our curated collection.</p>
                    <button class="explore-btn">Get Started</button>
                </div>
                <div class="limited-offer">
                    <span>Limited Edition Alert! New arrivals are here - Don't miss out</span>
                    <span>Limited Edition Alert! New arrivals are here - Don't miss out</span>
                    <span>Limited Edition Alert! New arrivals are here - Don't miss out</span>
                    <span>Limited Edition Alert! New arrivals are here - Don't miss out</span>
                    <span>Limited Edition Alert! New arrivals are here - Don't miss out</span>
                </div>
            </section>

            {/* Fresh Drops Section */}
            <section class="fresh-drops">
                <div class="section-header">
                    <h2>Fresh Drops for You</h2>
                    <button onclick={goToProducts} class="view-all">View More</button>
                </div>
                <div class="products-grid">
                    {products().map((product) => (
                        <div class="pro-card" key={product.id} onMouseLeave={() => setMainImage(product.id, null)}>
                            <div class="product-imagee">
                                <img
                                    src={formatImageUrl(product.current_image || product.default_image)}
                                    alt={product.name}
                                    class="pro-image"
                                    onError={(e) => {
                                        e.currentTarget.src = '/fallback-image.jpg';
                                        e.currentTarget.onerror = null;
                                    }}
                                />
                            </div>
                            <p class="section-products">{product.category}</p>
                            <span
                                class={`heart-icon ${isLoading() ? 'loading' : ''}`}
                                onClick={(e) => {
                                    e.stopPropagation(); // Mencegah event bubbling
                                    toggleLike(product.id);
                                }}
                            >
                                <img src={product.liked ? heartfull : heart} alt="Like" />
                                {product.likes_count > 0 && (
                                    <span class="like-count">{product.likes_count}</span>
                                )}
                            </span>
                            <h3 class="name-product">
                                <span innerHTML={highlightText(product.name, searchQuery())}></span>
                            </h3>
                            <p class="price">{product.price.toLocaleString('id-ID')} IDR</p>
                            <div class="color-optionss">
                                {product.colors.map((color) => (
                                    <span
                                        class="color"
                                        style={{
                                            background: color.color_code || getColorCode(color.color),
                                        }}
                                        onMouseEnter={() => setMainImage(product.id, color.image)}
                                        onMouseLeave={() => setMainImage(product.id, null)}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Categories Section */}
            <section class="categories-sec">
                <div class="category-card-sec handbag">
                    <h2>Bags</h2>
                    <button class="shop-now-btn" onClick={() => navigate("/handbags")}>
                        Shop Now
                    </button>
                </div>
                <div class="category-card-sec clothes">
                    <h2>Clothes</h2>
                    <button class="shop-now-btn" onClick={() => navigate("/clothes")}>
                        Shop Now
                    </button>
                </div>
                <div class="category-card-sec accessories">
                    <h2>Accessories</h2>
                    <button class="shop-now-btn" onClick={() => navigate("/accessories")}>
                        Shop Now
                    </button>
                </div>
            </section>
            <div class="limited-offer2">
                <span>Be Bold, Be Different – Fashion is an Expression!</span>
                <span>Be Bold, Be Different – Fashion is an Expression!</span>
                <span>Be Bold, Be Different – Fashion is an Expression!</span>
                <span>Be Bold, Be Different – Fashion is an Expression!</span>
                <span>Be Bold, Be Different – Fashion is an Expression!</span>
            </div>
            {/* Lifestyle Banner */}
            <section class="lifestyle-banner">
                <div class="banner-text">
                    <h2>Beyond Fashion, It's a Lifestyle</h2>
                    <a href="/about-us" class="view-all">About Us</a>
                </div>
                <div class="features">
                    <div class="feature">
                        <div class="icon">
                            <img src={trendy} alt="Trendy Icon" />
                        </div>
                        <h3>Trendy & Timeless</h3>
                        <p>Stay at the edge of what's hot while maintaining timeless elegance</p>
                    </div>
                    <div class="feature">
                        <div class="icon">
                            <img src={totebag} alt="Premium Icon" />
                        </div>
                        <h3>Premium Quality</h3>
                        <p>High quality materials and impeccable craftsmanship in every piece</p>
                    </div>
                    <div class="feature">
                        <div class="icon">
                            <img src={truck} alt="Shipping Icon" />
                        </div>
                        <h3>Express Shipping</h3>
                        <p>Fast and reliable delivery across the world at your convenience</p>
                    </div>
                    <div class="feature">
                        <div class="icon">
                            <img src={returns} alt="Returns Icon" />
                        </div>
                        <h3>Easy Returns</h3>
                        <p>Hassle-free returns within 30 days if you're not satisfied</p>
                    </div>
                </div>
            </section>

            {/* Style in Motion Section */}
            <section class="style-motion">
                <div class="section-header">
                    <h2>Style in Motion</h2>
                    <a href="/viewmore" class="view-all">View More</a>
                </div>
                <div class="motion-grid">
                    {videoData.map((video) => {
                        const [isHovered, setIsHovered] = createSignal(false);

                        return (
                            <div
                                class="motion-item"
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                            >
                                <div class="video-container">
                                    {isHovered() ? (
                                        <video
                                            src={video.src}
                                            class="motion-video"
                                            muted
                                            loop
                                            preload="metadata"
                                            playsinline
                                            autoplay
                                        />
                                    ) : (
                                        <img
                                            src={video.cover}
                                            alt="Video Cover"
                                            class="video-cover"
                                        />
                                    )}
                                </div>
                                <div class="video-info">
                                    <p>{video.date}</p>
                                    <h3>{video.title}</h3>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Style Talks Section */}
            <section class="style-talks">
                <div class="section-header">
                    <h2>Style Talks & Trends</h2>
                    <a href="/blogpage" class="blog">Blog</a>
                </div>
                <div class="blog-posts">
                    <div class="blog-post">
                        <img src={fashiontips} alt="Fashion Tips" />
                        <div class="blog-content">
                            <h3>5 Fashion Tips to Instantly Elevate Your Look</h3>
                            <p>Want to level up your style effortlessly? Fashion is more than just clothes—it’s about confidence, attitude, and knowing how to put the right pieces together. In this article, we’ll explore five expert-approved fashion tips that will help you transform your everyday outfits into stunning, head-turning ensembles. From understanding color coordination to choosing the right accessories, these simple yet effective tricks will make a significant difference in your personal style.</p>
                            <a href="#" class="read-more">Read More</a>
                        </div>
                    </div>
                    <div class="blog-post">
                        <img src={mixnmatch} alt="Mix & Match" />
                        <div class="blog-content">
                            <h3>Mix & Match: The Art of Pairing Bags & Outfits</h3>
                            <p>A great outfit isn’t complete without the perfect bag. But how do you choose the right one? Whether you’re going for a chic, casual, or elegant look, the way you pair your bag with your outfit can elevate your style effortlessly. This article will guide you through the essentials of bag-outfit coordination, including color harmony, texture balance, and occasion-based selections. Learn how to make a statement with the perfect mix-and-match combinations!</p>
                            <a href="#" class="read-more">Read More</a>
                        </div>
                    </div>
                    <div class="blog-post">
                        <img src={behindthedesign} alt="Behind the Design" />
                        <div class="blog-content">
                            <h3>Behind the Design: The Inspiration Behind Our Collection</h3>
                            <p>Every piece in our collection has a story. From concept to creation, our design process is driven by inspiration from global fashion trends, cultural influences, and timeless style. In this exclusive behind-the-scenes look, we’ll walk you through the journey of how our latest collection came to life—starting from mood boards, fabric selection, to the final product. Get an insider’s perspective on the creative process, and discover the passion behind every stitch and detail.</p>
                            <a href="#" class="read-more">Read More</a>
                        </div>
                    </div>
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

export default Dashboard;