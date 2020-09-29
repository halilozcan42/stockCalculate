// StorageController   >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const StorageController = (function() {

})();

// ProductController   >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const ProductController = (function() {

    //Private
    const Product = function(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }

    const data = {
        products: [],
        selectedProduct: null,
        totalPrice: 0
    }


    //Public
    return {
        getProducts: function() {
            return data.products;
        },

        getData: function() {
            return data;
        },
        addProduct: function(name, price) {
            let id;

            if (data.products.length > 0) {
                id = data.products[data.products.length - 1].id + 1;
            } else {
                id = 0;
            }
            const newProduct = new Product(id, name, parseFloat(price));
            data.products.push(newProduct);
            return newProduct;
        },
        getTotal: function() {
            let total = 0;
            data.products.forEach(item => {
                total += item.price;
            });

            data.totalPrice = total;
            return data.totalPrice;
        }

    }


})();

// UIController            >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const UIController = (function() {

    const Selectors = {
        productList: '#item-list',
        addButton: '.addBtn',
        productName: '#productName',
        productPrice: '#productPrice',
        productCard: '#productCard',
        totalDollar: '#totalDollar'
    }

    //Public
    return {
        createProductList: function(products) {
            let html = '';

            products.forEach(prd => {
                html += `
                    <tr>
                        <td>${prd.id}</td>
                        <td>${prd.name}</td>
                        <td>${prd.price}</td>
                        <td class="text-right">
                            <button type="submit" class="btn btn-warning">
                                <i class="far fa-edit"></i>
                            </button></td>
                    </tr>
                `;
            });

            document.querySelector(Selectors.productList).innerHTML = html;
        },
        getSelectors: function() {
            return Selectors;
        },
        addProduct: function(prd) {
            document.querySelector(Selectors.productCard).style.display = 'block';
            var item = `
                    <tr>
                        <td>${prd.id}</td>
                        <td>${prd.name}</td>
                        <td>${prd.price}</td>
                        <td class="text-right">
                            <button type="submit" class="btn btn-warning">
                                <i class="far fa-edit"></i>
                            </button></td>
                    </tr>
            `;
            document.querySelector(Selectors.productList).innerHTML += item;
        },
        clearInputs: function() {
            document.querySelector(Selectors.productName).value = '';
            document.querySelector(Selectors.productPrice).value = '';
        },
        hideCard: function() {
            document.querySelector(Selectors.productCard).style.display = 'none';
        },
        showTotal: function(total) {
            document.querySelector(Selectors.totalDollar).textContent = total;
        }
    }
})();

// AppController        >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

const App = (function(ProductCtrl, UICtrl) {

    const UISelectors = UIController.getSelectors();

    // Load Event Listener
    const loadEventListener = function() {

        //Add product Event
        document.querySelector(UISelectors.addButton).addEventListener('click', productAddSubmit);

    }

    const productAddSubmit = function(e) {

        const productName = document.querySelector(UISelectors.productName).value;
        const productPrice = document.querySelector(UISelectors.productPrice).value;

        if (productName !== '' && productPrice !== '') {
            //Add Product
            const newProduct = ProductCtrl.addProduct(productName, productPrice);

            //Add item to list
            UIController.addProduct(newProduct);

            //Get total
            const total = ProductCtrl.getTotal();

            //Show total
            UICtrl.showTotal(total);

            //Clear inputs
            UIController.clearInputs();
        }

        console.log(productName, productPrice);

        e.preventDefault();
    }




    return {
        init: function() {
            console.log('Satarting App....')
            const products = ProductCtrl.getProducts();

            if (products.length == 0) {
                UICtrl.hideCard();
            } else {
                UICtrl.createProductList(products);
            }



            loadEventListener();
        }
    }

})(ProductController, UIController);

App.init();