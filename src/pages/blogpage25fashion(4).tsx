import { Component, onMount, createSignal } from 'solid-js';
import { useNavigate } from "@solidjs/router";
import { createEffect, onCleanup } from "solid-js";
import { useLocation } from "@solidjs/router";
import logo from '../img/logo.png';
import styles from './blogpage25fashion(4).module.css';
import cartIcon from '../img/Tote.svg';
import logowhite from '../img/logowhite.png';
import befooter from '../img/befooter.png';
import translate from '../img/Translate.svg';
import accountIcon from '../img/UserCircle (2).svg'

const BlogPage25Fashion4: Component = () => {
  const [activePage, setActivePage] = createSignal(4); // Set active page to 4

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
        <p>Want to level up your style effortlessly? Fashion is more than just clothes—it's about confidence, attitude, and knowing how to put the right pieces together. In this article, we'll explore five expert-approved fashion tips that will help you transform your everyday outfits into stunning, head-turning ensembles. From understanding color coordination to choosing the right accessories, these simple yet effective tricks will make a significant difference in your personal style.</p>
        <h1>25 Fashion Tips to Instantly Elevate Your Look</h1>
        <div class={styles.metadata}>March 03, 2025 👁️ 3 mins read</div>

        <section class={styles.section}>
          <h2>16. Mix High & Low Fashion Pieces</h2>
          <p>Looking stylish doesn’t always mean spending a fortune. Combining high-end fashion pieces with more affordable ones can create an elegant look without breaking the bank.</p>
          <h3>How to Balance High & Low Fashion:</h3>
          <ul>
            <li>Use Basics from Fast Fashion – A classic white T-shirt, jeans, and accessories that can be budget-friendly yet chic.</li>
            <li>Pair with Statement Luxury Items – A designer bag or high-quality shoes can instantly elevate your outfit.</li>
            <li>Choose Quality Fabrics – Good materials that properly drape is more important than brand names, even if they come from fast fashion.</li>
            <li>Tailoring is Key – Well-fitted clothes always look more expensive, regardless of the price tag.</li>
          </ul>
          <p>Example: A Zara blazer paired with a Chanel bag and Adidas sneakers creates a modern yet stylish look.</p>
        </section>

        <section class={styles.section}>
          <h2>17. Invest in Timeless Outerwear</h2>
          <p>Outerwear is not just an extra layer—it’s a statement piece that can define your style. Investing in high-quality jackets or coats is always a wise choice.</p>
          <h3>How to Choose the Perfect Outerwear:</h3>
          <ul>
            <li>Stick to Neutral Colors – Beige, black, navy, and camel are versatile and timeless.</li>
            <li>Opt for Classic Silhouettes – Trench coats, structured blazers, and wool coats never go out of style.</li>
            <li>Check the Stitching & Fabric – Wool, tweed, and genuine leather are long-lasting and look more luxurious.</li>
          </ul>
          <p>Example: A classic trench coat can instantly transform a simple jeans-and-T-shirt look into something sophisticated.</p>
        </section>

        <section class={styles.section}>
          <h2>18. The Art of Layering</h2>
          <p>Layering isn't just for cold weather—it's a styling technique that adds depth and dimension to your outfit.</p>
          <h3>Tips for Stylish Layering:</h3>
          <ul>
            <li>Mix Different Textures – Pair satin, wool, and denim for a visually interesting look.</li>
            <li>Use Gradual Color Tones – Sticking to one color palette creates a harmonious effect.</li>
            <li>Add a Statement Layer – A vest, oversized cardigan, or scarf can be the perfect finishing touch.</li>
          </ul>
          <p>Example: Wearing a turtleneck under a slip dress, paired with an oversized blazer and boots, creates a chic and modern outfit.</p>
        </section>

        <section class={styles.section}>
          <h2>19. Find Your Signature Look</h2>
          <p>Having a signature is an instant way to stand out and feel more confident in your fashion choices.</p>
          <h3>How to Discover Your Signature Look:</h3>
          <ul>
            <li>Identify Your Style Colors – Choose shades that complement your skin tone.</li>
            <li>Stick to Favorite Silhouettes – If you love high-waisted jeans or structured blazers, make them a staple.</li>
            <li>Incorporate Personal Touches – A signature accessory, hairstyle, or lipstick shade can define your aesthetic.</li>
          </ul>
          <p>Example: If you admire Parisian fashion, structured blazers, mini bags, and loafers can become your go-to pieces.</p>
        </section>

        <section class={styles.section}>
          <h2>20. Wear Prints & Patterns with Confidence</h2>
          <p>Prints and patterns add personality to your outfit, but they need to be styled carefully to look chic instead of chaotic.</p>
          <h3>Tips for Wearing Prints & Patterns:</h3>
          <ul>
            <li>Start with Subtle Patterns – Stripes and small polka dots are easy to style.</li>
            <li>Pair with Neutral Colors – A floral top looks most elegant with either a black pants.</li>
            <li>Choose Prints that Flatter Your Body Shape – Vertical stripes elongate the body, while larger patterns add volume.</li>
          </ul>
          <p>Example: A floral blouse paired with wide-leg white trousers creates a fresh and sophisticated look.</p>
          <br></br>
          <p>True style is about confidence and balance. By learning to mix casual and formal pieces, experimenting with proportions, selecting flattering colors, keeping your outfits well-tailored, and carrying yourself with poise, you can achieve a polished and sophisticated appearance effortlessly</p>
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

export default BlogPage25Fashion4;