import { Component, onMount, createSignal } from 'solid-js';
import { useNavigate } from "@solidjs/router";
import { createEffect, onCleanup } from "solid-js";
import { useLocation } from "@solidjs/router";
import heart from '../img/Heart.svg';
import heartfull from '../img/Heart (1).svg';
import logo from '../img/logo.png';
import styles from './blogpagepoweraccessories(3).module.css';
import cartIcon from '../img/Tote.svg';
import logowhite from '../img/logowhite.png';
import befooter from '../img/befooter.png';
import translate from '../img/Translate.svg';
import accountIcon from '../img/UserCircle (2).svg'

const PowerAccessories3: Component = () => {
  const [activePage, setActivePage] = createSignal(3); // Misalnya, halaman aktif saat ini adalah 2

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
          <h2>9. Brooches: The Underrated Statement Piece</h2>
          <p>Brooches are often overlooked in modern fashion, yet they possess an incredible ability to transform an outfit with elegance and personality. Once associated with vintage and formal wear, brooches have made a major comeback, proving to be one of the most versatile accessories. Whether pinned to a blazer, scarf, dress, or even a handbag, a brooch can serve as a focal point that elevates any look.</p>
          <p>One of the greatest strengths of brooches is their variety. They come in countless designs, from intricate floral patterns and vintage-inspired cameos to bold, modern geometric shapes and luxurious gemstone-encrusted pieces. Each brooch carries its own unique aesthetic, allowing wearers to personalize their outfits effortlessly. A delicate pearl brooch, for example, exudes sophistication and grace, while an oversized, colorful brooch can add a playful or artistic flair to a minimalistic ensemble.</p>
          <p>Brooches are also an excellent tool for enhancing the structure of an outfit. They can be strategically placed to gather fabric, create asymmetry, or add layers to an otherwise simple look. Some fashion-forward individuals use multiple brooches to create a cluster effect, turning an accessory into a statement centerpiece. Others opt for bold, single brooches that draw attention to specific areas, such as the shoulder or lapel, creating an eye-catching and intentional style.</p>
          <p>Furthermore, brooches have symbolic significance. Many people wear them to express their personalities, commemorate special occasions, or showcase heritage and tradition. Family heirloom brooches passed down through generations carry sentimental value, making them more than just decorative accessories. Regardless of how they are styled, brooches remain one of the most timeless and transformative accessories in fashion.</p>
        </section>

        <section class={styles.section2}>
          <h2>10. Gloves: A Touch of Elegance and Practicality</h2>
          <p>Gloves are not only functional for warmth and protection, but they also add a refined and stylish touch to any outfit. Once a staple in formal and aristocratic fashion, gloves continue to make a statement in both classic and contemporary wardrobes. They come in various styles, lengths, and materials, each offering a unique impact on an outfit.</p>
          <p>Long opera gloves, for instance, are synonymous with old Hollywood glamour and elegance. Often worn with evening gowns and formal attire, they bring an air of sophistication and drama to special occasions. Leather gloves, on the other hand, introduce an edgy, modern vibe, especially when paired with structured coats, sleek dresses, or monochromatic outfits. Short lace or satin gloves, frequently seen in bridal and vintage fashion, add a delicate and romantic element to formalwear.</p>
          <p>Beyond aesthetics, gloves can also serve as statement pieces through embellishments and detailing. Embroidered patterns, beaded designs, or fur-trimmed edges transform gloves into a luxurious accessory that enhances an overall look. Fingerless gloves, often associated with punk or rock-inspired fashion, provide a more rebellious, fashion-forward appeal while maintaining functionality.</p>
          <p>In colder seasons, gloves play an essential role in layering and styling. Wool or cashmere gloves add texture and contrast to winter coats, while touchscreen-compatible gloves ensure convenience without sacrificing style. When chosen thoughtfully, gloves have the power to complete an outfit, making them a must-have accessory for those who appreciate both practicality and fashion.</p>
        </section>
        <section class={styles.section2}>
          <h2>11. Anklets: Subtle Yet Stylish Footwear Accessories</h2>
          <p>Anklets, though often understated, have the ability to add a subtle touch of charm and personality to an outfit. Traditionally associated with bohemian and beachwear styles, anklets have evolved into a versatile accessory that complements various fashion aesthetics. Whether crafted from delicate chains, adorned with charms, or featuring bold statement designs, anklets enhance footwear choices and leg silhouettes.</p>
          <p>A simple gold or silver chain anklet exudes elegance and sophistication, subtly drawing attention to the ankles and enhancing a polished look. Beaded or woven anklets, on the other hand, contribute to a more relaxed, casual, and playful vibe, making them ideal for summer outfits and vacation ensembles. For those who prefer an edgier style, layered or multi-chain anklets with dangling charms or gemstones create an eye-catching effect that pairs well with heels, sandals, or even sneakers.</p>
          <p>Anklets also provide an opportunity to incorporate cultural and symbolic elements into fashion. Many cultures view anklets as a representation of femininity, strength, or spirituality. In Indian and Middle Eastern traditions, intricately designed anklets with bells or decorative details are worn as part of bridal and ceremonial attire. In modern fashion, anklets allow individuals to subtly express their personal style while adding a unique, fashionable twist to their overall look.</p>
          <p>Whether worn alone or layered with multiple designs, anklets serve as a delicate yet impactful accessory that enhances footwear and leg aesthetics. They prove that even the smallest details can make a big difference in transforming an outfit.</p>
        </section>
        <section class={styles.section2}>
          <h2>12. Cufflinks: The Ultimate Detail for Polished Style</h2>
          <p>Cufflinks are often associated with men’s formalwear, but they are an accessory that can elevate any tailored outfit, making them an essential element of sophisticated fashion. While primarily used to fasten the cuffs of dress shirts, cufflinks serve as both a functional and decorative statement piece that adds an extra layer of refinement and individuality.</p>
          <p>Traditional cufflinks, made from precious metals such as gold, silver, or platinum, exude a timeless elegance that complements business suits and formal attire. More contemporary designs, however, offer a wide range of creative expressions, featuring gemstones, enamel accents, or intricate engravings that showcase personal taste and style. Novelty cufflinks, shaped like miniature objects or adorned with pop culture references, allow wearers to inject humor and personality into their outfits.</p>
          <p>The versatility of cufflinks extends beyond formalwear. While commonly paired with tuxedos and dress shirts, they can also be integrated into smart-casual looks by styling them with blazers, vests, or even rolled-up sleeves for a more relaxed yet polished aesthetic. The choice of cufflink material and design can set the tone for an outfit—sleek and minimalist designs enhance a modern, professional appearance, while bold or vintage-inspired cufflinks add character and uniqueness.</p>
          <p>Additionally, cufflinks make for meaningful and luxurious accessories in personal collections. Many are passed down as family heirlooms or given as gifts to mark significant occasions such as weddings, graduations, or career milestones. Their small size and discreet nature allow for endless styling possibilities, proving that attention to detail is key in elevating any ensemble.</p>
          <p>From classic to contemporary, cufflinks remain a timeless accessory that showcases sophistication, making them a powerful yet often underrated element in men’s and women’s fashion alike.</p>
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

export default PowerAccessories3;