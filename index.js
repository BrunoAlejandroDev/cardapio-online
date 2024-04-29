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

// Remover o item do carrinho
cartItemsContainer.addEventListener('click', (event) => {
    if (event.target.classList.contains("remove-from-cart-btn")) {
        const name = event.target.getAttribute("data-name");
        removeItemCart(name);
    }
})

// Função para remover o item do carrinho
function removeItemCart (name) {
    const index = cartItems.findIndex(item => item.name === name);

    if (index !== -1) {
        const item = cartItems[index];

        if (item.quantity > 1) {
            item.quantity -= 1;
            updateCarinho();
            return;
        }
        
        cartItems.splice(index, 1);
        updateCarinho();
    }

}

// verificação do input de endereço
addressInput.addEventListener('click', (event) => {
    let imputValue = event.target.value; // devolve o valor do imput

    if (imputValue !== "") {
        addressInput.classList.remove("border-red-500");
        addressWarn.classList.add("hidden")
    }
})

// Finalizar pedido
checkoutBtn.addEventListener('click', () => {
    const isOpen = checkRestaurantIsOpen();
    if (!isOpen) {
        Toastify({
            text: "This is a toast",
            duration: 3000,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "#EF4444",
            }
        }), showToast();
        cartItems = [];
        updateCarinho();
        return;
    }

    if (cartItems.length === 0) {
        return;
    }

    if (addressInput.value === '') {
        addressWarn.classList.remove("hidden")
        addressInput.classList.add("border-red-500")
        return;
    }

    // enviar o pedido para a API do whatsapp
    const cartItemsAPI = cartItems.map( (item) => {
        // mensagem a ser mandada via wpp
        return (
            `
            ${item.name}
            Quantidade: (${item.quantity}) 
            Preço: R$ ${item.price}
            ----------
            `
        ) 
    }).join("");
    
    const message = encodeURIComponent(cartItemsAPI);
    const phone = "85999991111"

    window.open(`https://wa.me/${phone}?text=${message} Endereço: ${addressInput.value}`, "_blank");

    // zerando o carrinho após a compra 
    cartItems = [];
    updateCarinho();
})
/* FIM MENU */

/* INICIO ESTADO RESTAURANTE */

// verificar a hora e verificar o estado do restaurante 
function checkRestaurantIsOpen () {
    const data = new Date();
    const hora = data.getHours();

    return hora >= 18 && hora < 22; // retorna true - restaurante aberto
}

const spanRestaurantStatus = document.getElementById("restaurant-status");
const isRestaurantOpen = checkRestaurantIsOpen();

if (isRestaurantOpen) {
    spanRestaurantStatus.classList.remove("bg-red-500");
    spanRestaurantStatus.classList.add("bg-green-600");
}
else {
    spanRestaurantStatus.classList.add("bg-red-500");
    spanRestaurantStatus.classList.remove("bg-green-600");
}
/* FIM ESTADO RESTAURANTE */