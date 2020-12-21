import React, { useState } from 'react';
import ListContext from './list_context';

//global store for our app we can create multiple stores if needed

function Store({children}){

    // the app's initial state

    const initialState = { 

      cart:[],

      cartCount:0,
      cartPrice:0,
  
      addNew: addNew,
      removePd: removePd
      
      }

      //initiate app state with initialstates

      const [ appstate, setState ] = useState(initialState);
      
      // pass the state as context's value
      
    return(
      <ListContext.Provider value={appstate}>
        {children}
      </ListContext.Provider>
    )

    ////// add new product to cart and update cart count

    function addNew(pd){
        let newList = appstate.cart;
        const newItem = {
          count:1,
          id:pd.pk,
          name:pd.name,
          price: pd.precio
        }
    
        const filtered = newList.filter(i =>{
          return i.id === pd.pk;
        });
    
        if(filtered.length > 0){
          const pos = newList.map(i => { return i.id; }).indexOf(pd.pk);
          newList[pos].count += 1;
        }else{
          newList.push(newItem);
        }
        
        setState({...appstate, cart:newList, cartCount:getCartCount(),cartPrice:getCartPrice()});

      }
    
      ////// remove product from cart and update cart count  
      ////// TODO: mejorar la forma de eliminar basado en la clave y no en la posicion del array ( disminuyendo la cantidad si > 1)
    
      function removePd(indx){
        const cartList = appstate.cart;
    
        cartList.splice(indx,1);
    
        setState({...appstate, cart:cartList, cartCount:getCartCount(),cartPrice:getCartPrice()});
      }

      ////// function to get the number of products in cart

      function getCartCount(){

        let cnt = 0;
        if(appstate.cart.length > 0){
          appstate.cart.forEach(item => {
          cnt += item.count;
          });
          
        }
        return cnt;

      }

      ////// function to get the price of cart

      function getCartPrice(){

        let price = 0;
        if(appstate.cart.length > 0 ){
          appstate.cart.forEach(item => {
            if(item.count !== 0){
              price += item.price * item.count;
            } else {
              price += item.price;
            }
          });
        }
        return price;
      }
    
}

export default Store;
