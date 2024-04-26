const menu = document.getElementById('menu');
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const cartCount = document.getElementById('cart-count');
const addressInput = document.getElementById('address');
const addressWarn = document.getElementById('address-warn');

/* INICIO MODAL */

// Abrir o modal do carrinho
cartBtn.addEventListener('click', function() {
    // alternando entre hidden e flex
    if (cartModal.classList.contains('hidden')) {
        cartModal.classList.replace('hidden', 'flex');
    }
});

// fechar o modal ao clicar do lado de fora dele
cartModal.addEventListener('click', (event)=> {
    if (cartModal.classList.contains('flex') && event.target === cartModal) {
        cartModal.classList.remove('flex');
        cartModal.classList.add('hidden');
    }
});

// fechar o modal ao clicar no botão de fechar
closeModalBtn.addEventListener('click', ()=> {
    if (cartModal.classList.contains('flex')) {
        cartModal.classList.remove('flex');
        cartModal.classList.add('hidden');
    }
})

/* FIM MODAL */

/* INICIO MENU */

// pegar o nome do produto e o preço 
menu.addEventListener('click', (event) => {
    // pegando o nome e o preço do elemento
    let parentButton = event.target.closest(".add-to-cart-btn");
    const name = parentButton.getAttribute("data-name");
    const price = Number(parentButton.getAttribute("data-price"));
    console.log(name);
    console.log(price);
})

/* FIM MENU */