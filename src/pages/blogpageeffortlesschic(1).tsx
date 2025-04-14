import { Component, onMount, createSignal } from 'solid-js';
import { useNavigate, useSearchParams } from "@solidjs/router";
import { createEffect, onCleanup } from "solid-js";
import { useLocation } from "@solidjs/router";
import heart from '../img/Heart.svg';
import heartfull from '../img/Heart (1).svg';
import logo from '../img/logo.png';
import styles from './blogpageeffortlesschic(1).module.css';
import cartIcon from '../img/Tote.svg';
import logowhite from '../img/logowhite.png';
import befooter from '../img/befooter.png';
import translate from '../img/Translate.svg';
import accountIcon from '../img/UserCircle (2).svg';
import profile from '../img/UserCircle (2).svg';

const EffortlessChic1: Component = () => {
  const [activePage, setActivePage] = createSignal(1); // Misalnya, halaman aktif saat ini adalah 2

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
    { number: 1, path: "/blogpage/effortless-chic/1" },
    { number: 2, path: "/blogpage/effortless-chic/2" },
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
      <div class={styles.heroblog6}>
        <div class={styles.heroContentblog6}>
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
        <h1>Effortless Chic: How to Achieve a Timeless Look Without
          Trying Too Hard</h1>
        <p>Looking stylish doesn’t mean following every new trend. A timeless, effortlessly chic look is all about understanding classic fashion elements and incorporating them into your wardrobe in a way that feels natural. Whether you’re dressing for a casual day out or a sophisticated evening event, mastering the art of effortless chic will elevate your style with minimal effort.</p>

        <section class={styles.section2}>
          <h2>The Core Elements of an Effortlessly Chic Wardrobe</h2>
          <p>Effortless chic style is all about looking polished and refined without appearing overdone. It embodies a balance between simplicity and sophistication, where each piece is carefully selected to create a cohesive and timeless wardrobe. Building an effortlessly chic wardrobe requires a thoughtful approach to fashion—one that prioritizes quality, fit, and versatility. Below, we explore the fundamental elements that define this timeless aesthetic and how you can integrate them into your daily fashion choices.</p>
          <h3>1.  Invest in Classic Pieces</h3>
          <p>A timeless wardrobe starts with high-quality basics that never go out of style. These essentials serve as the foundation for any chic look, allowing you to mix and match effortlessly while maintaining a polished appearance. Here are the key investment pieces that every wardrobe should have:</p>
          <ul class="numbered-list-2">
            <li>A White Button-Down Shirt: This is a quintessential wardrobe staple that offers endless versatility. A crisp, well-tailored white shirt can be worn casually with jeans, elevated with a pencil skirt, or layered under a structured blazer for a more refined look. Opt for high-quality cotton or linen to ensure breathability and longevity.</li>
            <li>A Well-Fitted Blazer: A tailored blazer instantly elevates any outfit. Whether paired with jeans for a smart-casual aesthetic or worn over a dress for a more formal occasion, this piece is indispensable. Choose neutral tones like black, navy, or beige to maximize versatility, and pay attention to the cut to ensure a flattering silhouette.</li>
            <li>Tailored Trousers: A structured pair of trousers offers an effortlessly chic and put-together look. Whether wide-leg, straight-cut, or tapered, a good pair of tailored trousers can be styled for both casual and formal settings. Look for high-quality fabrics such as wool blends or structured cotton to maintain a sleek appearance.</li>
            <li>A Little Black Dress (LBD): A timeless and iconic staple, the LBD is the ultimate piece for effortless elegance. Choose a silhouette that flatters your body type, whether it’s a sheath dress, an A-line, or a wrap dress. The beauty of the LBD lies in its adaptability—it can be dressed up with statement jewelry and heels or dressed down with flats and a denim jacket.</li>
            <li>Quality Denim: Investing in high-quality denim is crucial for creating an effortlessly chic wardrobe. Dark-wash, straight-leg, or slim-cut jeans provide a flattering and versatile base for numerous outfits. Denim with a slight stretch offers comfort while maintaining a structured and sophisticated look.</li>
          </ul>
          <br />
          <p>When selecting these wardrobe staples, prioritize high-quality fabrics such as cotton, linen, wool, and silk. These materials ensure durability and a luxurious feel. Additionally, sticking to a neutral color palette—black, white, beige, navy, and gray—makes outfit coordination seamless and effortlessly stylish.</p>
        </section>

        <section class={styles.section2}>
          <h3>2. Embrace Minimalism and Simplicity</h3>
          <p>Effortless chic fashion follows the principle of "less is more." The goal is to create an understated yet sophisticated look without relying on excessive embellishments or complex layering. Here’s how you can achieve a minimalist and elegant wardrobe:</p>
          <ul class="numbered-list-2">
            <li>Stick to Clean Lines and Simple Silhouettes: Avoid overly elaborate or fussy designs. Instead, opt for structured yet comfortable clothing that enhances your natural shape without overwhelming your frame. Think tailored blazers, well-fitted sweaters, and streamlined dresses.</li>
            <li>Limit Accessories: Accessories should complement an outfit rather than overpower it. A few well-chosen pieces—such as a structured leather handbag, a delicate necklace, or a pair of timeless sunglasses—can elevate your look without appearing excessive.</li>
            <li>Opt for Monochrome or Neutral Color Palettes: Wearing solid colors or muted tones exudes a sense of sophistication and makes outfit coordination effortless. Neutral hues such as white, beige, gray, and black form the backbone of a versatile wardrobe, allowing you to mix and match with ease.</li>
            <li>Choose Timeless Footwear: The right shoes can complete an effortlessly chic outfit. Classic pumps, sleek leather loafers, and minimalist white sneakers are versatile options that blend style with comfort. Avoid overly trendy footwear that may quickly go out of fashion.</li>
          </ul>
          <p>By embracing minimalism and focusing on timeless elegance, you can achieve a polished and sophisticated look with minimal effort.</p>
        </section>

        <section class={styles.section2}>
          <h3>3. Prioritize Fit and Proportion</h3>
          <p>Looking effortlessly chic is not just about the clothes you wear—it’s about how they fit and flatter your body. Proper tailoring and proportion play a crucial role in achieving a refined and put-together appearance. Here are some key styling principles to consider:</p>
          <ul class="numbered-list-2">
            <li>Know Your Body Type: Understanding your proportions helps you choose silhouettes that enhance your best features. For example, A-line skirts flatter pear-shaped figures, while structured blazers create definition for those with a more straight-cut frame.</li>
            <li>Balance Loose and Fitted Pieces: Achieving the right balance between loose and tailored garments is key. If you’re wearing an oversized sweater, pair it with slim-cut trousers or a structured skirt to create contrast. Conversely, if you’re wearing wide-leg pants, opt for a more fitted top to maintain a streamlined silhouette.</li>
            <li>Avoid Overly Trendy Cuts: While it’s tempting to follow fashion trends, timeless style is built on well-fitted, classic cuts that never go out of fashion. Stick to structured blazers, tailored trousers, and clean-cut dresses that transcend seasonal trends.</li>
            <li>Tailoring is Essential: Even the most expensive piece of clothing can look unflattering if it doesn’t fit properly. Investing in alterations ensures that each garment fits your body perfectly, creating a polished and intentional look.</li>
          </ul>
          <br />
          <p>When selecting new pieces for your wardrobe, always consider fit and proportion. A well-tailored outfit exudes confidence and sophistication, making even the simplest look appear effortlessly chic.</p>
          <br />
          <p>Building an effortlessly chic wardrobe is about curating timeless pieces, embracing simplicity, and prioritizing fit. By investing in high-quality basics, focusing on clean lines, and ensuring proper tailoring, you can achieve a refined and sophisticated look with minimal effort. Remember, true style is not about excess—it’s about thoughtful curation, confidence, and elegance in simplicity. With these core elements in place, your wardrobe will serve as a foundation for effortless style that transcends fleeting trends.</p>
        </section>

        {/* Pagination */}
        <div class={styles.pagination}>
          {/* Tombol "Read Previous Article" */}
          <a href="/blogpage" class={styles.prevArticle} onClick={goToPreviousPage}>
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

export default EffortlessChic1;