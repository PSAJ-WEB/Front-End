import { createSignal, onMount, createEffect, onCleanup, Show } from "solid-js";
import { useNavigate, useSearchParams } from "@solidjs/router";
import logo from '../img/logo.png';
import profile from '../img/UserCircle (2).svg';
import logowhite from '../img/logowhite.png';
import translate from '../img/Translate.svg';
import cartIcon from '../img/Tote.svg';
import heart from '../img/Heart.svg';
import heartfull from '../img/Heart (1).svg';
import befooter from '../img/befooter.png';
import './productpage.css';

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  default_image: string;
  current_image: string; // Add this line
  colors: {
    color: string;
    color_code?: string;
    image: string;
  }[];
  liked?: boolean;
  likes_count?: number;
}

interface LikeResponse {
  is_liked: boolean;
  likes_count: number;
  success?: boolean;
  message?: string;
}


const ProductPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const userId = searchParams.user_id;
  const [profileImage, setProfileImage] = createSignal<string | null>(null);
  const [onlineUsers, setOnlineUsers] = createSignal<{ id: string }[]>([]);
  const accountIcon = profile;
  const [error, setError] = createSignal<string | null>(null);
  const [products, setProducts] = createSignal<Product[]>([]);
  const [loading, setLoading] = createSignal(true);
  const [totalFavorites, setTotalFavorites] = createSignal(0);
  
  // Frontend code to fetch products
  const fetchProducts = async (search = "") => {
    try {
      setLoading(true);
      setError(null);

      const [productsRes, colorsRes, likesRes] = await Promise.all([
        fetch(`http://127.0.0.1:8080/api/products${search ? `?search=${encodeURIComponent(search)}` : ''}`),
        fetch('http://127.0.0.1:8080/api/product-colors'),
        userId ? fetch(`http://127.0.0.1:8080/user/${userId}/likes`) : Promise.resolve(null)
      ]);

      if (!productsRes.ok) throw new Error(`Products error: ${productsRes.status}`);
      if (!colorsRes.ok) throw new Error(`Colors error: ${colorsRes.status}`);

      const productsData = await productsRes.json();
      const colorsData = await colorsRes.json();

      const mergedProducts = productsData.map((product: any) => {
        const productColors = colorsData.filter((c: any) => c.product_id === product.id);
        return {
          id: product.id,
          name: product.name,
          category: product.category,
          price: product.price,
          default_image: product.default_image?.includes('http')
            ? product.default_image
            : `http://127.0.0.1:8080/uploads/products/${product.default_image}`,
          current_image: product.default_image?.includes('http')
            ? product.default_image
            : `http://127.0.0.1:8080/uploads/products/${product.default_image}`,
          colors: productColors.map((color: any) => ({
            color: color.color,
            color_code: getColorCode(color.color),
            image: color.image?.includes('http')
              ? color.image
              : `http://127.0.0.1:8080/uploads/products/${color.image}`
          })),
          liked: false,
          likes_count: product.likes_count || 0
        };
      });
      if (userId && likesRes?.ok) {
        const likedProducts = await likesRes.json();
        setProducts(mergedProducts.map(product => ({
          ...product,
          liked: likedProducts.some((lp: any) => lp.id === product.id),
          likes_count: product.likes_count || 0 // Pastikan likes_count ada
        })));
      } else {
        setProducts(mergedProducts);
      }

    } catch (err) {
      setError(err.message);
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  createEffect(() => {
    const id = matchedProductId();
    if (id) {
      setTimeout(() => {
        const element = document.getElementById(`product-${id}`);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "nearest"
          });
        }
      }, 100);
    }
  });

  onMount(async () => {
    fetchProducts();
    if (userId) {
      fetchUserProfile();
      fetchOnlineUsers();
      fetchFavoriteCount();
      updateUserActivity();

      // Dapatkan produk yang sudah dilike oleh user
      try {
        const countRes = await fetch(`http://127.0.0.1:8080/user/${userId}/likes`);
        if (countRes.ok) {
          const countData = await countRes.json();
          setFavoriteCount(countData.count || 0);
        }
        const response = await fetch(
          `http://127.0.0.1:8080/user/${userId}/likes`
        );
        if (response.ok) {
          const likedProducts = await response.json();
          setProducts((prevProducts) =>
            prevProducts.map((product) => ({
              ...product,
              liked: likedProducts.some((lp: any) => lp.id === product.id),
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching liked products:", error);
      }
    }
  });


  const setMainImage = (productId: number, image: string | null) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === productId
          ? {
            ...product,
            current_image: image || product.default_image // Pastikan fallback ke default_image jika null
          }
          : product
      )
    );
  };
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

  // Fungsi untuk mengambil daftar pengguna online
  const fetchOnlineUsers = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8080/online-users');
      if (response.ok) {
        setOnlineUsers(await response.json());
      }
    } catch (error) {
      console.error('Error fetching online users:', error);
    }
  };



  // Transform function to handle image URLs
  const transformProductData = (product) => {
    return {
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      default_image: product.default_image.includes('http')
        ? product.default_image
        : `http://127.0.0.1:8080/uploads/${product.default_image || 'fallback-image.jpg'}`,
      colors: product.colors?.map((color) => ({
        color: color.color_name || color.color,
        color_code: getColorCode(color.color_name || color.color),
        image: color.image.includes('http')
          ? color.image
          : `http://127.0.0.1:8080/uploads/${color.image}`,
      })) || [],
      liked: false,
    };
  };

  // Fungsi navigasi
  const navigateWithUserId = (path: string) => {
    if (userId) {
      navigate(`${path}?user_id=${userId}`);
      updateUserActivity();
    } else {
      navigate(path);
    }
  };
  const fetchFavoriteCount = async () => {
    const fetchFavoriteCount = async () => {
      if (!userId) return;
      
      try {
        const response = await fetch(`http://127.0.0.1:8080/user/${userId}/likes`);
        if (response.ok) {
          const data = await response.json();
          // Handle both possible response formats
          if (Array.isArray(data)) {
            setTotalFavorites(data.length);
          } else if (typeof data.count !== 'undefined') {
            setTotalFavorites(data.count);
          }
        }
      } catch (error) {
        console.error('Error fetching favorite count:', error);
      }
    };
  }
  // Helper function to convert color names to hex codes
  const getColorCode = (colorName) => {
    const colorMap = {
      // Basic colors
      red: '#8A191F',
      mint: '#A1BEAB',
      pink: '#E0A091',
      green: '#00FF00',
      black: '#000000',
      white: '#FFFFFF',
      blue: '#2196F3',
      orange: '#CC7633',
      navy: '#1F2A39',
      cream: '#FFFDD0',

      // Specific product colors
      glasses: '#D8CDBD',
      belt2: '#493635',
      belt3: '#302E2F',
      clothes1: '#D2CFC5',
      clothes2: '#A79686',
      clothes3: '#C1997D',
      beige3: '#F5ECE1',
      grey2: '#B8ABA3',
      denim2: '#798999',
      blackfaux: '#2C2430',
      domgrey: '#413F41',
      blackgrey: '#212129',
      brown: '#704324',
      brown2: '#8C6446',
      brownlight: '#A88B63',
      beige2: '#DDD1B2',
      pinkmuda: '#E4BABB',
      beige: '#E5D2B2',
      ijo: '#594D0F',
      lightgrey: '#CC7633', // Note: Same as orange
      ashgrey: '#CC7633',  // Note: Same as orange
      blacky: '#222427',
      denim: '#7F90A1',
      grey: 'rgba(100, 89, 87, 1)',

      // Gradient colors (returning first color as fallback)
      gradient1: 'linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(221, 176, 104, 1))',
      gradient2: 'linear-gradient(to bottom, rgba(123, 110, 106, 1), rgba(221, 176, 104, 1))',
      gradient3: 'linear-gradient(to bottom, rgba(190, 128, 114, 1), rgba(221, 176, 104, 1))',
      gradient4: 'linear-gradient(to bottom, rgba(233, 217, 197, 1), rgba(221, 176, 104, 1))',


      // Special glasses gradients (returning first color as fallback)
      glasses1: 'radial-gradient(circle, hsla(220, 15%, 24%, 1) 30%, hsla(53, 4%, 82%, 1) 100%)',
      glasses2: 'radial-gradient(circle, #717A71 30%, #CDC6AA 100%)',
      glasses3: 'radial-gradient(circle, #FFD16E 15%, #2B1F1A 70%)',
    };

    return colorMap[colorName.toLowerCase()] || '#CCCCCC';
  };
  // Call on mount
  onMount(() => {
    fetchProducts();
    if (userId) {
      fetchUserProfile();
      fetchFavoriteCount();
      fetchOnlineUsers();
      updateUserActivity();

      // Set interval untuk update aktivitas pengguna
      const activityInterval = setInterval(() => {
        updateUserActivity();
      }, 60000);

      // Cleanup interval saat komponen unmount
      onCleanup(() => clearInterval(activityInterval));
    }
  });

  onCleanup(() => {
    const timeout = searchTimeout();
    if (timeout) {
      clearTimeout(timeout);
    }
  });

  const goToCart = () => navigateWithUserId("/cart");
  const goToFavoritePage = () => navigateWithUserId("/favorite");
  const goToAccount = () => navigateWithUserId("/account");
  const goToDashboard = () => navigateWithUserId("/dashboard");
  const goToProducts = () => navigateWithUserId("/products");
  const goToAboutUs = () => navigateWithUserId("/about-us");
  const goToBlog = () => navigateWithUserId("/blogpage");

  // Di bagian atas komponen
  const [isLoading, setIsLoading] = createSignal(false);
  const [favoriteCount, setFavoriteCount] = createSignal(0);
  const [searchQuery, setSearchQuery] = createSignal("");
  const [searchTimeout, setSearchTimeout] = createSignal<number | null>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    // Clear previous timeout
    const timeout = searchTimeout();
    if (timeout) {
      clearTimeout(timeout);
    }

    // Set new timeout
    const newTimeout = window.setTimeout(() => {
      fetchProducts(query).then(() => {
        // Setelah fetch selesai, cari produk yang cocok
        const matched = products().find(p =>
          p.name.toLowerCase().includes(query.toLowerCase())
        );
        setMatchedProductId(matched?.id || null);

        // Scroll ke produk yang cocok jika ada
        if (matched) {
          setTimeout(() => {
            const element = document.getElementById(`product-${matched.id}`);
            if (element) {
              element.scrollIntoView({
                behavior: "smooth",
                block: "nearest"
              });
            }
          }, 100);
        }
      });
    }, 300);

    setSearchTimeout(newTimeout);
  };


  const toggleLike = async (productId: number, index: number, e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (!userId) {
      navigate("/account");
      return;
    }

    if (isLoading()) return;

    setIsLoading(true);

    try {
      // Convert userId to number
      const userIdNum = parseInt(userId);
      if (isNaN(userIdNum)) {
        throw new Error("Invalid user ID");
      }

      const response = await fetch("http://127.0.0.1:8080/api/products/like", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          user_id: userIdNum, // Mengirim sebagai number
          product_id: productId
        })
      });

      if (!response.ok) {
        // Coba parse error response
        let errorData;
        try {
          errorData = await response.json();
        } catch (e) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data: LikeResponse = await response.json();

      setProducts(prevProducts =>
        prevProducts.map((product, i) =>
          i === index ? {
            ...product,
            liked: data.is_liked,
            likes_count: data.likes_count
          } : product
        )
      );
      fetchFavoriteCount();
      setFavoriteCount(prev => data.is_liked ? prev + 1 : Math.max(0, prev - 1));
    } catch (error) {
      console.error("Error toggling like:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const goToProductDetail = (productId: number) => {
    if (userId) {
      navigate(`/products/detail/${productId}?user_id=${userId}`);
    } else {
      navigate(`/products/detail/${productId}`);
    }
    // Scroll ke atas halaman
    window.scrollTo(0, 0);
  };
  const [clicked, setClicked] = createSignal(false);
  // Fungsi untuk update activity user
  const updateUserActivity = () => {
    if (!userId) return;

    fetch(`http://127.0.0.1:8080/user/${userId}/activity`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    }).catch(console.error);
  };

  const highlightSearchMatch = (text: string) => {
    if (!searchQuery()) return text;
    const regex = new RegExp(`(${searchQuery()})`, "gi");
    return text.replace(regex, "<span class='highlight'>$1</span>");
  };



  const [matchedProductId, setMatchedProductId] = createSignal<number | null>(null);

  return (
    <div class="landing-page">
      {/* Header */}
      <header>
        <div class="logo">
          <img src={logo} alt="Logo" />
        </div>
        <nav class="navbar">
          <ul>
            <li><a onClick={goToDashboard}>Home</a></li>
            <li><a onClick={goToProducts} class="active">Products</a></li>
            <li><a onClick={goToAboutUs}>About Us</a></li>
            <li><a onClick={goToBlog}>Blog</a></li>
          </ul>
        </nav>
        <div class="dash-auth-buttons">
          <div class="favorites-indicator" onClick={goToFavoritePage}>
            <img
              src={clicked() ? heartfull : heart}
              alt="heart"
              class="favorites-icon"
            />
            <Show when={totalFavorites() > 0}>
              <span class="favorites-badge">{totalFavorites()}</span>
            </Show>
          </div>
          <button class="dash-cart-btn" onClick={goToCart}>
            <img src={cartIcon} alt="Cart" />
          </button>
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
      </header >

      {/* Hero Section */}
      < section class="heroproduct" >
        <div class="hero-content-product">
          <div class="overlay-lines"></div>
          <h1>Discover Your Signature Style</h1>
          <p>Find the perfect bags and outfits that complement your personality.</p>
          <button class="shpnow" onClick={goToProducts}>Shop Now</button>
        </div>
        <div class="productpage">
          <span>Handpicked Styles Premium Quality Trend-Forward Fashion Elevate Your Wardrobe Today</span>
          <span>Handpicked Styles Premium Quality Trend-Forward Fashion Elevate Your Wardrobe Today</span>
          <span>Handpicked Styles Premium Quality Trend-Forward Fashion Elevate Your Wardrobe Today</span>
          <span>Handpicked Styles Premium Quality Trend-Forward Fashion Elevate Your Wardrobe Today</span>
          <span>Handpicked Styles Premium Quality Trend-Forward Fashion Elevate Your Wardrobe Today</span>
        </div>
      </section >

      {/* Product Section */}
      < section class="product" >
        <div class="section-header">
          <h2>Fresh Drops for You</h2>
          <div class="search-container">
            <input
              type="text"
              class="search-box"
              placeholder="Type something here"
              value={searchQuery()}
              onInput={(e) => handleSearch(e.currentTarget.value)} />
            <button class="search-button">Search</button>
          </div>
        </div>


        <div class="products-grid3">
          {products().filter(p => !searchQuery() ||
            p.name.toLowerCase().includes(searchQuery().toLowerCase())).map((product, index) => (
              <div
                id={`product-${product.id}`}
                class={`pro-card ${matchedProductId() === product.id ? 'highlight-match' : ''}`}
                key={product.id}
                onClick={() => goToProductDetail(product.id)}
                onMouseLeave={() => setMainImage(product.id, null)}
              >
                <div class="product-img">
                  <img
                    src={product.current_image} // Tidak perlu fallback karena sudah di-handle di setMainImage
                    alt={product.name}
                    onError={(e) => {
                      e.currentTarget.src = '/fallback-image.jpg';
                      e.currentTarget.onerror = null;
                    }}
                  />
                </div>
                <span
                  class="favorite-button"
                  onClick={(e) => toggleLike(product.id, index, e)}
                  classList={{ 'loading': isLoading() }}
                >
                  <img
                    src={product.liked ? heartfull : heart}
                    alt={product.liked ? "Unlike" : "Like"}
                  />
                </span>
                <p class="section-product">{product.category}</p>
                <h3 innerHTML={highlightSearchMatch(product.name)}></h3>
                <p class="price">{product.price}</p>
                <div class="color-optionss">
                  {product.colors.map((color) => (
                    <span
                      class="color"
                      style={{
                        background: color.color_code || getColorCode(color.color),
                      }}
                      onMouseEnter={() => setMainImage(product.id, color.image)}
                      onMouseLeave={() => setMainImage(product.id, null)} // Pastikan ini di-set ke null
                    />
                  ))}
                </div>
              </div>
            ))}
        </div>
      </section >

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
              <li><a onClick={goToDashboard}>Home</a></li>
              <li><a onClick={goToProducts}>Product</a></li>
              <li><a onClick={goToAboutUs}>About Us</a></li>
              <li><a onClick={goToBlog}>Blog</a></li>
            </ul>
          </div>
          <div class="link-column">
            <h4>About Us</h4>
            <ul>
              <li><a onClick={goToAboutUs}>Company</a></li>
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
    </div >
  );
};

export default ProductPage;