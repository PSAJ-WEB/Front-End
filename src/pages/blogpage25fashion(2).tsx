import { Component, onMount, createSignal } from 'solid-js';
import { useNavigate, useSearchParams } from "@solidjs/router";
import { createEffect, onCleanup } from "solid-js";
import { useLocation } from "@solidjs/router";
import heart from '../img/Heart.svg';
import heartfull from '../img/Heart (1).svg';
import logo from '../img/logo.png';
import styles from './blogpage25fashion(2).module.css';
import cartIcon from '../img/Tote.svg';
import logowhite from '../img/logowhite.png';
import befooter from '../img/befooter.png';
import translate from '../img/Translate.svg';
import accountIcon from '../img/UserCircle (2).svg';
import profile from '../img/UserCircle (2).svg';

const BlogPage25Fashion2: Component = () => {
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
  const [profileImage, setProfileImage] = createSignal<string | null>(null);
  const userId = searchParams.user_id;
  const [onlineUsers, setOnlineUsers] = createSignal([]);
  const accountIcon = profile;


  const fetchUserProfile = async () => {
    if (!userId) return;

    try {
      const response = await fetch(`http://127.0.0.1:8080/user/${userId}`);
      if (response.ok) {
        const data = await response.json();
        if (data.img) {
          setProfileImage(`http://127.0.0.1:8080/uploads/${data.img}`);
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

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
          <div class="dash-account-btn" onClick={goToAccount}>
            <img
              src={profileImage() || accountIcon}
              alt="Account"
              style={{
                width: '32px',
                height: '32px',
                "border-radius": '50%',
                "object-fit": 'cover',
                "border": '2px solid ' + (onlineUsers().some(u => u.id === userId) ? '#4CAF50' : '#ccc')
              }}
            />
            {onlineUsers().some(u => u.id === userId) && (
              <div class="online-status-dot"></div>
            )}
          </div>
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
          <h2>6. Layering Done Right</h2>
          <p>Mastering the Art of Depth Layering isn’t just for keeping warm—it’s a strategic way to add depth and dimension to your outfits. When done correctly, layering can create a sophisticated and effortlessly stylish look.</p>
          <h3>How to Layer Like a Fashion Pro:</h3>
          <ul class="numbered-list">
            <li>Stick to Lightweight Fabrics – Avoid bulkiness by layering thin, breathable fabrics like cotton, silk, and cashmere.</li>
            <li>Play with Lengths – Longer layers underneath shorter pieces add an interesting visual effect.</li>
            <li>Mix Textures – Pair leather with knits or silk with denim to create contrast and depth.</li>
            <li>Keep It Balanced – Avoid overwhelming your frame by limiting layers to three or four key pieces.</li>
          </ul>
          <p>Example: A fitted turtleneck under a tailored blazer with a structured coat draped over the shoulders creates an elegant, fashion-forward ensemble.</p>
        </section>

        <section class={styles.section}>
          <h2>7. The Magic of Tailoring</h2>
          <p>The Perfect Fit Matters A well-tailored outfit can make even affordable pieces look high-end. The right fit is key to achieving a polished and sophisticated look.</p>
          <h3>How to Nail the Perfect Fit:</h3>
          <ul>
            <li>Get Clothes Altered – Simple adjustments like hemming trousers or tapering a blazer can make a huge difference.</li>
            <li>Know Your Measurements – Understanding your body proportions helps in selecting flattering cuts.</li>
            <li>Prioritize Tailored Pieces – Invest in structured blazers, fitted trousers, and A-line skirts that complement your shape</li>
            <li>Avoid Overly Tight or Baggy Fits – Clothes should skim your body without being restrictive or too loose.</li>
          </ul>
          <p>Example: A simple sheath dress that is perfectly tailored to your body looks far more elegant than an expensive but ill-fitting designer piece.</p>
        </section>

        <section class={styles.section}>
          <h2>8. Prints and Patterns</h2>
          <p>Mastering the Mix Adding prints and patterns to your wardrobe brings personality and uniqueness to your style. The key is knowing how to combine them effectively.</p>
          <h3>How to Style Prints Like a Pro:</h3>
          <ul>
            <li>Stick to a Common Color Scheme – Mixing different patterns works best when they share a similar color palette.</li>
            <li>Balance Bold and Subtle – Pair statement prints with neutral basics to avoid clashing.</li>
            <li>Experiment with Scale – Combine large patterns with smaller ones for a harmonious look.</li>
            <li>Use Prints Strategically – Vertical stripes elongate the body, while floral patterns add softness.</li>
          </ul>
          <p>Example: A striped blouse tucked into high-waisted floral trousers creates a trendy yet balanced aesthetic.</p>
        </section>

        <section class={styles.section}>
          <h2>9. The Power of Minimalism</h2>
          <p>Less is More Minimalist fashion is all about clean lines, neutral colors, and effortless elegance. It focuses on quality over quantity, ensuring a timeless wardrobe.</p>
          <h3>How to Embrace Minimalist Style:</h3>
          <ul>
            <li>Invest in Basics – Crisp white shirts, well-fitted jeans, and structured blazers are essentials.</li>
            <li>Stick to a Neutral Palette – Shades like black, white, beige, and gray create a sophisticated base.</li>
            <li>Focus on High-Quality Fabrics – Choose materials like wool, linen, and silk for an elevated look.</li>
            <li>Keep Accessories Simple – Opt for dainty jewelry, sleek bags, and classic watches.</li>
          </ul>
          <p>Example: A monochrome outfit consisting of a black turtleneck, tailored trousers, and sleek loafers exudes effortless sophistication.</p>
        </section>

        <section class={styles.section}>
          <h2>10. Revamp Your Denim</h2>
          <p>From Casual to Chic Denim is a wardrobe staple, but styling it correctly can make all the difference between looking basic and looking effortlessly chic.</p>
          <h3>How to Elevate Your Denim Looks:</h3>
          <ul>
            <li>Find the Perfect Fit – Straight-leg, wide-leg, or cropped styles offer a modern twist to classic jeans.</li>
            <li>Pair Denim with Elevated Pieces – Blazers, heels, and silk blouses instantly dress up denim.</li>
            <li>Experiment with Denim-on-Denim – A light-wash denim jacket over dark jeans creates a stylish contrast.</li>
            <li>Try Unconventional Denim – Denim dresses, jumpsuits, or structured denim blazers add variety to your wardrobe.</li>
          </ul>
          <p>Example: A classic white button-up shirt tucked into high-waisted vintage jeans, paired with pointed-toe heels, creates a refined yet casual look.</p>
          <br></br>
          <p>Enhancing your fashion sense as a driver for details. By presenting opening techniques, mixing textures. Obviously well-fitted pieces, incorporating statement acceptations, and translating programming, you can create alternative styles which link these into a lasting impression.</p>
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

export default BlogPage25Fashion2;