import { cartBtn, cartBtnCount, cartCount, cartItems, cartTotalAmount, cartUi, productSection } from "../core/selectors";
import { products } from './../core/variables';
import { calculateCartTotalAmount, cartCounter, createCartUi } from './cart';

export const productRender = (list) => {
  productSection.innerHTML = "";
  list.forEach((el) => {
    productSection.append(createProductCard(el))
    });
}

export const ratingUi = (rate) => {
  let result = '';
  for (let i = 1; i <= 5; i++) {
    
      result += `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 ${i <= rate.toFixed(0) ? 'fill-neutral-700' : 'fill-neutral-300'}">
      <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg> `;
  }
  return result;
}

export const createProductCard = ({id,image,title,description,price,rating:{rate,count}}) => {
    const card = document.createElement('div');
    const isCartItem = cartItems.querySelector(`[product-id='${id}']`);
    card.classList.add('product-card');
    card.setAttribute('data-id',id);
    card.innerHTML = `
    <div class=" text-neutral-700">
              <img class="product-img h-36 ms-5 -mb-16" src="${image}" alt="">
              <div class="product-info border border-neutral-700 p-5 pt-20">
                <p class=" font-bold line-clamp-1 mb-5 font-heading text-lg">${title}</p>
                <p class=" text-sm text-neutral-500 line-clamp-2 mb-5">${description}</p>
                <div class="rating flex justify-between border-b border-neutral-700 pb-5 mb-5">
                  <div class="rating-star flex ">
                  
                  ${ratingUi(rate)}

                  </div>
                  <p class="rating-text">( ${rate}/${count} )</p>
                </div>
                <p class=" font-bold text-xl mb-2 font-heading">$ <span>${price}</span></p>
                <button ${isCartItem && 'disabled'} class="add-to-cart ${isCartItem && 'bg-neutral-700 text-white'} border border-neutral-700 p-3 w-full">${isCartItem ? 'Added' : 'Add to Cart'}</button>
              </div>
            </div>
    `;
    const addToCartBtn = card.querySelector('.add-to-cart');
    addToCartBtn.addEventListener('click',addToCartBtnHandler)
    return card;
}

  const addToCartBtnHandler = (event) => {
    const btn = event.target;
    const currentCard = event.target.closest('.product-card');
    const currentId = event.target.closest('.product-card').getAttribute('data-id');
    const currentProduct = products.find( el => el.id == currentId);
    cartItems.append(createCartUi(currentProduct));
    setCartAddedBtn(currentId);
    

    // productcart-animation start

    const cart =  cartBtn.querySelector('svg').getBoundingClientRect();
    const currentImg = currentCard.querySelector('img');
    const img = currentImg.getBoundingClientRect();
    const cartItemRect = cartItems.getBoundingClientRect();

    const newImg = new Image(img.width);
    newImg.src = currentImg.src;
    newImg.style.position = "fixed";
    newImg.style.zIndex = 51;
    newImg.style.top = img.top + "px";
    newImg.style.left = img.left + "px";
    document.body.append(newImg);

    let effect;
    if(cartUi.classList.contains('translate-x-full')){
      effect = [
        { top : img.top+"px", left : img.left+"px", width: img.width+"px", rotate: 360+"deg" },
        { top : cart.top+"px", left : cart.left+"px", width : 0,  rotate: 0+"deg" },
      ];
    }else{
      effect = [
        { top : img.top+"px", left : img.left+"px", width: img.width+"px", rotate: 360+"deg" },
        { top : cartItemRect.top+300+"px", left : cartItemRect.left+200+"px", width : 0,  rotate: 0+"deg" },
      ];
    }
    
    const timing = {
      duration: 500,
      iterations: 1,
    };

    
    const newImgaAnimation =  newImg.animate(effect, timing);

    // productcart-animation end


    //cart-icon animation start
    newImgaAnimation.addEventListener('finish',() => {
      cartBtn.classList.add('animate__tada');
      cartBtn.addEventListener('animationend',() => {
        cartBtn.classList.remove('animate__tada');
      });
      newImg.remove();
    })
    //cart-icon animation end
  
    

    
 
  }

  export const setCartAddedBtn = (productId) => {
    const btn = app.querySelector(`[data-id='${productId}'] .add-to-cart`);
    btn.innerText = "Added";
    btn.classList.add("bg-neutral-700","text-white");
    btn.toggleAttribute('disabled');
    
  }

  export const removeCartAddedBtn = (productId) => {
    const btn = app.querySelector(`[data-id='${productId}'] .add-to-cart`);
    btn.innerText = "Add to Cart";
    btn.classList.remove("bg-neutral-700","text-white");
    btn.toggleAttribute('disabled');
}