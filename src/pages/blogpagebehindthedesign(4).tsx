import { Component, onMount, createSignal } from 'solid-js';
import { useNavigate, useSearchParams} from "@solidjs/router";
import { createEffect, onCleanup } from "solid-js";
import { useLocation } from "@solidjs/router";
import heart from '../img/Heart.svg';
import heartfull from '../img/Heart (1).svg';
import logo from '../img/logo.png';
import styles from './blogpagebehindthedesign(4).module.css';
import cartIcon from '../img/Tote.svg';
import logowhite from '../img/logowhite.png';
import befooter from '../img/befooter.png';
import translate from '../img/Translate.svg';
import accountIcon from '../img/UserCircle (2).svg';
import profile from '../img/UserCircle (2).svg';


const BehindtheDesign4: Component = () => {
  const [activePage, setActivePage] = createSignal(4); // Misalnya, halaman aktif saat ini adalah 2

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
    { number: 1, path: "/blogpage/behind-the-design/1" },
    { number: 2, path: "/blogpage/behind-the-design/2" },
    { number: 3, path: "/blogpage/behind-the-design/3" },
    { number: 4, path: "/blogpage/behind-the-design/4" },
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
      <div class={styles.heroblog4}>
        <div class={styles.heroContentblog4}>
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
        <h1>Behind the Design: The Inspiration Behind Our Collection</h1>
        <p>Every piece in our collection has a story. From concept to creation, our design process is driven by inspiration from global fashion trends, cultural influences, and timeless style. In this exclusive behind-the-scenes look, we’ll walk you through the journey of how our latest collection came to life—starting from mood boards, fabric selection, to the final product. Get an insider’s perspective on the creative process, and discover the passion behind every stitch and detail.</p>

        <section class={styles.section2}>
          <h2>Bringing It to Life: The Final Production and Finishing Touches</h2>
          <p>Once the prototypes are perfected through extensive refinement and testing, the designs transition to full-scale production—a process where meticulous craftsmanship, precision engineering, and unwavering quality control come together to bring our vision to life. This phase is not just about manufacturing garments; it is about preserving the integrity of each design while ensuring consistency, durability, and a flawless finish. Our production process is a carefully orchestrated sequence of steps, each playing a crucial role in transforming raw materials into exquisite fashion pieces. From fabric cutting to final packaging, every detail is handled with the utmost care to maintain the standards of excellence that define our brand.</p>
          <h3>1. Precision Manufacturing: Turning Designs into Reality</h3>
          <p>Fabric is the foundation upon which every garment is built. It dictates not only the appearance of a piece but also how it feels against the skin, how it moves with the body, and how it ages over time. Each collection has its own unique identity, and fabric selection plays a critical role in reinforcing that identity. Whether a collection is designed to exude effortless elegance, structured sophistication, or relaxed minimalism, the chosen textiles must align seamlessly with the overarching theme.</p>
          <p>Beyond aesthetics, the tactile experience is equally important. Fashion is not just visual—it is sensory. A soft cashmere sweater should envelop the wearer in warmth, a silk evening gown should glide effortlessly with each step, and a crisp cotton shirt should provide breathability and comfort. This intimate interaction between fabric and wearer is what elevates fashion from mere clothing to an immersive experience.</p>
          <ul class="numbered-list-2">
            <li>Cutting, The Foundation of Every Garment : Precision cutting is the first critical step in production. Using advanced technology alongside traditional craftsmanship, our manufacturing partners meticulously cut each fabric panel according to the finalized patterns. Accuracy at this stage is essential, as even the smallest miscalculation can affect the final fit and structure of the garment. To maximize efficiency and minimize waste, cutting layouts are carefully planned. Sustainable practices are integrated into this process, ensuring that fabric remnants are either repurposed for smaller accessories or recycled responsibly.</li>
            <li>Stitching and Construction, The Art of Craftsmanship : Once the fabric pieces are cut, they move into the hands of expert seamstresses and tailors who bring the designs to life through precise stitching and assembly. Every seam is carefully sewn to ensure structural integrity while maintaining the intended flow and movement of the garment. </li>
          </ul>
          <br />
          <p>Our production teams utilize a blend of traditional sewing techniques and modern machinery to achieve impeccable construction. Delicate materials require specialized handling, while more structured designs demand reinforced stitching for durability. At this stage, details such as pleats, darts, and linings are meticulously executed to enhance both aesthetics and comfort. Hand-finishing techniques are incorporated where necessary, particularly for intricate embellishments, embroidery, and couture-like detailing. This ensures that each piece is a true work of art, bearing the signature quality that distinguishes our collections.</p>
        </section>

        <section class={styles.section2}>
          <h3>2. Quality Control: Ensuring Perfection in Every Piece</h3>
          <p>Quality control is a fundamental aspect of our production process, implemented at multiple stages to guarantee flawless craftsmanship. Every garment undergoes rigorous inspections to identify and correct any imperfections before it reaches our customers.</p>
          <ul class="numbered-list-2">
            <li>Fit and Fabric Performance Testing : To maintain consistency across sizes, sample garments are tested on different body types to ensure a universally flattering fit. Fabric performance is also assessed, evaluating how materials behave under various conditions such as stretching, washing, and prolonged wear.</li>
            <li>Structural Integrity and Stitching Inspection : Each garment is examined for stitching accuracy, seam strength, and overall construction. Loose threads, uneven seams, or misaligned patterns are promptly addressed to ensure that every detail meets our high standards.</li>
            <li>Final Pressing and Finishing : Before garments are packaged, they undergo a meticulous finishing process that includes pressing, steaming, and final touch-ups. This ensures that each piece maintains its intended silhouette and is presented in pristine condition. Buttons, zippers, and other fastenings are reinforced to enhance durability.</li>
          </ul>
        </section>

        <section class={styles.section2}>
          <h3>3. The Finishing Touches: Elevating the Customer Experience</h3>
          <p>Beyond construction, the final touches play a significant role in defining the luxury and exclusivity of our collection. Branding elements and thoughtful packaging are carefully curated to reflect the essence of our brand.</p>
          <ul class="numbered-list-2">
            <li>Signature Branding and Personalization : Each garment is adorned with custom labels, signature tags, and artisanal branding elements that distinguish our pieces from the ordinary. Whether through embossed logos, signature stitching, or handcrafted embellishments, these finishing details elevate the overall experience and reinforce the uniqueness of every design.</li>
            <li>Eco-Friendly and Luxurious Packaging : We believe that presentation is just as important as the product itself. Our commitment to sustainability extends to our packaging, where we utilize eco-friendly materials that minimize environmental impact without compromising on elegance. From reusable garment bags to biodegradable boxes, every detail is designed to enhance the unboxing experience while reflecting our dedication to responsible fashion.</li>
          </ul>
        </section>

        <section class={styles.section2}>
          <h3>4. A Testament to Excellence</h3>
          <p>From the initial spark of inspiration to the final masterpiece, our design journey is driven by passion, innovation, and an unwavering commitment to excellence. Each piece in our collection embodies a meticulous fusion of artistry and technical precision, ensuring that our customers receive garments of the highest quality.</p>
          <br />
          <p>The journey from concept to creation is a labor of love—one that honors tradition while embracing modern advancements. Through exceptional craftsmanship, rigorous quality control, and thoughtful presentation, we bring to life designs that not only celebrate beauty and sophistication but also stand the test of time.</p>
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

export default BehindtheDesign4;