import { Component, onMount, createSignal } from 'solid-js';
import { useNavigate, useSearchParams } from "@solidjs/router";
import { createEffect, onCleanup } from "solid-js";
import { useLocation } from "@solidjs/router";
import heart from '../img/Heart.svg';
import heartfull from '../img/Heart (1).svg';
import logo from '../img/logo.png';
import styles from './blogpageeffortlesschic(2).module.css';
import cartIcon from '../img/Tote.svg';
import logowhite from '../img/logowhite.png';
import befooter from '../img/befooter.png';
import translate from '../img/Translate.svg';
import accountIcon from '../img/UserCircle (2).svg'

const EffortlessChic2: Component = () => {
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
          <button class="dash-account-btn" onClick={goToAccount}>
            <img src={accountIcon} alt="Account" />
          </button>
        </div>
      </header>
      {/* Hero Section */}
      <div class={styles.heroblog7}>
        <div class={styles.heroContentblog7}>
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
          <h2>Effortless Chic in Everyday Styling</h2>
          <p>Effortless chic is all about looking stylish with minimal effort, combining timeless fashion with a refined yet relaxed approach to dressing. This style embraces simplicity, clean lines, and high-quality basics that can be effortlessly mixed and matched for any occasion. Whether it's layering sophisticated outerwear, curating the perfect outfit for different settings, or carrying yourself with confidence, effortless chic is not just about the clothes—it’s a lifestyle. By focusing on well-tailored pieces, neutral color palettes, and understated elegance, you can create a wardrobe that is polished, versatile, and timeless.</p>
          <h3>1.  The Art of Effortless Layering</h3>
          <p>Layering is an essential technique in achieving an effortlessly chic look. When done correctly, layering adds depth and sophistication to an outfit while maintaining comfort and practicality. The key to mastering this technique lies in understanding fabric weight, texture pairing, and silhouette balance.</p>
          <p>Lightweight Outerwear: A well-chosen outer layer instantly elevates any ensemble. Some must-have options include:</p>
          <ul class="numbered-list-2">
            <li>Trench Coat: A timeless staple that adds structure to both casual and formal outfits. Opt for a neutral beige or classic black to maximize versatility.</li>
            <li>Structured Blazer: Whether worn over a dress, paired with jeans, or layered on top of a sweater, a tailored blazer provides instant polish.</li>
            <li>Classic Wool Coat: Perfect for cooler months, a long wool coat in camel or charcoal exudes effortless sophistication.</li>
          </ul>
          <br />
          <p>Mixing Textures: Combining different fabric types creates visual interest and enhances an outfit’s overall appeal. Consider these pairings:</p>
          <ul class="numbered-list-2">
            <li>Silk and Denim: A luxurious silk blouse tucked into structured jeans offers an elegant yet relaxed aesthetic.</li>
            <li>Leather and Cashmere: A leather jacket layered over a soft cashmere sweater balances edge with refinement.</li>
            <li>Cotton and Wool: Lightweight cotton basics paired with wool outerwear create the perfect transitional look for changing seasons.</li>
          </ul>
          <p>Proportion is Key: Ensuring balanced proportions is crucial in layering to maintain a polished appearance:</p>
          <ul class="numbered-list-2">
            <li>If wearing a bulky sweater, offset it with slim-fitting trousers or leggings.</li>
            <li>A long coat pairs beautifully with a fitted dress or tailored pants for a sleek silhouette.</li>
            <li>Layering different lengths—such as a tunic over skinny jeans or a cropped jacket over a maxi dress—creates a harmonious and flattering look.</li>
          </ul>
          <p>By mastering these layering techniques, you can create an ensemble that is not only stylish but also functional, adapting seamlessly to different weather conditions and occasions.</p>
        </section>

        <section class={styles.section2}>
          <h3>2. Effortless Chic for Different Occasions</h3>
          <p>Effortless style is about curating outfits that suit various occasions while maintaining a polished and sophisticated appearance. Below are tailored outfit inspirations for different settings, ensuring you always look chic without excessive effort.</p>
          <p>Casual Day Out: For a relaxed yet stylish look, embrace effortless basics that offer both comfort and elegance:</p>
          <ul class="numbered-list-2">
            <li>A crisp white tee tucked into high-waisted jeans provides a clean and timeless foundation.</li>
            <li>A structured tote bag adds a refined touch while offering practicality.</li>
            <li>White sneakers or classic loafers keep the look laid-back yet polished.</li>
            <li>Minimal jewelry, such as delicate gold hoops or a thin bracelet, enhances the outfit without overpowering it.</li>
          </ul>
          <p>Office Chic: Looking effortlessly stylish in a professional setting requires a balance between sophistication and simplicity:</p>
          <ul class="numbered-list-2">
            <li>A well-tailored blazer instantly refines any outfit, whether paired with trousers or a pencil skirt.</li>
            <li>A silk or structured blouse exudes elegance while remaining work-appropriate.</li>
            <li>Classic pumps or sleek ankle boots provide a sophisticated finish.</li>
            <li>Minimal accessories, such as a leather belt or a structured handbag, complete the look without unnecessary distractions.</li>
          </ul>
          <p>Evening Elegance: For special occasions or formal events, opt for refined silhouettes and elevated details:</p>
          <ul class="numbered-list-2">
            <li>A sleek slip dress in a neutral or jewel tone exudes understated luxury.</li>
            <li>A cashmere wrap or tailored coat adds warmth while maintaining sophistication.</li>
            <li>Delicate heels or strappy sandals elongate the legs and add grace to the outfit.</li>
            <li>Statement accessories, such as an elegant clutch or drop earrings, introduce a touch of glamour without overwhelming the ensemble.</li>
          </ul>
          <p>By curating outfits that align with each occasion, you can ensure that your effortless chic aesthetic remains consistent across all aspects of life.</p>
        </section>

        <section class={styles.section2}>
          <h3>3. Confidence and Attitude: The Final Touch</h3>
          <p>Effortless chic is not just about clothing—it’s about how you carry yourself. Confidence and self-assurance play a pivotal role in making any outfit look intentional and sophisticated. Here are some key aspects to embody the effortless chic attitude:</p>
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

export default EffortlessChic2;