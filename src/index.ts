import { v4 as uuidv4 } from "uuid";

class User{
    static createUser(){
        const name = document.getElementById("nameInput") as HTMLFormElement;
        const age = document.getElementById('ageInput') as HTMLFormElement;
        // if (name.length > 0 && age > 0) {
        //     document.getElementById("cart-div").style.visibility = "visible";
        //     document.getElementById("shop").style.visibility = "visible";
        //     return new User(name, age);
        // }
        console.log(new User(name.value, age.value));
        return new User(name.value, age.value);
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
    }

    public removeFromCart(itemToRemove:Item):void{
        this.cart = this.cart.filter( item => item.id !== itemToRemove.id);
    }

    public removeQuantityFromCart(itemToRemove:Item, quantity:number):void{
        for (let i=0; i<quantity; i++){
            let index = this.cart.findIndex(item => item.id === itemToRemove.id);
            this.cart.splice(index, 1);
        }
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
}    


    class Shop {
        static myUser:User;
        
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
        }
}


    // Add new User event listener
document.getElementById('addUser')!.addEventListener('click', (e:Event)=> Shop.loginUser(e))


// Driver Code
