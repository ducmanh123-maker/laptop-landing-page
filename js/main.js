document.addEventListener('DOMContentLoaded', () => {
  // Load product data
  const loadProductData = async () => {
    try {
      const response = await fetch('products.json');
      if (!response.ok) throw new Error('Network response was not ok');
      const products = await response.json();
      return products.find(p => p.id === 1); // Or get ID from URL params
    } catch (error) {
      console.error('Error loading product data:', error);
      return null;
    }
  };

  // Update product details
  const updateProductDetails = (product) => {
    if (!product) return;

    // Basic info
    document.querySelector('.product-title').textContent = product.name;
    document.querySelector('.current-price').textContent = product.price.toLocaleString() + '₫';
    document.querySelector('.original-price').textContent = product.originalPrice.toLocaleString() + '₫';
    document.querySelector('.discount-badge').textContent = '-' + product.discount;

    // Images
    updateProductImages(product.images);

    // Specs
    updateProductSpecs(product.specs);

    // Reviews
    updateProductReviews(product.reviews);
  };

  // Initialize tab functionality
  const initializeTabs = () => {
    const tabButtons = document.querySelectorAll(".tab-button");
    const tabPanes = document.querySelectorAll(".tab-pane");

    tabButtons.forEach(button => {
      button.addEventListener("click", () => {
        tabButtons.forEach(b => b.classList.remove("active"));
        tabPanes.forEach(p => p.classList.remove("active"));
        button.classList.add("active");
        const tabId = button.getAttribute("data-tab");
        document.getElementById(tabId).classList.add("active");
      });
    });
  };

  // Initialize buttons
  const initializeButtons = () => {
    document.querySelector(".buy-now").addEventListener("click", () => {
      alert("Chuyển đến trang thanh toán!");
    });

    document.querySelector(".add-to-cart").addEventListener("click", () => {
      alert("Đã thêm sản phẩm vào giỏ hàng!");
    });
  };

  // Main initialization
  const initialize = async () => {
    const product = await loadProductData();
    if (product) {
      updateProductDetails(product);
      initializeTabs();
      initializeButtons();
    }
  };

  initialize();
});