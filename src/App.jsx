import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Guitar } from "./components/Guitar";
import { db } from "./data/db";
import { Footer_pages } from "./components/Footer_pages";


export const App = () => {
  
   
  const [data, setData] = useState(db);
  const [cart, setCart] = useState([]);

 
  function addToCart(item) {
    console.log('agregando ...');
    setCart(prevCart => [...prevCart, item])

  }

  return (
    <>
      <Header />

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
