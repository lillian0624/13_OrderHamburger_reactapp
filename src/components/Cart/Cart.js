import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import iconImg from "../../asset/bag.png";
import CartContext from "../../store/CartContext";
import CartDetails from "./CartDetails/CartDetails";
import Checkout from "./Checkout/Checkout";

const Cart = () => {
  const ctx = useContext(CartContext);

//添加一个state来设置想去是否显示
const [showDetails, setShowDetails] = useState(false);
//添加一个state设置结账页面的显示与影藏
const [showCheckout, setShowCheckout] = useState(false);

//添加一个显示详情页的函数
const toggleDetailsHandler = () => {
  if(ctx.totalAmount === 0) {
    setShowDetails(false);
    return;  
   }
  setShowDetails(prevState => !prevState);
};

const showCheckoutHandler = () => {
  if(ctx.totalAmount === 0) return;
  setShowCheckout(true);
}; 

const hideCheckoutHandler = () =>{
  setShowCheckout(false);
};

  return (
    <div className={classes.Cart} onClick = {toggleDetailsHandler} > 

   {showCheckout && <Checkout onHide = {hideCheckoutHandler}/>} 

           {/* 购物车的商品列表 */}
      {(showDetails && ctx.totalAmount !==0)? <CartDetails/> : null}
      <div className={classes.Icon}>
        <img src={iconImg}/>
        {ctx.totalAmount === 0 ? null : (
          <span className={classes.TotalAmount}>{ctx.totalAmount}</span>
        )}
      </div>
      {ctx.totalAmount === 0 ? ( 
        <p className={classes.NoMeal}>Add your first item</p>
      ) : (
        <p className={classes.Price}>{ctx.totalPrice}</p>
      )}

      <button
        onClick = {showCheckoutHandler}
        className={`${classes.Button} ${
          ctx.totalAmount === 0 ? classes.Disabled : ""
        }`}
      >
        Confirm
      </button>
    </div>
  );
};

export default Cart;
