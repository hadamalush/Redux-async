import ProductItem from "./ProductItem";
import classes from "./Products.module.css";
import { useSelector } from "react-redux";

const Products = props => {
	const allProducts = useSelector(state => state.cart.allProducts);
	return (
		<section className={classes.products}>
			<h2>Buy your favorite products</h2>
			<ul>
				{allProducts.map(item => (
					<ProductItem
						key={item.id}
						id={item.id}
						title={item.title}
						price={item.price}
						quantity={item.quantity}
						description={item.description}
					/>
				))}
			</ul>
		</section>
	);
};

export default Products;
