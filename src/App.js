import { useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector } from "react-redux";

function App() {
	const isShowCart = useSelector(state => state.cart.isShowCart);
	const cart = useSelector(state => state.cart);

	useEffect(() => {
		fetch(
			"https://react-food-app-cffd3-default-rtdb.firebaseio.com/cart.json",
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(cart),
			}
		);
	}, [cart]);

	return (
		<Layout>
			{isShowCart && <Cart />}
			<Products />
		</Layout>
	);
}

export default App;
