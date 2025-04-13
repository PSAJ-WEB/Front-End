import { Component, onMount, createSignal } from 'solid-js';
import { useNavigate } from "@solidjs/router";
import { createEffect, onCleanup } from "solid-js";
import { useLocation } from "@solidjs/router";
import heart from '../img/Heart.svg';
import heartfull from '../img/Heart (1).svg';
import logo from '../img/logo.png';
import styles from './blogpage25fashion(1).module.css';
import cartIcon from '../img/Tote.svg';
import logowhite from '../img/logowhite.png';
import befooter from '../img/befooter.png';
import translate from '../img/Translate.svg';
import accountIcon from '../img/UserCircle (2).svg'

const BlogPage25Fashion1: Component = () => {
  const [activePage, setActivePage] = createSignal(1); // Misalnya, halaman aktif saat ini adalah 2

  // Data halaman dan path-nya
  const pages = [
    { number: 1, path: "/blogpage/25-fashion-tips-to-instantly-elevate-your-look/1" },
    { number: 2, path: "/blogpage/25-fashion-tips-to-instantly-elevate-your-look/2" },
    { number: 3, path: "/blogpage/25-fashion-tips-to-instantly-elevate-your-look/3" },
    { number: 4, path: "/blogpage/25-fashion-tips-to-instantly-elevate-your-look/4" },
    { number: 5, path: "/blogpage/25-fashion-tips-to-instantly-elevate-your-look/5" },
  ];
  // Fungsi untuk navigasi ke halaman sebelumnya
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
    navigate(path); // Navigasi ke path yang diberikan
  };
  const location = useLocation();

  createEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

    scrollToTop();
    onCleanup(() => scrollToTop()); // Pastikan reset scroll saat unmount halaman
  });
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
    <div class={styles.container}>
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
            <span>Wear Confidence, Own the Moment</span>
            <span>Wear Confidence, Own the Moment</span>
            <span>Wear Confidence, Own the Moment</span>
            <span>Wear Confidence, Own the Moment</span>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <article class={styles.blogPost}>
        <p>Want to level up your style effortlessly? Fashion is more than just clothes—it’s about confidence, attitude, and knowing how to put the right pieces together. In this article, we’ll explore five expert-approved fashion tips that will help you transform your everyday outfits into stunning, head-turning ensembles. From understanding color coordination to choosing the right accessories, these simple yet effective tricks will make a significant difference in your personal style.</p>
        <h1>25 Fashion Tips to Instantly Elevate Your Look</h1>

        <section class={styles.section}>
          <h2>1. Master the Power of Color Coordination</h2>
          <p>The right color combinations can instantly make an outfit look more polished and put-together. Understanding how to use colors to your advantage will help you create stylish, eye-catching ensembles.</p>
          <h3>How to Use Colors Like a Pro:</h3>
          <ul class="numbered-list">
            <li>Stick to a Cohesive Palette – Neutrals (black, white, beige, navy) are versatile and timeless. Mixing them with subtle pops of color can create balance.</li>
            <li>Use the 60-30-10 Rule – This classic styling technique ensures harmony in your outfit. 60% should be a dominant color, 30% a secondary color, and 10% an accent shade.</li>
            <li>Experiment with Monochrome Looks – Dressing in varying shades of the same color creates an effortlessly chic and elongated silhouette.</li>
            <li>Understand Color Psychology – Soft pastels evoke elegance, while bold colors like red and royal blue make a powerful statement.</li>
          </ul>
          <p>Example: A beige blazer with white trousers and a caramel-colored bag creates a sophisticated, neutral-toned outfit with a rich, expensive feel.</p>
        </section>

        <section class={styles.section}>
          <h2>2. Elevate Your Look with Statement Accessories</h2>
          <p>Accessories are the secret weapon of any well-dressed individual. They can turn a simple outfit into something extraordinary with minimal effort.</p>
          <h3>How to Accessorize with Intention:</h3>
          <ul>
            <li>Choose One Statement Piece – Whether it’s a bold necklace, a designer bag, or oversized sunglasses, let one item take center stage.</li>
            <li>Layering is Key – Stack bracelets, layer delicate necklaces, or mix and match rings to create an elegant, curated look.</li>
            <li>Invest in Quality Handbags – A structured leather bag in a neutral color can make even a basic outfit look high-end.</li>
            <li>Wear Classic Sunglasses – A pair of sleek cat-eye or aviator sunglasses instantly add an air of sophistication.</li>
          </ul>
          <p>Example: A white button-up shirt with jeans can go from casual to chic by adding a gold chain necklace, a structured handbag, and pointed-toe heels.</p>
        </section>

        <section class={styles.section}>
          <h2>3. Play with Proportions and Silhouettes</h2>
          <p>Understanding proportions and silhouettes is key to achieving a well-balanced outfit. The right combination can enhance your figure and make your outfit look effortlessly stylish.</p>
          <h3>How to Style Proportions Effectively:</h3>
          <ul>
            <li>Balance Loose and Fitted Pieces – If you wear oversized tops, pair them with slim-fitting bottoms, and vice versa.</li>
            <li>Use High-Waisted Items – High-waisted trousers, skirts, and jeans elongate the legs and create a flattering shape.</li>
            <li>Cinch the Waist – Adding a belt or wearing tailored clothing defines your silhouette and adds structure.</li>
            <li>Experiment with Layering – A structured blazer over a flowy dress or a cropped sweater over a long shirt creates interesting visual contrast.</li>
          </ul>
          <p>Example: Pairing an oversized blazer with a fitted bodysuit and straight-leg trousers creates a balanced, modern silhouette.</p>
        </section>

        <section class={styles.section}>
          <h2>4. Upgrade Your Shoe Game</h2>
          <p>Shoes are one of the first things people notice in an outfit. The right pair can instantly elevate your look and tie everything together seamlessly.</p>
          <h3>How to Choose the Right Footwear:</h3>
          <ul>
            <li>Invest in Classic Styles – Timeless options like pointed-toe pumps, ankle boots, and white sneakers work with almost any outfit.</li>
            <li>Match Your Shoes to the Occasion – Elevate casual outfits with loafers or stylish sneakers, and dress up evening looks with sleek heels or elegant flats.</li>
            <li>Opt for High-Quality Materials – Leather or suede shoes in neutral shades add a polished, sophisticated touch.</li>
            <li>Keep Them in Good Condition – Regularly clean and polish your shoes to maintain their pristine look.</li>
          </ul>
          <p>Example: A simple turtleneck and jeans become effortlessly chic when paired with knee-high boots and a structured handbag.</p>
        </section>

        <section class={styles.section}>
          <h2>5. Confidence is Your Best Accessory</h2>
          <p>The most stylish people aren’t just fashionable-they exude confidence in what they wear. Fashion is about self-expression, and the way you carry yourself can make or break your look.</p>
          <h3>How to Wear Confidence Like a Pro:</h3>
          <ul>
            <li>Own Your Look – Wear clothes that make you feel comfortable and powerful. When you feel good, you look good.</li>
            <li>Maintain Good Posture – Standing tall and walking with confidence enhances any outfit.</li>
            <li>Smile and Make Eye Contact – A warm, self-assured demeanor makes your presence more captivating.</li>
            <li>Develop Your Signature Style – Find a personal style that suits you and makes you feel your best, rather than chasing every trend.</li>
          </ul>
          <p>Example: Even a basic black dress can turn heads when worn with poise, confidence, and the right attitude.</p>
          <br></br>
          <p>Elevating your style doesn’t require a complete wardrobe overhaul. By focusing on color coordination, accessorizing smartly, understanding proportions, investing in quality footwear, and carrying yourself with confidence, you can instantly transform any outfit into a head-turning look.</p>
        </section>


        {/* Pagination */}
        <div class={styles.pagination}>
          {/* Tombol "Read Previous Article" */}
          <a href="#" class={styles.prevArticle} onClick={goToPreviousPage}>
            Read Previous Article
          </a>

          {/* Daftar nomor halaman */}
          <div class={styles.pageNumbers}>
            {pages.map((page) => (
              <span
                key={page.number}
                class={activePage() === page.number ? styles.active : ""}
                onClick={() => {
                  setActivePage(page.number); // Perbarui state halaman aktif
                  handleNavigation(page.path); // Navigasi ke halaman yang dipilih
                }}
              >
                {page.number}
              </span>
            ))}
          </div>

          {/* Tombol "Read Next Article" */}
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

export default BlogPage25Fashion1;