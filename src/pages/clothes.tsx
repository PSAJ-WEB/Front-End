import { createSignal, createEffect } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { useLocation } from "@solidjs/router";
import logo from '../img/logo.png';
import logowhite from '../img/logowhite.png';
import translate from '../img/Translate.svg';
import heart from '../img/Heart.svg';
import heartfull from '../img/Heart (1).svg';
import clothes1 from '../img/Theyy Wearr Blouses Catalogue/Line Drawing Floral Pattern Blouse.svg';
import clothes2 from '../img/Theyy Wearr Blouses Catalogue/Ruffle Collar Design Blouse.svg';
import clothes3 from '../img/Theyy Wearr Blouses Catalogue/Blouse With Gold Buttons.svg';
import befooter from '../img/befooter.png';
import cartIcon from '../img/Tote.svg';
import accountIcon from '../img/UserCircle (2).svg';
import './clothes.css';

const Clothes = () => {
    const toggleLike = (index) => {
        const updatedProducts = products().map((product, i) => {
            if (i === index) {
                return { ...product, liked: !product.liked };
            }
            return product;
        });
        setProducts(updatedProducts);
    };

    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = createSignal("");
    const [products, setProducts] = createSignal([
        {
            name: "Drawing Floral Pattern Blouse",
            category: "Clothes",
            price: "300.000 IDR",
            image: clothes1,
            defaultImage: clothes1,
            colors: [
                { color: "clothes1", image: clothes1 },
            ],
            liked: false
        },
        {
            name: "Ruffle Collar Design Blouse",
            category: "Clothes",
            price: "220.000 IDR",
            image: clothes2,
            defaultImage: clothes2,
            colors: [
                { color: "clothes2", image: clothes2 },
            ],
            liked: false
        },
        {
            name: "Gold Buttons Blouse",
            category: "Clothes",
            price: "153.000 IDR",
            image: clothes3,
            defaultImage: clothes3,
            colors: [
                { color: "clothes3", image: clothes3 },
            ],
            liked: false
        }
    ]);

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

    const goToCart = () => navigate("/cart");
    const goToAccount = () => navigate("/account");

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
                        <li><a href="/products" class="active">Products</a></li>
                        <li><a href="/about-us">About Us</a></li>
                        <li><a href="/blogpage">Blog</a></li>
                    </ul>
                </nav>
                <div class="dash-auth-buttons">
                    <button class="dash-cart-btn" onClick={goToCart}>
                        <img src={cartIcon} alt="Cart" />
                    </button>
                    <button class="dash-account-btn" onClick={goToAccount}>
                        <img src={accountIcon} alt="Account" />
                    </button>
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
                    <h2>Clothes</h2>
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
                    {filteredProducts().map((product, index) => (
                        <div class="pro-card" key={product.name} id={product.name}>
                            <div class="product-imagee">
                                <img src={product.image} alt={product.name} class="pro-image" />
                            </div>
                            <p class="section-products">{product.category}</p>
                            <span class="heart-icon" onClick={() => toggleLike(index)}>
                                <img src={product.liked ? heartfull : heart} alt="Like" />
                            </span>
                            <h3 class="name-product">
                                <span innerHTML={highlightText(product.name, searchQuery())}></span>
                            </h3>
                            <p class="price">{product.price}</p>
                            <div class="color-optionss" onMouseLeave={() => setMainImage(index, product.defaultImage)}>
                                {product.colors.map((color, colorIndex) => (
                                    <span
                                        class={`color ${color.color}`}
                                        onMouseOver={() => setMainImage(index, color.image)}
                                        key={colorIndex}
                                    ></span>
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

export default Clothes;