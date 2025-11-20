let productDiv = document.querySelector("#product-div");
let cartDiv = document.querySelector(".cart-table");
let showDiv = document.querySelector(".show");

function renderProducts(){
    products.forEach(product=>{
        productDiv.innerHTML += `
            <div class="col-12 col-lg-6 mb-4">
              <div class="card card-ctr">
                <div class="card-body">
                  <img src="${product.src}" class="w-100" />
                  <hr />
                  <p class="fs-5 fw-bold text-primary">${product.name}</p>
                  <p>
                    Price - <span class="text-success fs-5 fw-bold">$ ${product.price}</span>
                  </p>
                  <div class="btn btn-info text-light w-100 cart-btn fs-6 fw-bold" onclick="addtoCarts(${product.id})">
                    Add to cart
                  </div>
                </div>
              </div>
            </div>
        `
    })
}
renderProducts();


// cart array 
let carts = JSON.parse(localStorage.getItem("productCarts")) || [] 
function addtoCarts(id){
    if(carts.some(cart => cart.id == id)){
        changeQty("plus",id);
    }
    else{
        let cart = products.find(product=>{
        return product.id === id;
    });
        carts.push({
            ...cart,
            quantity: 1
        });
    }
    updateCarts();
}

// render order cats 
function renderProductsCarts(){
    showDiv.innerHTML = "";
    cartDiv.innerHTML = "";
    carts.forEach(cart =>{
        cartDiv.innerHTML += `
             <tr>
                  <td>
                    <img src="${cart.src}" id="img-cart" title="${cart.name}" />
                  </td>
                  <td><p class="fs-5 pt-2">$ ${cart.price}</p></td>
                  <td>
                    <i
                      class="fa-solid fa-circle-minus fs-5 text-primary pt-3" onclick="changeQty('minus',${cart.id})"
                    ></i
                    ><span class="mx-2 fs-5 pt-3">${cart.quantity}</span
                    ><i
                      class="fa-solid fa-circle-plus fs-5 text-primary pt-3" onclick="changeQty('plus',${cart.id})"
                    ></i>
                  </td>
                  <td>
                    <i
                      class="fa-solid fa-trash text-danger fs-5 pt-3" onclick="remove(${cart.id})"
                      title="Remove"
                    ></i>
                  </td>
            </tr>
        `
    })
    show_hide();
}

function changeQty(condition,id){
    carts = carts.map(cart =>{
        let quantity = cart.quantity;
        if(cart.id === id){
           if(condition == "plus"){
            quantity++;
           }
           else if(condition == "minus" && quantity > 1){
            quantity--;
           }
        }
        return {
            ...cart,
            quantity,
        }
    })
    updateCarts();
}

function renderPrice(){
    let totalPrice = 0,
        totalcart =0;
    carts.forEach(cart =>{
        totalPrice += cart.price * cart.quantity;
        totalcart += cart.quantity;
    })
    document.querySelector("#totalPrice").innerText =`$ ${totalPrice}`
    document.querySelector("#totalCart").innerText =`${totalcart}`
}

function remove(id){
    carts = carts.filter(cart => cart.id !== id);
         updateCarts(); 
}

function show_hide(){
    if(!cartDiv.innerHTML){
        showDiv.innerHTML = `<h5 class="my-3 text-center text-primary">No item in Cart.</h5>`
    }
}

// update 
function updateCarts(){
    renderProductsCarts();
    renderPrice();  
    localStorage.setItem("productCarts",JSON.stringify(carts))
}

updateCarts()