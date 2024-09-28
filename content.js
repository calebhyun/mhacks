// Select all the product containers
const productContainers = document.querySelectorAll('.product_productContainer___xX5j');

let productLinks = [];

productContainers.forEach(container => {
  const linkElement = container.querySelector('button.product_titleButton__e6Iao');
  
  if (linkElement && linkElement.hasAttribute('data-lulu-attributes')) {
    const dataAttributes = JSON.parse(linkElement.getAttribute('data-lulu-attributes'));
    if (dataAttributes && dataAttributes.product) {
      const productName = dataAttributes.product.name;
      const productLink = `https://www.lululemon.com/product/${dataAttributes.product.skuID}`;
      
      productLinks.push({ name: productName, link: productLink });
    }
  }
});

// Store links in Chrome storage
chrome.storage.local.set({ productLinks: productLinks });
