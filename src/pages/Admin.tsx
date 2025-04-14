// Admin.tsx
import { createSignal, For, onMount } from 'solid-js';
import './Admin.css';

const Admin = () => {
  // State untuk data admin
  const [orders] = createSignal(245);
  const [orderIncrease] = createSignal(12);
  const [revenue] = createSignal('Rp 18.450.000');
  const [visitors] = createSignal(3212);
  const [visitorIncrease] = createSignal(8);
  const [bestSellingProduct] = createSignal(34);
  const [productName] = createSignal('Frosted Bowling Handbag');

  // State untuk data pengguna
  const [adminUsers, setAdminUsers] = createSignal([]);
  const [admin, setAdmin] = createSignal({
    fullname: 'Loading...',
    email: 'Loading...'
  });

  // Fungsi untuk mengambil data profil admin

  // Fungsi untuk mengambil data pengguna admin
  const fetchAdminUsers = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8080/admin/users', {
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to fetch admin users');
      const data = await response.json();
      console.log('Fetched admin users:', data); // Logging data
      setAdminUsers(data);
    } catch (error) {
      console.error('Error fetching admin users:', error);
      // Fallback data jika fetch gagal
      
    }
  };

  // Jalankan fungsi fetch saat komponen dimuat
  onMount(() => {
    fetchAdminUsers();
  });

  // Data statis untuk produk
  const [products] = createSignal([ 
    {
      id: '001',
      name: 'Litchi Pattern Pillow Handbag',
      category: 'Accessories',
      price: '285.300 IDR',
      colors: ['black', 'blue', 'green', 'pink'],
      image: '/img/red-handbag.jpg'
    },
    {
      id: '002',
      name: 'Retro Small Square Handbag',
      category: 'Accessories',
      price: '174.000 IDR',
      colors: ['black', 'brown', 'olive', 'beige'],
      image: '/img/brown-handbag.jpg'
    }
  ]);

  return (
    <div class="admin-container">
      {/* Header */}
      <header class="admin-header">
        <div class="search-container">
          <input type="text" placeholder="Search" class="search-input" />
        </div>
        <div class="admin-profile">
          <div class="admin-avatar"></div>
          <div class="admin-info">
            <div class="admin-name">{admin().fullname}</div>
            <div class="admin-email">{admin().email}</div>
          </div>
          <div class="dropdown-icon">▼</div>
        </div>
      </header>

      {/* Dashboard Stats */}
      <div class="dashboard-stats">
        <div class="stat-card">
          <div class="stat-header">
            <span>Total Orders</span>
            <span class="more-options">···</span>
          </div>
          <div class="stat-value">{orders()} Orders</div>
          <div class="stat-change">+{orderIncrease()}% from last month</div>
        </div>
        <div class="stat-card">
          <div class="stat-header">
            <span>Revenue This Month</span>
            <span class="more-options">···</span>
          </div>
          <div class="stat-value">{revenue()}</div>
          <div class="stat-change">Increase compared to last month</div>
        </div>
        <div class="stat-card">
          <div class="stat-header">
            <span>Active Users / Visitors</span>
            <span class="more-options">···</span>
          </div>
          <div class="stat-value">{visitors()} Visitors</div>
          <div class="stat-change">+{visitorIncrease()}% in the last 7 days</div>
        </div>
        <div class="stat-card">
          <div class="stat-header">
            <span>Best Selling Product</span>
            <span class="more-options">···</span>
          </div>
          <div class="stat-value">{bestSellingProduct()} Pcs Sold</div>
          <div class="stat-change">{productName()}</div>
        </div>
      </div>

      {/* Charts */}
      <div class="chart-container">
        <div class="revenue-chart-container">
          <div class="revenue-header">
            <span>Total Revenue</span>
            <span class="more-options">···</span>
          </div>
          <div class="revenue-chart">
            <div class="chart-bars">
              <div class="month-group">
                <div class="bar dark-bar" style={{ height: '60px' }}></div>
                <div class="bar light-bar" style={{ height: '100px' }}></div>
                <div class="month-label">Jan</div>
              </div>
              <div class="month-group">
                <div class="bar dark-bar" style={{ height: '50px' }}></div>
                <div class="bar light-bar" style={{ height: '140px' }}></div>
                <div class="month-label">Feb</div>
              </div>
              <div class="month-group">
                <div class="bar dark-bar" style={{ height: '40px' }}></div>
                <div class="bar light-bar" style={{ height: '180px' }}></div>
                <div class="month-label">Mar</div>
              </div>
              <div class="month-group">
                <div class="bar dark-bar" style={{ height: '100px' }}></div>
                <div class="bar light-bar" style={{ height: '120px' }}></div>
                <div class="month-label">Apr</div>
              </div>
              <div class="month-group">
                <div class="bar dark-bar" style={{ height: '80px' }}></div>
                <div class="bar light-bar" style={{ height: '60px' }}></div>
                <div class="month-label">May</div>
              </div>
              <div class="month-group">
                <div class="bar dark-bar" style={{ height: '50px' }}></div>
                <div class="bar light-bar" style={{ height: '120px' }}></div>
                <div class="month-label">Jun</div>
              </div>
              <div class="month-group">
                <div class="bar dark-bar" style={{ height: '140px' }}></div>
                <div class="bar light-bar" style={{ height: '70px' }}></div>
                <div class="month-label">Jul</div>
              </div>
              <div class="month-group">
                <div class="bar dark-bar" style={{ height: '120px' }}></div>
                <div class="bar light-bar" style={{ height: '60px' }}></div>
                <div class="month-label">Aug</div>
              </div>
              <div class="month-group">
                <div class="bar dark-bar" style={{ height: '170px' }}></div>
                <div class="bar light-bar" style={{ height: '70px' }}></div>
                <div class="month-label">Aug</div>
              </div>
              <div class="month-group">
                <div class="bar dark-bar" style={{ height: '100px' }}></div>
                <div class="bar light-bar" style={{ height: '80px' }}></div>
                <div class="month-label">Sep</div>
              </div>
              <div class="month-group">
                <div class="bar dark-bar" style={{ height: '130px' }}></div>
                <div class="bar light-bar" style={{ height: '50px' }}></div>
                <div class="month-label">Oct</div>
              </div>
              <div class="month-group">
                <div class="bar dark-bar" style={{ height: '110px' }}></div>
                <div class="bar light-bar" style={{ height: '120px' }}></div>
                <div class="month-label">Nov</div>
              </div>
            </div>
          </div>
        </div>
        <div class="chart-side">
          <div class="donut-chart-container">
            <div class="donut-chart"></div>
            <div class="chart-details">
              <h3>Details:</h3>
              <div class="chart-legend">
                <div class="legend-item">
                  <span class="dot accessories"></span>
                  <span>Accessories</span>
                </div>
                <div class="legend-item">
                  <span class="dot clothes"></span>
                  <span>Clothes</span>
                </div>
              </div>
            </div>
          </div>
          {/* User Activity Status */}
          <div class="user-activity-section">
            <div class="activity-header">
              <h3>User Activity Status</h3>
              <span class="more-options">···</span>
            </div>
            <div class="user-list">
              <For each={adminUsers()}>
                {(user) => (
                  <div class="user-item">
                    <div class="user-info">
                      <h4>{user.fullname}</h4>
                      <span class="user-role">{user.role}</span>
                    </div>
                    <div class={`status-indicator ${user.is_online ? 'online' : 'offline'}`}>
                      {user.is_online ? 'Online' : 'Offline'}
                    </div>
                  </div>
                )}
              </For>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div class="products-section">
        <div class="products-header">
          <h2>Products</h2>
          <button class="add-product-btn">Add New Product</button>
        </div>
        <table class="products-table">
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>ID</th>
              <th>Product Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Color</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <For each={products()}>
              {(product) => (
                <tr>
                  <td><input type="checkbox" /></td>
                  <td>{product.id}</td>
                  <td>
                    <div class="product-image">
                      <img src={product.image} alt={product.name} />
                    </div>
                  </td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{product.price}</td>
                  <td class="color-options">
                    <For each={product.colors}>
                      {(color) => <span class={`color-dot ${color}`}></span>}
                    </For>
                  </td>
                  <td class="actions">···</td>
                </tr>
              )}
            </For>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;