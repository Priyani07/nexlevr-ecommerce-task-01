import {createContext,useContext,useEffect,useMemo,useState} from "react";
const CartContext=createContext(null);
export function CartProvider({children}){
 const [cart,setCart]=useState(()=>JSON.parse(localStorage.getItem("cart")||"[]"));
 useEffect(()=>localStorage.setItem("cart",JSON.stringify(cart)),[cart]);
 const addToCart=p=>setCart(c=>{const x=c.find(i=>i.product===p._id);return x?c.map(i=>i.product===p._id?{...i,quantity:i.quantity+1}:i):[...c,{product:p._id,name:p.name,image:p.image,price:p.price,quantity:1}]});
 const removeFromCart=id=>setCart(c=>c.filter(i=>i.product!==id));
 const updateQuantity=(id,q)=>setCart(c=>q<1?c.filter(i=>i.product!==id):c.map(i=>i.product===id?{...i,quantity:q}:i));
 const total=useMemo(()=>cart.reduce((s,i)=>s+i.price*i.quantity,0),[cart]);
 return <CartContext.Provider value={{cart,addToCart,removeFromCart,updateQuantity,total}}>{children}</CartContext.Provider>
}
export const useCart=()=>useContext(CartContext);
