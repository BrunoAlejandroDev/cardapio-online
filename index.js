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