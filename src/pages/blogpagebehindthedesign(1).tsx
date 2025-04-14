import { Component, onMount, createSignal } from 'solid-js';
import { useNavigate, useSearchParams} from "@solidjs/router";
import { createEffect, onCleanup } from "solid-js";
import { useLocation } from "@solidjs/router";
import heart from '../img/Heart.svg';
import heartfull from '../img/Heart (1).svg';
import logo from '../img/logo.png';
import styles from './blogpagebehindthedesign(1).module.css';
import cartIcon from '../img/Tote.svg';
import logowhite from '../img/logowhite.png';
import befooter from '../img/befooter.png';
import translate from '../img/Translate.svg';
import accountIcon from '../img/UserCircle (2).svg'

const BlogPageMixnMatch3: Component = () => {
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
        <p>Every piece in our collection has a story. From concept to creation, our design process is driven by inspiration from global fashion trends, cultural influences, and timeless style. In this exclusive behind-the-scenes look, we’ll walk you through the journey of how our latest collection came to life—starting from mood boards, fabric selection, to the final product. Get an insider’s perspective on the creative process, and discover the passion behind every stitch and detail.</p>

        <section class={styles.section2}>
          <h2>The Birth of an Idea: Drawing Inspiration from the World Around Us</h2>
          <p>Every great collection begins with a single spark of inspiration—an idea that evolves into a narrative expressed through fabric, form, and function. At the heart of our creative process lies an insatiable curiosity, a desire to explore the ever-changing world of fashion, art, and culture. Our design team is constantly immersed in a dynamic exchange of ideas, drawing inspiration from an array of sources, from high fashion runways to the subtle elegance of everyday life.</p>
          <h3>1. Exploring Global Fashion Trends</h3>
          <p>Fashion is a reflection of the times, shaped by cultural shifts and evolving aesthetics. To stay ahead, we meticulously study emerging global fashion trends, keeping a pulse on the runways of Paris, Milan, London, and Tokyo—cities that define the cutting edge of style. Runway shows offer a glimpse into the future of fashion, showcasing innovative silhouettes, experimental textiles, and new ways of reinterpreting classic styles.</p>
          <p>Beyond high fashion, we also pay close attention to street style, where individuality and authenticity shine through. Fashion-forward individuals in metropolitan hubs influence global trends just as much as luxury designers do. The effortless layering of textures in Copenhagen, the bold color play in Seoul, and the refined tailoring of New York professionals all contribute to the broader landscape of inspiration. By observing how people interact with fashion in real-life contexts, we gain insight into how style transcends mere aesthetics and becomes a medium of self-expression.</p>
        </section>

        <section class={styles.section2}>
          <h3>2. The Power of Cultural and Historical Influences</h3>
          <p>While contemporary trends guide our creative process, history serves as a wellspring of timeless inspiration. We delve into various cultural movements, from the opulence of the Renaissance period to the rebellious spirit of punk fashion in the 1970s. Each era holds valuable lessons in craftsmanship, silhouette evolution, and artistic expression.</p>
          <p>Artistic movements such as Bauhaus minimalism, Art Deco opulence, and Surrealist imagination have all left their mark on fashion, influencing everything from structure to color palettes. Whether it’s the fluidity of Impressionist paintings or the geometric precision of Brutalist architecture, we believe that art and fashion are deeply intertwined.</p>
        </section>

        <section class={styles.section2}>
          <h3>3. The Research Phase: Mood Boards and Concept Development</h3>
          <p>Once we have gathered inspiration, the next step is to translate abstract ideas into a tangible vision. This begins with the creation of mood boards—carefully curated collections of images, textures, patterns, and sketches that define the essence of the upcoming collection. Each board acts as a visual blueprint, guiding the design team as they refine their concepts.</p>
          <p>During this phase, we experiment with color theory, testing combinations that evoke different emotions and narratives. Texture exploration also plays a crucial role—will the collection feature rich velvets, structured denim, or ethereal chiffon? Silhouettes are analyzed to determine whether the season calls for sharp tailoring, fluid draping, or voluminous shapes.</p>
          <p>Our design philosophy is deeply rooted in storytelling. Every collection must have a cohesive narrative—whether it’s a tribute to nostalgia, a celebration of innovation, or an exploration of cultural fusion. Through collaborative brainstorming sessions, we refine our ideas, ensuring that each piece resonates with our brand identity while pushing creative boundaries.</p>
        </section>

        <section class={styles.section2}>
          <h3>4. Beyond Fashion: Inspiration from Architecture, Nature, and Literature</h3>
          <p>Inspiration is not confined to the fashion industry alone. Some of our most compelling designs have emerged from unexpected sources—architecture, nature, and literature.</p>
          <ul>
            <li>Architecture: The clean lines of modernist buildings, the ornate details of Gothic cathedrals, and the fluidity of organic structures all find their way into our collections. The interplay of structure and movement in architecture often mirrors the balance we seek in our designs.</li>
            <li>Nature: The organic beauty of the natural world provides endless inspiration. The iridescence of butterfly wings, the symmetry of seashells, and the shifting hues of a sunset influence our fabric choices, embroidery details, and dye techniques.</li>
            <li>Literature & Philosophy: Words have the power to evoke imagery and emotion, and often, a single passage from a novel or a philosophical concept can serve as the foundation of a collection. Themes of romanticism, existentialism, or futurism shape the mood and aesthetic direction of our designs.</li>
          </ul>
          <br />
          <p>By weaving together diverse influences, we ensure that our collections remain not only relevant to modern fashion but also imbued with a sense of timeless artistry. Every piece we create tells a story—one that bridges the past, present, and future through the language of style.</p>
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

export default BlogPageMixnMatch3;