import { createSignal, createEffect } from "solid-js";
import { useNavigate } from "@solidjs/router";
import logo from '../img/logo.png';
import logowhite from '../img/logowhite.png';
import translate from '../img/Translate.svg';
import heart from '../img/Heart.svg';
import heartfull from '../img/Heart (1).svg';
import tas1groupred from '../img/1) Litchi Pattern Pillow Handbag/1 LPPH RED (Cover).svg';
import tas1groupblack from '../img/1) Litchi Pattern Pillow Handbag/2 LPPH BLACK.svg';
import tas1groupmint from '../img/1) Litchi Pattern Pillow Handbag/3 LPPH MINT.svg';
import tas1grouppink from '../img/1) Litchi Pattern Pillow Handbag/4 LPPH PINK.svg';
import tas2groupblackgrey from '../img/2 ) Retro Small Square Handbag/2 RSSH CHARCOAL.svg';
import tas2groupbrown from '../img/2 ) Retro Small Square Handbag/1 RSSH BROWN (Cover).svg';
import tas2groupijo from '../img/2 ) Retro Small Square Handbag/3 RSSH MATCHA.svg';
import tas2groupbeige from '../img/2 ) Retro Small Square Handbag/4 RSSH CREAM.svg';
import tas3groupa from '../img/3) Autumn Pearl Handbag/1 APH CREAM (Cover).svg';
import tas3groupb from '../img/3) Autumn Pearl Handbag/2 APH BLACK.svg';
import tas3groupc from '../img/3) Autumn Pearl Handbag/3 APH GREY.svg';
import tas3groupd from '../img/3) Autumn Pearl Handbag/4 APH PINK.svg';
import tas4groupblack from '../img/4) Frosted Bowling Handbag/1 FBH BLACK (Cover).svg';
import tas4groupbrown from '../img/4) Frosted Bowling Handbag/2 FBH BROWN.svg';
import tas4groupgrey from '../img/4) Frosted Bowling Handbag/3 FBH GREY.svg';
import tas4grouporange from '../img/4) Frosted Bowling Handbag/4 FBH  BUTTERSCOTCH.svg';
import tas5groupblack from '../img/5) Versatile Shoulder Bag/2 VSB BLACK.svg';
import tas5groupbrown from '../img/5) Versatile Shoulder Bag/1 VSB DESERT (Cover).svg';
import tas5groupbeige from '../img/5) Versatile Shoulder Bag/3 VSB OAT.svg';
import tas5grouppink from '../img/5) Versatile Shoulder Bag/4 VSB LEMONADE.svg';
import tas6groupblack from '../img/6) Rhombus Shoulder Bag/2 RSB BLACK.svg';
import tas6groupnavy from '../img/6) Rhombus Shoulder Bag/1 RSB BOLD DENIM (Cover).svg';
import tas6groupdenim from '../img/6) Rhombus Shoulder Bag/3 RSB LIGHT DENIM.svg';
import tas7groupblack from '../img/7) Diamond Chain Shoulder Bag/1 DCSB BLACK (Cover).svg';
import tas7groupsalmon from '../img/7) Diamond Chain Shoulder Bag/2 DCSB SALMON.svg';
import tas7groupseafoam from '../img/7) Diamond Chain Shoulder Bag/3 DCSB SEAFOAM.svg';
import tas7groupbone from '../img/7) Diamond Chain Shoulder Bag/4 DCSB BONE.svg';
import tas8grouplightdenim from '../img/8) American Shoulder Bag/1 ASB LIGHT DENIM (Cover).svg';
import tas8groupashgrey from '../img/8) American Shoulder Bag/2 ASB GREY.svg';
import tas8groupbrown from '../img/8) American Shoulder Bag/3 ASB BROWN.svg';
import tas8grouplightgrey from '../img/8) American Shoulder Bag/4 ASB LIGHT GREY.svg';
import clothes1 from '../img/Theyy Wearr Blouses Catalogue/Line Drawing Floral Pattern Blouse.svg';
import clothes2 from '../img/Theyy Wearr Blouses Catalogue/Ruffle Collar Design Blouse.svg';
import glasses from '../img/Hippie  Mod Glasses.svg';
import belt1 from '../img/Theyy Wearr Belts Catalogue/Black Double O-Ring Belt.svg';
import belt2 from '../img/Theyy Wearr Belts Catalogue/Almond Belt Leather.svg';
import lunettesdesoleilm from '../img/Lunettes De Soleil M.svg';
import metalsunglasses from '../img/Metal Sunglasses.svg';
import aviatorsunglasses from '../img/Aviator Sunglasses.svg';
import blackfauxbelt from '../img/Faux Leather Belt with buckle.svg';
import thinbrownfauxbelt from '../img/Thin Brown Faux Leather Belt.svg'
import thinbeltsquarebuckle from '../img/Thin Belt with Square Buckle.svg'
import befooter from '../img/befooter.png';
import cartIcon from '../img/Tote.svg';
import accountIcon from '../img/UserCircle (2).svg';
import './handbags.css';

const Handbags = () => {
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
            name: "Lady Pattern Pillow Handbag",
            category: "Handbag",
            price: "285.300 IDR",
            image: tas1groupred,
            defaultImage: tas1groupred,
            colors: [
                { color: "black", image: tas1groupblack },
                { color: "red", image: tas1groupred },
                { color: "mint", image: tas1groupmint },
                { color: "pink", image: tas1grouppink },
            ],
            liked: false
        },
        {
            name: "Retro Small Square Handbag",
            category: "Handbag",
            price: "174.000 IDR",
            image: tas2groupbrown,
            defaultImage: tas2groupbrown,
            colors: [
                { color: "black", image: tas2groupblackgrey },
                { color: "brown", image: tas2groupbrown },
                { color: "ijo", image: tas2groupijo },
                { color: "beige", image: tas2groupbeige },
            ],
            liked: false
        },
        {
            name: "Autumn Pearl Handbag",
            category: "Handbag",
            price: "250.000 IDR",
            image: tas3groupa,
            defaultImage: tas3groupa,
            colors: [
                { color: "gradient1", image: tas3groupb },
                { color: "gradient2", image: tas3groupc },
                { color: "gradient3", image: tas3groupd },
                { color: "gradient4", image: tas3groupa },
            ],
            liked: false
        },
        {
            name: "Frosted Bowling Handbag",
            category: "Handbag",
            price: "⁠192.000 IDR",
            image: tas4groupblack,
            defaultImage: tas4groupblack,
            colors: [
                { color: "black", image: tas4groupblack },
                { color: "brown", image: tas4groupbrown },
                { color: "grey", image: tas4groupgrey },
                { color: "orange", image: tas4grouporange },
            ],
            liked: false
        },
        {
            name: "Versatile Shoulder Bag",
            category: "Handbag",
            price: "221.000 IDR",
            image: tas5groupbrown,
            defaultImage: tas5groupbrown,
            colors: [
                { color: "black", image: tas5groupblack },
                { color: "brown", image: tas5groupbrown },
                { color: "pinkmuda", image: tas5grouppink },
                { color: "beige2", image: tas5groupbeige },
            ],
            liked: false
        },
        {
            name: "Rhombus Shoulder Bag",
            category: "Handbag",
            price: "134.000 IDR",
            image: tas6groupnavy,
            defaultImage: tas6groupnavy,
            colors: [
                { color: "blacky", image: tas6groupblack },
                { color: "navy", image: tas6groupnavy },
                { color: "denim", image: tas6groupdenim },
            ],
            liked: false
        },
        {
            name: "Diamond Chain Shoulder Bag",
            category: "Handbag",
            price: "⁠160.000 IDR",
            image: tas7groupblack,
            defaultImage: tas7groupblack,
            colors: [
                { color: "black", image: tas7groupblack },
                { color: "pink", image: tas7groupsalmon },
                { color: "mint", image: tas7groupseafoam },
                { color: "beige3", image: tas7groupbone },
            ],
            liked: false
        },
        {
            name: "American Shoulder Bag",
            category: "Handbag",
            price: "256.000 IDR",
            image: tas8grouplightdenim,
            defaultImage: tas8grouplightdenim,
            colors: [
                { color: "domgrey", image: tas8groupashgrey },
                { color: "brown2", image: tas8groupbrown },
                { color: "denim2", image: tas8grouplightdenim },
                { color: "grey2", image: tas8grouplightgrey },
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
                    <h2>Bags</h2>
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

                <div class="products-grid">
                    {products().map((product, index) => (
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

export default Handbags;