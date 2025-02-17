document.addEventListener("DOMContentLoaded", function () {
    const cartButton = document.createElement("button");
    cartButton.textContent = "🛒 Cart ";
    cartButton.id = "cart-btn";
    document.body.appendChild(cartButton);

    const cartBadge = document.createElement("span");
    cartBadge.id = "cart-badge";
    cartBadge.textContent = "0";
    cartBadge.style.backgroundColor = "red";
    cartBadge.style.color = "white";
    cartBadge.style.borderRadius = "50%";
    cartBadge.style.padding = "3px 8px";
    cartBadge.style.fontSize = "14px";
    cartBadge.style.marginLeft = "8px";
    cartBadge.style.display = "none";
    cartButton.appendChild(cartBadge);

    cartButton.style.position = "fixed";
    cartButton.style.top = "10px";
    cartButton.style.right = "10px";
    cartButton.style.backgroundColor = "White";
    cartButton.style.color = "Orangered";
    cartButton.style.border = "2px solid orangered";
    cartButton.style.padding = "15px 20px";
    cartButton.style.borderRadius = "8px";
    cartButton.style.cursor = "pointer";
    cartButton.style.zIndex = "1000";
    cartButton.style.fontSize = "18px";

    const cartSidebar = document.createElement("div");
    cartSidebar.id = "cart-sidebar";
    cartSidebar.style.position = "fixed";
    cartSidebar.style.top = "0";
    cartSidebar.style.right = "-300px";
    cartSidebar.style.width = "300px";
    cartSidebar.style.height = "100vh";
    cartSidebar.style.backgroundColor = "white";
    cartSidebar.style.boxShadow = "-2px 0 5px rgba(0,0,0,0.2)";
    cartSidebar.style.padding = "20px";
    cartSidebar.style.transition = "right 0.3s ease-in-out";
    cartSidebar.style.overflowY = "auto";

    cartSidebar.innerHTML = `
        <h2 style="color: #ff6347;">Shopping Cart</h2>
        <ul id="cart-items"></ul>
        <p>Total: ₱<span id="total-price">0</span></p>
        <button id="checkout-btn" style="background-color: #ff6347; color: white; border: none; padding: 10px 15px; border-radius: 5px; cursor: pointer;">Checkout</button>
    `;
    document.body.appendChild(cartSidebar);

    let cart = [];

    function updateCart() {
        const cartItems = document.getElementById("cart-items");
        const totalPrice = document.getElementById("total-price");
        cartItems.innerHTML = "";
        let total = 0;

        cart.forEach((item, index) => {
            const li = document.createElement("li");
            li.classList.add("cart-item");
            li.innerHTML = ${item.name} - ₱${item.price} <button class='remove-item' data-index='${index}' style='color: red; cursor: pointer;'>Remove</button>;
            cartItems.appendChild(li);
            total += item.price;
        });

        totalPrice.textContent = total;
        cartBadge.textContent = cart.length;
        cartBadge.style.display = cart.length > 0 ? "inline-block" : "none";
    }

    document.querySelectorAll(".add-to-cart-btn").forEach(button => {
        button.addEventListener("click", function () {
            const itemElement = this.parentElement;
            const item = {
                name: itemElement.dataset.name,
                price: parseInt(itemElement.dataset.price)
            };
            cart.push(item);
            updateCart();
        });
    });

    cartButton.addEventListener("click", () => {
        if (cartSidebar.style.right === "0px") {
            cartSidebar.style.right = "-300px";
        } else {
            cartSidebar.style.right = "0";
        }
    });

    document.body.addEventListener("click", function (e) {
        if (e.target.classList.contains("remove-item")) {
            const index = e.target.dataset.index;
            cart.splice(index, 1);
            updateCart();
        }
    });
});
