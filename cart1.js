
// BeanBoutique Shopping Cart//

const CART_KEY = "beanBoutiqueCart";
// Get cart
function getCart() {
    try {
        return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch (error) {
        return [];
    }
}

// Save cart
function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

// Add product to cart
function addToCart(product) {
    let cart = getCart();
    const existingItem = cart.find(function (item) {
        return item.name === product.name;
    });

    if (existingItem) {
        existingItem.quantity += product.quantity || 1;
            existingItem.image=product.image;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: Number(product.price),
            image: product.image,
            quantity: Number(product.quantity || 1)
        });
    }

    saveCart(cart);

    updateCartCount();

    alert(product.name + " added to cart!");
}

// Add Coffee

function addCoffeeToCart(name, price, image) {
    addToCart({
        id: "coffee-" + name,
        name: name,
        price: Number(price),
        image: image,
        quantity: 1
    });
}

// Add Equipment

function addEquipmentToCart(id, name, price, image, quantity) {
    addToCart({
        id: "equipment-" + id,
        name: name,
        price: Number(price),
        image: image,
        quantity: quantity || 1
    });
}

// Update Cart Count

function updateCartCount() {
    const cart = getCart();
    let totalItems = 0;
    cart.forEach(function (item) {
        totalItems += Number(item.quantity || 0);
    });

    const cartCount = document.getElementById("cartCount");

    if (cartCount) {
        cartCount.textContent = totalItems;
    }
}

// Display Cart

function displayCart() {

    const cartItems = document.getElementById("cartItems");
    const emptyCart = document.getElementById("emptyCart");
    const cartSummary = document.getElementById("cartSummary");
    const totalPrice = document.getElementById("totalPrice");
    const cartTotal = document.getElementById("cartTotal");

    if (!cartItems) {
        return;
    }

    const cart = getCart();

    cartItems.innerHTML = "";

    let total = 0;


    // Empty cart
    if (cart.length === 0) {

        if (emptyCart) {
            emptyCart.style.setProperty = ("display","block","important");
        }

        if (cartSummary) {
            cartSummary.style.display = "none";
        }

        if (totalPrice) {
            totalPrice.textContent = "$0.00";
        }

        if (cartTotal) {
            cartTotal.textContent = "$0.00";
        }

        return;
    }


    // Cart contains products
    if (emptyCart) {
        emptyCart.style.setProperty("display","none","important");
    }

    if (cartSummary) {
        cartSummary.style.display = "block";
    }


    cart.forEach(function (item) {

        const price = Number(item.price) || 0;
        const quantity = Number(item.quantity) || 1;

        const itemTotal = price * quantity;

        total += itemTotal;


        const div = document.createElement("div");

        div.className = "cart-item";


        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}">

            <div class="cart-item-info">
                <h3>${item.name}</h3>
                <p>$${price.toFixed(2)}</p>
            </div>

            <div class="cart-quantity">

                <button onclick="changeCartQuantity('${item.id}', -1)">
                    -
                </button>

                <span>${item.quantity}</span>
                <button onclick="changeCartQuantity('${item.id}', 1)">
                    +
                </button>

            </div>

            <div class="cart-item-price">
                $${itemTotal.toFixed(2)}
            </div>

            <button
                class="remove-btn"
                onclick="removeFromCart('${item.id}')">
                Remove
            </button>
        `;

        cartItems.appendChild(div);
    });


    // Update totals
    if (totalPrice) {
        totalPrice.textContent = "$" + total.toFixed(2);
    }

    if (cartTotal) {
        cartTotal.textContent = "$" + total.toFixed(2);
    }
}


// ============================================
// Change Quantity
// ============================================

function changeCartQuantity(id, amount) {

    let cart = getCart();

    const item = cart.find(function (product) {
        return product.id === id;
    });

    if (!item) {
        return;
    }

    item.quantity =
        Number(item.quantity || 0) + Number(amount);


    if (item.quantity <= 0) {

        cart = cart.filter(function (product) {
            return product.id !== id;
        });
    }

    saveCart(cart);

    updateCartCount();

    displayCart();
}


// ============================================
// Remove Product
// ============================================

function removeFromCart(id) {

    let cart = getCart();

    cart = cart.filter(function (item) {
        return item.id !== id;
    });

    saveCart(cart);

    updateCartCount();

    displayCart();
}


// ============================================
// Checkout
// ============================================

function checkout() {

    const cart = getCart();

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;
    }

    alert(
        "Thank you for your order! " +
        "Online payment will be available soon."
    );

    localStorage.removeItem(CART_KEY);

    updateCartCount();

    displayCart();
}


// ============================================
// Start
// ============================================

document.addEventListener("DOMContentLoaded", function () {

    updateCartCount();

    displayCart();

});