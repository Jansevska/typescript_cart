import { v4 as uuidv4 } from "uuid";


// optional way of writting the code:
// (<HTMLInputElement>document.getElementById("name")).value

class User{
    static createUser(){
        const name = (document.getElementById("nameInput") as HTMLFormElement).value;
        const age = (document.getElementById('ageInput') as HTMLFormElement).value;
        if (name.length > 0 && age) {
            document.getElementById("shop") as HTMLElement;
            document.getElementById("cart-div") as HTMLElement;
            return new User(name, parseInt(age));
        }
        return;
    }

    constructor(
        private _name: string,
        private _age: number,
        private _cart: Item[] = [],
        private _id: string = uuidv4()
    ){}

    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
        this._id = value;
    }
    public get cart(): Item[] {
        return this._cart;
    }
    public set cart(value: Item[]) {
        this._cart = value;
    }
    public get age(): number {
        return this._age;
    }
    public set age(value: number) {
        this._age = value;
    }
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }

    public addToCart(item:Item):void{
        this.cart.push(item);
        Shop.updateCart();
    }

    public removeFromCart(itemToRemove:Item):void{
        this.cart = this.cart.filter( item => item.id !== itemToRemove.id);
        Shop.updateCart();
    }

    public removeQuantityFromCart(itemToRemove:Item, quantity:number):void{
        for (let i=0; i<quantity; i++){
            let index = this.cart.findIndex(item => item.id === itemToRemove.id);
            this.cart.splice(index, 1);
        }
        Shop.updateCart();
    }

    public getCartTotal():number{
        let total = 0;
        for (let item of this.cart){
            total += item.price
        }
        return total
    }

    public printCart():void{
        console.log(`${this.name}'s Cart:`)
        for (let item of this.cart){
            console.log(`${item.name}: $${item.price}`)
        }
        console.log(`Total: $${this.getCartTotal()}`)
    }

    cartElement() {
        const cartEle = document.createElement("table");
        for (const item of new Set(this.cart)) {

            const rmButton = document.createElement("button");
            rmButton.id = `${item.id}-rm1`;
            rmButton.classList.add("btn", "btn-danger");
            rmButton.onclick = () => {
            Shop.myUser!.removeQuantityFromCart(item, 1);
            };
            rmButton.innerText = "-1";

            const rmAllButton = document.createElement("button");
            rmAllButton.id = `${item.id}-rmall`;
            rmAllButton.innerText = "delete";
            rmAllButton.classList.add("btn", "btn-dark-red", "btn-danger");
            rmAllButton.onclick = () => {
            Shop.myUser!.removeFromCart(item);
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
                    Shop.myUser!.removeQuantityFromCart(item, 1);
                };
            }
            const removeAllButton = document.getElementById(`${item.id}-rmall`) || null;
            if (removeAllButton) {
                removeAllButton.onclick = () => {
                    Shop.myUser!.removeFromCart(item);
                };
            }
        }
    }
}

class Item {

    constructor(
        private _name: string,
        private _price: number,
        private _description: string,
        private _id: string = uuidv4(),
        ){}

    public get description(): string {
        return this._description;
    }
    public set description(value: string) {
        this._description = value;
    }
    public get price(): number {
        return this._price;
    }
    public set price(value: number) {
        this._price = value;
    }
    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
    public get id(): string {
        return this._id;
    }
    public set id(value: string) {
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

        const addToCartButton = itemBox.querySelector("#addToCart") as HTMLButtonElement;
        addToCartButton.onclick = () => {
            Shop.myUser!.addToCart(this);
        };
        return itemBox;
    }
}    


    class Shop {
        static myUser:User|undefined

        constructor(
            private _items: Item[] = []
        ){
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

            Shop.myUser!.cart = [];

        }

        showItems(){
            for (let item of this.items) {
                (document.getElementById("shop") as HTMLElement).appendChild(item.itemElement());
            }
        }

        static updateCart() {
            const shopdiv = document.getElementById("cart-div") as HTMLElement;
            if (Shop.myUser!.cart.length <= 0) {
                shopdiv.innerHTML = `<H2 id="cart-header">My Cart</H2>YOUR CART IS EMPTY`;
            }
            else {
                shopdiv.replaceChildren(Shop.myUser!.cartElement());
                shopdiv.innerHTML = ('<H2 id="cart-header">My Cart</H2>' + shopdiv.innerHTML);
                Shop.myUser?.addRemoveListeners();
            }
        }
        
        public get items(): Item[] {
            return this._items;
        }
        public set items(value: Item[]) {
            this._items = value;
        }
        
        static loginUser(e:Event) {
            e.preventDefault();
            Shop.myUser = User.createUser();
            if (Shop.myUser) {
                document.getElementById("login")?.remove();
                new Shop();
            }
        }
}


    // Add new User event listener
document.getElementById('addUser')!.addEventListener('click', (e:Event)=> Shop.loginUser(e))


// Driver Code
