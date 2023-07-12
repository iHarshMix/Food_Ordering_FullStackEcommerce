import React from 'react';

import classes from './MealsSummary.module.css'

const MealsSummary= ()=>{
    return (
        <section className={classes.summary}>
            <h1>Delicious Food, Delivered To You</h1>
            <p>
                Choose your favourite meal from our broad selection of available meals and enjoy a delicous lunch or dinner at home.
            </p>
            <p>
                All our meals are cooked with high-quality ingredients, just-in-time and of course by experienced chef's!
            </p>
        </section>
    )
}

export default MealsSummary;