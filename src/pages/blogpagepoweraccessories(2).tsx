import { Component, onMount, createSignal } from 'solid-js';
import { useNavigate, useSearchParams} from "@solidjs/router";
import { createEffect, onCleanup } from "solid-js";
import { useLocation } from "@solidjs/router";
import heart from '../img/Heart.svg';
import heartfull from '../img/Heart (1).svg';
import logo from '../img/logo.png';
import styles from './blogpagepoweraccessories(2).module.css';
import cartIcon from '../img/Tote.svg';
import logowhite from '../img/logowhite.png';
import befooter from '../img/befooter.png';
import translate from '../img/Translate.svg';
import accountIcon from '../img/UserCircle (2).svg'

const PowerAccessories2: Component = () => {
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
          <h2>5. Shoes: The Foundation of a Great Outfit</h2>
          <p>Shoes are more than just functional items—they have the power to define an outfit and dramatically change how it is perceived. The right pair of shoes can elevate a casual look to the next level or tone down an overly formal outfit to make it more approachable. Beyond their practical use, shoes serve as a statement piece that reflects an individual’s style, mood, and even personality.</p>
          <p>One of the most important factors in choosing shoes is understanding the occasion. Sneakers, for example, provide comfort and a laid-back appeal, making them perfect for casual outings or street-style fashion. When paired with jeans, joggers, or even a dress, a good pair of sneakers can add an effortless, trendy vibe. On the other hand, high heels instantly add sophistication and elegance, making them an excellent choice for formal events, business meetings, or special occasions. A pair of classic black pumps can make a simple dress look luxurious, while strappy heels can add an element of allure to an evening outfit.</p>
          <p>Boots are another versatile footwear option that can completely transform an outfit. Ankle boots paired with skinny jeans and a leather jacket exude a chic and edgy aesthetic, while knee-high boots can add drama and sophistication to skirts and dresses. Meanwhile, combat boots have surged in popularity for their ability to bring a bold, rebellious touch to even the most feminine of outfits.</p>
          <p>For those who prefer a more relaxed yet stylish approach, loafers and flats offer an ideal balance between comfort and elegance. Loafers, especially in leather or suede, can make casual outfits look more refined, whereas ballet flats provide a classic, timeless charm that pairs well with both office wear and weekend ensembles.</p>
          <p>Footwear also allows for creativity in color and design. While neutral tones like black, white, and beige offer versatility, bold-colored or patterned shoes can serve as the statement piece of an outfit. A pop of red, a metallic finish, or animal prints can bring personality to an otherwise monochromatic look, making shoes a subtle yet powerful tool for self-expression.</p>
        </section>

        <section class={styles.section2}>
          <h2>6. Hats: The Underrated Fashion Game-Changer</h2>
          <p>Hats are one of the most overlooked yet impactful accessories in fashion. While they are often associated with practicality—such as shielding from the sun or keeping warm in colder months—they also serve as a powerful fashion statement. The right hat can instantly elevate an outfit, adding personality, elegance, or edge.</p>
          <p>One of the most iconic and versatile hats is the fedora. A well-structured fedora in classic colors like black, beige, or navy can bring an air of sophistication and mystery to any outfit. Whether paired with a trench coat for a refined, old-Hollywood look or with ripped jeans and a leather jacket for a modern, edgy aesthetic, the fedora remains a timeless fashion staple.</p>
          <p>For those looking for a more casual yet stylish option, beanies offer warmth and comfort while enhancing street-style fashion. Worn with oversized sweaters, denim jackets, or even dresses, beanies add a laid-back, effortlessly cool vibe. Similarly, bucket hats have made a huge comeback in contemporary fashion, embraced by streetwear enthusiasts for their youthful and playful appeal.</p>
          <p>Wide-brimmed hats, such as floppy sun hats or Panama hats, are perfect for summer fashion. Not only do they provide sun protection, but they also exude an air of elegance and vacation-ready charm. Pairing a wide-brimmed hat with a flowy maxi dress and sandals creates a perfect beach or resort look, while wearing it with a structured blazer adds a modern, high-fashion touch.</p>
          <p>Baseball caps, once purely functional, have now become a stylish accessory embraced by high-fashion brands and streetwear culture. Whether paired with athletic wear, casual denim, or even unexpected combinations like blazers and heels, baseball caps add an effortlessly cool element to an outfit.</p>
          <p>The key to wearing hats with confidence is understanding proportions and balance. A structured hat pairs well with streamlined silhouettes, while oversized or dramatic hats work best with minimalist outfits to keep the focus on the accessory. Hats have the unique ability to transform an outfit within seconds, making them an essential yet often underappreciated fashion tool.</p>
        </section>
        <section class={styles.section2}>
          <h2>7. Watches: Timeless Elegance and Sophistication</h2>
          <p>A watch is more than just a timepiece—it is a symbol of refinement, sophistication, and personal style. Whether minimalist or luxurious, a watch serves as a subtle yet powerful accessory that enhances any outfit. Unlike other accessories that may come and go with trends, watches have remained a timeless staple in the fashion world.</p>
          <p>For formal and professional settings, a classic leather-strap watch in black, brown, or navy exudes elegance and maturity. These watches pair well with business attire, adding a polished finishing touch to suits, blouses, or dresses. Similarly, metal watches, particularly in gold or silver, provide a luxurious appeal and are often considered status symbols in high fashion.</p>
          <p>For those who prefer a more casual aesthetic, minimalist watches with thin straps and sleek designs offer versatility and subtle elegance. Brands focusing on Scandinavian-style watches have popularized clean, simple designs that work well with both everyday outfits and dressier occasions.</p>
          <p>Smartwatches have also gained traction in modern fashion, seamlessly blending technology with style. While they serve a functional purpose by tracking fitness, notifications, and schedules, they also offer customization with interchangeable straps and digital displays, allowing users to adapt their watches to different outfits and moods.</p>
          <p>A watch can be more than just an accessory—it can be an heirloom, a statement of status, or a reflection of personality. Whether choosing a classic design or a trendy digital timepiece, a well-selected watch adds an element of sophistication and completion to any outfit.</p>
        </section>
        <section class={styles.section2}>
          <h2>8. Layering Accessories: Mixing and Matching for Maximum Impact</h2>
          <p>One of the most effective ways to transform an outfit is through layering accessories. Combining different textures, colors, and styles can create a dynamic and visually appealing look that showcases personal style and creativity.</p>
          <p>Layering necklaces is a popular technique that allows for customization and variety. Mixing different chain lengths, from chokers to long pendants, adds dimension and movement to an outfit. Delicate gold or silver chains can create a subtle, elegant effect, while incorporating statement pieces—such as gemstone pendants or beaded necklaces—can make an outfit bolder and more eye-catching.</p>
          <p>Stacking bracelets and rings is another way to experiment with layering. Wearing multiple bangles, cuffs, or charm bracelets on one wrist adds a bohemian and eclectic feel. Similarly, stacking rings in various metals or gemstone designs creates an intricate, stylish touch that enhances hand gestures and personal style.
            <br />Layering doesn’t stop at jewelry—scarves, belts, and even sunglasses can be layered for a more complex and polished outfit. A patterned scarf layered over a solid-colored coat or wrapped around a handbag handle introduces a chic and sophisticated element. Similarly, layering belts over dresses, blazers, or oversized shirts can redefine silhouettes and add structure to an outfit.</p>
          <p>The key to successful layering is finding balance. Mixing metals, textures, and colors can create depth and uniqueness, but overloading on accessories can result in a cluttered appearance. The goal is to create a harmonious blend that enhances the outfit rather than overpowering it.</p>
          <p>Mastering the art of layering accessories allows for endless styling possibilities. By thoughtfully combining different elements, anyone can create a distinctive and stylish look that transforms even the simplest outfits into fashion-forward ensembles.</p>
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

export default PowerAccessories2;