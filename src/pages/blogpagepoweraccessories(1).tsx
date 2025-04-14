import { Component, onMount, createSignal } from 'solid-js';
import { useNavigate } from "@solidjs/router";
import { createEffect, onCleanup } from "solid-js";
import { useLocation } from "@solidjs/router";
import heart from '../img/Heart.svg';
import heartfull from '../img/Heart (1).svg';
import logo from '../img/logo.png';
import styles from './blogpagepoweraccessories(1).module.css';
import cartIcon from '../img/Tote.svg';
import logowhite from '../img/logowhite.png';
import befooter from '../img/befooter.png';
import translate from '../img/Translate.svg';
import accountIcon from '../img/UserCircle (2).svg'

const PowerAccessories1: Component = () => {
  const [activePage, setActivePage] = createSignal(1); // Misalnya, halaman aktif saat ini adalah 2

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
          <h2>1. Statement Jewelry: Elevating Your Look Instantly</h2>
          <p>Jewelry plays a crucial role in transforming an outfit from casual to sophisticated. A well-chosen necklace, earrings, or bracelet can add depth, contrast, and visual appeal to your overall look. For example, a bold statement necklace can serve as the focal point of an outfit, drawing attention to your neckline and complementing the color scheme of your clothing. Chunky earrings or layered bracelets can also add a touch of elegance and personality to a simple ensemble.</p>
          <p>When choosing statement jewelry, consider the balance between your outfit and accessories. If you’re wearing a minimalist dress, a vibrant necklace with intricate detailing can add the right amount of drama. Conversely, if your clothing is already bold or patterned, opt for simpler jewelry to avoid an overwhelming look. Mixing metals and textures can also add dimension and make your accessories stand out without clashing.</p>
          <p>Another important factor to consider is the occasion. For formal events, elegant gemstone earrings or a pearl necklace can add a refined touch, while for casual outings, colorful beaded accessories or bohemian-style pieces can create a relaxed yet fashionable vibe. Statement jewelry allows you to experiment with different styles, making it a powerful tool for transforming any outfit effortlessly.</p>
        </section>

        <section class={styles.section2}>
          <h2>2. Handbags: The Ultimate Functional Fashion Statement</h2>
          <p>Handbags are more than just a place to store essentials—they are one of the most defining accessories in fashion. The right handbag can elevate an outfit, complement a specific style, and even serve as a status symbol. Whether minimalist, trendy, or classic, handbags play a vital role in completing a look.</p>
          <p>Tote bags, for example, are perfect for an elegant yet practical everyday look. Their spacious design allows for carrying essentials, making them ideal for work, shopping, or travel. Leather tote bags, in particular, add a sophisticated touch that pairs well with both casual and business attire.</p>
          <p>Crossbody bags are another versatile option, providing hands-free convenience while maintaining a stylish appeal. A sleek, structured crossbody bag in neutral tones can complement a polished outfit, while a bold-colored or patterned crossbody adds a fun and youthful touch.</p>
          <p>For formal occasions, clutches and evening bags are the go-to choices. Whether adorned with embellishments, metallic finishes, or unique shapes, these small yet impactful accessories bring elegance to evening wear. Pairing a clutch with a cocktail dress or gown ensures a refined and balanced look.</p>
          <p>Luxury handbags have also become symbols of status and investment. Designer bags from brands like Chanel, Hermès, or Louis Vuitton are often seen as timeless fashion statements that can be passed down through generations. Their craftsmanship, exclusivity, and iconic designs make them more than just accessories—they become heirlooms and fashion legacies.  No matter the style, handbags remain an essential accessory that reflects personal taste and enhances overall aesthetics. By carefully selecting the right bag for different occasions, anyone can transform a simple outfit into a well-curated fashion statement.</p>
        </section>
        <section class={styles.section2}>
          <h2>2. Handbags: The Ultimate Functional Fashion Statement</h2>
          <p>Handbags are more than just a place to store essentials—they are one of the most defining accessories in fashion. The right handbag can elevate an outfit, complement a specific style, and even serve as a status symbol. Whether minimalist, trendy, or classic, handbags play a vital role in completing a look.</p>
          <p>Tote bags, for example, are perfect for an elegant yet practical everyday look. Their spacious design allows for carrying essentials, making them ideal for work, shopping, or travel. Leather tote bags, in particular, add a sophisticated touch that pairs well with both casual and business attire.</p>
          <p>Crossbody bags are another versatile option, providing hands-free convenience while maintaining a stylish appeal. A sleek, structured crossbody bag in neutral tones can complement a polished outfit, while a bold-colored or patterned crossbody adds a fun and youthful touch.</p>
          <p>For formal occasions, clutches and evening bags are the go-to choices. Whether adorned with embellishments, metallic finishes, or unique shapes, these small yet impactful accessories bring elegance to evening wear. Pairing a clutch with a cocktail dress or gown ensures a refined and balanced look.</p>
          <p>Luxury handbags have also become symbols of status and investment. Designer bags from brands like Chanel, Hermès, or Louis Vuitton are often seen as timeless fashion statements that can be passed down through generations. Their craftsmanship, exclusivity, and iconic designs make them more than just accessories—they become heirlooms and fashion legacies.  No matter the style, handbags remain an essential accessory that reflects personal taste and enhances overall aesthetics. By carefully selecting the right bag for different occasions, anyone can transform a simple outfit into a well-curated fashion statement.</p>
        </section>
        <section class={styles.section2}>
          <h2>3. Glasses and Sunglasses: The Perfect Balance Between Fashion and Function</h2>
          <p>Glasses and sunglasses are some of the most versatile accessories in fashion. Not only do they serve a functional purpose—correcting vision or protecting the eyes from harmful UV rays—but they also have the power to completely transform an outfit, adding personality, sophistication, and even a hint of mystery. The right pair of glasses can elevate a look, making it more polished, stylish, or edgy, depending on the choice of frames, lenses, and styling.  Eyeglasses have evolved far beyond their utilitarian roots.</p>
          <p>Today, they are a fashion statement that reflects individual style and personality. Thick-rimmed, retro-style glasses exude a vintage intellectual aesthetic, while thin metal frames offer a minimalist and sophisticated touch. Cat-eye glasses add an element of drama and femininity, while round, wire-framed glasses create a more artistic and bohemian feel. The choice of frame shape and color can drastically alter how a person’s face is perceived, making glasses not just a necessity but a powerful fashion tool.</p>
          <p>Sunglasses, on the other hand, are one of the most effortlessly stylish accessories one can own. They can make an outfit appear more put-together in an instant, whether it’s a casual street-style look or an elegant, high-fashion ensemble. Aviators convey a cool and adventurous vibe, oversized frames add a touch of Hollywood glamour, and rectangular or geometric sunglasses offer a sleek, modern aesthetic. Sunglasses also allow for experimentation with lens tints—mirrored lenses provide an edgy and futuristic look, while gradient or colored lenses add playfulness and creativity to an outfit.  Another reason sunglasses are so transformative is their association with confidence and mystery. A pair of well-chosen sunglasses can enhance facial features, hide imperfections, or even create an air of intrigue. </p>
          <p>This is why celebrities, influencers, and fashion icons frequently use sunglasses as their go-to accessory for completing a polished and impactful look.  For those who wear prescription glasses, having multiple pairs with different styles and colors can add variety to their wardrobe. Transition lenses or clip-on sunglasses provide both convenience and versatility, ensuring that eyewear remains a central element of fashion rather than just a necessity. Ultimately, whether worn for vision correction or sun protection, glasses and sunglasses have an undeniable ability to transform any outfit into something striking and memorable.</p>
        </section>
        <section class={styles.section2}>
          <h2>4. Belts: The Subtle Yet Powerful Outfit Enhancer</h2>
          <p>Belts are often seen as practical accessories meant to hold up pants or cinch a dress, but they are far more than just functional items. A well-chosen belt has the power to redefine the shape and structure of an outfit, enhance proportions, and add an extra touch of detail that takes a look from ordinary to extraordinary. Despite their subtle nature, belts are one of the most impactful accessories in a wardrobe.</p>
          <p>One of the key ways belts transform an outfit is by creating definition at the waist. When worn with dresses, blazers, or oversized tops, a belt can instantly change the silhouette, adding structure and emphasizing an hourglass figure. Wide belts, for example, add a bold statement while creating a dramatic cinched effect, perfect for enhancing fitted dresses or long coats. Meanwhile, skinny belts provide a more delicate touch, subtly refining an outfit without overpowering it.</p>
          <p>Belts also serve as a tool for adding contrast to an outfit. A brightly colored belt can break up a monochrome look, adding a pop of vibrancy, while a metallic or embellished belt can bring an element of glamour. Leather belts, whether classic black, brown, or in a unique texture, introduce a polished and sophisticated element to both casual and formal wear. On the other hand, woven or fabric belts contribute to a more relaxed, bohemian aesthetic.</p>
          <p>Another way belts can transform an outfit is through layering. Belts can be worn over cardigans, long coats, or even blazers to create a high-fashion appearance. This technique is frequently seen on runways and in street style, where belted outerwear adds refinement and complexity to a look. Layering belts with different accessories, such as chains or scarves, can further enhance depth and texture in an outfit. </p>
          <p>In addition to traditional waist belts, statement belts—such as corset belts, chain belts, and double-buckle designs—offer a way to make a bold fashion statement. Corset belts, for example, bring a vintage and dramatic touch to an outfit, while chain belts add a glamorous, edgy feel. Whether classic, minimal, or avant-garde, belts remain one of the easiest and most effective ways to enhance an outfit without requiring a complete wardrobe change.</p>
          <br />
          <p>Accessories are the ultimate game-changers in fashion. They allow you to personalize your style, enhance your outfits, and make a statement without needing an entirely new wardrobe. By mastering the art of accessorizing through statement jewelry, handbags, sunglasses, belts, and scarves, you can transform even the simplest outfit into something extraordinary. The next time you put together an outfit, remember that the right accessories can elevate your look, boost your confidence, and showcase your unique sense of style.</p>
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

export default PowerAccessories1;