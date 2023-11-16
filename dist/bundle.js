/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _native_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);
/* harmony import */ var _stringify_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(4);




function v4(options, buf, offset) {
  if (_native_js__WEBPACK_IMPORTED_MODULE_0__["default"].randomUUID && !buf && !options) {
    return _native_js__WEBPACK_IMPORTED_MODULE_0__["default"].randomUUID();
  }

  options = options || {};
  const rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_1__["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    offset = offset || 0;

    for (let i = 0; i < 16; ++i) {
      buf[offset + i] = rnds[i];
    }

    return buf;
  }

  return (0,_stringify_js__WEBPACK_IMPORTED_MODULE_2__.unsafeStringify)(rnds);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (v4);

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const randomUUID = typeof crypto !== 'undefined' && crypto.randomUUID && crypto.randomUUID.bind(crypto);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  randomUUID
});

/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rng)
/* harmony export */ });
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
let getRandomValues;
const rnds8 = new Uint8Array(16);
function rng() {
  // lazy load so that environments that need to polyfill have a chance to do so
  if (!getRandomValues) {
    // getRandomValues needs to be invoked in a context where "this" is a Crypto implementation.
    getRandomValues = typeof crypto !== 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto);

    if (!getRandomValues) {
      throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
    }
  }

  return getRandomValues(rnds8);
}

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   unsafeStringify: () => (/* binding */ unsafeStringify)
/* harmony export */ });
/* harmony import */ var _validate_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */

const byteToHex = [];

for (let i = 0; i < 256; ++i) {
  byteToHex.push((i + 0x100).toString(16).slice(1));
}

function unsafeStringify(arr, offset = 0) {
  // Note: Be careful editing this code!  It's been tuned for performance
  // and works in ways you may not expect. See https://github.com/uuidjs/uuid/pull/434
  return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + '-' + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + '-' + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + '-' + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + '-' + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
}

function stringify(arr, offset = 0) {
  const uuid = unsafeStringify(arr, offset); // Consistency check for valid UUID.  If this throws, it's likely due to one
  // of the following:
  // - One or more input array values don't map to a hex octet (leading to
  // "undefined" in the uuid)
  // - Invalid input values for the RFC `version` or `variant` fields

  if (!(0,_validate_js__WEBPACK_IMPORTED_MODULE_0__["default"])(uuid)) {
    throw TypeError('Stringified UUID is invalid');
  }

  return uuid;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (stringify);

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _regex_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);


function validate(uuid) {
  return typeof uuid === 'string' && _regex_js__WEBPACK_IMPORTED_MODULE_0__["default"].test(uuid);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (validate);

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i);

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);

// optional way of writting the code:
// (<HTMLInputElement>document.getElementById("name")).value
class User {
    static createUser() {
        const name = document.getElementById("nameInput").value;
        const age = document.getElementById('ageInput').value;
        if (name.length > 0 && age) {
            document.getElementById("shop");
            document.getElementById("cart-div");
            return new User(name, parseInt(age));
        }
        return;
    }
    constructor(_name, _age, _cart = [], _id = (0,uuid__WEBPACK_IMPORTED_MODULE_0__["default"])()) {
        this._name = _name;
        this._age = _age;
        this._cart = _cart;
        this._id = _id;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get cart() {
        return this._cart;
    }
    set cart(value) {
        this._cart = value;
    }
    get age() {
        return this._age;
    }
    set age(value) {
        this._age = value;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    addToCart(item) {
        this.cart.push(item);
        Shop.updateCart();
    }
    removeFromCart(itemToRemove) {
        this.cart = this.cart.filter(item => item.id !== itemToRemove.id);
        Shop.updateCart();
    }
    removeQuantityFromCart(itemToRemove, quantity) {
        for (let i = 0; i < quantity; i++) {
            let index = this.cart.findIndex(item => item.id === itemToRemove.id);
            this.cart.splice(index, 1);
        }
        Shop.updateCart();
    }
    getCartTotal() {
        let total = 0;
        for (let item of this.cart) {
            total += item.price;
        }
        return total;
    }
    printCart() {
        console.log(`${this.name}'s Cart:`);
        for (let item of this.cart) {
            console.log(`${item.name}: $${item.price}`);
        }
        console.log(`Total: $${this.getCartTotal()}`);
    }
    cartElement() {
        const cartEle = document.createElement("table");
        for (const item of new Set(this.cart)) {
            const rmButton = document.createElement("button");
            rmButton.id = `${item.id}-rm1`;
            rmButton.classList.add("btn", "btn-danger");
            rmButton.onclick = () => {
                Shop.myUser.removeQuantityFromCart(item, 1);
            };
            rmButton.innerText = "-1";
            const rmAllButton = document.createElement("button");
            rmAllButton.id = `${item.id}-rmall`;
            rmAllButton.innerText = "delete";
            rmAllButton.classList.add("btn", "btn-dark-red", "btn-danger");
            rmAllButton.onclick = () => {
                Shop.myUser.removeFromCart(item);
            };
            cartEle.innerHTML += `<tr><td><strong>${item.name}</strong></td><td>$${item.price}</td>
                <td>${this.cart.filter((i) => i.id === item.id).length}</td>
                <td>${rmAllButton.outerHTML}</td>
                <td>${rmButton.outerHTML}</td>
                </tr>`;
        }
        cartEle.innerHTML += `<tr id="totalbar"><td><strong>${"Total:"}</strong></td><td>$${this.getCartTotal().toFixed(2)}</td></tr>`;
        return cartEle;
    }
    addRemoveListeners() {
        for (const item of new Set(this.cart)) {
            const removeOneButton = document.getElementById(`${item.id}-rm1`) || null;
            if (removeOneButton) {
                removeOneButton.onclick = () => {
                    Shop.myUser.removeQuantityFromCart(item, 1);
                };
            }
            const removeAllButton = document.getElementById(`${item.id}-rmall`) || null;
            if (removeAllButton) {
                removeAllButton.onclick = () => {
                    Shop.myUser.removeFromCart(item);
                };
            }
        }
    }
}
class Item {
    constructor(_name, _price, _description, _id = (0,uuid__WEBPACK_IMPORTED_MODULE_0__["default"])()) {
        this._name = _name;
        this._price = _price;
        this._description = _description;
        this._id = _id;
    }
    get description() {
        return this._description;
    }
    set description(value) {
        this._description = value;
    }
    get price() {
        return this._price;
    }
    set price(value) {
        this._price = value;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    itemElement() {
        const itemBox = document.createElement("div");
        itemBox.innerHTML = `<div class="card item-card" style="width: 18rem; height: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${this.name}</h5>
                <p class="card-text">${this._description}</p>
                <p class="card-text">$${this.price}</p>
                <button class="btn btn-primary" id="addToCart">Add To Cart</button>
            </div>
        </div>`;
        const addToCartButton = itemBox.querySelector("#addToCart");
        addToCartButton.onclick = () => {
            Shop.myUser.addToCart(this);
        };
        return itemBox;
    }
}
class Shop {
    constructor(_items = []) {
        this._items = _items;
        let item1 = new Item('Floral Dress', 49.99, "Women's Pale Green and pink floral, long with short sleeve");
        this.items.push(item1);
        let item2 = new Item('pants', 39.99, "Men's cotton light gray short pants");
        this.items.push(item2);
        let item3 = new Item('sweatshirt and pants combo', 67.99, "Men's Sand color combo of sweatshirt and pants");
        this.items.push(item3);
        let item4 = new Item('Cocktail Dress', 79.99, "Women's Red Cocktail Short Dress");
        this.items.push(item4);
        let item5 = new Item('Dress Shirt', 41.99, "Men's Black Shirt");
        this.items.push(item5);
        let item6 = new Item('Button Shirt', 44.99, "Men's Black Button Shirt");
        this.items.push(item6);
        this.showItems();
        Shop.myUser.cart = [];
    }
    showItems() {
        for (let item of this.items) {
            document.getElementById("shop").appendChild(item.itemElement());
        }
    }
    static updateCart() {
        var _a;
        const shopdiv = document.getElementById("cart-div");
        if (Shop.myUser.cart.length <= 0) {
            shopdiv.innerHTML = `<H2 id="cart-header">My Cart</H2>YOUR CART IS EMPTY`;
        }
        else {
            shopdiv.replaceChildren(Shop.myUser.cartElement());
            shopdiv.innerHTML = ('<H2 id="cart-header">My Cart</H2>' + shopdiv.innerHTML);
            (_a = Shop.myUser) === null || _a === void 0 ? void 0 : _a.addRemoveListeners();
        }
    }
    get items() {
        return this._items;
    }
    set items(value) {
        this._items = value;
    }
    static loginUser(e) {
        var _a;
        e.preventDefault();
        Shop.myUser = User.createUser();
        if (Shop.myUser) {
            (_a = document.getElementById("login")) === null || _a === void 0 ? void 0 : _a.remove();
            new Shop();
        }
    }
}
// Add new User event listener
document.getElementById('addUser').addEventListener('click', (e) => Shop.loginUser(e));
// Driver Code

})();

/******/ })()
;