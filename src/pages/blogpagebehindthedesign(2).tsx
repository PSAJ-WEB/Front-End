import { Component, onMount, createSignal } from 'solid-js';
import { useNavigate } from "@solidjs/router";
import { createEffect, onCleanup } from "solid-js";
import { useLocation } from "@solidjs/router";
import logo from '../img/logo.png';
import styles from './blogpagebehindthedesign(2).module.css';
import cartIcon from '../img/Tote.svg';
import logowhite from '../img/logowhite.png';
import befooter from '../img/befooter.png';
import translate from '../img/Translate.svg';
import accountIcon from '../img/UserCircle (2).svg'

const BehindtheDesign2: Component = () => {
  const [activePage, setActivePage] = createSignal(2); // Misalnya, halaman aktif saat ini adalah 2

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
          <h2>Fabric Selection: Crafting the Foundation of Excellence</h2>
          <p>Once the creative direction of a collection is established, the next pivotal step in the design process is fabric selection. The choice of materials is not merely a technical decision—it is an art form that influences the overall aesthetic, functionality, and longevity of each piece. The right fabric has the power to elevate a design, transforming a concept from mere sketches into a tangible, wearable reality. At the core of our selection process lies an unwavering commitment to quality, innovation, and sustainability, ensuring that every collection meets the highest standards of craftsmanship and ethical responsibility.</p>
          <h3>1. The Role of Fabrics in Defining a Collection</h3>
          <p>Fabric is the foundation upon which every garment is built. It dictates not only the appearance of a piece but also how it feels against the skin, how it moves with the body, and how it ages over time. Each collection has its own unique identity, and fabric selection plays a critical role in reinforcing that identity. Whether a collection is designed to exude effortless elegance, structured sophistication, or relaxed minimalism, the chosen textiles must align seamlessly with the overarching theme.</p>
          <p>Beyond aesthetics, the tactile experience is equally important. Fashion is not just visual—it is sensory. A soft cashmere sweater should envelop the wearer in warmth, a silk evening gown should glide effortlessly with each step, and a crisp cotton shirt should provide breathability and comfort. This intimate interaction between fabric and wearer is what elevates fashion from mere clothing to an immersive experience.</p>
        </section>

        <section class={styles.section2}>
          <h3>2. Sourcing the Finest Materials from Around the World</h3>
          <p>To ensure that each garment embodies excellence, our team scours the globe for the finest materials, forging relationships with some of the most respected textile mills and artisans in the industry. Our sourcing process is meticulous, involving rigorous testing for quality, durability, texture, and drape.</p>
          <p>Some of the premium fabrics we incorporate into our collections include:</p>
          <ul class="numbered-list-2">
            <li>Luxurious Silks – Sourced from heritage silk farms, silk is prized for its fluid drape and opulent sheen, making it a staple for eveningwear and elegant silhouettes.</li>
            <li>Organic Cottons – Breathable, hypoallergenic, and highly versatile, our organic cotton is sourced from certified sustainable farms, ensuring comfort and eco-conscious production.</li>
            <li>High-Performance Wool – Whether it’s fine Merino wool for suiting or cashmere for winter layering, we seek out ethically sourced wool that balances warmth with breathability.</li>          
            <li>Innovative Sustainable Fabrics – From recycled polyester made from ocean plastics to Tencel and bamboo fibers that require minimal water and energy, we prioritize cutting-edge materials that align with modern sustainability standards.</li>          
            <li>Heritage & Handwoven Textiles – We celebrate traditional craftsmanship by integrating handwoven textiles, such as jacquards, ikats, and artisanal embroidery, adding authenticity and cultural depth to our designs.</li>          
          </ul>
        </section>

        <section class={styles.section2}>
          <h3>3. Assessing Fabrics for Performance and Functionality</h3>
          <p>Each fabric undergoes a rigorous evaluation process before making its way into production. Our design team carefully examines the following characteristics to ensure that every material meets the highest standards:</p>
          <ul class="numbered-list-2">
            <li>Durability & Strength – A garment should stand the test of time, resisting wear and tear while maintaining its structure and beauty.</li>
            <li>Texture & Comfort – The way a fabric feels against the skin is paramount. We assess whether a textile is soft, breathable, or structured enough to serve its intended purpose.</li>
            <li>Drape & Fluidity – Some designs require fabrics that flow effortlessly, while others demand materials with architectural stiffness. The drape of a fabric significantly influences the silhouette of the final piece.</li>          
            <li>Color Absorption & Dyeing Techniques – The way a fabric interacts with dyes affects the richness and longevity of color. We explore natural and low-impact dyeing processes that enhance vibrancy without harming the environment.</li>          
            <li>Seasonal Suitability – The weight and insulating properties of a fabric determine its placement within a collection. Lightweight linens and airy cottons dominate spring/summer lines, while wools, velvets, and structured knits define autumn/winter collections.</li>          
          </ul>
        </section>

        <section class={styles.section2}>
          <h3>4. Sustainability: A Commitment to Ethical and Responsible Fashion</h3>
          <p>As fashion continues to evolve, so does our responsibility to minimize environmental impact and prioritize ethical sourcing. We recognize that fabric selection is one of the most significant areas where we can make a difference in sustainability. Our approach includes:</p>
          <ul>
            <li>Partnering with Ethical Suppliers – We work closely with textile manufacturers that uphold fair labor practices, ensuring that workers receive fair wages and operate in safe conditions.</li>
            <li>Using Organic & Biodegradable Materials – Whenever possible, we incorporate materials that are grown without harmful pesticides, consume less water, and break down naturally at the end of their lifecycle.</li>
            <li>Incorporating Recycled & Upcycled Textiles – We actively seek out recycled fibers, such as regenerated nylon and polyester made from post-consumer waste, helping to reduce landfill accumulation and ocean pollution.</li>
            <li>Reducing Chemical & Water Waste – By exploring innovative dyeing and finishing techniques, we significantly lower the use of toxic chemicals and excessive water consumption in our production process.</li>
            <li>Investing in Circular Fashion – Our goal is to design garments that are not only durable but also recyclable at the end of their lifespan, promoting a circular economy where materials can be repurposed rather than discarded.</li>
          </ul>
          <br />
          <p>By weaving together diverse influences, we ensure that our collections remain not only relevant to modern fashion but also imbued with a sense of timeless artistry. Every piece we create tells a story—one that bridges the past, present, and future through the language of style.</p>
        </section>
        <section class={styles.section2}>
          <h3>5. The Intersection of Artistry and Innovation</h3>
          <p>Fabric selection is where tradition meets technology. While we honor the heritage of textile craftsmanship, we also embrace cutting-edge advancements that redefine what fabrics can achieve. Innovations such as thermoregulatory fabrics, water-repellent nanotechnology, and bioengineered fibers are reshaping the possibilities of fashion, allowing us to merge functionality with high fashion. By blending artistry with science, we push the boundaries of what fabrics can do—creating garments that are not just aesthetically compelling but also practical, sustainable, and future-forward.</p>
        </section>
        <section class={styles.section2}>
          <h3>6. Final Thoughts: The Fabric as the Soul of Fashion</h3>
          <p>In the end, fabric is more than just the foundation of a garment—it is the soul of a collection. It carries the essence of craftsmanship, the weight of history, and the promise of sustainability. Every thread, weave, and fiber tells a story, and through meticulous selection, we ensure that our garments do more than adorn the body—they enhance experiences, celebrate individuality, and stand the test of time.</p>
          <br />
          <p>By thoughtfully selecting and crafting each fabric, we ensure that our collections embody both aesthetic refinement and functional excellence. Every material we choose carries a story—one that merges tradition and innovation, sustainability and luxury, artistry and purpose. Through this meticulous process, we create garments that transcend fleeting trends, offering a timeless expression of style that resonates with both the present and the future.</p>
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

export default BehindtheDesign2;