import { Component, onMount, createSignal } from 'solid-js';
import { useNavigate, useSearchParams } from "@solidjs/router";
import { createEffect, onCleanup } from "solid-js";
import { useLocation } from "@solidjs/router";
import heart from '../img/Heart.svg';
import heartfull from '../img/Heart (1).svg';
import logo from '../img/logo.png';
import styles from './blogpagepoweraccessories(4).module.css';
import cartIcon from '../img/Tote.svg';
import logowhite from '../img/logowhite.png';
import befooter from '../img/befooter.png';
import translate from '../img/Translate.svg';
import accountIcon from '../img/UserCircle (2).svg'

const PowerAccessories4: Component = () => {
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
    { number: 1, path: "/blogpage/power-of-accessories/1" },
    { number: 2, path: "/blogpage/power-of-accessories/2" },
    { number: 3, path: "/blogpage/power-of-accessories/3" },
    { number: 4, path: "/blogpage/power-of-accessories/4" },
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
        <h1>The Power of Accessories: How to Transform Any Outfit</h1>
        <p>Accessories have the ability to take a simple outfit from basic to extraordinary. Whether it’s a bold statement necklace, a structured handbag, or the perfect pair of sunglasses, the right accessories can redefine your entire look. By understanding how to choose and style accessories effectively, you can elevate your fashion game and express your unique personality. Here are four key ways to transform any outfit with accessories.</p>

        <section class={styles.section2}>
          <h2>13.  Scarves: The Versatile and Timeless Statement Piece</h2>
          <p>Scarves are one of the most adaptable accessories in fashion, capable of transforming an outfit in countless ways. They add color, texture, and elegance while offering functionality in different seasons. Whether worn as a neckpiece, a head wrap, a belt, or even tied onto a handbag, scarves introduce creativity and sophistication to any look. </p>
          <p>One of the most traditional ways to wear a scarf is around the neck. A silk scarf draped loosely over a blouse or tucked into a blazer adds an air of effortless chic, often associated with French fashion. Meanwhile, a thick, knitted scarf wrapped around the neck in winter provides both warmth and style, elevating even the simplest coat-and-jeans combination.</p>
          <p>Scarves also make excellent head accessories. A patterned silk scarf tied around the head creates a vintage-inspired look reminiscent of Hollywood icons, while a bandana-style wrap contributes to a trendy, bohemian aesthetic. In addition, scarves can be tied into a ponytail or used as a hairband to add a feminine, playful element to an outfit.  </p>
          <p>Beyond wearing scarves traditionally, they can be used creatively as belts or bag accessories. A thin scarf tied around the waist as a belt adds a unique and artistic touch, while looping a scarf through the handle of a handbag introduces color and flair. This subtle styling trick can make even the most basic outfits appear more polished and intentional.</p>
          <p>The material and pattern of a scarf also play a significant role in its impact. Lightweight silk scarves work well in warmer weather, while wool or cashmere scarves provide luxurious comfort in colder months. Vibrant prints and intricate patterns add energy to an outfit, while solid neutral tones offer timeless sophistication. The possibilities are endless, making scarves one of the most valuable accessories in any fashion enthusiast’s collection.</p>
        </section>

        <section class={styles.section2}>
          <h2>14. Necklace: The Statement Piece That Elevates Every Look</h2>
          <p>A necklace is one of the most elegant and impactful accessories in fashion. It has the ability to draw attention to the neckline, enhance the overall composition of an outfit, and add a touch of luxury or sophistication. Whether it's a delicate pendant, a bold statement piece, or layers of fine chains, necklaces can instantly transform a simple look into something extraordinary.</p>
          <p>For a minimal and refined aesthetic, a single gold or silver chain with a small pendant exudes timeless elegance, making it perfect for everyday wear. Pearls, often associated with grace and sophistication, offer a classic touch that elevates any outfit, from a crisp white blouse to a formal evening gown. Chunky statement necklaces, on the other hand, bring drama and personality, becoming the focal point of an ensemble and allowing even the simplest outfits—such as a black dress or a neutral top—to stand out.</p>
          <p>Layering multiple necklaces is another way to create a dynamic and stylish effect. Mixing different chain lengths, textures, and materials adds depth and an effortlessly chic vibe to an outfit. Whether styled over a turtleneck in colder months or with a plunging neckline for an elegant evening look, necklaces hold the power to redefine and elevate an outfit instantly.</p>
        </section>
        <section class={styles.section2}>
          <h2>15. Ring: The Subtle Yet Luxurious Accessory That Speaks Volumes</h2>
          <p>Rings may be small in size, but they have a powerful impact on fashion. They are symbols of elegance, status, and personal style, capable of adding subtle sophistication or bold glamour to any outfit. Whether it's a single statement ring or an arrangement of stacked bands, rings offer versatility and individuality.</p>
          <p>A single, high-quality ring—such as a solitaire diamond or a delicately crafted band—brings refinement and luxury without overpowering a look. Rings with intricate designs, unique gemstones, or vintage influences add an artistic and personal touch. Signet rings, once associated with aristocracy, have made a resurgence as a stylish unisex accessory that conveys confidence and sophistication.</p>
          <p>Ring stacking has become a modern way to accessorize, allowing for creativity in combining various metals, stones, and designs. A mix of thin gold and silver bands creates an elegant and effortless look, while stacking multiple gemstone rings adds color and vibrancy. The placement of rings also plays a role in style—wearing multiple rings on one hand creates a bold statement, while a single ring worn delicately on the pinky or index finger exudes subtle charm.</p>
          <p>Beyond aesthetics, rings often hold sentimental value, making them one of the most personal accessories. Whether a family heirloom, a symbol of commitment, or a simple addition to daily wear, rings enhance not only an outfit but also the wearer's confidence and self-expression.</p>
        </section>
        <section class={styles.section2}>
          <h2>16. Hair Clip: The Chic and Practical Detail That Elevates Hairstyles</h2>
          <p>Hair clips are no longer just functional accessories—they have evolved into statement pieces that can enhance and transform an entire outfit. Whether adorned with pearls, crystals, or metallic finishes, the right hair clip adds an air of sophistication and refinement.</p>
          <p>Classic pearl hair clips bring an element of vintage glamour, perfect for pairing with elegant dresses or formal attire. Crystal-embellished clips catch the light beautifully, making them an ideal choice for evening wear or special occasions. Metallic barrettes in gold, silver, or rose gold tones provide a sleek and polished look, complementing both casual and sophisticated ensembles.</p>
          <p>Hair clips can also be styled in various ways to create different aesthetics. Clipping one side of the hair back with a decorative barrette instantly elevates a simple hairstyle, while using multiple clips in a symmetrical fashion creates a bold and fashionable statement. For an effortless yet stylish approach, pairing a hair clip with soft waves or a sleek ponytail adds structure and elegance without overpowering the outfit.</p>
          <p>Beyond aesthetics, hair clips offer a practical function by keeping hair neatly in place, making them a go-to accessory for both everyday and formal looks. Whether minimal or extravagant, a well-chosen hair clip enhances overall style with a touch of effortless glamour.</p>
        </section>
        <section class={styles.section2}>
          <h2>17. Bando: The Effortlessly Chic Accessory That Completes a Look</h2>
          <p>A bando, or headband, is one of the most versatile accessories that seamlessly blends fashion and function. It serves as a finishing touch that frames the face, enhances hairstyles, and adds personality to an outfit. Whether adorned with embellishments, made from luxurious fabrics, or kept simple and sleek, a bando can transform even the most basic look into something sophisticated and chic.</p>
          <p>Silk and velvet headbands evoke a sense of old-Hollywood elegance, pairing beautifully with structured coats, dresses, or monochrome outfits. Embellished headbands featuring pearls, beads, or metallic accents bring a regal and luxurious touch, making them perfect for evening events or special occasions. Minimalist headbands in solid colors provide a polished and put-together appearance, suitable for both professional settings and casual outings.</p>
          <p>The way a bando is styled also plays a crucial role in its impact. A wide, padded headband can create a bold, fashion-forward look, while a slim, delicate headband adds subtle elegance. Worn with loose curls, a sleek ponytail, or a messy bun, a bando enhances a hairstyle with effortless charm and sophistication.</p>
          <p>Beyond its aesthetic appeal, a bando is also a practical accessory, keeping hair neatly in place while adding an element of style. Whether opting for a classic, statement, or contemporary design, the right bando is a powerful finishing touch that elevates any outfit with grace and confidence.</p>
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

export default PowerAccessories4;