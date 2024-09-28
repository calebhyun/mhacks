

// Create class to process each cart item
class CartElt {
  constructor(name, link, image) {
    this.name = name;
    this.link = link;
    this.image = image;
  }

  display() {
    console.log(`Name: ${this.name}`);
    console.log(`Link: ${this.link}`);
    console.log(`Image: ${this.image}`);
  }
}

function returnProducts() {
  products = [];
  // Select the script tag by ID
  const scriptTag = document.getElementById('__NEXT_DATA__');

  // Parse the JSON data from the script tag's innerText
  const jsonData = JSON.parse(scriptTag.textContent);

  // Access the items array inside the data object
  const shipItems = jsonData.props.pageProps.data.bag.items.shipItems;
  // Iterate over the items and extract the product URLs
  shipItems.forEach(item => {
    const productUrl = "https://shop.lululemon.com" + item.productUrl;
    const productName = item.productName;
    const productImage = item.selectedSku.image;

    const product = new CartElt(productName, productUrl, productImage);
    //product.display();
    products.push(product);

    return products;
  });
}

returnProducts();

// Create a function to initialize the popup
function initPopup() {
  // Create the popup div
  const popupDiv = document.createElement('div');
  popupDiv.id = 'simplePopup';
  popupDiv.style.cssText = `
    width: 369px;
    height: 634px;
    background-color: #D9D9D9;
    border: 1px solid #ccc;
    border-radius: 15px;
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 10000;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: left;
    overflow-y: auto; /* Makes the popup scrollable */
  `;

  // Add close button and title to the popup
  popupDiv.innerHTML = `
    <div style="position: relative;">
        <button id="closePopupBtn" style="position: absolute; top: 5px; right: 5px; background: none; border: none; font-size: 18px; cursor: pointer;">&times;</button>
        <h3 style="margin-left: 10px; margin-top: 10px">Your Cart</h3>
        <div id="productContainer" style="display: flex; flex-wrap: wrap; gap: 10px;"></div>
    </div>
  `;

  // Set the alt text for accessibility
  const logoImg = document.createElement('img');
  logoImg.src = 'chrome-extension://maddnapocpaddbicgkofjjdlnpmbcadk/images/logoFull.png'; // Replace with the correct image path
  logoImg.alt = 'Logo';
  logoImg.style.cssText = `
    position: absolute;
    bottom: 10px;
    right: 10px;
    width: 80px;       /* Adjust the width as needed */
    height: auto;      /* Maintain aspect ratio */
    cursor: pointer;   /* Makes the logo clickable */
    z-index: 1001;     /* Ensures it appears above other content */
  `;
  
  // Append the logo inside the popup div
  popupDiv.appendChild(logoImg);

  // Append the popup to the body
  document.body.appendChild(popupDiv);

  // Populate product tiles inside the popup
  const productContainer = document.getElementById('productContainer');
  products.forEach(product => {
    const productTile = document.createElement('div');
    productTile.style.cssText = `
      width: 100%;
      height: 100px;
      background-color: #A0B6A0;
      border: 1px solid #ccc;
      border-radius: 15px;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    `;

    // Add product image, name, and link
    productTile.innerHTML = `
      <div style="flex: 1;">
        <img src="${product.image}" alt="${product.name}" style="width: 80px; height: 80px; object-fit: cover; border-radius: 5px;">
      </div>
      <div style="flex: 3; padding-left: 15px; height: 80px;">
        <a target="_blank" style="text-decoration: none; color: black;">
          <p style="margin: 0; font-weight: bold;">${product.name} </p>
        </a>
        <div style="flex: 3; height: 40px;">
          <a target="_blank" style="text-decoration: none; color: black;">
            <p style="margin: 0;">Carbon Score: </p>
          </a>
          <a target="_blank" style="text-decoration: none; color: black;">
            <p style="margin: 0;">Water Score: </p>
          </a>
        </div>
      </div>
    `;

    productContainer.appendChild(productTile);
  });

  // Create the collapsed icon button
  const collapsedBtn = document.createElement('div');
  collapsedBtn.id = 'collapsedIcon';
  collapsedBtn.style.cssText = `
    width: 80px;
    height: 80px;
    background-color: #007bff;
    background-image: url('chrome-extension://maddnapocpaddbicgkofjjdlnpmbcadk/images/logoFull.png');
    background-size: cover; /* Ensures the image fits the button */
    color: #D9D9D9;
    border-radius: 50%;
    position: fixed;
    top: 10px;
    right: -100px;
    z-index: 10001;
    text-align: center;
    line-height: 40px;
    font-size: 24px;
    cursor: pointer;
    transition: right 0.5s;
  `;

  // Append collapsed icon to the body
  document.body.appendChild(collapsedBtn);

  // Collapse the popup to the right
  function collapsePopup() {
    popupDiv.style.right = '-400px';
    collapsedBtn.style.right = '10px';
  }

  // Reopen the popup
  collapsedBtn.addEventListener('click', function () {
    popupDiv.style.right = '10px';
    collapsedBtn.style.right = '-100px';
  });

  // Close button functionality to collapse the popup
  document.getElementById('closePopupBtn').addEventListener('click', function () {
    collapsePopup();
  });

  // Show the popup
  popupDiv.style.display = 'block';
}

// Initialize the popup when the DOM is fully loaded
window.onload = initPopup;