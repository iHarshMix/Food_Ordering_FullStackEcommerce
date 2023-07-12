import React, {useState} from 'react';

import CartProvider from './store/CartProvider'
import Header from './components/Layout/Header.js'
import Meals from './components/Meals/Meals.js'

import Cart from './components/Cart/Cart.js'    // just to see it in action.

function App() {

	const [cartIsShown, setCartIsShown] =useState(false);

	const showCartHandler=()=>{
		setCartIsShown(true);
	}
	const hideCartHandler=()=>{
		setCartIsShown(false);
	}

	return (
		<CartProvider>   
			
			{cartIsShown && <Cart  onHideCart={hideCartHandler}/>}    {/* e.g just to see it in action */}
			<Header onShowCart={showCartHandler} />

			<main>
				<Meals/>
			</main>
		</CartProvider>
	);
}

export default App;
