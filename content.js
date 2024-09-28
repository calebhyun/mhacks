

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
returnProducts();

// Create a function to initialize the popup
function initPopup() {
  // Create the popup div
  const popupDiv = document.createElement('div');
  popupDiv.id = 'simplePopup';
  popupDiv.style.cssText = `
    width: 400px;
    height: 300px;
    background-color: white;
    border: 1px solid #ccc;
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 10000;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    text-align: center;
  `;

  // Add content to the popup, including the close button
  popupDiv.innerHTML = `
    <div style="position: relative;">
      <button id="closePopupBtn" style="position: absolute; top: 5px; right: 5px; background: none; border: none; font-size: 18px; cursor: pointer;">&times;</button>
      <h3>Simple Popup</h3>
      <p>This is a basic popup that appears over the page.</p>
    </div>
  `;

  // Append the popup to the body
  document.body.appendChild(popupDiv);

  // Create the collapsed icon button
  const collapsedBtn = document.createElement('div');
  collapsedBtn.id = 'collapsedIcon';
  collapsedBtn.style.cssText = `
    width: 40px;
    height: 40px;
    background-color: #007bff;
    color: white;
    border-radius: 50%;
    position: fixed;
    top: 10px;
    right: -40px;
    z-index: 10001;
    text-align: center;
    line-height: 40px;
    font-size: 24px;
    cursor: pointer;
    transition: right 0.5s;
  `;
  collapsedBtn.innerHTML = '☰'; // Hamburger icon

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
    collapsedBtn.style.right = '-40px';
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





