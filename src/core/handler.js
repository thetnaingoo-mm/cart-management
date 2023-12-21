import Swal from "sweetalert2";
import { productRender, removeCartAddedBtn } from "../app/product";
import { cartItems, cartTotalAmount, cartUi } from "./selectors"
import { products } from "./variables";

export const cartBtnHandler = () => {
    cartUi.classList.toggle('translate-x-full');
    cartUi.classList.add('duration-200');
}

export const categoryListHandler = (event) => {
    if(event.target.classList.contains('category-badge')){
        const currentCategoryBtn = event.target;
        const currentCategory = currentCategoryBtn.innerText.toLowerCase();
        const lastActiveCategoryBtn = app.querySelector('.category-badge.active');
        lastActiveCategoryBtn.classList.remove('active');
        currentCategoryBtn.classList.add('active');
        productRender(
            products.filter( (product) => product.category === currentCategory || currentCategory === "all")
        )
    }
}

export const orderNowHandler = () => {
    Swal.fire({
        title: "Order Confirm!",
        text: "Are you ready to order?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirm"
      }).then((result) => {
        if (result.isConfirmed) {
            
           
            const customer_id = Math.floor(Math.random() * 10000);
            const total = parseFloat(cartTotalAmount.innerText);
            const time = Date.now();
            const order_items = [];
            cartItems.querySelectorAll('.cart-item').forEach( el => {
                const productId = parseInt(el.getAttribute('product-id'));
                const quantity = parseInt(el.querySelector('.quantity').innerText);
                order_items.push({
                    product_id : productId,
                    quantity : quantity
                })
                el.remove();
                removeCartAddedBtn(productId);
            })
            const order = {customer_id,time,order_items,total};
            console.log(order);
        }
    });
    
}

export const searchBtnHandler = () => {
   
    const headerBtnSet = app.querySelector('.header-btn-section');
    const searchInput = document.createElement('input');
    searchInput.classList.add('aa');
    headerBtnSet.append(searchInput);
    searchInput.addEventListener('keyup',() => {
        
           productRender(products.filter(product => product.title.toLowerCase().search((searchInput.value.toLowerCase())) >= 0))
        
      
        
    })
   
    searchInput.addEventListener('blur',() => {
        searchInput.remove();
    })
}