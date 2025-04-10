import { Component, onMount, createSignal } from 'solid-js';
import { useNavigate } from "@solidjs/router";
import { createEffect, onCleanup } from "solid-js";
import { useLocation } from "@solidjs/router";
import logo from '../img/logo.png';
import styles from './blogpagebehindthedesign(3).module.css';
import cartIcon from '../img/Tote.svg';
import logowhite from '../img/logowhite.png';
import befooter from '../img/befooter.png';
import translate from '../img/Translate.svg';
import accountIcon from '../img/UserCircle (2).svg'

const BehindtheDesign3: Component = () => {
  const [activePage, setActivePage] = createSignal(3); // Misalnya, halaman aktif saat ini adalah 2

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
        <div class={styles.metadata}>September 12, 2025 👁️ 3 mins read</div>
        <p>Every piece in our collection has a story. From concept to creation, our design process is driven by inspiration from global fashion trends, cultural influences, and timeless style. In this exclusive behind-the-scenes look, we’ll walk you through the journey of how our latest collection came to life—starting from mood boards, fabric selection, to the final product. Get an insider’s perspective on the creative process, and discover the passion behind every stitch and detail.</p>

        <section class={styles.section2}>
          <h2>The Design and Prototyping Process: From Sketch to Sample</h2>
          <p>With the finest fabrics in hand, the creative vision begins to take physical form through the intricate design and prototyping process. This stage is where artistry meets precision, transforming conceptual ideas into tangible pieces that embody our brand’s aesthetic, functionality, and commitment to craftsmanship. Every step—from initial sketches to the final prototype—plays a crucial role in ensuring that each garment is not only visually captivating but also structurally impeccable and comfortable to wear.</p>
          <h3>1. Sketching: Translating Ideas into Visual Concepts</h3>
          <p>The journey begins with an intensive sketching phase, where designers meticulously translate their inspirations into a series of detailed illustrations. This stage is a blend of creativity and technical precision, as designers must consider both the artistic and functional aspects of the garment.</p>
          <p>Using a combination of hand-drawn sketches and advanced digital design software, our team explores various silhouettes, proportions, and intricate details. This process allows for multiple iterations, ensuring that every aspect of the design—from neckline to hemline, sleeve structure to embellishments—is carefully thought out. The goal is to create a cohesive vision that aligns with the collection’s theme while maintaining wearability and elegance.</p>
          <p>Mood boards filled with references—ranging from historical influences to contemporary fashion trends—serve as a guiding framework. These visuals help refine color palettes, fabric pairings, and design motifs, ensuring a seamless blend of inspiration and execution. Before moving forward, each design undergoes internal review sessions, where designers collaborate to refine their ideas, balancing innovation with timeless appeal.</p>
        </section>

        <section class={styles.section2}>
          <h3>2. Pattern-Making: Engineering the Perfect Fit</h3>
          <p>Once the sketches are finalized, the focus shifts to pattern-making—one of the most technical and essential steps in garment construction. Patterns serve as the blueprint for each piece, determining how the fabric will be cut and assembled to achieve the desired shape, fit, and movement.</p>
          <p>Our highly skilled pattern makers work closely with designers to transform sketches into precisely drafted patterns. This stage requires a deep understanding of garment construction, body proportions, and fabric behavior. Each pattern must be meticulously adjusted to ensure that seams, darts, and pleats align perfectly with the design vision while maintaining structural integrity.</p>
          <p>The pattern-making process involves multiple rounds of revision. A fraction of an inch can make a significant difference in how a garment fits and drapes, so measurements are refined through trial and error. The goal is to achieve a flawless fit across a range of body types, enhancing comfort, mobility, and overall aesthetic appeal. To further perfect the structure, prototypes may first be tested using muslin or other inexpensive fabrics before moving on to the final material. This allows the team to analyze construction techniques, making necessary adjustments before committing to production-ready fabrics.</p>
        </section>

        <section class={styles.section2}>
          <h3>3. Prototyping: Bringing Designs to Life</h3>
          <p>With patterns finalized, the first physical samples—known as prototypes—are meticulously crafted in-house or by our trusted partner ateliers. This stage is where the garment takes its first real form, allowing designers and technical teams to assess how the fabric interacts with the pattern, how details come to life, and how the overall composition aligns with the original vision.</p>
          <p>Each prototype is evaluated on multiple factors, including:</p>
          <ul class="numbered-list-2">
            <li>Proportion and silhouette: Ensuring that the design remains true to the original sketches while adapting to real-world movement.</li>
            <li>Fabric behavior: Observing how the material drapes, stretches, and reacts to different conditions, such as washing and prolonged wear.</li>          
            <li>Construction integrity: Examining the durability of seams, fastenings, embellishments, and intricate details.</li>          
            <li>Fit and comfort: Conducting multiple fit tests on different body types to guarantee an inclusive and flattering shape.</li>
          </ul>
          <p>The prototyping phase is highly iterative, often requiring several rounds of refinement. Adjustments are made to correct any inconsistencies in structure, improve garment proportions, and enhance overall wearability. Any necessary modifications—whether it’s altering a seam placement, adjusting sleeve length, or redefining a fabric’s layering effect—are meticulously implemented. Once the prototype has been refined to perfection, it undergoes a series of rigorous quality checks before receiving approval for final production. This step ensures that the design meets our high standards of craftsmanship, durability, and functionality.</p>
          <p>The design and prototyping process is where creativity transitions from vision to reality, guided by an unwavering commitment to excellence. Every sketch, pattern, and prototype is a testament to our dedication to precision, ensuring that each garment upholds the highest standards of artistry and functionality.</p>
          <p>By combining traditional craftsmanship with modern innovations, we create pieces that push the boundaries of design while maintaining timeless appeal. Through meticulous sketching, pattern-making, and prototyping, we ensure that every garment is perfected down to the finest detail—resulting in collections that not only captivate visually but also offer comfort, durability, and an unparalleled sense of elegance.</p>
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

export default BehindtheDesign3;