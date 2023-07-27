import { cartActions } from "./cart-slice";

export const fetchCartData = () => {
	console.log("ble");
	return async dispatch => {
		const fetchData = async () => {
			const response = await fetch(
				"https://react-food-app-cffd3-default-rtdb.firebaseio.com/cart.json"
			);
			const data = await response.json();

			if (!response.ok) {
				throw new Error("Fetching cart data failed");
			}
			return data;
		};

		try {
			const cartData = await fetchData();
			dispatch(cartActions.replaceCart(cartData));
			console.log("object");
		} catch (error) {
			dispatch(
				cartActions.showNotification({
					status: "error",
					title: "Error!",
					message: "Fetching cart data failed!",
				})
			);
		}
	};
};

export const sendCartData = cartData => {
	return async dispatch => {
		dispatch(
			cartActions.showNotification({
				status: "pending",
				title: "Sending",
				message: "Application is datas sending",
			})
		);

		const sendRequest = async () => {
			const response = await fetch(
				"https://react-food-app-cffd3-default-rtdb.firebaseio.com/cart.json",
				{
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(cartData),
				}
			);
			if (!response.ok) {
				throw new Error("Sending cart data failed");
			}
		};

		try {
			await sendRequest();

			dispatch(
				cartActions.showNotification({
					status: "success",
					title: "Success!",
					message: "Cart has been updated",
				})
			);
		} catch (error) {
			dispatch(
				cartActions.showNotification({
					status: "error",
					title: "Error!",
					message: "Cart has not been updated",
				})
			);
		}
	};
};
