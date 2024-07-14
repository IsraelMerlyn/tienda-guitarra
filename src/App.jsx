import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Guitar } from "./components/Guitar";
import { db } from "./data/db";
import { Footer_pages } from "./components/Footer_pages";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.css";

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
  
    Swal.fire({
      title: "Estas seguro que deseas elimnar?",
      text: "el registro  se eliminara del carrito!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "cancelar",
    }).then( (result) => {
          if (result.isConfirmed) {
            Swal.fire("Eliminado!", "Registro eliminado con exito", "success");
            setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))

          }
    

    })
    
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

function clearCart() {

  
  Swal.fire({
    title: "Estas seguro que deseas vaciar el carrito?",
    text: "",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, eliminar!",
    cancelButtonText: "cancelar",
  }).then( (result) => {
        if (result.isConfirmed) {
          Swal.fire("Eliminado!", "Se ha vaciado el carrito", "success");
          setCart([])


        }
  

  })
}

  return (
    <>
      <Header 
        cart={cart}
        removeToCart={removeToCart}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
        clearCart= {clearCart}
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
