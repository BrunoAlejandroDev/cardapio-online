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

let cartItems = [];

/* INICIO MODAL */

// Abrir o modal do carrinho
cartBtn.addEventListener('click', function() {
    // alternando entre hidden e flex
    updateCarinho();
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

    // adicionar os produtos no carrinho
    addItemToCart(name, price);
})

// função para adicionar os produtos no carrinho 
function addItemToCart(name, price) {
    const existingItem = cartItems.find(duplicateItem => duplicateItem.name == name)
    if (existingItem) {
        existingItem.quantity += 1;
    }
    else {
        cartItems.push({
            name,
            price,
            quantity: 1,
        });
        console.log(cartItems);
    }

    updateCarinho();
}

// atualizar o carrinho
function updateCarinho () {
    cartItemsContainer.innerHTML = '';
    let total = 0;
    
    // percorrer o array cartItems
    cartItems.forEach(item => {
        const cartItemsElement = document.createElement("div");
        cartItemsElement.classList.add("flex", "justify-between", "mb-4", "flex-col")

        cartItemsElement.innerHTML = `
            <div class="flex items-center justify-between">
                <div>
                    <p class = "font-medium">${item.name}</p>
                    <p>Quant: ${item.quantity}</p>
                    <p class= "font-medium mt-2">R$ ${item.price.toFixed(2)}</p>
                </div>

                <button class="remove-from-cart-btn" data-name="${item.name}">
                    Remover
                </button>
            </div>
        `
        // calcular o total dos items
        total += item.price * item.quantity;

        // inserir os elementos no HTML
        cartItemsContainer.appendChild(cartItemsElement)
    });

    // atualizando o valor dos preços para moeda brasileira
    cartTotal.textContent = total.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

    // atualizando o contador de produtos
    cartCount.innerHTML = cartItems.length
}

/* FIM MENU */