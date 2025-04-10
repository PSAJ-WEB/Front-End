import { Component, onMount, createSignal } from 'solid-js';
import { useNavigate } from "@solidjs/router";
import { createEffect, onCleanup } from "solid-js";
import { useLocation } from "@solidjs/router";
import logo from '../img/logo.png';
import styles from './blogpagemixnmatch(1).module.css';
import cartIcon from '../img/Tote.svg';
import logowhite from '../img/logowhite.png';
import befooter from '../img/befooter.png';
import translate from '../img/Translate.svg';
import accountIcon from '../img/UserCircle (2).svg'

const BlogPageMixnMatch1: Component = () => {
  const [activePage, setActivePage] = createSignal(1); // Misalnya, halaman aktif saat ini adalah 2

  // Data halaman dan path-nya
  const pages = [
    { number: 1, path: "/blogpage/mix-n-match-bags-outfits/1" },
    { number: 2, path: "/blogpage/mix-n-match-bags-outfits/2" },
    { number: 3, path: "/blogpage/mix-n-match-bags-outfits/3" },
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
      <div class={styles.heroblog3}>
        <div class={styles.heroContentblog3}>
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
        <h1>Mix & Match: The Art of Pairing Bags & Outfits</h1>
        <div class={styles.metadata}>September 12, 2025 👁️ 3 mins read</div>
        <p>A great outfit isn’t complete without the perfect bag. But how do you choose the right one? Whether you’re going for a chic, casual, or elegant look, the way you pair your bag with your outfit can elevate your style effortlessly. This article will guide you through the essentials of bag-outfit coordination, including color harmony, texture balance, and occasion-based selections. Learn how to make a statement with the perfect mix-and-match combinations!</p>

        <section class={styles.section2}>
          <h2>Color Harmony – Matching Your Bag with Your Outfit</h2>
          <h3>1. Understanding Color Theory in Fashion</h3>
          <p> Color plays a major role in defining the overall impression of an outfit. Utilizing color theory can help create harmonious and visually appealing combinations. Here are three key approaches:</p>
          <ul class="numbered-list-2">
            <li>Monochromatic Colors: Matching your bag and outfit in similar shades, like an all-white outfit with a cream handbag, creates a refined and elegant look.</li>
            <li>Contrasting Colors: Pairing colors that are opposite on the color wheel, such as a red dress with an emerald green bag, makes a bold statement.</li>
            <li>Neutral Colors: Neutral-toned bags (black, white, beige, gray) are highly versatile and can complement a wide range of outfits effortlessly.</li>          
          </ul>
        </section>

        <section class={styles.section2}>
          <h3>2. Successful Color Pairing Examples</h3>
          <p>Choosing the right bag color can transform your entire look. By applying successful color pairing techniques—such as monochromatic, complementary, or neutral contrasts—you can create a balanced and stylish outfit. Here are some practical tips to help you select the perfect bag color for any occasion:</p>
          <ul>
            <li>Pastel outfits matched with nude or soft pastel bags create a delicate and feminine vibe, perfect for spring and summer looks.</li>
            <li>Dark-colored clothing, such as black or navy, pairs well with metallic handbags for a glamorous effect, ideal for evening outings or formal events.</li>
            <li>Denim outfits with a red bag add a stylish, casual pop of color, making the ensemble stand out effortlessly.</li>
            <li>Earthy tones like olive green, mustard, and brown work well with tan or caramel-colored bags, creating a natural and cohesive appearance.</li>
            <li>Bright outfits can be balanced with muted bag colors to avoid an overly loud look, ensuring a stylish yet sophisticated finish.</li>
          </ul>
        </section>

        <section class={styles.section2}>
          <h3>3. Practical Tips for Choosing Bag Colors</h3>
          <p>A well-matched bag color enhances your outfit’s elegance and cohesion. Whether pairing a bold-colored bag for a statement look or opting for classic neutrals for versatility, understanding color harmony ensures a flawless finish. Here are five color pairing examples and expert tips for choosing the perfect bag shade:</p>
          <ul>
            <li>When in doubt, opt for neutral-colored bags that work with multiple outfits, ensuring versatility in your wardrobe.</li>
            <li>Use accessories like scarves or shoes to coordinate the bag color subtly, tying the entire look together seamlessly.</li>
            <li>A bright-colored bag can act as a statement piece if paired with a simple outfit, allowing it to be the focal point without overwhelming the look.</li>
            <li>For office settings, stick to classic tones like black, brown, or navy for a professional and polished appearance.</li>
            <li>Consider seasonal adjustments: Bright colors for spring/summer and earthy tones for fall/winter, ensuring your bag complements the overall seasonal aesthetic.</li>
          </ul>
          <br />
          <p>By mastering the art of color harmony, you can effortlessly enhance your style with the perfect bag. Coordinating your bag with your outfit creates a polished and cohesive look, whether you’re dressing casually, formally, or professionally.</p>
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

export default BlogPageMixnMatch1;