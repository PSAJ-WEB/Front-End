import { Component, onMount, createSignal } from 'solid-js';
import { useNavigate, useSearchParams } from "@solidjs/router";
import { createEffect, onCleanup } from "solid-js";
import { useLocation } from "@solidjs/router";
import heart from '../img/Heart.svg';
import heartfull from '../img/Heart (1).svg';
import logo from '../img/logo.png';
import styles from './blogpage25fashion(5).module.css';
import cartIcon from '../img/Tote.svg';
import logowhite from '../img/logowhite.png';
import befooter from '../img/befooter.png';
import translate from '../img/Translate.svg';
import accountIcon from '../img/UserCircle (2).svg';

const FashionBlogPage5: Component = () => {
  const [activePage, setActivePage] = createSignal(5);

  interface CartItem {
    id: number;
    product_id: number;
    product_name: string;
    product_image: string | null;
    color: string;
    color_code: string;
    price: string;
    quantity: number;
  }

  const [searchParams] = useSearchParams();
  const [cartItems, setCartItems] = createSignal<CartItem[]>([]);
  const [currentUserId, setCurrentUserId] = createSignal<string | null>(null);
  const userId = searchParams.user_id;

  const navigateWithUserId = (path: string) => {
    const id = currentUserId() || userId;
    if (id) {
      navigate(`${path}?user_id=${id}`);
      updateUserActivity(id);
    } else {
      navigate(path);
    }
  };

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

  // Page data and paths
  const pages = [
    { number: 1, path: "/blogpage/25-fashion-tips-to-instantly-elevate-your-look/1" },
    { number: 2, path: "/blogpage/25-fashion-tips-to-instantly-elevate-your-look/2" },
    { number: 3, path: "/blogpage/25-fashion-tips-to-instantly-elevate-your-look/3" },
    { number: 4, path: "/blogpage/25-fashion-tips-to-instantly-elevate-your-look/4" },
    { number: 5, path: "/blogpage/25-fashion-tips-to-instantly-elevate-your-look/5" },
  ];

  // Function for previous page navigation
  const goToPreviousPage = () => {
    const currentPage = activePage();
    if (currentPage === 1) {
      // Jika di halaman 1, navigasi ke /blogpage
      handleNavigation("/blogpage");
    } else {
      // Jika bukan halaman 1, navigasi ke halaman sebelumnya
      const previousPage = currentPage - 1;
      setActivePage(previousPage);
      handleNavigation(pages[previousPage - 1].path);
    }
  };

  const goToNextPage = () => {
    const currentPage = activePage();
    if (currentPage === 4) {
      // Jika di halaman 4, navigasi ke /blogpage
      handleNavigation("/blogpage");
    } else {
      // Jika bukan halaman 4, navigasi ke halaman berikutnya
      const nextPage = currentPage + 1;
      setActivePage(nextPage);
      handleNavigation(pages[nextPage - 1].path);
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const location = useLocation();
  const navigate = useNavigate();

  createEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    scrollToTop();
    onCleanup(() => scrollToTop());
  });

  const [clicked, setClicked] = createSignal(false);

  const goToFavoritePage = () => {
    setClicked(true);
    navigate("/favorite");
  };

  // Function to navigate to Cart
  const goToCart = () => {
    navigate("/cart");
  };

  // Function to navigate to Account
  const goToAccount = () => {
    navigate("/account");
  };

  return (
    <div class={styles.container}>
      <header>
        <div class="logo">
          <img src={logo} alt="Logo" />
        </div>
        <nav class="navbar-blog">
          <ul>
            <li><a onClick={() => navigateWithUserId("/dashboard")}>Home</a></li>
            <li><a onClick={() => navigateWithUserId("/products")} >Products</a></li>
            <li><a onClick={() => navigateWithUserId("/about-us")} >About Us</a></li>
            <li><a onClick={() => navigateWithUserId("/blogpage")} class="active">Blog</a></li>
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
      <div class={styles.heroblog5}>
        <div class={styles.heroContentblog5}>
          <div class={styles.marquee}>
            <span>Wear Confidence, Own the Moment</span>
            <span>Wear Confidence, Own the Moment</span>
            <span>Wear Confidence, Own the Moment</span>
            <span>Wear Confidence, Own the Moment</span>
            <span>Wear Confidence, Own the Moment</span>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <article class={styles.blogPost}>
        <h1>5 Fashion Tips to Instantly Elevate Your Look</h1>

        <p>Want to level up your style effortlessly? Fashion is more than just clothes—it's about confidence, attitude, and knowing how to put the right pieces together. In this article, we'll explore five expert-approved fashion tips that will help you transform your everyday outfits into stunning, head-turning ensembles. From understanding color coordination to choosing the right accessories, these simple yet effective tricks will make a significant difference in your personal style.</p>

        <section class={styles.section}>
          <h2>21. The Power of Tucking In</h2>
          <p>A simple tuck can transform an outfit from sloppy to polished and stylish.</p>
          <h3>How to Tuck Like a Pro:</h3>
          <ol>
            <li>Full Tuck – Best for high-waisted bottoms to create a clean silhouette.</li>
            <li>French Tuck – Tuck in only the front part of your shirt for an effortless chic.</li>
            <li>Side Tuck – Works great with oversized sweaters to create a slimming effect.</li>
          </ol>
          <p>Example: A basic white T-shirt tucked into high-waisted jeans looks effortlessly chic.</p>
        </section>

        <section class={styles.section}>
          <h2>22. Statement Belts for Instant Elevation</h2>
          <p>A belt not only holds your pants up but also adds personality and creativity to your outfit.</p>
          <h3>Ways to Style a Belt:</h3>
          <ol>
            <li>Use a Wide Belt Over a Loose Dress – Creates a more defined waistline.</li>
            <li>Choose Unique Belt Designs – Think gold buckles, textured leather, or chain details.</li>
            <li>Wear Over Outerwear – A belt over a blazer or coat creates a high-fashion look.</li>
          </ol>
          <p>Example: A black leather belt over an oversized blazer instantly enhances the silhouette.</p>
        </section>

        <section class={styles.section}>
          <h2>23. Play with Textures for Depth</h2>
          <p>Combining different textures makes an outfit visually interesting and more stylish.</p>
          <h3>How to Mix Textures Effectively:</h3>
          <ol>
            <li>Pair Rough & Smooth – Leather jacket and silk blouses create a perfect contrast.</li>
            <li>Use Knitwear for Extra Depth – Chunky sweaters add coziness and dimension.</li>
            <li>Incorporate Textured Accessories – Suede bags or embossed leather shoes add a luxurious touch.</li>
          </ol>
          <p>Example: A satin skirt with an oversized knit sweater balances elegance and comfort.</p>
        </section>

        <section class={styles.section}>
          <h2>24. Go for Minimalist Chic</h2>
          <p>Minimalism is all about simplicity with maximum impact. A well-put-together minimalist outfit always looks classy and effortless.</p>
          <h3>How to Master Minimalist Fashion:</h3>
          <ol>
            <li>Stick to Neutral & Monochrome Colors – White, black, gray, and beige always work.</li>
            <li>Focus on Clean Silhouettes – Simple, well-fitted pieces never go out of style.</li>
            <li>Choose High-Quality Basics – Invest in a structured blazer, a white button-down, and tailored trousers.</li>
          </ol>
          <p>Example: An oversized white shirt paired with tailored black trousers and classic loafers creates a sophisticated, clean look.</p>
        </section>

        <section class={styles.section}>
          <h2>25. Personal Grooming is Essential</h2>
          <p>Even the most stylish outfit won’t shine if personal grooming is neglected.</p>
          <h3>Key Grooming Tips for a Polished Look:</h3>
          <ol>
            <li>Keep Your Hair Neat & Styled – A well-maintained hairstyle enhances your overall appearance.</li>
            <li>Find Your Signature Fragrance – A unique scent adds to your personal style.</li>
            <li>Maintain Clean & Well-Groomed Nails – Even without polish, neat nails elevate your look.</li>
          </ol>
          <p>Example: A simple turtleneck and jeans look even more refined when paired with well-styled hair and a fresh, clean scent.</p>

          <p>Dressing well is a blend of art and strategy. By applying a versatile wardrobe, focusing on quality over quantity, sticking with timeless styles, watching the right hemlines, and paying attention to personal grooming, you can elevate your look in any setting.</p>
        </section>

        {/* Pagination */}
        <div class={styles.pagination}>
          <a href="#" class={styles.prevArticle} onClick={goToPreviousPage}>
            Read Previous Article
          </a>

          <div class={styles.pageNumbers}>
            {pages.map((page) => (
              <span
                key={page.number}
                class={activePage() === page.number ? styles.active : ""}
                onClick={() => {
                  setActivePage(page.number);
                  handleNavigation(page.path);
                }}
              >
                {page.number}
              </span>
            ))}
          </div>

          <a href="#" class={styles.nextArticle} onClick={goToNextPage}>
            Read Next Article
          </a>
        </div>
      </article>

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
            <h4>Connect With Us</h4>
            <ul>
              <li><a href="#">Twitter</a></li>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Instagram</a></li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom">
          <p>© 2025 Theyy Wearr. Inc</p>
          <p>Terms and Conditions</p>
          <div class="translate-section">
            <img src={translate} alt="Translate Icon" />
            <span>English</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default FashionBlogPage5;