import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import logo from '../img/logo.png';
import logowhite from '../img/logowhite.png';
import translate from '../img/Translate.svg';
import trendy from '../img/Infinity.svg';
import totebag from '../img/Tote.svg';
import truck from '../img/Truck.svg';
import returns from '../img/ArrowsClockwise.svg';
import heart from '../img/Heart.svg';
import heartfull from '../img/Heart (1).svg';
import image from '../img/store.png';
import cover1 from '../img/cover1.png';
import cover2 from '../img/cover2.png';
import cover3 from '../img/cover3.png';
import cover4 from '../img/cover4.png';
import video1 from '../img/1.mp4';
import video2 from '../img/2.mp4';
import video3 from '../img/3.mp4';
import video4 from '../img/4.mp4';
import befooter from '../img/befooter.png';
import cartIcon from '../img/Tote.svg';
import accountIcon from '../img/UserCircle (2).svg'
import './aboutus.css';

const AboutUs = () => {
    const videoData = [
        { src: video1, cover: cover1, title: "Exclusive Designs,  Timeless, and Effortlessly Stylish", date: "2024-03-30" },
        { src: video2, cover: cover2, title: "Best-Selling Bags You Can’t Miss!", date: "2024-01-17" },
        { src: video3, cover: cover3, title: "Theyy Wearr's Kebaya Kutu Baru Collection", date: "2024-01-12" },
        { src: video4, cover: cover4, title: "Elevate Your Look with Our Signature Bags", date: "2024-01-11" }
    ];
    const navigate = useNavigate();

    const [clicked, setClicked] = createSignal(false);

    const goToFavoritePage = () => {
        setClicked(true);
        navigate("/favorite");
    };
    // Fungsi untuk navigasi ke halaman Cart
    const goToCart = () => {
        navigate("/cart");
    };

    // Fungsi untuk navigasi ke halaman Account
    const goToAccount = () => {
        navigate("/account");
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
                        <li><a href="/dashboard">Home</a></li>
                        <li><a href="/products">Products</a></li>
                        <li><a href="/about-us" class="active">About Us</a></li>
                        <li><a href="/blogpage">Blog</a></li>
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
                    {/* Tombol Account dengan Navigasi */}
                    <button class="dash-account-btn" onClick={goToAccount}>
                        <img src={accountIcon} alt="Account" />
                    </button>
                </div>
            </header>

            {/* Hero Section */}
            <section class="hero">
                <div class="hero-content">
                    <div class="overlay-lines"></div>
                    <h1>Wear Confidence, Own <br /> The Moment</h1>
                    <p>Elevate your style effortlessly with timeless fashion and statement pieces that define who you are.</p>
                    <button class="explore-btn-a">Explore</button>
                </div>
                <div class="limited-offer-a">
                    <span>Express Yourself Through Fashion – Confidence Starts with the Right Outfit!</span>
                    <span>Express Yourself Through Fashion – Confidence Starts with the Right Outfit!</span>
                    <span>Express Yourself Through Fashion – Confidence Starts with the Right Outfit!</span>
                    <span>Express Yourself Through Fashion – Confidence Starts with the Right Outfit!</span>
                    <span>Express Yourself Through Fashion – Confidence Starts with the Right Outfit!</span>
                </div>
            </section>
            {/* Lifestyle Banner */}
            <section class="lifestyle-banner">
                <div class="banner-text">
                    <h2>Beyond Fashion, It's a Lifestyle</h2>
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
                    <h2>Our Store</h2>
                </div>

                <div class="store-section">
                    <img src={image} alt="Store Image" class="store-image" />
                    <div class="store-info">
                        <div class="social-media">
                            <div class="social-item">
                                <h1>Tiktok</h1>
                                <p>https://www.tiktok.com/@theyy.wearr?is_from_webapp=1&sender_device=pc</p>
                                <button class="visit-btn">Visit</button>
                            </div>
                            <div class="social-item">
                                <h1>Shipping &  Return Address</h1>
                                <p>Apartemen Patra Lomanis Residence, Pasiran, Tegalreja,
                                    Central Cilacap, Cilacap Regency, Central Java 53213</p>
                                <button class="visit-btn">Visit</button>
                            </div>
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

export default AboutUs;