import Swal from "sweetalert2";
import { app, cartBtnCount, cartCount, cartItems, cartTotalAmount } from "../core/selectors";
import { removeCartAddedBtn } from "./product";

export const createCartUi = ({id,image,title,price}) => {
    const cart = document.createElement('div');
    cart.classList.add('cart-item');
    cart.setAttribute('product-id',id);
    cart.innerHTML = `
        <div class="mb-5 group">
            <img class="h-[80px] ms-4 -mb-9 relative z-50" src="${image}" alt="">
            <div class=" border border-neutral-300 p-4 pt-10 shadow relative">

            <button class="cart-remove-btn absolute top-4 right-4 opacity-0 translate-x-10 group-hover:translate-x-0 duration-200 group-hover:opacity-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 text-red-500">
            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
            </button>

                <p class=" font-bold mb-3 line-clamp-1">${title}</p>
                <div class=" flex justify-between">
                <p class=" text-neutral-500">$ <span class="cart-cost">${price}</span></p>
                <div class=" bg-neutral-300 flex w-[130px] justify-between items-center">
                    <p class="original-cost hidden">${price}</p>
                    <button class="cart-decrement-btn bg-neutral-400 px-2 py-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
                    </svg>                        
                    </button>
                    <p class="quantity flex-grow text-end pe-2">1</p>
                    <button class="cart-increment-btn bg-neutral-400 px-2 py-1">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
                    </svg>                        
                    </button>
                   
                </div>
                </div>
            </div>
        </div>
    `
    const cartRemoveBtn = cart.querySelector('.cart-remove-btn');
    cartRemoveBtn.addEventListener('click',cartRemoveBtnHandler);

    const cartIncrementBtn = cart.querySelector('.cart-increment-btn');
    const cartDecrementBtn = cart.querySelector('.cart-decrement-btn');

    cartIncrementBtn.addEventListener('click',cartIncrementBtnHandler);
    cartDecrementBtn.addEventListener('click',cartDecrementBtnHandler);
    return cart;
}

export const calculateCartTotalAmount = () => {
    const cartsCost = app.querySelectorAll('.cart-cost');
    // console.log(cartsCost.length);
    return [...cartsCost].reduce( (pv,cv) => pv + parseFloat(cv.innerText), 0).toFixed(2);
    // let total = 0;
    // cartsCost.forEach((el) => {
    //     total += parseFloat(el.innerText);
    // });
    // console.log(total);
}

export const cartCounter = () => {
    const carts = app.querySelectorAll('.cart-item');
    return carts.length;
}

export const cartObserver = () => {
    const observerOptions = {
        childList: true,
        subtree: true,
      };
      
      const observer = new MutationObserver(() => {
        cartTotalAmount.innerText = calculateCartTotalAmount();
        cartCount.innerText = cartCounter();
        cartBtnCount.innerText = cartCounter();
      });
      observer.observe(cartItems, observerOptions);
}

export const cartRemoveBtnHandler = (event) => {
    const currentCart = event.target.closest('.cart-item');
    const productId = currentCart.getAttribute('product-id');
    
    Swal.fire({
        title: "Delete Alert!",
        text: "Are you sure to delete it?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirm"
      }).then((result) => {
        if (result.isConfirmed) {
            currentCart.remove();  
            removeCartAddedBtn(productId);
           
        }
      });
}

const cartIncrementBtnHandler = (event) => {

    const currentCart = event.target.closest('.cart-item');
    const currentQuantity = currentCart.querySelector('.quantity');
    const currentCartCost = currentCart.querySelector('.cart-cost');
    const originalCartCost = currentCart.querySelector('.original-cost');

   currentQuantity.innerText = parseInt(currentQuantity.innerText) + 1;
   currentCartCost.innerText = originalCartCost.innerText * currentQuantity.innerText;
   
}
const cartDecrementBtnHandler = (event) => {

    const currentCart = event.target.closest('.cart-item');
    const currentQuantity = currentCart.querySelector('.quantity');
    const currentCartCost = currentCart.querySelector('.cart-cost');
    const originalCartCost = currentCart.querySelector('.original-cost');

    if(currentQuantity.innerText > 1){

        currentQuantity.innerText = parseInt(currentQuantity.innerText) - 1;
        currentCartCost.innerText = originalCartCost.innerText * currentQuantity.innerText;
    }
   
}