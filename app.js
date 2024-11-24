document.addEventListener("DOMContentLoaded", function(){

    const products = [
        {id:1,name:"product1",price:29.99},
        {id:2,name:"product2",price:19.99},
        {id:3,name:"product3",price:49.994},
    ]
   
    


    let productList=document.getElementById("product-list")
    let cartItems = document.getElementById("cart-items")
    let emptyCartMsg = document.getElementById("empty-cart")
    let cartTotalMsg = document.getElementById("cart-total")
    let totalPriceDisplay = document.getElementById("total-price")
    let  checkoutBtn = document.getElementById("checkout-btn")
// recall of products from the localStorage
    const cart =JSON.parse(localStorage.getItem("products")) ||[]
    cart.forEach(product => {
        renderCart()
    });

    products.forEach(product => {
       const productDiv = document.createElement('div')
       productDiv.classList.add("product")
       productDiv.innerHTML =`<span> ${product.name}</span>- <span> $${product.price.toFixed(2)}</span>
       <button data-id ="${product.id}">Add to cart </button>`
       productList.appendChild(productDiv)
    });
   
    productList.addEventListener("click", (e)=>{
        if(e.target.tagName === "BUTTON"){
           let productId=parseInt(e.target.getAttribute("data-id"))
           const product = products.find((p)=> p.id === productId)
         addToCart(product)
        }
        function  addToCart(product){
            cart.push(product)
            // console.log(cart)
            renderCart()
            // console.log(cart)

        }
       renderCart()
    })
    function renderCart(){
        cartItems.innerHTML =""
        let totalPrice = 0
        if(cart.length>0){
            cartTotalMsg.classList.remove("hidden")
            cart.forEach((item,index) => {
                totalPrice+=item.price
                let cartProduct = document.createElement("div")
            cartProduct.classList.add("cart-product")
            cartProduct.innerHTML =`<span>${item.name}</span> <span>${item.price.toFixed(2)}</span><button data-id =${item.id}>Remove</button> `
            cartItems.appendChild(cartProduct)
            saveitems()
                totalPriceDisplay.innerHTML = `$ ${totalPrice.toFixed(2)}`
            });
        }else{
            totalPriceDisplay.innerHTML = "$0.00"
          
        }
    }

    // New feature to remove products
    cartItems.addEventListener("click",(e)=>{
        if(e.target.tagName === "BUTTON"){
          let dataId = e.target.getAttribute("data-id")
   
            // Remove the item from the cart array
            const index = cart.findIndex(item => item.id === parseInt(dataId));
            if (index !== -1) {
                cart.splice(index, 1); // Remove the item from the cart array
              
            }

            // Remove the item from the DOM
            // e.target.closest(".cart-product").remove();
            e.target.closest(".cart-product").remove()

            saveitems()

        }
    })
    checkoutBtn.addEventListener("click",function(){
        cart.length =0
        // console.log(cart)
        alert("Checkout sucessfully")
        renderCart()     
        saveitems()   
        // cartTotalMsg.classList.add("hidden")
        // emptyCartMsg.classList.remove("hidden")
    })

    
  

function saveitems(){
    localStorage.setItem("products", JSON.stringify(cart))
}



})