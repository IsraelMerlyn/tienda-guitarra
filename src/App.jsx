import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Guitar } from "./components/Guitar";
import { db } from "./data/db";
import { Footer_pages } from "./components/Footer_pages";


export const App = () => {
  
   
  const [data, setData] = useState(db);
  const [cart, setCart] = useState([]);
  const MAX_ITEMS = 5;
  const MIN_ITEMS = 1;
 
  function addToCart(item) {
    //usestate inmutabilidad()
    const itemExists = cart.findIndex(guitar=> guitar.id == item.id)

    if (itemExists >= 0) {
      if(cart[itemExists].quantity >= MAX_ITEMS) return
    const updateCart = [...cart]
    updateCart[itemExists].quantity++;
    setCart(updateCart)
    }else{
      item.quantity = 1
      setCart([...cart, item])
    }

  }
  

  function removeToCart (id) {
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
    
  }

  function increaseQuantity(id) {
    const updatedCart = cart.map(item => {
      if (item.id === id && item.quantity < MAX_ITEMS) {
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })
    setCart(updatedCart)
  }

function decreaseQuantity(id) {
 
  const updatedCart = cart.map(item => {
    if(item.id === id && item.quantity > MIN_ITEMS){
      return {
        ...item,
        quantity: item.quantity -1
      }
    }
    return item
  })
  setCart(updatedCart)
}

  return (
    <>
      <Header 
        cart={cart}
        removeToCart={removeToCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
      />

      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
      
          {
            data.map((guitar)=> 
              (
                <Guitar 
                  key={guitar.id} 
                  guitar={guitar} 
                  setCart={setCart}
                  addToCart = {addToCart}
                  
                 />
              )
            )
          }
         
        </div>
      </main>

      <Footer_pages/>
    </>
  )
}
