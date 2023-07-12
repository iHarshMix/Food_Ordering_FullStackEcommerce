import React, {useRef, useState}  from 'react';

import Input from '../../UI/Input.js'

import classes from './MealItemForm.module.css'

const MealItemForm= (props)=>{

    const [amountIsValid, setAmountIsValid]=useState(true);

    const amountInputRef=useRef()
    const submitHandler=event=>{
        event.preventDefault();

        const enteredAmount=amountInputRef.current.value;  // it will always be string, even if the input type="number"
        const enteredAmountNumber=+enteredAmount;  // convert string to number

        if(enteredAmount.trim().length===0 || enteredAmountNumber<1 || enteredAmountNumber>5){
            setAmountIsValid(false);
            return;
        }
        props.onAddToCart(enteredAmountNumber);
    }

    return(
        <form className={classes.form} onSubmit={submitHandler}>
            <Input 
                ref={amountInputRef} 
                label="Amount" 
                input={{
                    id:'amount_' + props.id,  //fixing form Input IDs
                    // id:props.id,  //fixing form Input IDs
                    type:'number',
                    min:'1',
                    max:'5',
                    step:'1',
                    defaultValue:'1'
            }}/>
            <button>+ Add</button>
            {!amountIsValid && <p>Please enter a valid amount </p>}
        </form>
    )
}

export default MealItemForm