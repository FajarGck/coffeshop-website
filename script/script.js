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

 function showCard() {
     cardMenu.forEach(cardMenu => {
         cardMenu.addEventListener('click', () => {
             modelCard.style.display = 'flex';
         });
     });
 };
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