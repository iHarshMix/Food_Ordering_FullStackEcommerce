import {useRef, useState} from 'react';
import classes from './Checkout.module.css'


const isEmpty = value =>value.trim()==="";
const isNotSixChars=value=>value.trim().length!==6;

const Checkout= props=>{

    const [formInputsValidity, setFormInputsValidity]=useState({
        name:true,
        street:true,
        postal:true,
        city:true
    });
    
    const nameInputRef=useRef();
    const streetInputRef=useRef();
    const postalInputRef=useRef();
    const cityInputRef=useRef();

    
    
    
    const confirmHandler=event=>{
        event.preventDefault();
        const enteredName= nameInputRef.current.value;
        const enteredStreet=streetInputRef.current.value;
        const enteredPostal=postalInputRef.current.value;
        const enteredCity=cityInputRef.current.value;
        
        const enteredNameIsValid= !isEmpty(enteredName);
        const enteredStreetIsValid= !isEmpty(enteredStreet);
        const enteredPostalIsValid= !isNotSixChars(enteredPostal);
        const enteredCityIsValid= !isEmpty(enteredCity);
        
        setFormInputsValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            postal: enteredPostalIsValid,
            city: enteredCityIsValid
        })
        let formIsValid= enteredNameIsValid && enteredStreetIsValid && enteredPostalIsValid && enteredCityIsValid;

        if(!formIsValid){
            return;
        }

        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            postal: enteredPostal,
            city: enteredCity
        })

    }

    const nameControlClasses= `${classes.control} ${formInputsValidity.name ? "" : classes.invalid}`
    const streetControlClasses= `${classes.control} ${formInputsValidity.street ? "" : classes.invalid}`
    const postalControlClasses= `${classes.control} ${formInputsValidity.postal ? "" : classes.invalid}`
    const cityControlClasses= `${classes.control} ${formInputsValidity.city ? "" : classes.invalid}`
    


    return(
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameControlClasses}>
                <label htmlFor='name'>Your name</label>
                <input ref={nameInputRef} id="name" type='text'/>
            </div>
            <div className={streetControlClasses}>
                <label htmlFor='street'>Street</label>
                <input ref={streetInputRef} id="street" type='text'/>
            </div>
            <div className={postalControlClasses}>
                <label htmlFor='postal'>Postal Code</label>
                <input ref={postalInputRef} id="postal" type='text'/>
            </div>
            <div className={cityControlClasses}>
                <label htmlFor='city'>City</label>
                <input ref={cityInputRef} id="city" type='text'/>
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancelClick}>Cancel</button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    )
}

export default Checkout