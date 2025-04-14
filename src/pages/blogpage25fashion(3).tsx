import { Component, onMount, createSignal } from 'solid-js';
import { useNavigate } from "@solidjs/router";
import { createEffect, onCleanup } from "solid-js";
import { useLocation } from "@solidjs/router";
import heart from '../img/Heart.svg';
import heartfull from '../img/Heart (1).svg';
import logo from '../img/logo.png';
import styles from './blogpage25fashion(3).module.css';
import cartIcon from '../img/Tote.svg';
import logowhite from '../img/logowhite.png';
import befooter from '../img/befooter.png';
import translate from '../img/Translate.svg';
import accountIcon from '../img/UserCircle (2).svg'

const BlogPage25Fashion3: Component = () => {
  const [activePage, setActivePage] = createSignal(3); // Set active page to 3

  // Data halaman dan path-nya
  const pages = [
    { number: 1, path: "/blogpage/25-fashion-tips-to-instantly-elevate-your-look/1" },
    { number: 2, path: "/blogpage/25-fashion-tips-to-instantly-elevate-your-look/2" },
    { number: 3, path: "/blogpage/25-fashion-tips-to-instantly-elevate-your-look/3" },
    { number: 4, path: "/blogpage/25-fashion-tips-to-instantly-elevate-your-look/4" },
    { number: 5, path: "/blogpage/25-fashion-tips-to-instantly-elevate-your-look/5" },
  ];
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
        <p>Want to level up your style effortlessly? Fashion is more than just clothes—it's about confidence, attitude, and knowing how to put the right pieces together. In this article, we'll explore five expert-approved fashion tips that will help you transform your everyday outfits into stunning, head-turning ensembles. From understanding color coordination to choosing the right accessories, these simple yet effective tricks will make a significant difference in your personal style.</p>
        <h1>25 Fashion Tips to Instantly Elevate Your Look</h1>

        <section class={styles.section}>
          <h2>11. Monochrome Magic</h2>
          <p>Head-to-Toe Color Wearing a single color from head to toe is a powerful way to look effortlessly put-together and chic. The key is to play with textures and shades.</p>
          <h3>How to Rock a Monochrome Look:</h3>
          <ul>
            <li>Mix Various Textures – Combinations like leather, wool, and lace are timeless, while bold hues like red or blue make a statement.</li>
            <li>Play with Different Shades – Lighter and darker variations of the same shade create visual interest.</li>
            <li>Use Accessories to Contrast – A statement belt, shoes, or bag in a slightly different tone adds depth to the outfit.</li>
            <li>Play with Layers – Layering within the same color family enhances sophistication.</li>
          </ul>
          <p>Example: A cream-colored cashmere sweater and a matching coat with camel boots creates an effortlessly refined look.</p>
        </section>

        <section class={styles.section}>
          <h2>12. Statement Outerwear</h2>
          <p>Elevate Any Outfit A great coat or jacket has the power to transform an ordinary outfit into something striking and luxurious.</p>
          <h3>How to Choose the Right Outerwear:</h3>
          <ul>
            <li>Invest in Timeless Pieces – A well-structured trench coat, leather jacket, and tailored blazer never go out of style.</li>
            <li>Pay Attention to Cut – Ensure the garment fits perfectly through the shoulders for a high-quality appearance.</li>
            <li>Experiment with Colors – A pop of color in outerwear can brighten even the simplest outfit.</li>
            <li>Play Around with Length – A well-proportioned coat can elongate and create presence.</li>
          </ul>
          <p>Example: A vibrant red wool coat over an all-black ensemble can turn a basic look into a fashion-forward statement.</p>
        </section>

        <section class={styles.section}>
          <h2>13. The Power of Accessories</h2>
          <p>Small Details, Big Impact Even the simplest outfits can be transformed with the right accessories.</p>
          <h3>How to Accessorize Like a Pro:</h3>
          <ul>
            <li>Follow the Rule of Three – A statement watch, a chic belt, or bold earrings; three accessory items create balance.</li>
            <li>Mix Metals Carefully – Gold and silver around the neck or on a focal accessory creates interest and versatility.</li>
            <li>Scale Accessories to Your Frame – Petite frames suit smaller, delicate pieces, while tall frames can complement bolder than complex.</li>
            <li>Match Metals and Textures – Keeping jewelry in a similar tone creates cohesion.</li>
          </ul>
          <p>Example: A little black dress paired with gold earrings, a sleek watch, and subtle rings creates an impressive elegance.</p>
        </section>

        <section class={styles.section}>
          <h2>14. The Right Fabrics</h2>
          <p>Quality Over Quantity The fabrics of your clothing can determine how polished and expensive your outfit appears.</p>
          <h3>How to Choose Quality Fabrics:</h3>
          <ul>
            <li>Prioritize Natural Fibers – Wool, cashmere, silk, and linen look and feel luxurious.</li>
            <li>Avoid Cheap Synthetics – Fabrics that shimmer can look inexpensive and wear out quickly.</li>
            <li>Understand Fabric Weight – Heavier materials often drape better and appear more premium.</li>
            <li>Check Fabric Composition – A mix of natural and synthetic fibers can offer durability while maintaining a high-end appearance.</li>
          </ul>
          <p>Example: A high-quality wool coat will always look more polished and put-together than its synthetic alternative.</p>
        </section>

        <section class={styles.section}>
          <h2>15. Dressing for Your Body Type</h2>
          <p>Know Your Figure Understand your body shape helps in selecting clothing that enhances your best features.</p>
          <h3>How to Dress for Your Shape:</h3>
          <ul>
            <li>Pear Shape: A-line skirts and structured tops balance proportions.</li>
            <li>Apple Shape: Empire waistlines and V-necks create elongation.</li>
            <li>Hourglass: Fitted clothing highlights your natural curves.</li>
            <li>Rectangle Shape: Layering and textured details add definition.</li>
          </ul>
          <p>Example: A wrap dress universally flattering on all body types but is worn elegantly.</p>
          <br></br>
          <p>Looking stylish isn't about following every trend—it's about curating your own aesthetic. By investing in timeless essentials, embracing your unique body shape, playing with fabric contrasts, paying attention to thoughtful accessories, and styling your grooming habits, you can elevate your everyday look with ease.</p>
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

export default BlogPage25Fashion3;