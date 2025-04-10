import { createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { createEffect, onCleanup } from "solid-js";
import { useLocation } from "@solidjs/router";
import logo from '../img/logo.png';
import logowhite from '../img/logowhite.png';
import translate from '../img/Translate.svg';
import fashiontips from '../img/fashiontips.png';
import mixnmatch from '../img/mixnmatch.png';
import behindthedesign from '../img/behindthedesign.png';
import effrotless from '../img/effortles chic.png';
import thepower from '../img/thepower.png'
import befooter from '../img/befooter.png';
import cartIcon from '../img/Tote.svg';
import accountIcon from '../img/UserCircle (2).svg'
import './blogpage.css';

const BlogPage = () => {
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
        navigate("/blogpage/25-fashion-tips-to-instantly-elevate-your-look/1");
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, 100); // Memberi jeda agar navigasi selesai dulu
    };
    const goToReadMore2 = () => {
        navigate("/blogpage/mix-n-match-bags-outfits/1");
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, 100); // Memberi jeda agar navigasi selesai dulu
    };
    const goToReadMore3 = () => {
        navigate("/blogpage/behind-the-design/1");
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, 100); // Memberi jeda agar navigasi selesai dulu
    };
    const goToReadMore4 = () => {
        navigate("/blogpage/effortless-chic/1");
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, 100); // Memberi jeda agar navigasi selesai dulu
    };
    const goToReadMore5 = () => {
        navigate("/blogpage/power-of-accessories/1");
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, 100); // Memberi jeda agar navigasi selesai dulu
    };


    return (
        <div class="blog-page">
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
                        <li><a href="/blogpage" class="active">Blog</a></li>
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

            {/* Hero Section */}
            <section class="hero-blog">
                <div class="hero-content-blog">
                    <h1>Style Journal</h1>
                    <p>Our blog is your ultimate destination for fashion insights, styling tips, and behind-the-scenes stories.</p>
                    <button class="explore-btn-blog">Read Now</button>
                </div>
                <div class="limited-offer">
                    <span>Wear Confidence, Own the Moment</span>
                    <span>Wear Confidence, Own the Moment</span>
                    <span>Wear Confidence, Own the Moment</span>
                    <span>Wear Confidence, Own the Moment</span>
                    <span>Wear Confidence, Own the Moment</span>
                    <span>Wear Confidence, Own the Moment</span>
                    <span>Wear Confidence, Own the Moment</span>
                </div>
            </section>


            {/* Style Talks Section */}
            <section class="style-talks-blog">
                <div class="section-header">
                    <h2>Style Talks & Trends</h2>
                </div>
                <div class="blog-post-blog-blog">
                    <div class="blog-post-blog">
                        <img src={fashiontips} alt="Fashion Tips" />
                        <div class="blog-content-blog">
                            <h3>25 Fashion Tips to Instantly Elevate Your Look</h3>
                            <p>Want to level up your style effortlessly? Fashion is more than just clothes—it’s about confidence, attitude, and knowing how to put the right pieces together. In this article, we’ll explore five expert-approved fashion tips that will help you transform your everyday outfits into stunning, head-turning ensembles. From understanding color coordination to choosing the right accessories, these simple yet effective tricks will make a significant difference in your personal style.</p>
                            <button onClick={goToReadMore} class="read-more">
                                Read More
                            </button>
                        </div>
                    </div>
                    <div class="blog-post-blog">
                        <img src={mixnmatch} alt="Mix & Match" />
                        <div class="blog-content-blog">
                            <h3>Mix & Match: The Art of Pairing Bags & Outfits</h3>
                            <p>A great outfit isn’t complete without the perfect bag. But how do you choose the right one? Whether you’re going for a chic, casual, or elegant look, the way you pair your bag with your outfit can elevate your style effortlessly. This article will guide you through the essentials of bag-outfit coordination, including color harmony, texture balance, and occasion-based selections. Learn how to make a statement with the perfect mix-and-match combinations!</p>
                            <button onClick={goToReadMore2} class="read-more">
                                Read More
                            </button>
                        </div>
                    </div>
                    <div class="blog-post-blog">
                        <img src={behindthedesign} alt="Behind the Design" />
                        <div class="blog-content-blog">
                            <h3>Behind the Design: The Inspiration Behind Our Collection</h3>
                            <p>Every piece in our collection has a story. From concept to creation, our design process is driven by inspiration from global fashion trends, cultural influences, and timeless style. In this exclusive behind-the-scenes look, we’ll walk you through the journey of how our latest collection came to life—starting from mood boards, fabric selection, to the final product. Get an insider’s perspective on the creative process, and discover the passion behind every stitch and detail.</p>
                            <button onClick={goToReadMore3} class="read-more">
                                Read More
                            </button>
                        </div>
                    </div>
                    <div class="blog-post-blog">
                        <img src={effrotless} alt="Behind the Design" />
                        <div class="blog-content-blog">
                            <h3>Effortless Chic: How to Achieve a Timeless Look Without Trying Too Hard</h3>
                            <p>Looking stylish doesn’t mean following every new trend. A timeless, effortlessly chic look is all about understanding classic fashion elements and incorporating them into your wardrobe in a way that feels natural.</p>
                            <button onClick={goToReadMore4} class="read-more">
                                Read More
                            </button>  
                        </div>                      
                    </div>
                    <div class="blog-post-blog">
                        <img src={thepower} alt="Behind the Design" />
                        <div class="blog-content-blog">
                            <h3>The Power of Accessories: How to Transform Any Outfit</h3>
                            <p>Accessories have the ability to take a simple outfit from basic to extraordinary. Whether it’s a bold statement necklace, a structured handbag, or the perfect pair of sunglasses, the right accessories can redefine your entire look.</p>
                            <button onClick={goToReadMore5} class="read-more">
                                Read More
                            </button>  
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

export default BlogPage;