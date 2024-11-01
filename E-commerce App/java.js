var API_URL = 'https://dummyjson.com/products';
var productsContainer = document.getElementById('products-container');
var cartBtn = document.getElementById('cart-btn');
var cartCount = document.getElementById('cart-count');
var cart = [];
var currentPage = 1;
var productsPerPage = 10; 
var allProducts = [];




function fetchProducts() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', API_URL, true);

  xhr.onload = function() {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      allProducts = response.products;
      displayProducts();
    } else {
      console.error('Error fetching products');
    }
  };
  xhr.send();
}


function displayProducts() {
  productsContainer.innerHTML = '';
  var filteredProducts = filterProducts();
  var start = (currentPage - 1) * productsPerPage;
  var end = start + productsPerPage;
  var productsToShow = filteredProducts.slice(start, end);

  productsToShow.forEach(product => {
    var productCard = document.createElement('div');
    productCard.className = 'product';

    var img = document.createElement('img');
    img.src = product.thumbnail;
    productCard.appendChild(img);

    var title = document.createElement('h2');
    title.innerHTML = product.title;
    productCard.appendChild(title);

    var price = document.createElement('p');
    price.innerHTML = '$' + product.price;
    productCard.appendChild(price);

    var addButton = document.createElement('button');
    addButton.innerHTML = 'Add to Cart';
    addButton.setAttribute('data-id', product.id);
    addButton.onclick = addToCart;
    productCard.appendChild(addButton);

    productsContainer.appendChild(productCard);
  });
  updatePageNumber();
}


function filterProducts() {
  var searchInput = document.getElementById('search-input').value.toLowerCase();
  return allProducts.filter(product => product.title.toLowerCase().includes(searchInput));
}


function updatePageNumber() {
  document.getElementById('page-number').innerText = currentPage;
}


document.getElementById('prev-btn').onclick = function() {
  if (currentPage > 1) {
    currentPage--;
    displayProducts();
  }
};

document.getElementById('next-btn').onclick = function() {
  var maxPage = Math.ceil(filterProducts().length / productsPerPage);
  if (currentPage < maxPage) {
    currentPage++;
    displayProducts();
  }
};


function addToCart(event) {
  var productId = event.target.getAttribute('data-id');
  cart.push(productId);
  updateCartCount();
}

function updateCartCount() {
  cartCount.innerHTML = cart.length;
}


document.getElementById('shop-now-btn').onclick = function() {
  document.querySelector('main').scrollIntoView({ behavior: 'smooth' });
};

 

document.getElementById('search-input').addEventListener('input', function() {
  currentPage = 1; 
  displayProducts();
});
document.querySelector('main').scrollIntoView({ behavior: 'smooth' });

var searchInput = document.getElementById('search-input');

// Listen for the "Enter" key on the search input
searchInput.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    event.preventDefault(); // Prevent the default action (form submission, etc.)
    currentPage = 1; // Reset to the first page for a new search
    displayProducts(); // Trigger the display of filtered products
  }
});
fetchProducts();
