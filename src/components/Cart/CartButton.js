import classes from "./CartButton.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/cart-slice";

const CartButton = props => {
	const dispatch = useDispatch();
	const totalQuantity = useSelector(state => state.cart.totalQuantity);

	const showCartHandler = event => {
		event.preventDefault();
		dispatch(cartActions.showCart());
	};

	return (
		<button className={classes.button} onClick={showCartHandler}>
			<span>My Cart</span>
			<span className={classes.badge}>{totalQuantity}</span>
		</button>
	);
};

export default CartButton;
