import { useEffect } from "react";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { useSelector, useDispatch } from "react-redux";
// import { cartActions } from "./components/store/cart-slice";
import { sendCartData } from "./components/store/cart-slice";

let isInitial = true;

function App() {
	const dispatch = useDispatch();
	const isShowCart = useSelector(state => state.cart.isShowCart);
	const cart = useSelector(state => state.cart);
	const notification = useSelector(state => state.cart.notification);

	useEffect(() => {
		if (isInitial) {
			isInitial = false;
			return;
		}

		dispatch(sendCartData(cart));
	}, [cart.cartItems, dispatch]);

	// useEffect(() => {
	// 	const sendCartData = async () => {
	// 		dispatch(
	// 			cartActions.showNotification({
	// 				status: "pending",
	// 				title: "Sending",
	// 				message: "Application is datas sending",
	// 			})
	// 		);

	// 		const response = await fetch(
	// 			"https://react-food-app-cffd3-default-rtdb.firebaseio.com/cart.json",
	// 			{
	// 				method: "PUT",
	// 				headers: {
	// 					"Content-Type": "application/json",
	// 				},
	// 				body: JSON.stringify(cart),
	// 			}
	// 		);
	// 		if (!response.ok) {
	// 			throw new Error("Sending cart data failed");
	// 		}

	// 		dispatch(
	// 			cartActions.showNotification({
	// 				status: "success",
	// 				title: "Success!",
	// 				message: "Cart has been updated",
	// 			})
	// 		);
	// 	};

	// 	if (isInitial) {
	// 		isInitial = false;
	// 		return;
	// 	}

	// 	sendCartData().catch(error => {
	// 		dispatch(
	// 			cartActions.showNotification({
	// 				status: "error",
	// 				title: "Error!",
	// 				message: "Cart has not been updated",
	// 			})
	// 		);
	// 	});
	// }, [cart.cartItems, dispatch]);

	return (
		<Layout>
			{notification && (
				<Notification
					status={notification.status}
					title={notification.title}
					message={notification.message}
				/>
			)}
			{isShowCart && <Cart />}

			<Products />
		</Layout>
	);
}

export default App;
