import { createSignal, onMount, createEffect } from 'solid-js';
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import * as am5 from '@amcharts/amcharts5';
import * as am5xy from '@amcharts/amcharts5/xy';
import * as am5percent from '@amcharts/amcharts5/percent';
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated';
import './Admin.css';

interface ProductColor {
  color: string;
  image: string;
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  default_image: string | null;
  likes_count: number;
  colors: ProductColor[];
}

const Admin = () => {
  // State for all data
  const [adminUsers, setAdminUsers] = createSignal([]);
  const [regularUsers, setRegularUsers] = createSignal([]);
  const [products, setProducts] = createSignal([]);
  const [stats, setStats] = createSignal({
    totalOrders: 0,
    orderIncrease: 0,
    revenue: 'Rp 0',
    visitors: 0,
    visitorIncrease: 0,
    bestSellingProduct: 0,
    productName: 'Loading...'
  });

  // AG Grid column definitions
  const [columnDefs] = createSignal([
    { field: 'id', headerName: 'ID', width: 80 },
    { field: 'fullname', headerName: 'Name', width: 150 },
    { field: 'email', headerName: 'Email', width: 200 },
    {
      field: 'role',
      headerName: 'Role',
      width: 100,
      cellClassRules: {
        'admin-role': params => params.value === 'admin',
        'user-role': params => params.value === 'user'
      }
    },
    {
      field: 'is_online',
      headerName: 'Status',
      width: 100,
      cellRenderer: (params) => {
        const isOnline = params.value;
        return (
          <span class={`status-badge ${isOnline ? 'online' : 'offline'}`}>
            {isOnline ? 'Online' : 'Offline'}
          </span>
        );
      }
    },
    {
      field: 'last_activity',
      headerName: 'Last Active',
      width: 150,
      valueFormatter: (params) => {
        return params.value ? new Date(params.value).toLocaleString() : 'No Activity Login';
      }
    }
  ]);

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

  const [productColumnDefs] = createSignal([
    { field: 'id', headerName: 'ID', width: 70 },
    {
      field: 'default_image',
      headerName: 'Product Image',
      width: 200,
      cellRenderer: (params) => {
        return (
          <div style={{
            display: 'flex',
            'align-items': 'center',
            'justify-content': 'center',
            height: '300px'
          }}>
            <img
              src={params.value}
              alt="Product"
              style={{
                'max-height': '280px',
                'max-width': '100px',
                'object-fit': 'contain'
              }}
            />
          </div>
        );
      }
    },
    { field: 'name', headerName: 'Name', width: 250 },
    { 
      field: 'category', 
      headerName: 'Category', 
      width: 110,
      cellRenderer: (params) => {
        const categoryColors = {
          'Bags': "#A6A6A6",
          'Clothes': "#595959",
          'Accessories': "#262626",
          // Add more categories and colors as needed
        };
        
        const color = categoryColors[params.value] || '#cccccc';
        
        return (
          <div style={{ display: 'flex', 'align-items': 'center', gap: '8px' }}>
            <div style={{
              width: '12px',
              height: '12px',
              'background-color': color,
              'border-radius': '50%',
              display: 'inline-block'
            }}></div>
            <span>{params.value}</span>
          </div>
        );
      }
    },
    { field: 'price', headerName: 'Price', width: 150 },
    {
      field: 'colors',
      headerName: 'Colors',
      width: 250,
      cellRenderer: (params) => {
        if (!params.value || params.value.length === 0) return 'No colors';

        return (
          <div style={{ display: 'flex', "flex-wrap": 'wrap', gap: '2px' }}>
            {params.value.map(color => {
              const colorCode = getColorCode(color.color);
              return (
                <div style={{ display: 'inline-block' }}>
                  <div
                    style={{
                      width: '30px',
                      height: '30px',
                      "background": color.color_code || getColorCode(color.color),
                      "border-radius": '50%',
                      border: '1px solid #ccc',
                      display: 'inline-block',
                      "vertical-align": 'middle'
                    }}
                    title={color.color}
                  />
                </div>
              );
            })}
          </div>
        );
      }
    },
  ]);

  // Fetch all data
  const fetchAllData = async () => {
    try {
      const usersRes = await fetch('http://127.0.0.1:8080/users');
      if (!usersRes.ok) {
        throw new Error(`HTTP error! status: ${usersRes.status}`);
      }
      const usersData = await usersRes.json();
      setAdminUsers(usersData.filter(user => user.role === 'user'));
      setRegularUsers(usersData);

      // Fetch products
      const productsRes = await fetch('http://127.0.0.1:8080/api/products');
      const productsData = await productsRes.json();

      const colorsRes = await fetch('http://127.0.0.1:8080/api/product-colors');
      const colorsData = await colorsRes.json();

      // Combine products with their colors
      const productsWithColors = productsData.map(product => {
        const productColors = colorsData.filter(color => color.product_id === product.id);
        return {
          ...product,
          default_image: product.default_image
            ? `http://127.0.0.1:8080/uploads/products/${product.default_image}`
            : null,
          colors: productColors.map(c => ({
            color: c.color,
            image: `http://127.0.0.1:8080/uploads/products/${c.image}`
          }))
        };
      });

      setProducts(productsWithColors);


      // Calculate category distribution for pie chart
      const categoryCounts = {};
      productsWithColors.forEach(product => {
        categoryCounts[product.category] = (categoryCounts[product.category] || 0) + 1;
      });
      // In fetchAllData, after calculating categoryCounts:
      setCategoryCounts(categoryCounts);

      // Calculate revenue data (mock data since we removed orders)
      const revenueData = [
        { month: "Jan", value: 12500000 },
        { month: "Feb", value: 18000000 },
        { month: "Mar", value: 15000000 },
        { month: "Apr", value: 20000000 },
        { month: "May", value: 22000000 },
        { month: "Jun", value: 25000000 },
        { month: "Jul", value: 23000000 },
        { month: "Aug", value: 24000000 },
        { month: "Sep", value: 26000000 },
        { month: "Oct", value: 27000000 },
        { month: "Nov", value: 29000000 },
        { month: "Dec", value: 31000000 },
      ];

      // Calculate total revenue
      const totalRevenue = revenueData.reduce((sum, month) => sum + month.value, 0);

      // Update stats
      setStats({
        totalOrders: 42, // Mock data
        orderIncrease: 12, // Mock data
        revenue: `Rp ${totalRevenue.toLocaleString()}`,
        visitors: usersData.length,
        visitorIncrease: 8, // Mock data
        bestSellingProduct: 34, // Mock data
        productName: productsWithColors[0]?.name || 'No products' // First product as example
      });

      // Initialize charts with the data
      initRevenueChart(revenueData);
      initPieChart(categoryCounts);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const initRevenueChart = (revenueData: { month: string; value: number }[]) => {
    try {
      const root = am5.Root.new("revenue-chart");
      root.setThemes([am5themes_Animated.new(root)]);
      root._logo?.dispose();

      const chart = root.container.children.push(
        am5xy.XYChart.new(root, {
          panX: false,
          panY: false,
          paddingLeft: 0,
          paddingRight: 0,
          wheelX: "none",
          wheelY: "none",
          layout: root.verticalLayout
        })
      );

      // Create Y-axis with no visible elements
      const yRenderer = am5xy.AxisRendererY.new(root, {
        visible: false,
        strokeOpacity: 0
      });
      yRenderer.labels.template.set("forceHidden", true);
      yRenderer.grid.template.set("forceHidden", true);

      const yAxis = chart.yAxes.push(
        am5xy.ValueAxis.new(root, {
          renderer: yRenderer,
          min: 0
        })
      );

      // Create X-axis
      const xRenderer = am5xy.AxisRendererX.new(root, {
        visible: true,
        strokeOpacity: 0,
        minGridDistance: 30
      });
      xRenderer.labels.template.setAll({
        fontWeight: 400,
        fontFamily: 'SF Pro Display',
        fontSize: 12,
        fill: am5.color("#000"),
        paddingTop: 5
      });
      xRenderer.grid.template.set("forceHidden", true);
      xRenderer.ticks.template.set("forceHidden", true);

      const xAxis = chart.xAxes.push(
        am5xy.CategoryAxis.new(root, {
          categoryField: "month",
          renderer: xRenderer
        })
      );

      xAxis.data.setAll(revenueData);

      // Main data series (black)
      const mainSeries = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "value",
          categoryXField: "month",
          clustered: true,
          clusterGutter: 0 // Remove gutter between clusters
        })
      );

      mainSeries.columns.template.setAll({
        width: am5.percent(60), // Make columns wider
        fill: am5.color("#000000"),
        strokeOpacity: 0,
        tooltipText: "Rp {valueY}",
        cornerRadiusBL: 2, // Add border radius to top
        cornerRadiusBR: 2,
        cornerRadiusTL: 2, // Add border radius to bottom
        cornerRadiusTR: 2
      });

      // Decorative series (gray)
      const decorativeSeries = chart.series.push(
        am5xy.ColumnSeries.new(root, {
          xAxis: xAxis,
          yAxis: yAxis,
          valueYField: "value",
          categoryXField: "month",
          clustered: true,
          clusterGutter: 0 // Remove gutter between clusters
        })
      );

      decorativeSeries.columns.template.setAll({
        width: am5.percent(60), // Make columns wider
        fill: am5.color("#cccccc"),
        strokeOpacity: 0,
        tooltip: null,
        cornerRadiusBL: 2, // Add border radius to top
        cornerRadiusBR: 2,
        cornerRadiusTL: 2, // Add border radius to bottom
        cornerRadiusTR: 2
      });

      // Set data
      mainSeries.data.setAll(revenueData);
      decorativeSeries.data.setAll(revenueData.map(item => ({
        month: item.month,
        value: item.value * 0.85
      })));

      // Position the decorative series behind the main series
      decorativeSeries.zIndex = -1;

      // Adjust spacing between columns
      chart.events.on("datavalidated", function () {
        const seriesContainer = chart.seriesContainer;
        seriesContainer.set("paddingLeft", 15);
        seriesContainer.set("paddingRight", 15);
      });

      chart.appear(1000, 100);
      return root;
    } catch (error) {
      console.error("Error initializing revenue chart:", error);
      return null;
    }
  };

  const initPieChart = (categoryData) => {
    try {
      const root = am5.Root.new("pie-chart");
      root._logo?.dispose();
      root.setThemes([am5themes_Animated.new(root)]);
  
      const chart = root.container.children.push(am5percent.PieChart.new(root, {
        layout: root.verticalLayout
      }));
  
      // Define the same color scheme used in the table
      const categoryColors = {
        'Bags': am5.color("#A6A6A6"),
        'Clothes': am5.color("#595959"),
        'Accessories': am5.color("#262626"),
      };
  
      const series = chart.series.push(am5percent.PieSeries.new(root, {
        name: "Categories",
        valueField: "value",
        categoryField: "category",
        radius: am5.percent(90),
        innerRadius: am5.percent(0),
        stroke: am5.color("#ffffff"),
        strokeWidth: 2,
        fill: (root, target, dataItem) => {
          // Use the same colors as in the table
          const color = categoryColors[dataItem.dataContext.category] || "#cccccc";
          return am5.color(color);
        }
      }));
  
      // Rest of your pie chart configuration...
      series.labels.template.set("forceHidden", true);
      series.ticks.template.set("forceHidden", true);
  
      const chartData = Object.keys(categoryData).map(category => ({
        category,
        value: categoryData[category]
      }));
  
      series.data.setAll(chartData);
      series.appear(1000, 100);
      
      return root;
    } catch (error) {
      console.error("Error initializing pie chart:", error);
      return null;
    }
  };
  const [currentUser, setCurrentUser] = createSignal({
    fullname: '',
    email: ''
  });

  const fetchCurrentUser = async (userId = 'admin') => {
    try {
      const response = await fetch(`http://127.0.0.1:8080/user/${userId}`, {
        method: 'GET',
      });
      const userData = await response.json();
      setCurrentUser(userData);
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  };
  // const [categoryCounts, setCategoryCounts] = createSignal({});

  onMount(() => {
    fetchCurrentUser();
    fetchAllData();
  });

  const [categoryCounts, setCategoryCounts] = createSignal<Record<string, number>>({});

  return (
    <div class="admin-container">
      {/* Header */}
      <header class="admin-header">
        <div class="admin-profile">
          <div class="admin-avatar"></div>
          <div class="admin-info">
            <div class="admin-name">{currentUser().fullname}</div>
            <div class="admin-email">{currentUser().email}</div>
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
          <div class="stat-value">{stats().totalOrders} Orders</div>
          <div class="stat-change">+{stats().orderIncrease}% from last month</div>
        </div>
        <div class="stat-card2">
          <div class="stat-header">
            <span>Revenue This Month</span>
            <span class="more-options">···</span>
          </div>
          <div class="stat-value">{stats().revenue}</div>
          <div class="stat-change">Increase compared to last month</div>
        </div>
        <div class="stat-card3">
          <div class="stat-header">
            <span>Active Users / Visitors</span>
            <span class="more-options">···</span>
          </div>
          <div class="stat-value">{stats().visitors} Visitors</div>
          <div class="stat-change">+{stats().visitorIncrease}% in the last 7 days</div>
        </div>
        <div class="stat-card4">
          <div class="stat-header">
            <span>Best Selling Product</span>
            <span class="more-options">···</span>
          </div>
          <div class="stat-value">{stats().bestSellingProduct} Pcs Sold</div>
          <div class="stat-change">{stats().productName}</div>
        </div>
      </div>

      {/* Charts */}
      <div class="chart-container">
        <div class="revenue-chart-container">
          <div class="revenue-header">
            <span>Total Revenue</span>
            <span class="more-options">···</span>
          </div>
          <div id="revenue-chart" style={{ width: '100%', height: '300px' }}></div>
        </div>
        <div class="chart-side">
          <div class="donut-chart-container">
            <div id="pie-chart" style={{ width: '100%', height: '250px' }}></div>

            {/* Category details */}
            <div class="category-details">
              <h3>Details:</h3>
              <div class="category-grid">
                {Object.entries(categoryCounts()).map(([category, count]) => (
                  <div class="category-item">
                    <span class="category-name">{category}:</span>
                    <span class="category-count">{count} products</span>
                  </div>
                ))}
              </div>
            </div>

            {/* User activity card */}
          </div>
          <div class="user-activity-card">
            <h3>User Activity Status</h3>
            <div class="user-list">
              {adminUsers().slice(0, 3).map(user => (
                <div class="user-item">
                  <div class="user-info">
                    <h4>{user.fullname}</h4>
                    <div class="user-role">{user.role}</div>
                  </div>
                  <div class={`status-indicator ${user.is_online ? 'online' : 'offline'}`}>
                    {user.is_online ? 'Online' : 'Offline'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Data Tables */}
      <div class="data-tables">
        <div class="table-section">
          <h2>Users</h2>
          <div class="ag-theme-alpine users-table" style={{ height: '300px', width: '96%' }}>
            <AgGridSolid
              columnDefs={columnDefs()}
              rowData={adminUsers()}
              defaultColDef={{
                sortable: true,
                filter: true,
                resizable: true
              }}
            />
          </div>
        </div>

        <div class="table-section2">
          <h2>Products</h2>
          <div class="ag-theme-alpine" style={{
            height: '500px',
            width: '95%',
            '--ag-row-height': '100px',
            '--ag-cell-horizontal-padding': '10px'
          }}>
            <AgGridSolid
              columnDefs={productColumnDefs()}
              rowData={products()}
              defaultColDef={{
                sortable: true,
                filter: true,
                resizable: true
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;