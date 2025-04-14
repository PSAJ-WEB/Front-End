import { Component, onMount, createSignal } from 'solid-js';
import { useNavigate, useSearchParams } from "@solidjs/router";
import { createEffect, onCleanup } from "solid-js";
import { useLocation } from "@solidjs/router";
import heart from '../img/Heart.svg';
import heartfull from '../img/Heart (1).svg';
import logo from '../img/logo.png';
import styles from './blogpagemixnmatch(2).module.css';
import cartIcon from '../img/Tote.svg';
import logowhite from '../img/logowhite.png';
import befooter from '../img/befooter.png';
import translate from '../img/Translate.svg';
import accountIcon from '../img/UserCircle (2).svg'

const BlogPageMixnMatch2: Component = () => {
  const [activePage, setActivePage] = createSignal(2); // Misalnya, halaman aktif saat ini adalah 2

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
        <p>A great outfit isn’t complete without the perfect bag. But how do you choose the right one? Whether you’re going for a chic, casual, or elegant look, the way you pair your bag with your outfit can elevate your style effortlessly. This article will guide you through the essentials of bag-outfit coordination, including color harmony, texture balance, and occasion-based selections. Learn how to make a statement with the perfect mix-and-match combinations!</p>

        <section class={styles.section2}>
          <h2>Texture & Material – Balancing Fabric and Finish</h2>
          <h3>1. The Role of Texture in Fashion</h3>
          <p>The texture of your bag can dramatically affect the overall aesthetic of your outfit. The right combination of textures adds depth and interest to your look. Common bag materials include:</p>
          <ul class="numbered-list-2">
            <li>Leather (genuine or synthetic): Adds a touch of luxury and elegance, ideal for formal settings and everyday sophistication.</li>
            <li>Canvas: A casual and durable choice, perfect for everyday wear, errands, or relaxed outfits.</li>
            <li>Satin or Velvet: Offers a refined and glamorous feel, suitable for evening wear and special occasions.</li>
            <li>Wicker or Straw: Best for summer outfits and beach looks, enhancing a light and breezy aesthetic.</li>
            <li>Patent Leather: A glossy finish that adds sophistication, often seen in structured handbags for high-fashion appeal.</li>
          </ul>
        </section>

        <section class={styles.section2}>
          <h3>2. Pairing Textures for a Cohesive Look</h3>
          <p>The texture of your bag plays a crucial role in creating a balanced and stylish outfit. Beyond just color and design, texture adds depth, contrast, and personality to your overall look. By thoughtfully pairing textures, you can elevate your style, making your outfit appear more refined and intentional. Whether you want to achieve a casual, elegant, or bold aesthetic, understanding how different materials interact helps you create a visually appealing and cohesive ensemble:</p>
          <ul>
            <li>Cotton or linen outfits work well with canvas or woven bags for a relaxed, effortless style.</li>
            <li>Satin or lace dresses pair beautifully with suede or velvet handbags for a touch of elegance and softness.</li>
            <li>A leather jacket and leather handbag create an edgy and coordinated ensemble, perfect for a bold fashion statement.</li>
            <li>Tweed blazers and structured leather bags convey sophistication and professionalism, making them ideal for office settings.</li>
            <li>Silk blouses or flowy fabrics contrast well with textured bags like embossed leather, creating an interesting visual effect.</li>
          </ul>
        </section>

        <section class={styles.section2}>
          <h3>3. Mistakes to Avoid in Texture Pairing</h3>
          <p>While texture mixing adds depth and dimension to your outfit, improper combinations can create visual discord and disrupt the overall harmony. To maintain a stylish and well-balanced look, here are key mistakes to avoid:</p>
          <ul>
            <li>Avoid excessive texture combinations that can make the outfit look cluttered and overwhelming.</li>
            <li>Heavy materials like thick leather can feel out of place in a breezy summer look, disrupting the seasonal harmony.</li>
            <li>Be mindful of occasion-based textures; a sequin handbag may not be appropriate for office wear or daytime events.</li>
            <li>Avoid pairing cheap-looking faux materials with high-end clothing, as it can detract from the overall aesthetic and create an imbalanced look.</li>
          </ul>
          <br />
          <p>By keeping these texture-mixing pitfalls in mind and mastering the art of texture pairing, you can elevate your outfit with well-thought-out combinations that enhance both style and sophistication. Thoughtful texture choices not only add depth and visual appeal but also create a lasting impression. Whether you’re aiming for relaxed charm, timeless elegance, bold confidence, or refined professionalism, selecting the right bag texture ensures a polished and cohesive look that takes your outfit to the next level.</p>
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

export default BlogPageMixnMatch2;