import { createSignal, onMount,  } from "solid-js";
import { useNavigate, useSearchParams } from "@solidjs/router";
import AuthPopup from "../pages/authpopup";
import IntroPopup from "./authpopup"; // Make sure this path is correct
import logo from '../img/logo.png';
import logowhite from '../img/logowhite.png';
import translate from '../img/Translate.svg';
import trendy from '../img/Infinity.svg';
import totebag from '../img/Tote.svg';
import heart from '../img/Heart.svg';
import heartfull from '../img/Heart (1).svg';
import truck from '../img/Truck.svg';
import returns from '../img/ArrowsClockwise.svg';
import line from '../img/Union.png';
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
import './landingpage.css';

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
}

const LandingPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = createSignal<Product[]>([]);
  const [loading, setLoading] = createSignal(true);
  const [error, setError] = createSignal<string | null>(null);
  const [showAuthPopup, setShowAuthPopup] = createSignal(false);
  const [showNavAuthPopup, setShowNavAuthPopup] = createSignal(false);

  // Mock authentication state - replace with actual auth check
  const isLoggedIn = () => false;

  const formatImageUrl = (imagePath: string) => {
    if (!imagePath) return '/fallback-image.jpg';
    return imagePath.includes('http')
      ? imagePath
      : `http://127.0.0.1:8080/uploads/products/${imagePath}`;
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const [productsRes, colorsRes] = await Promise.all([
        fetch('http://127.0.0.1:8080/api/products'),
        fetch('http://127.0.0.1:8080/api/product-colors')
      ]);

      if (!productsRes.ok || !colorsRes.ok) {
        throw new Error('Failed to fetch products or colors');
      }

      const productsData = await productsRes.json();
      const colorsData = await colorsRes.json();

      const formattedProducts = productsData
        .filter(product => product.category === 'Bags')
        .slice(0, 3)
        .map(product => {
          const productColors = colorsData.filter(color => color.product_id === product.id);

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
            liked: false
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

  const getColorCode = (colorName: string) => {
    const colorMap: Record<string, string> = {
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
    };
    return colorMap[colorName.toLowerCase()] || '#CCCCCC';
  };

  onMount(() => {
    fetchProducts();
  });

  const toggleLike = (index: number) => {
    if (!isLoggedIn()) {
      setShowAuthPopup(true);
      return;
    }

    const updatedProducts = products().map((product, i) => {
      if (i === index) {
        return { ...product, liked: !product.liked };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  const setMainImage = (productId: number, image: string | null) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId
          ? {
            ...product,
            current_image: image || product.default_image
          }
          : product
      )
    );
  };

  const handleNavigation = (path: string) => {
    if (!isLoggedIn()) {
      setShowNavAuthPopup(true);
    } else {
      navigate(path);
    }
  };

  const requireLogin = () => {
    setShowAuthPopup(true);
  };
    const [isLoading, setIsLoading] = createSignal(false);
    const [searchQuery, setSearchQuery] = createSignal("");
    const goToProductDetail = (productId: number) => {
      if (userId) {
        navigate(`/products/detail/${productId}?user_id=${userId}`);
      } else {
        navigate(`/products/detail/${productId}`);
      }
      // Scroll ke atas halaman
      window.scrollTo(0, 0);
    };
    const [searchParams] = useSearchParams();
    const userId = searchParams.user_id;


  const videoData = [
    { src: video1, cover: cover1, title: "Exclusive Designs, Timeless, and Effortlessly Stylish", date: "2024-03-30" },
    { src: video2, cover: cover2, title: "Best-Selling Bags You Can't Miss!", date: "2024-01-17" },
    { src: video3, cover: cover3, title: "Theyy Wearr's Kebaya Kutu Baru Collection", date: "2024-01-12" },
    { src: video4, cover: cover4, title: "Elevate Your Look with Our Signature Bags", date: "2024-01-11" }
  ];

  return (
    <div class="landing-page">
      <AuthPopup
        show={showAuthPopup()}
        onClose={() => setShowAuthPopup(false)}
      />

      <IntroPopup
        show={showNavAuthPopup()}
        onClose={() => setShowNavAuthPopup(false)}
      />

      {/* Header */}
      <header>
        <div class="logo">
          <img src={logo} alt="Logo" />
        </div>
        <nav class="navbar">
          <ul>
            <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigation("/dashboard"); }}>Home</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigation("/products"); }}>Products</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigation("/about-us"); }}>About Us</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigation("/blogpage"); }}>Blog</a></li>
          </ul>
        </nav>
        <div class="auth-buttons">
          <button class="login-btn" onClick={() => navigate("/login")}>
            Log in
          </button>
          <button class="signup-btn" onClick={() => navigate("/register")}>
            Sign up
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section class="herolan">
        <div class="overlay-lines">
          <img src={line} alt="Overlay lines" />
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
          <button class="explore-btn" onClick={requireLogin}>Get Started</button>
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
          <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation("/products"); }} class="view-all">View More</a>
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

      {/* Categories Section */}
      <section class="categories-sec">
        <div class="category-card-sec handbag">
          <h2>Bags</h2>
          <button class="shop-now-btn" onClick={requireLogin}>
            Shop Now
          </button>
        </div>
        <div class="category-card-sec clothes">
          <h2>Clothes</h2>
          <button class="shop-now-btn" onClick={requireLogin}>
            Shop Now
          </button>
        </div>
        <div class="category-card-sec accessories">
          <h2>Accessories</h2>
          <button class="shop-now-btn" onClick={requireLogin}>
            Shop Now
          </button>
        </div>
      </section>

      <div class="limited-offer">
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
          <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation("/about-us"); }} class="view-all">About Us</a>
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
          <a href="#" onClick={(e) => { e.preventDefault(); requireLogin(); }} class="view-all">View More</a>
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
          <a href="#" onClick={(e) => { e.preventDefault(); handleNavigation("/blogpage"); }} class="blog">Blog</a>
        </div>
        <div class="blog-posts">
          <div class="blog-post">
            <img src={fashiontips} alt="Fashion Tips" />
            <div class="blog-content">
              <h3>5 Fashion Tips to Instantly Elevate Your Look</h3>
              <p>Want to level up your style effortlessly? Fashion is more than just clothes—it's about confidence, attitude, and knowing how to put the right pieces together. In this article, we'll explore five expert-approved fashion tips that will help you transform your everyday outfits into stunning, head-turning ensembles. From understanding color coordination to choosing the right accessories, these simple yet effective tricks will make a significant difference in your personal style.</p>
              <a href="#" onClick={(e) => { e.preventDefault(); requireLogin(); }} class="read-more">Read More</a>
            </div>
          </div>
          <div class="blog-post">
            <img src={mixnmatch} alt="Mix & Match" />
            <div class="blog-content">
              <h3>Mix & Match: The Art of Pairing Bags & Outfits</h3>
              <p>A great outfit isn't complete without the perfect bag. But how do you choose the right one? Whether you're going for a chic, casual, or elegant look, the way you pair your bag with your outfit can elevate your style effortlessly. This article will guide you through the essentials of bag-outfit coordination, including color harmony, texture balance, and occasion-based selections. Learn how to make a statement with the perfect mix-and-match combinations!</p>
              <a href="#" onClick={(e) => { e.preventDefault(); requireLogin(); }} class="read-more">Read More</a>
            </div>
          </div>
          <div class="blog-post">
            <img src={behindthedesign} alt="Behind the Design" />
            <div class="blog-content">
              <h3>Behind the Design: The Inspiration Behind Our Collection</h3>
              <p>Every piece in our collection has a story. From concept to creation, our design process is driven by inspiration from global fashion trends, cultural influences, and timeless style. In this exclusive behind-the-scenes look, we'll walk you through the journey of how our latest collection came to life—starting from mood boards, fabric selection, to the final product. Get an insider's perspective on the creative process, and discover the passion behind every stitch and detail.</p>
              <a href="#" onClick={(e) => { e.preventDefault(); requireLogin(); }} class="read-more">Read More</a>
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
              <button onClick={requireLogin}>Submit</button>
            </div>
          </div>
        </div>

        <div class="footer-links">
          <div class="link-column">
            <h4>Theyy Wearr.</h4>
            <ul>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigation("/dashboard"); }}>Home</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigation("/products"); }}>Product</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigation("/about-us"); }}>About Us</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigation("/blogpage"); }}>Blog</a></li>
            </ul>
          </div>
          <div class="link-column">
            <h4>About Us</h4>
            <ul>
              <li><a href="#" onClick={(e) => { e.preventDefault(); requireLogin(); }}>Company</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); requireLogin(); }}>Community</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); requireLogin(); }}>Careers</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); requireLogin(); }}>Investors</a></li>
            </ul>
          </div>
          <div class="link-column">
            <h4>Get More</h4>
            <ul>
              <li><a href="#" onClick={(e) => { e.preventDefault(); requireLogin(); }}>Upgrade Premium</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); requireLogin(); }}>Personal Plan</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); requireLogin(); }}>Business Plan</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); requireLogin(); }}>Enterprise Plan</a></li>
            </ul>
          </div>
          <div class="link-column">
            <h4>Connect With Us</h4>
            <ul>
              <li><a href="#" onClick={(e) => { e.preventDefault(); requireLogin(); }}>Twitter</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); requireLogin(); }}>Facebook</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); requireLogin(); }}>Youtube</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); requireLogin(); }}>Instagram</a></li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <p>@ 2025 Theyy Wearr. Inc</p>
          <p>Terms and privacy</p>
          <div class="translate-section" onClick={requireLogin}>
            <img src={translate} alt="Translate Icon" />
            <span>English</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;