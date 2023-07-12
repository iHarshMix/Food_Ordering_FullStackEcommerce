import React, {useState, useEffect} from 'react';

import Card from '../UI/Card.js'
import MealItem from './MealItem/MealItem.js'

import classes from './AvailableMeals.module.css'


// const DUMMY_MEALS = [
//     {
//         id: 'm1',
//         name: 'Sushi',
//         description: 'Finest fish and veggies',
//         price: 22.99,
//     },
//     {
//         id: 'm2',
//         name: 'Schnitzel',
//         description: 'A german specialty!',
//         price: 16.5,
//     },
//     {
//         id: 'm3',
//         name: 'Barbecue Burger',
//         description: 'American, raw, meaty',
//         price: 12.99,
//     },
//     {
//         id: 'm4',
//         name: 'Green Bowl',
//         description: 'Healthy...and green...',
//         price: 18.99,
//     },
// ];



const AvailableMeals = () => {
    const [meals, setMeals]=useState([]);
    const [isLoading, setIsLoading]=useState(false);

    const [httpError, setHttpError]= useState(null);

    // const [availableMenu, setAvailableMenu]=useState([]);
    
    const fetchAvailableMenu=async()=>{
        setIsLoading(true);
        try{
            const response= await fetch('https://react-meal-api-default-rtdb.firebaseio.com/meals.json');
            
            if(!response.ok){
                throw new Error('Something went Wrong')
            }
            const data = await response.json();
            
            console.log(data);
            const currentMenu=[];
            for(const key in data){
                currentMenu.push({id:key,...data[key]});
            }

            setMeals(currentMenu);
            setIsLoading(false);
        } catch (error){
            setIsLoading(false);
            setHttpError(error.message);
        }
    }
    
    useEffect(() => {
        fetchAvailableMenu();
    },[])  // since we only need to run once the component is loaded/mounted only.
    //*** use see that when the first loaded- inititally the list is empty, but the request is sent at load and data arrived quickly.

    const mealsList= meals.map(meal=>(
        <MealItem
            key={meal.id}
            id={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price}
        />)
    );

    if(isLoading){
        return(
            <section className={classes.MealsLoading}>
                <p>Loading...</p>
            </section>
        )
    }
    if(httpError){
        return(
            <section className={classes.MealsLoading}>
                <p>{httpError}</p>
            </section>
        )
    }
    return(
        <section className={classes.meals}> 
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
        </section>
    )
}

export default AvailableMeals;