import React, { useContext, useState } from 'react';


import Modal from '../UI/Modal.js'
import CartContext from '../../store/cart-context.js'
import CartItem from './CartItem.js'
import Checkout from './Checkout.js'

import classes from './Cart.module.css'


const Cart = props => {

    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);

    const cartCtx = useContext(CartContext);

    const totalAmount = cartCtx.totalAmount.toFixed(2);
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 });
    };

    const orderHandler = () => {
        setIsCheckout(true);
    }

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);
        await fetch("https://react-meal-api-default-rtdb.firebaseio.com/orders.json", {
            method: "POST",
            body: JSON.stringify({
                user: userData,
                orderItems: cartCtx.items
            })
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    }


    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map((item) => (
                <CartItem
                    key={item.id}
                    name={item.name}
                    price={item.price}
                    amount={item.amount}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                />
            ))}
        </ul>
    );

    const modalActions = <div className={classes.actions}>  {/* Actions on Cart buttons  */}
        <button className={classes['button--alt']} onClick={props.onHideCart}>
            Close
        </button>
        {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
    </div>

    const cartModalContent = <React.Fragment>
        {cartItems}
        <div className={classes.total}>      {/* Total Amount  */}
            <span>Toltal Amout</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckout && <Checkout
            onCancelClick={props.onHideCart}
            onConfirm={submitOrderHandler}
        />}
        {!isCheckout && modalActions}
    </React.Fragment>

    const isSubmittingModalContent = <p>Sending Order Data</p>

    const didSubmitModalContent = <React.Fragment>
        <p>Successfully sent the order!</p>
        <div className={classes.actions}>  {/* Actions on Cart buttons  */}
            <button className={classes.button} onClick={props.onHideCart}>
                Close
            </button>
        </div>
    </React.Fragment>

    return (
        <Modal onClickModal={props.onHideCart}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    )
}

export default Cart;