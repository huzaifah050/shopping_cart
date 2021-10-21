import CartItem from '../CartItem/CartItem';
import { Wrapper } from './Cart.styles';
import { CartItemType } from '../App';

type Props = {
	cart_items: CartItemType[];
	handle_add_to_cart: (clicked_item: CartItemType) => void;
	handle_remove_from_cart: (id: number) => void;
};

function Cart({
	cart_items,
	handle_add_to_cart,
	handle_remove_from_cart,
}: Props) {
	const calculate_total = (items: CartItemType[]) =>
		items.reduce((total, item) => total + item.amount * item.price, 0);

	return (
		<Wrapper>
			<h2>Your shopping cart</h2>
			{cart_items.length === 0 ? <p>No items in cart</p> : null}
			{cart_items.map((item) => (
				<CartItem
					item={item}
					key={item.id}
					add_to_cart={handle_add_to_cart}
					remove_from_cart={handle_remove_from_cart}
				/>
			))}
			<h2>Total: ${calculate_total(cart_items).toFixed(2)}</h2>
		</Wrapper>
	);
}

export default Cart;
