// Get the links from storage and display them
chrome.storage.local.get('productLinks', function(data) {
    const linksDiv = document.getElementById('links');
    
    if (data.productLinks && data.productLinks.length > 0) {
      data.productLinks.forEach(product => {
        const linkDiv = document.createElement('div');
        linkDiv.className = 'product';
  
        const productLink = document.createElement('a');
        productLink.href = product.link;
        productLink.textContent = product.name;
        productLink.target = '_blank';
  
        linkDiv.appendChild(productLink);
        linksDiv.appendChild(linkDiv);
      });
    } else {
      linksDiv.textContent = 'No products found.';
    }
  });
  