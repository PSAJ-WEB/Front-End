import { Component, onMount, createSignal } from 'solid-js';
import { useNavigate, useSearchParams} from "@solidjs/router";
import { createEffect, onCleanup } from "solid-js";
import { useLocation } from "@solidjs/router";
import heart from '../img/Heart.svg';
import heartfull from '../img/Heart (1).svg';
import logo from '../img/logo.png';
import styles from './blogpagemixnmatch(3).module.css';
import cartIcon from '../img/Tote.svg';
import logowhite from '../img/logowhite.png';
import befooter from '../img/befooter.png';
import translate from '../img/Translate.svg';
import accountIcon from '../img/UserCircle (2).svg'

const BlogPageMixnMatch3: Component = () => {
  const [activePage, setActivePage] = createSignal(3); // Misalnya, halaman aktif saat ini adalah 2

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
          <h2>Occasion-Based Selections – Choosing the Right Bag for Every Event</h2>
          <h3>1. Casual Looks: Tote Bags & Crossbody Bags</h3>
          <p>The texture and style of your bag play a key role in achieving a relaxed yet stylish everyday look: the right choice enhances both practicality and visual appeal, effortlessly elevating your outfit while ensuring comfort and ease of movement:</p>
          <ul class="numbered-list-2">
            <li>Best Outfit Matches: Denim jeans, sneakers, and oversized sweaters paired with a leather crossbody bag for a casual-chic appearance.</li>
            <li>Key Features: Spacious compartments, comfortable straps, and a lightweight design for on-the-go ease.</li>
            <li>Tip: Opt for soft, neutral colors or classic patterns that suit multiple outfits, ensuring effortless styling.</li>
          </ul>
        </section>

        <section class={styles.section2}>
          <h3>2. Formal & Elegant: Clutch & Structured Handbags</h3>
          <p>Formal occasions demand polished and sophisticated handbags. A well-chosen clutch or structured handbag enhances the elegance of dressier attire, adding an element of grace, refinement, and timeless sophistication while ensuring a cohesive and polished overall look:</p>
          <ul>
            <li>Best Outfit Matches: Evening gowns, cocktail dresses, or tailored suits with a minimalistic clutch for a refined look.</li>
            <li>Key Features: Compact size, elegant embellishments, and premium materials like satin or leather for a luxurious touch.</li>
            <li>Tip: Choose a handbag with metallic hardware or subtle embellishments for an added touch of elegance and glamour.</li>
          </ul>
        </section>

        <section class={styles.section2}>
          <h3>3. Office & Business Attire: Satchel & Shoulder Bags</h3>
          <p>For a professional setting, structured satchel bags and shoulder bags are excellent choices: they offer ample space to hold essential documents, gadgets, and daily necessities while maintaining a sleek, polished appearance that exudes confidence and sophistication:</p>
          <ul>
            <li>Best Outfit Matches: Blazers, pencil skirts, and tailored trousers with a leather satchel for a sophisticated yet practical business look.</li>
            <li>Key Features: Sturdy construction, multiple compartments, and an elegant yet functional design.</li>
            <li>Tip: Stick to classic colors like black, brown, or navy to ensure versatility and professionalism in any work environment.</li>
          </ul>
          <br />
          <p>By keeping these texture-mixing pitfalls in mind and mastering the art of texture pairing, you can elevate your outfit with well-thought-out combinations that enhance both style and sophistication. Thoughtful texture choices not only add depth and visual appeal but also create a lasting impression. Whether you’re aiming for relaxed charm, timeless elegance, bold confidence, or refined professionalism, selecting the right bag texture ensures a polished and cohesive look that takes your outfit to the next level.</p>
        </section>

        <section class={styles.section2}>
          <h3>4. Travel & Weekend Getaways: Backpacks & Oversized Bags</h3>
          <p>Traveling requires practicality, but that doesn’t mean sacrificing style: backpacks and oversized bags provide the perfect balance of fashion and function, offering ample storage, comfort, and versatility while keeping your look effortlessly chic and well-coordinated:</p>
          <ul>
            <li>Best Outfit Matches: Comfortable athleisure wear or maxi dresses paired with a sleek leather backpack for a trendy yet practical vibe.</li>
            <li>Key Features: Large capacity, durable material, and ergonomic straps for all-day comfort.</li>
            <li>Tip: Choose a bag with anti-theft features and multiple compartments for better organization and security while traveling.</li>
          </ul>
          <br />
          <p>By mastering the art of selecting the right bag for every occasion, you can elevate your style and confidence effortlessly. Whether casual, formal, or professional, the right bag can make all the difference in completing your perfect look!</p>
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

export default BlogPageMixnMatch3;