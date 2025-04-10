import { createSignal, onMount } from 'solid-js';
import { render } from 'solid-js/web';
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import * as am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import * as am5percent from "@amcharts/amcharts5/percent"; // Untuk PieSeries
import AgGridSolid from 'ag-grid-solid';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import './adminpage.css';

const AdminPage = () => {
  let chartDiv;
  let pieChartDiv;
  const [gridApi, setGridApi] = createSignal(null);

  const columnDefs = [
    {
      headerCheckboxSelection: true,
      checkboxSelection: true,
      width: 50,
      field: 'id',
      headerName: 'ID',
    },
    {
      field: 'productImage',
      headerName: 'Product Image',
      cellRenderer: (params) => {
        const img = document.createElement('img');
        img.src = params.value;
        img.alt = 'Product';
        img.classList.add('product-image');
        return img;
      },
      width: 120
    },
    { field: 'name', headerName: 'Name', flex: 1 },
    { field: 'category', headerName: 'Category', flex: 1 },
    { field: 'price', headerName: 'Price', flex: 1 },
    {
      field: 'color',
      headerName: 'Color',
      cellRenderer: (params) => {
        const container = document.createElement('div');
        params.value.forEach(color => {
          const dot = document.createElement('span');
          dot.className = 'color-dot';
          dot.style.backgroundColor = color;
          container.appendChild(dot);
        });
        return container;
      },
      flex: 1
    },
    {
      headerName: '',
      cellRenderer: () => {
        const button = document.createElement('button');
        button.className = 'options-button';
        button.textContent = '...';
        return button;
      },
      width: 80
    }
  ];

  const rowData = [
    {
      id: '001',
      productImage: 'https://via.placeholder.com/80x80/ff6b6b/ffffff?text=Bag',
      name: 'Litchi Pattern Pillow Handbag',
      category: 'Accessories',
      price: '285,300 IDR',
      color: ['#000', '#4682B4', '#008080', '#FF6B6B']
    },
    {
      id: '002',
      productImage: 'https://via.placeholder.com/80x80/d4a373/ffffff?text=Bag',
      name: 'Retro Small Square Handbag',
      category: 'Accessories',
      price: '174,000 IDR',
      color: ['#000', '#654321', '#8B4513', '#F5DEB3']
    }
  ];

  onMount(() => {
    // Revenue Chart
    const root = am5.Root.new(chartDiv);
    root.setThemes([am5themes_Animated.default.new(root)]);

    const chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panY: false,
        layout: root.verticalLayout
      })
    );

    // Create Y-axis
    const yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {})
      })
    );

    // Create X-axis
    const xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {}),
        categoryField: "month"
      })
    );

    // Define data
    const data = [
      { month: "Jan", revenue: 50, secondaryRevenue: 80 },
      { month: "Feb", revenue: 40, secondaryRevenue: 100 },
      { month: "Mar", revenue: 30, secondaryRevenue: 120 },
      { month: "Apr", revenue: 70, secondaryRevenue: 80 },
      { month: "May", revenue: 60, secondaryRevenue: 70 },
      { month: "Jun", revenue: 90, secondaryRevenue: 60 },
      { month: "Jul", revenue: 50, secondaryRevenue: 70 },
      { month: "Aug", revenue: 80, secondaryRevenue: 50 },
      { month: "Sep", revenue: 70, secondaryRevenue: 60 },
      { month: "Oct", revenue: 80, secondaryRevenue: 40 },
      { month: "Nov", revenue: 60, secondaryRevenue: 70 }
    ];

    xAxis.data.setAll(data);

    // Create series for primary revenue
    const series = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Revenue",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "revenue",
        categoryXField: "month",
        fill: am5.color("#333")
      })
    );
    series.data.setAll(data);

    // Create series for secondary revenue
    const series2 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Secondary Revenue",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "secondaryRevenue",
        categoryXField: "month",
        fill: am5.color("#777")
      })
    );
    series2.data.setAll(data);

    // Add legend
    chart.set("cursor", am5xy.XYCursor.new(root, {}));

    // Pie Chart
    const pieRoot = am5.Root.new(pieChartDiv);
    pieRoot.setThemes([am5themes_Animated.default.new(pieRoot)]);

    const pieChart = pieRoot.container.children.push(
      am5percent.PieChart.new(pieRoot, {
        radius: am5.percent(90),
        innerRadius: am5.percent(0)
      })
    );

    const pieSeries = pieChart.series.push(
        am5percent.PieSeries.new(pieRoot, {
          name: "Series",
          valueField: "value",
          categoryField: "category",
          startAngle: 180,
          endAngle: 360
        })
      );

    pieSeries.slices.template.setAll({
      fillOpacity: 1,
      stroke: am5.color(0xffffff),
      strokeWidth: 1
    });

    const pieData = [
      { category: "Accessories", value: 60 },
      { category: "Clothes", value: 40 }
    ];

    pieSeries.data.setAll(pieData);

    // Clean up on unmount
    return () => {
      root.dispose();
      pieRoot.dispose();
    };
  });

  return (
    <div class="admin-container">
      <header class="admin-header">
        <div class="search-container">
          <input type="text" placeholder="Search" class="search-input" />
        </div>
        <div class="admin-profile">
          <div class="admin-avatar"></div>
          <div class="admin-info">
            <div class="admin-name">Admin</div>
            <div class="admin-email">abcd@gmail.com</div>
          </div>
          <div class="dropdown-icon">▼</div>
        </div>
      </header>

      <div class="stats-container">
        <div class="stat-card">
          <div class="card-header">
            <span>Walking</span>
            <span class="more-icon">...</span>
          </div>
          <div class="stat-value">1,167 steps</div>
          <div class="stat-subtext">Yesterday was 1,181 steps</div>
        </div>
        
        <div class="stat-card">
          <div class="card-header">
            <span>Stretching</span>
            <span class="more-icon">...</span>
          </div>
          <div class="stat-value">12 minutes</div>
          <div class="stat-subtext">Yesterday was 15 minutes of stretching</div>
        </div>
        
        <div class="stat-card">
          <div class="card-header">
            <span>Stretching</span>
            <span class="more-icon">...</span>
          </div>
          <div class="stat-value">12 minutes</div>
          <div class="stat-subtext">Yesterday was 15 minutes of stretching</div>
        </div>
        
        <div class="stat-card">
          <div class="card-header">
            <span>Stretching</span>
            <span class="more-icon">...</span>
          </div>
          <div class="stat-value">12 minutes</div>
          <div class="stat-subtext">Yesterday was 15 minutes of stretching</div>
        </div>
      </div>

      <div class="chart-section">
        <div class="section-header">
          <h2>Total Revenue</h2>
          <span class="more-icon">...</span>
        </div>
        <div ref={chartDiv} class="revenue-chart"></div>
      </div>

      <div class="main-content">
        <div class="products-section">
          <div class="section-header">
            <h2>Products</h2>
            <button class="add-product-btn">Add New Product</button>
          </div>
          <div class="ag-theme-alpine" style={{ height: '400px', width: '100%' }}>
            <AgGridSolid
              columnDefs={columnDefs}
              rowData={rowData}
              defaultColDef={{
                sortable: true,
                filter: true,
                resizable: true
              }}
              rowSelection="multiple"
              onGridReady={(params) => setGridApi(params.api)}
            />
          </div>
        </div>

        <div class="sidebar">
          <div class="pie-chart-container">
            <div ref={pieChartDiv} class="pie-chart"></div>
            <div class="chart-details">
              <h3>Details</h3>
              <div class="detail-item">
                <span class="detail-dot" style={{ "background-color": "#000" }}></span>
                <span>Accessories</span>
              </div>
              <div class="detail-item">
                <span class="detail-dot" style={{ "background-color": "#777" }}></span>
                <span>Clothes</span>
              </div>
            </div>
          </div>

          <div class="user-activity">
            <div class="section-header">
              <h3>User Activity Status</h3>
              <span class="more-icon">...</span>
            </div>
            <div class="user-list">
              {[1, 2, 3, 4, 5, 6, 7].map((_, index) => (
                <div class="user-item">
                  <div class="user-info">
                    <div class="user-name">Devon Lane</div>
                    <div class="user-role">User</div>
                  </div>
                  <div class={`status-badge ${index % 2 === 0 ? 'online' : 'offline'}`}>
                    {index % 2 === 0 ? 'Online' : 'Offline'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;