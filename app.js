/* =========================================================
   NOVACART — APPLICATION LOGIC
   Production Capstone
========================================================= */


/* =========================================================
   APPLICATION STATE
========================================================= */

const state = {
    products: getProducts(),
    currentUser: getCurrentUser(),
    cart: getCart(),

    searchTerm: "",
    category: "all",
    sort: "default",

    editingProductId: null
};


/* =========================================================
   DOM REFERENCES
========================================================= */

const authScreen = document.getElementById("authScreen");
const app = document.getElementById("app");

const loginForm = document.getElementById("loginForm");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");

const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

const logoutButton = document.getElementById("logoutButton");

const userAvatar = document.getElementById("userAvatar");
const userName = document.getElementById("userName");
const profileEmail = document.getElementById("profileEmail");

const profileButton = document.getElementById("profileButton");
const profileMenu = document.getElementById("profileMenu");

const themeToggle = document.getElementById("themeToggle");

const cartButton = document.getElementById("cartButton");
const cartCount = document.getElementById("cartCount");

const cartDrawer = document.getElementById("cartDrawer");
const closeCartButton = document.getElementById("closeCartButton");
const drawerOverlay = document.getElementById("drawerOverlay");

const cartItems = document.getElementById("cartItems");
const cartTotal = document.getElementById("cartTotal");
const checkoutButton = document.getElementById("checkoutButton");

const productGrid = document.getElementById("productGrid");
const emptyState = document.getElementById("emptyState");

const searchInput = document.getElementById("searchInput");
const categorySelect = document.getElementById("categorySelect");
const sortSelect = document.getElementById("sortSelect");

const productSummary = document.getElementById("productSummary");

const storeView = document.getElementById("storeView");
const manageView = document.getElementById("manageView");

const navLinks = document.querySelectorAll(".nav-link");

const heroShopButton = document.getElementById("heroShopButton");
const brandHome = document.getElementById("brandHome");

const addProductButton =
    document.getElementById("addProductButton");

const managementTable =
    document.getElementById("managementTable");

const managementCount =
    document.getElementById("managementCount");

const productDialog =
    document.getElementById("productDialog");

const productForm =
    document.getElementById("productForm");

const productId =
    document.getElementById("productId");

const productName =
    document.getElementById("productName");

const productPrice =
    document.getElementById("productPrice");

const productCategory =
    document.getElementById("productCategory");

const productImage =
    document.getElementById("productImage");

const productDescription =
    document.getElementById("productDescription");

const dialogTitle =
    document.getElementById("dialogTitle");

const dialogEyebrow =
    document.getElementById("dialogEyebrow");

const closeProductDialog =
    document.getElementById("closeProductDialog");

const cancelProductButton =
    document.getElementById("cancelProductButton");

const notification =
    document.getElementById("notification");

const notificationMessage =
    document.getElementById("notificationMessage");

const notificationIcon =
    document.getElementById("notificationIcon");


/* =========================================================
   APPLICATION STARTUP
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeApp
);

function initializeApp() {
    applySavedTheme();

    if (state.currentUser) {
        showApplication();
    } else {
        showAuthentication();
    }

    setupEventListeners();

    renderCategories();
    renderProducts();
    renderCart();
    renderManagement();
}


/* =========================================================
   EVENT LISTENERS
========================================================= */

function setupEventListeners() {

    if (loginForm) {
        loginForm.addEventListener(
            "submit",
            handleLogin
        );
    }

    if (logoutButton) {
        logoutButton.addEventListener(
            "click",
            handleLogout
        );
    }

    if (profileButton) {
        profileButton.addEventListener(
            "click",
            toggleProfileMenu
        );
    }

    if (themeToggle) {
        themeToggle.addEventListener(
            "click",
            toggleTheme
        );
    }

    if (cartButton) {
        cartButton.addEventListener(
            "click",
            openCart
        );
    }

    if (closeCartButton) {
        closeCartButton.addEventListener(
            "click",
            closeCart
        );
    }

    if (drawerOverlay) {
        drawerOverlay.addEventListener(
            "click",
            closeCart
        );
    }

    if (productGrid) {
        productGrid.addEventListener(
            "click",
            handleProductGridClick
        );
    }

    if (cartItems) {
        cartItems.addEventListener(
            "click",
            handleCartClick
        );
    }

    if (searchInput) {
        searchInput.addEventListener(
            "input",
            handleSearch
        );
    }

    if (categorySelect) {
        categorySelect.addEventListener(
            "change",
            handleCategoryChange
        );
    }

    if (sortSelect) {
        sortSelect.addEventListener(
            "change",
            handleSortChange
        );
    }

    if (checkoutButton) {
        checkoutButton.addEventListener(
            "click",
            simulateCheckout
        );
    }

    if (addProductButton) {
        addProductButton.addEventListener(
            "click",
            () => openProductDialog()
        );
    }

    if (productForm) {
        productForm.addEventListener(
            "submit",
            handleProductSubmit
        );
    }

    if (closeProductDialog) {
        closeProductDialog.addEventListener(
            "click",
            () => productDialog.close()
        );
    }

    if (cancelProductButton) {
        cancelProductButton.addEventListener(
            "click",
            () => productDialog.close()
        );
    }

    if (managementTable) {
        managementTable.addEventListener(
            "click",
            handleManagementClick
        );
    }

    navLinks.forEach(link => {
        link.addEventListener(
            "click",
            () => {
                switchView(link.dataset.view);
            }
        );
    });

    if (brandHome) {
        brandHome.addEventListener(
            "click",
            event => {
                event.preventDefault();
                switchView("store");
            }
        );
    }

    if (heroShopButton) {
        heroShopButton.addEventListener(
            "click",
            () => {
                const catalog =
                    document.getElementById(
                        "catalogSection"
                    );

                if (catalog) {
                    catalog.scrollIntoView({
                        behavior: "smooth"
                    });
                }
            }
        );
    }

    document.addEventListener(
        "click",
        handleOutsideProfileClick
    );

    document.addEventListener(
        "keydown",
        handleKeyboard
    );
}


/* =========================================================
   AUTHENTICATION
========================================================= */

function showAuthentication() {
    authScreen.classList.remove("hidden");
    app.classList.add("hidden");
}


function showApplication() {
    authScreen.classList.add("hidden");
    app.classList.remove("hidden");

    updateUserInterface();

    renderCategories();
    renderProducts();
    renderCart();
    renderManagement();
}


function handleLogin(event) {
    event.preventDefault();

    clearLoginErrors();

    const email =
        loginEmail.value.trim();

    const password =
        loginPassword.value;

    let valid = true;

    if (!isValidEmail(email)) {
        emailError.textContent =
            "Please enter a valid email address.";

        valid = false;
    }

    if (password.length < 4) {
        passwordError.textContent =
            "Password must contain at least 4 characters.";

        valid = false;
    }

    if (!valid) {
        return;
    }

    const user = {
        email: email.toLowerCase(),
        name: createDisplayName(email),
        loginTime: new Date().toISOString()
    };

    /* Save current user */
    state.currentUser = user;
    saveCurrentUser(user);

    /* Load ONLY this user's cart */
    state.cart = getCart();

    showApplication();

    showNotification(
        "Successfully signed in.",
        "success"
    );

    loginForm.reset();
}


function handleLogout() {

    clearCurrentUser();

    state.currentUser = null;

    /*
       Clear cart only from memory.
       The user's cart remains saved in localStorage.
    */
    state.cart = [];

    profileMenu.classList.add("hidden");

    closeCart();

    showAuthentication();

    showNotification(
        "You have been signed out.",
        "success"
    );
}


function clearLoginErrors() {
    emailError.textContent = "";
    passwordError.textContent = "";
}


function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


function createDisplayName(email) {

    const username =
        email
            .split("@")[0]
            .replace(/[._-]/g, " ");

    return username
        .split(" ")
        .filter(Boolean)
        .map(
            word =>
                word.charAt(0).toUpperCase() +
                word.slice(1)
        )
        .join(" ") || "User";
}


/* =========================================================
   USER INTERFACE
========================================================= */

function updateUserInterface() {

    if (!state.currentUser) {
        return;
    }

    const name =
        state.currentUser.name || "User";

    const email =
        state.currentUser.email ||
        "user@example.com";

    userName.textContent = name;
    profileEmail.textContent = email;

    userAvatar.textContent =
        name.charAt(0).toUpperCase();
}


/* =========================================================
   PROFILE MENU
========================================================= */

function toggleProfileMenu(event) {

    event.stopPropagation();

    const isOpen =
        !profileMenu.classList.contains(
            "hidden"
        );

    profileMenu.classList.toggle(
        "hidden"
    );

    profileButton.setAttribute(
        "aria-expanded",
        String(!isOpen)
    );
}


function handleOutsideProfileClick(event) {

    if (
        !event.target.closest(".user-menu")
    ) {
        profileMenu.classList.add(
            "hidden"
        );

        profileButton.setAttribute(
            "aria-expanded",
            "false"
        );
    }
}


/* =========================================================
   NAVIGATION
========================================================= */

function switchView(view) {

    navLinks.forEach(link => {
        link.classList.toggle(
            "active",
            link.dataset.view === view
        );
    });

    if (view === "manage") {

        storeView.classList.add("hidden");
        manageView.classList.remove("hidden");

        renderManagement();

    } else {

        manageView.classList.add("hidden");
        storeView.classList.remove("hidden");

        renderProducts();
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================================================
   CATEGORIES
========================================================= */

function renderCategories() {

    const categories =
        [
            ...new Set(
                state.products
                    .map(product => product.category)
                    .filter(Boolean)
            )
        ].sort();

    categorySelect.innerHTML = "";

    const allOption =
        document.createElement("option");

    allOption.value = "all";
    allOption.textContent =
        "All Categories";

    categorySelect.appendChild(
        allOption
    );

    categories.forEach(category => {

        const option =
            document.createElement("option");

        option.value = category;
        option.textContent =
            formatCategory(category);

        categorySelect.appendChild(
            option
        );
    });

    categorySelect.value =
        state.category;
}


/* =========================================================
   SEARCH
========================================================= */

function handleSearch(event) {

    state.searchTerm =
        event.target.value
            .trim()
            .toLowerCase();

    renderProducts();
}


/* =========================================================
   CATEGORY FILTER
========================================================= */

function handleCategoryChange(event) {

    state.category =
        event.target.value;

    renderProducts();
}


/* =========================================================
   SORTING
========================================================= */

function handleSortChange(event) {

    state.sort =
        event.target.value;

    renderProducts();
}


/* =========================================================
   FILTER + SORT
========================================================= */

function getFilteredProducts() {

    let products =
        [...state.products];

    if (state.searchTerm) {

        products =
            products.filter(product => {

                const searchableText =
                    `${product.title}
                     ${product.description || ""}
                     ${product.category || ""}`
                        .toLowerCase();

                return searchableText.includes(
                    state.searchTerm
                );
            });
    }

    if (state.category !== "all") {

        products =
            products.filter(
                product =>
                    product.category ===
                    state.category
            );
    }

    switch (state.sort) {

        case "price-low":

            products.sort(
                (a, b) =>
                    Number(a.price) -
                    Number(b.price)
            );

            break;

        case "price-high":

            products.sort(
                (a, b) =>
                    Number(b.price) -
                    Number(a.price)
            );

            break;

        case "name-a-z":

            products.sort(
                (a, b) =>
                    a.title.localeCompare(
                        b.title
                    )
            );

            break;

        case "name-z-a":

            products.sort(
                (a, b) =>
                    b.title.localeCompare(
                        a.title
                    )
            );

            break;
    }

    return products;
}


/* =========================================================
   PRODUCT RENDERING
========================================================= */

function renderProducts() {

    const products =
        getFilteredProducts();

    productGrid.innerHTML = "";

    productSummary.textContent =
        `${products.length} ${
            products.length === 1
                ? "product"
                : "products"
        }`;

    if (!products.length) {

        emptyState.classList.remove(
            "hidden"
        );

        return;
    }

    emptyState.classList.add(
        "hidden"
    );

    products.forEach(product => {

        productGrid.appendChild(
            createProductCard(product)
        );
    });
}


function createProductCard(product) {

    const card =
        document.createElement("article");

    card.className =
        "product-card";

    const image =
        product.image ||
        "https://via.placeholder.com/400x300?text=NovaCart";

    card.innerHTML = `
        <div class="product-image-wrapper">
            <img
                class="product-image"
                src="${escapeAttribute(image)}"
                alt="${escapeAttribute(product.title)}"
                loading="lazy"
                onerror="this.src='https://via.placeholder.com/400x300?text=NovaCart'"
            >
        </div>

        <div class="product-card-content">

            <span class="product-category">
                ${escapeHTML(
                    formatCategory(product.category)
                )}
            </span>

            <h3>
                ${escapeHTML(product.title)}
            </h3>

            <p class="product-card-description">
                ${escapeHTML(
                    product.description || ""
                )}
            </p>

            <div class="product-card-bottom">

                <strong class="product-price">
                    ${formatCurrency(product.price)}
                </strong>

                <button
                    class="add-cart-button"
                    type="button"
                    aria-label="Add ${escapeAttribute(product.title)} to cart"
                    data-add-cart="${product.id}"
                >
                    +
                </button>

            </div>

        </div>
    `;

    return card;
}


function handleProductGridClick(event) {

    const button =
        event.target.closest(
            "[data-add-cart]"
        );

    if (!button) {
        return;
    }

    const id =
        Number(button.dataset.addCart);

    addToCart(id);
}


/* =========================================================
   CART
========================================================= */

function addToCart(productId) {

    if (!state.currentUser) {
        showNotification(
            "Please sign in first.",
            "error"
        );
        return;
    }

    const product =
        state.products.find(
            item =>
                Number(item.id) ===
                Number(productId)
        );

    if (!product) {
        showNotification(
            "Product could not be found.",
            "error"
        );
        return;
    }

    const existing =
        state.cart.find(
            item =>
                Number(item.productId) ===
                Number(productId)
        );

    if (existing) {
        existing.quantity += 1;
    } else {
        state.cart.push({
            productId: product.id,
            quantity: 1
        });
    }

    saveCart(state.cart);

    renderCart();

    showNotification(
        `${product.title} added to cart.`,
        "success"
    );
}


function openCart() {

    cartDrawer.classList.add("open");

    drawerOverlay.classList.remove(
        "hidden"
    );

    cartDrawer.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow =
        "hidden";
}


function closeCart() {

    cartDrawer.classList.remove(
        "open"
    );

    drawerOverlay.classList.add(
        "hidden"
    );

    cartDrawer.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow =
        "";
}


function renderCart() {

    const detailedCart =
        getDetailedCart();

    const itemCount =
        state.cart.reduce(
            (total, item) =>
                total +
                Number(item.quantity),
            0
        );

    cartCount.textContent =
        itemCount;

    if (!detailedCart.length) {

        cartItems.innerHTML = `
            <div class="empty-state">

                <div class="empty-icon">
                    🛒
                </div>

                <h3>
                    Your cart is empty
                </h3>

                <p>
                    Add something you love
                    from the catalog.
                </p>

            </div>
        `;

        cartTotal.textContent =
            "$0.00";

        return;
    }

    cartItems.innerHTML = "";

    detailedCart.forEach(item => {

        cartItems.appendChild(
            createCartItem(item)
        );
    });

    const total =
        detailedCart.reduce(
            (sum, item) =>
                sum +
                Number(item.product.price) *
                Number(item.quantity),
            0
        );

    cartTotal.textContent =
        formatCurrency(total);
}


function getDetailedCart() {

    return state.cart
        .map(cartItem => {

            const product =
                state.products.find(
                    item =>
                        Number(item.id) ===
                        Number(cartItem.productId)
                );

            if (!product) {
                return null;
            }

            return {
                product,
                quantity:
                    Number(cartItem.quantity)
            };
        })
        .filter(Boolean);
}


function createCartItem(item) {

    const wrapper =
        document.createElement("div");

    wrapper.className =
        "cart-item";

    const image =
        item.product.image ||
        "https://via.placeholder.com/100x100?text=Product";

    wrapper.innerHTML = `
        <img
            src="${escapeAttribute(image)}"
            alt="${escapeAttribute(item.product.title)}"
            onerror="this.src='https://via.placeholder.com/100x100?text=Product'"
        >

        <div class="cart-item-info">

            <h3>
                ${escapeHTML(
                    item.product.title
                )}
            </h3>

            <p>
                ${formatCurrency(
                    item.product.price
                )}
            </p>

            <div class="quantity-controls">

                <button
                    type="button"
                    data-cart-minus="${item.product.id}"
                    aria-label="Decrease quantity"
                >
                    −
                </button>

                <span>
                    ${item.quantity}
                </span>

                <button
                    type="button"
                    data-cart-plus="${item.product.id}"
                    aria-label="Increase quantity"
                >
                    +
                </button>

                <button
                    type="button"
                    class="remove-cart-item"
                    data-cart-remove="${item.product.id}"
                >
                    Remove
                </button>

            </div>

        </div>
    `;

    return wrapper;
}


function handleCartClick(event) {

    const plusButton =
        event.target.closest(
            "[data-cart-plus]"
        );

    const minusButton =
        event.target.closest(
            "[data-cart-minus]"
        );

    const removeButton =
        event.target.closest(
            "[data-cart-remove]"
        );

    if (plusButton) {

        updateCartQuantity(
            Number(
                plusButton.dataset.cartPlus
            ),
            1
        );

        return;
    }

    if (minusButton) {

        updateCartQuantity(
            Number(
                minusButton.dataset.cartMinus
            ),
            -1
        );

        return;
    }

    if (removeButton) {

        removeFromCart(
            Number(
                removeButton.dataset.cartRemove
            )
        );
    }
}


function updateCartQuantity(
    productId,
    change
) {

    const item =
        state.cart.find(
            cartItem =>
                Number(cartItem.productId) ===
                Number(productId)
        );

    if (!item) {
        return;
    }

    item.quantity += change;

    if (item.quantity <= 0) {

        state.cart =
            state.cart.filter(
                cartItem =>
                    Number(cartItem.productId) !==
                    Number(productId)
            );
    }

    saveCart(state.cart);

    renderCart();
}


function removeFromCart(productId) {

    state.cart =
        state.cart.filter(
            item =>
                Number(item.productId) !==
                Number(productId)
        );

    saveCart(state.cart);

    renderCart();

    showNotification(
        "Product removed from cart.",
        "success"
    );
}


/* =========================================================
   CHECKOUT
========================================================= */

function simulateCheckout() {

    if (!state.cart.length) {

        showNotification(
            "Your cart is empty.",
            "error"
        );

        return;
    }

    state.cart = [];

    saveCart(state.cart);

    renderCart();

    showNotification(
        "Demo checkout completed successfully.",
        "success"
    );

    closeCart();
}


/* =========================================================
   PRODUCT CRUD
========================================================= */

function openProductDialog(product = null) {

    state.editingProductId =
        product
            ? Number(product.id)
            : null;

    productForm.reset();

    if (product) {

        dialogEyebrow.textContent =
            "UPDATE PRODUCT";

        dialogTitle.textContent =
            "Edit Product";

        productId.value =
            product.id;

        productName.value =
            product.title;

        productPrice.value =
            product.price;

        productCategory.value =
            product.category;

        productImage.value =
            product.image || "";

        productDescription.value =
            product.description || "";

    } else {

        dialogEyebrow.textContent =
            "CREATE PRODUCT";

        dialogTitle.textContent =
            "Add Product";

        productId.value = "";
    }

    productDialog.showModal();
}


function handleProductSubmit(event) {

    event.preventDefault();

    const title =
        productName.value.trim();

    const price =
        Number(productPrice.value);

    const category =
        productCategory.value
            .trim()
            .toLowerCase();

    const image =
        productImage.value.trim();

    const description =
        productDescription.value.trim();

    if (!title) {

        showNotification(
            "Please enter a product name.",
            "error"
        );

        return;
    }

    if (
        !Number.isFinite(price) ||
        price <= 0
    ) {

        showNotification(
            "Please enter a valid price.",
            "error"
        );

        return;
    }

    if (!category) {

        showNotification(
            "Please enter a category.",
            "error"
        );

        return;
    }

    const productData = {
        title,
        price,
        category,
        image:
            image ||
            "https://via.placeholder.com/400x300?text=NovaCart",
        description
    };

    if (state.editingProductId) {

        updateProduct(
            state.editingProductId,
            productData
        );

    } else {

        createProduct(
            productData
        );
    }

    productDialog.close();
}


/* =========================================================
   CREATE PRODUCT
========================================================= */

function createProduct(productData) {

    const newProduct = {
        id:
            generateProductId(
                state.products
            ),

        ...productData
    };

    state.products.push(
        newProduct
    );

    saveProducts(
        state.products
    );

    renderCategories();
    renderProducts();
    renderManagement();

    showNotification(
        "Product created successfully.",
        "success"
    );
}


/* =========================================================
   UPDATE PRODUCT
========================================================= */

function updateProduct(
    id,
    updatedData
) {

    const index =
        state.products.findIndex(
            product =>
                Number(product.id) ===
                Number(id)
        );

    if (index === -1) {

        showNotification(
            "Product could not be found.",
            "error"
        );

        return;
    }

    state.products[index] = {
        ...state.products[index],
        ...updatedData,
        id:
            state.products[index].id
    };

    saveProducts(
        state.products
    );

    renderCategories();
    renderProducts();
    renderManagement();
    renderCart();

    showNotification(
        "Product updated successfully.",
        "success"
    );
}


/* =========================================================
   DELETE PRODUCT
========================================================= */

function deleteProduct(id) {

    const product =
        state.products.find(
            item =>
                Number(item.id) ===
                Number(id)
        );

    if (!product) {
        return;
    }

    const confirmed =
        window.confirm(
            `Delete "${product.title}"?`
        );

    if (!confirmed) {
        return;
    }

    state.products =
        state.products.filter(
            item =>
                Number(item.id) !==
                Number(id)
        );

    /*
       Remove deleted product from
       the CURRENT user's cart only.
    */
    state.cart =
        state.cart.filter(
            item =>
                Number(item.productId) !==
                Number(id)
        );

    saveProducts(
        state.products
    );

    saveCart(
        state.cart
    );

    renderCategories();
    renderProducts();
    renderManagement();
    renderCart();

    showNotification(
        "Product deleted successfully.",
        "success"
    );
}


/* =========================================================
   PRODUCT MANAGEMENT TABLE
========================================================= */

function renderManagement() {

    managementCount.textContent =
        state.products.length;

    if (!state.products.length) {

        managementTable.innerHTML = `
            <div class="empty-state">

                <h3>
                    No products available
                </h3>

                <p>
                    Create your first product.
                </p>

            </div>
        `;

        return;
    }

    managementTable.innerHTML = `
        <div class="management-row header">

            <div>
                Product
            </div>

            <div>
                Category
            </div>

            <div>
                Price
            </div>

            <div>
                ID
            </div>

            <div>
                Actions
            </div>

        </div>
    `;

    state.products.forEach(product => {

        const row =
            document.createElement("div");

        row.className =
            "management-row";

        const image =
            product.image ||
            "https://via.placeholder.com/60?text=N";

        row.innerHTML = `
            <div class="management-product">

                <img
                    src="${escapeAttribute(image)}"
                    alt=""
                    onerror="this.src='https://via.placeholder.com/60?text=N'"
                >

                <strong>
                    ${escapeHTML(product.title)}
                </strong>

            </div>

            <div>
                ${escapeHTML(
                    formatCategory(
                        product.category
                    )
                )}
            </div>

            <div>
                <strong>
                    ${formatCurrency(
                        product.price
                    )}
                </strong>
            </div>

            <div>
                #${product.id}
            </div>

            <div class="management-actions">

                <button
                    class="small-button"
                    type="button"
                    data-edit-product="${product.id}"
                >
                    Edit
                </button>

                <button
                    class="small-button delete"
                    type="button"
                    data-delete-product="${product.id}"
                >
                    Delete
                </button>

            </div>
        `;

        managementTable.appendChild(row);
    });
}


function handleManagementClick(event) {

    const editButton =
        event.target.closest(
            "[data-edit-product]"
        );

    const deleteButton =
        event.target.closest(
            "[data-delete-product]"
        );

    if (editButton) {

        const product =
            state.products.find(
                item =>
                    Number(item.id) ===
                    Number(
                        editButton.dataset
                            .editProduct
                    )
            );

        if (product) {
            openProductDialog(
                product
            );
        }

        return;
    }

    if (deleteButton) {

        deleteProduct(
            Number(
                deleteButton.dataset
                    .deleteProduct
            )
        );
    }
}


/* =========================================================
   PRODUCT DIALOG
========================================================= */

if (productDialog) {

    productDialog.addEventListener(
        "click",
        event => {

            const rect =
                productDialog.getBoundingClientRect();

            const outside =
                event.clientX < rect.left ||
                event.clientX > rect.right ||
                event.clientY < rect.top ||
                event.clientY > rect.bottom;

            if (outside) {
                productDialog.close();
            }
        }
    );
}


/* =========================================================
   THEME
========================================================= */

function applySavedTheme() {

    const theme =
        getSavedTheme();

    if (theme === "dark") {

        document.body.classList.add(
            "dark-mode"
        );

        themeToggle.textContent =
            "☀️";

    } else {

        document.body.classList.remove(
            "dark-mode"
        );

        themeToggle.textContent =
            "🌙";
    }
}


function toggleTheme() {

    const isDark =
        document.body.classList.toggle(
            "dark-mode"
        );

    const theme =
        isDark
            ? "dark"
            : "light";

    saveTheme(theme);

    themeToggle.textContent =
        isDark
            ? "☀️"
            : "🌙";

    showNotification(
        isDark
            ? "Dark mode enabled."
            : "Light mode enabled.",
        "success"
    );
}


/* =========================================================
   NOTIFICATIONS
========================================================= */

let notificationTimer = null;


function showNotification(
    message,
    type = "success"
) {

    clearTimeout(
        notificationTimer
    );

    notificationMessage.textContent =
        message;

    if (type === "error") {

        notificationIcon.textContent =
            "×";

        notificationIcon.style.background =
            "var(--danger-light)";

        notificationIcon.style.color =
            "var(--danger)";

    } else {

        notificationIcon.textContent =
            "✓";

        notificationIcon.style.background =
            "var(--accent-light)";

        notificationIcon.style.color =
            "var(--accent)";
    }

    notification.classList.remove(
        "hidden"
    );

    notificationTimer =
        setTimeout(
            () => {
                notification.classList.add(
                    "hidden"
                );
            },
            3000
        );
}


/* =========================================================
   USER-SPECIFIC CART STORAGE
========================================================= */

/*
   IMPORTANT:

   Every logged-in user gets a separate
   localStorage key.

   Example:

   novacart_cart_umasree@example.com
   novacart_cart_demo@example.com
*/

function getCart() {

    const user =
        getCurrentUser();

    if (!user || !user.email) {
        return [];
    }

    const storageKey =
        `novacart_cart_${user.email.toLowerCase()}`;

    try {

        const savedCart =
            localStorage.getItem(
                storageKey
            );

        if (!savedCart) {
            return [];
        }

        const parsedCart =
            JSON.parse(savedCart);

        return Array.isArray(parsedCart)
            ? parsedCart
            : [];

    } catch (error) {

        console.error(
            "Error loading user cart:",
            error
        );

        return [];
    }
}


function saveCart(cart) {

    const user =
        getCurrentUser();

    if (!user || !user.email) {
        return;
    }

    const storageKey =
        `novacart_cart_${user.email.toLowerCase()}`;

    try {

        localStorage.setItem(
            storageKey,
            JSON.stringify(cart)
        );

    } catch (error) {

        console.error(
            "Error saving user cart:",
            error
        );
    }
}


/* =========================================================
   UTILITY FUNCTIONS
========================================================= */

function formatCurrency(value) {

    return new Intl.NumberFormat(
        "en-US",
        {
            style: "currency",
            currency: "USD"
        }
    ).format(
        Number(value) || 0
    );
}


function formatCategory(category) {

    if (!category) {
        return "Other";
    }

    return category
        .replace(/[-_]/g, " ")
        .replace(/\b\w/g, letter =>
            letter.toUpperCase()
        );
}


function escapeHTML(value) {

    return String(value)
        .replaceAll(
            "&",
            "&amp;"
        )
        .replaceAll(
            "<",
            "&lt;"
        )
        .replaceAll(
            ">",
            "&gt;"
        )
        .replaceAll(
            '"',
            "&quot;"
        )
        .replaceAll(
            "'",
            "&#039;"
        );
}


function escapeAttribute(value) {
    return escapeHTML(value);
}


/* =========================================================
   KEYBOARD SUPPORT
========================================================= */

function handleKeyboard(event) {

    if (event.key === "Escape") {

        closeCart();

        if (
            productDialog &&
            productDialog.open
        ) {
            productDialog.close();
        }

        profileMenu.classList.add(
            "hidden"
        );
    }
}


/* =========================================================
   ERROR HANDLING
========================================================= */

window.addEventListener(
    "error",
    event => {

        console.error(
            "NovaCart application error:",
            event.error
        );
    }
);


/* =========================================================
   FINAL RENDER
========================================================= */

renderCategories();
renderProducts();
renderCart();
renderManagement();