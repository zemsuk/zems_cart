let myData = ""
const zems_cart = (data) => {
    console.log("Zems Cart");  
    myData = data  
    var cart = localStorage.getItem('zems_cart')
    var cart = JSON.parse(cart)
    if (cart !== null){
        console.log("Not null");
        myCart();
    } else {
        localStorage.setItem("zems_cart", JSON.stringify({cart:{}, total_qty:0, total:0}));
        console.log("New Cart");
        addToCart()
    }
};

const myCart = () => {
    var cart = localStorage.getItem('zems_cart')
    var cart = JSON.parse(cart)
    if (cart.cart !== null) {
        console.log("Exist");
        // your code here
        console.log(myData.id);
        console.log(cart.cart[myData.id]);
        if(cart.cart[myData.id] !== undefined){
            console.log("update item");
            updateCart()
        } else {
            console.log("ex new");
            addToCart()
        }
    } else {
        // localStorage.setItem("zems_cart", JSON.stringify({cart:null, total_qty:0, total:0}));
        console.log("No");
        addToCart()
    }
    // localStorage.setItem("zems_cart", JSON.stringify({ price: data.price }));
}
const addToCart = () => {
    console.log("addToCart");
    let cartId = myData.id
    var curCart = JSON.parse(localStorage.getItem("zems_cart"))
    var qty = 1
    // var cart_name = 'cart'
    // if (curCart.cart !== null){
    //     curCart['cart'] = curCart.cart
    // } else {
    //     curCart['cart'] = {}
    // }
    curCart['cart'][cartId] = {name:myData.zems_item_title, qty:qty, price: myData.price }
    curCart['total_qty'] = curCart['total_qty'] + 1
    curCart['total'] = parseFloat(curCart['total']) + parseFloat(myData.price)
    localStorage.setItem("zems_cart", JSON.stringify(curCart));
}
const updateCart = () => {
    console.log("====update cart=====");
    console.log(myData);
    var carts = JSON.parse(localStorage.getItem("zems_cart"))
    console.log(carts.cart[myData.id].qty);
    carts.cart[myData.id].qty = carts.cart[myData.id].qty + 1
    carts.total_qty = carts.total_qty + 1
    carts.total = parseFloat(carts.total) + parseFloat(myData.price)
    console.log(carts.total_qty);
    console.log(carts.total);
    localStorage.setItem("zems_cart", JSON.stringify(carts));
}
const zemsUpdateCart = (up_method, up_id) => {
    console.log("====update cart=====");
    var carts = JSON.parse(localStorage.getItem("zems_cart"))

    console.log(up_id);
    console.log(up_method);
    console.log(carts);
    console.log(carts.cart[up_id].price);
    if(up_method == "sub"){
        carts.cart[up_id].qty = carts.cart[up_id].qty - 1
        carts.total_qty = parseInt(carts.total_qty) - 1
        carts.total = (parseFloat(carts.total) - parseFloat(carts.cart[up_id].price)).toFixed(2)
    } else {
        carts.cart[up_id].qty = carts.cart[up_id].qty + 1
        carts.total_qty = parseInt(carts.total_qty) + 1
        carts.total = (parseFloat(carts.total) + parseFloat(carts.cart[up_id].price)).toFixed(2)
    }
    


    console.log(carts.total_qty);
    console.log(carts.total);

    localStorage.setItem("zems_cart", JSON.stringify(carts));
}
const removeFromCart = (id) => {
    var carts = JSON.parse(localStorage.getItem("zems_cart"))
    console.log("remove "+id);
    var nCart = carts.cart
    console.log(nCart[id].qty);
    carts.total_qty = parseInt(carts.total_qty) - nCart[id].qty
    carts.total = (parseFloat(carts.total) - (parseFloat(carts.cart[id].price) * nCart[id].qty)).toFixed(2)
    delete nCart[id] 
    carts.cart = nCart

    console.log(carts);
    localStorage.setItem("zems_cart", JSON.stringify(carts));
    return getCart()
}

const getCart = () => {
    var cart = localStorage.getItem('zems_cart')
    cart = JSON.parse(cart)
    return cart
}

const otherAdd = (data) => {
    var cart = localStorage.getItem('zems_cart')
    cart = JSON.parse(cart)
    Object.keys(data).forEach(key => {
        console.log(`${key}: ${data[key]}`);
        cart[key] = data[key]
    });
    console.log(cart);
    localStorage.setItem("zems_cart", JSON.stringify(cart));
    return cart
}
const otherRemove = (data) => {
    var cart = localStorage.getItem('zems_cart')
    cart = JSON.parse(cart)
    data.forEach(key => {
        delete cart[key]
    });
    console.log(cart);
    localStorage.setItem("zems_cart", JSON.stringify(cart));
    return cart
}


export { zems_cart, getCart, myData, zemsUpdateCart, removeFromCart, otherAdd, otherRemove }
