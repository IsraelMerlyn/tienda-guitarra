import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Guitar } from "./components/Guitar";
import { db } from "./data/db";
import { Footer_pages } from "./components/Footer_pages";


export const App = () => {
  
   
  const [data, setData] = useState(db);
  const [cart, setCart] = useState([]);

 
  function addToCart(item) {
    //usestate inmutabilidad()
    const itemExists = cart.findIndex(guitar=> guitar.id == item.id)

    if (itemExists >= 0) {
    const updateCart = [...cart]
    updateCart[itemExists].quantity++;
    setCart(updateCart)
    }else{
      item.quantity = 1
      setCart([...cart, item])
    }

  }

  

  return (
    <>
      <Header 
        cart={cart}
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
