import React, {useContext} from 'react';

import CartContext from '../../store/cart-context.js'
import CartIcon from '../Cart/CartIcon.js';
import classes from './HeaderCartButton.module.css'

const HeaderCartButton=props=>{

    const cartCtx=useContext(CartContext);

    const numberOfCartItems=cartCtx.items.reduce((currNumber, item)=>{
        return (currNumber + item.amount);
    },0);
    return(
        <button className={classes.button} onClick={props.onClick}>
            
            <span className={classes.icon}>
                <CartIcon/>
            </span>   {/* icon  */}

            <span>Your Cart</span>   {/* text */}
            
            <span className={classes.badge}>
                {numberOfCartItems}
            </span>   {/* badge, which tells how much items in the cort are present right now */}

        </button>
    )
}

export default HeaderCartButton;
