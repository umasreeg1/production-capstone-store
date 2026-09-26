/* =========================================================
   NOVACART — PRODUCT DATA
   Production Capstone
========================================================= */

const DEFAULT_PRODUCTS = [
    {
        id: 1,
        title: "Premium Wireless Headphones",
        price: 129.99,
        category: "electronics",
        image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
        description:
            "Immersive wireless headphones with comfortable design and reliable everyday performance."
    },
    {
        id: 2,
        title: "Minimalist Backpack",
        price: 59.99,
        category: "fashion",
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        description:
            "A practical everyday backpack with a clean minimalist design and generous storage."
    },
    {
        id: 3,
        title: "Classic Cotton T-Shirt",
        price: 24.99,
        category: "fashion",
        image: "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879_.jpg",
        description:
            "Comfortable cotton clothing designed for simple everyday styling."
    },
    {
        id: 4,
        title: "Slim Fit Casual Jacket",
        price: 79.99,
        category: "fashion",
        image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
        description:
            "A versatile casual jacket suitable for everyday outfits and relaxed occasions."
    },
    {
        id: 5,
        title: "Elegant Gold Bracelet",
        price: 89.99,
        category: "jewelry",
        image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UX679_.jpg",
        description:
            "A refined accessory with a timeless design for everyday elegance."
    },
    {
        id: 6,
        title: "Silver Chain Necklace",
        price: 49.99,
        category: "jewelry",
        image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
        description:
            "A lightweight necklace with a simple design that pairs easily with different styles."
    },
    {
        id: 7,
        title: "Modern Storage Cabinet",
        price: 149.99,
        category: "home",
        image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
        description:
            "A modern storage solution designed to organize your living space."
    },
    {
        id: 8,
        title: "Smart Everyday Backpack",
        price: 69.99,
        category: "bags",
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        description:
            "A spacious backpack designed for work, study and everyday travel."
    }
];


/* =========================================================
   STORAGE KEYS
========================================================= */

const STORAGE_KEYS = {
    products: "novacart_products",
    cart: "novacart_cart",
    user: "novacart_user",
    theme: "novacart_theme"
};


/* =========================================================
   GENERIC STORAGE HELPERS
========================================================= */

function readStorage(key, fallback) {
    try {
        const value = localStorage.getItem(key);

        if (value === null) {
            return fallback;
        }

        return JSON.parse(value);
    } catch (error) {
        console.error(`Storage read error for ${key}:`, error);
        return fallback;
    }
}


function writeStorage(key, value) {
    try {
        localStorage.setItem(
            key,
            JSON.stringify(value)
        );

        return true;
    } catch (error) {
        console.error(`Storage write error for ${key}:`, error);
        return false;
    }
}


/* =========================================================
   PRODUCT STORAGE
========================================================= */

function getProducts() {
    return readStorage(
        STORAGE_KEYS.products,
        DEFAULT_PRODUCTS
    );
}


function saveProducts(products) {
    return writeStorage(
        STORAGE_KEYS.products,
        products
    );
}


/* =========================================================
   CART STORAGE
========================================================= */

function getCart() {
    return readStorage(
        STORAGE_KEYS.cart,
        []
    );
}


function saveCart(cart) {
    return writeStorage(
        STORAGE_KEYS.cart,
        cart
    );
}


/* =========================================================
   USER STORAGE
========================================================= */

function getCurrentUser() {
    return readStorage(
        STORAGE_KEYS.user,
        null
    );
}


function saveCurrentUser(user) {
    return writeStorage(
        STORAGE_KEYS.user,
        user
    );
}


function clearCurrentUser() {
    try {
        localStorage.removeItem(
            STORAGE_KEYS.user
        );

        return true;
    } catch (error) {
        console.error("Unable to clear user:", error);
        return false;
    }
}


/* =========================================================
   THEME STORAGE
========================================================= */

function getSavedTheme() {
    return localStorage.getItem(
        STORAGE_KEYS.theme
    ) || "light";
}


function saveTheme(theme) {
    localStorage.setItem(
        STORAGE_KEYS.theme,
        theme
    );
}


/* =========================================================
   ID GENERATOR
========================================================= */

function generateProductId(products) {

    if (!products.length) {
        return 1;
    }

    return Math.max(
        ...products.map(product => Number(product.id) || 0)
    ) + 1;
}