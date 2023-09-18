 // <!-- scroll -->
 const nav = document.getElementById('nav');

    function changeBg() {
    if (window.scrollY > 20){
    nav.style.backgroundColor = 'rgba(9,9,11, 0.8)';
    nav.style.borderBottom = '1px solid gainsboro';
    } else {
    nav.style.backgroundColor = 'transparent';
    nav.style.borderBottom = 'none';
    }

 };
 window.addEventListener('scroll', changeBg);



  // show navbar 
 const navbarBtn = document.getElementById("navbar-sticky");
 const navbarList = document.getElementById("nav-list");
 document.addEventListener("DOMContentLoaded", () => {

     navbarBtn.addEventListener("click", (e) => {
         navbarList.classList.toggle("hidden");
         nav.style.backgroundColor = 'rgba(9,9,11, 0.8)';
         e.preventDefault();
     });
     document.addEventListener('click', (e) => {
     if (!navbarBtn.contains(e.target)) {
         navbarList.classList.add("hidden"); // Gunakan "add" untuk memastikan elemen disembunyikan
     }
 });
 });


// show cart 
 const cartSdbr = document.getElementById('cart-sidebar');
 const cartBtn = document.getElementById('cart-btn')
 
 cartBtn.addEventListener('click', (e) => {
     cartSdbr.classList.toggle('active');
     e.preventDefault();
 })

 // close selain sdbr dan cart btn
 document.addEventListener('click', (e) => {
 if (!cartBtn.contains(e.target) && !cartSdbr.contains(e.target)) {
     cartSdbr.classList.remove('active');
 }
});


// dropdown
 const menu = document.querySelectorAll('.menu');

 menu.forEach(menu => {
     const menuName = menu.querySelector('.main');
     const listMenu = menu.querySelector('.list');

     menuName.addEventListener("click", () => {
         menu.classList.toggle("active");
         if (menu.classList.contains("active")) {
             listMenu.style.maxHeight = listMenu.scrollHeight + "px";
         } else {
             listMenu.style.maxHeight = null;
         }
     });
 })


// show card model

 const cardMenu = document.querySelectorAll('.card-menu')
 const modelCard = document.getElementById('model-card');
 const closeBtn = document.getElementById('close-btn');

 const addCartBtn = document.getElementById('add-cart-btn');
 let itemName = '';
 let itemPrice = 0;

function showCard() {
    cardMenu.forEach(cardMenu => {
        cardMenu.addEventListener('click', () => {
            itemName = cardMenu.querySelector('.menu-name').textContent;
            const itemPriceText = cardMenu.querySelector('.menu-price').textContent;
            itemPrice = parseFloat(itemPriceText.replace('Rp. ', ''));
            const itemDscrpt = cardMenu.querySelector('.product-descript').textContent;
            
            modelCard.style.display = 'flex';

            detail.innerHTML = `
                <!-- name product -->
                <div id="product-model-name" class="product-model-name max-w-sm text-xl font-medium">
                    ${itemName}
                </div>
                <!-- descript -->
                <div id="product-model-descrpt" class="product-model-name max-w-sm text-lg font-medium">
                   ${itemDscrpt}
                </div>
                <!-- Price Container -->
                <div class="flex flex-col mb-4 space-y-3 text-center md:text-left ">
                    <p id="product-model-price" class="product-model-price text-2xl font-bold">Rp. ${itemPrice}</p>
                </div>
            `;
        });
    });
}

 function closeCard() {
     closeBtn.addEventListener('click', () => {
         modelCard.style.display = 'none';
     });
     window.onclick = (e) => {
         if (e.target === modelCard){
         modelCard.style.display = 'none';
         }
     }
 };
 
 closeCard()
 showCard();

 // add to cart 

 let cart = [];
 let totalPrice = 0;
 const maxItem = 5;


addCartBtn.addEventListener('click', () => {
    if (cart.length < maxItem) {
        const itemNameUpdt = document.getElementById('product-model-name').textContent;
        const itemPriceUpdt = parseFloat(document.getElementById('product-model-price').textContent.replace('Rp. ', ''));
    
        cart.push({ name: itemNameUpdt, price: itemPriceUpdt });
        totalPrice += itemPriceUpdt;
        updateCartSidebar();
        showNotif('berhasil tambahkan keranjang', 'success');

        
    } else {
        alert("Keranjang sudah penuh!")
    }
});


 function updateCartSidebar() {
    const cartList = document.getElementById('list-cart');
    const totalAmount = document.getElementById('total-amount');

    cartList.innerHTML = ``;

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item', 'flex', 'gap-4', 'w-full', 'justify-between', 'border-b', 'py-2');
        cartItem.innerHTML = `
            <div class="img h-auto w-14 inline rounded-full">
                <img src="./asset/menu-dummy.jpeg" alt="dummy" class="rounded-full inline">
            </div>
            <div class="flex flex-col">
                <h3 class="text-white text-sm ">${item.name}</h3>
                <h5 class="text-white">Rp. ${item.price}</h5>
            </div>
            <button type="button" class="delete-btn px-2 end-0">
                <i class="fa-solid fa-trash text-white hover:text-zinc-400"></i>
            </button>
            `;


        const deleteBtn = cartItem.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            cart.splice(index, 1);
            totalPrice -= item.price;
            updateCartSidebar();
            showNotif('berhasil hapus item', 'danger');
        })
        cartList.appendChild(cartItem);
    });

    if(cart.length !== 0) {
        document.getElementById('cart-message').style.display = 'none';
        document.getElementById('list-cart').style.borderBottom = 'none';
    } else {
        document.getElementById('cart-message').style.display = 'flex';
        document.getElementById('list-cart').style.borderBottom = '1px solid';
};
    totalAmount.textContent = `Total: Rp. ${totalPrice}`;
   
 };

 //notif
 function showNotif(message, type) {
    const toastBox = document.getElementById('toast-container');
    const newToast = document.createElement('div');
    newToast.classList.add('flex', 'items-center', 'w-full', 'max-w-xs', 'p-4', 'mb-4', 'text-white', 'bg-gray-600', 'rounded-lg', 'shadow', 'bg-opacity-60');
    newToast.setAttribute('role', 'alert');

    const iconColor = type === 'success' ? 'green' : 'red';
    newToast.innerHTML = `
        <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-${iconColor}-500 bg-${iconColor}-400 rounded-lg">
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
            </svg>
            <span class="sr-only">Check icon</span>
        </div>
        <div class="ml-3 text-sm font-normal">${message}</div>
        <button type="button" class="ml-auto -mx-1.5 -my-1.5 bg-transparent text-gray-400 hover:text-gray-900 rounded-lg p-1.5 inline-flex items-center justify-center h-8 w-8" data-dismiss-target="#toast-success" aria-label="Close">
            <span id="close" class="sr-only">Close</span>
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
        </button>
    `;

    toastBox.appendChild(newToast);

    setTimeout(() => {
        toastBox.removeChild(newToast);
    }, 3000)    
    

    
};