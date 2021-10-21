import Button from '@material-ui/core/Button';
import { CartItemType } from '../App';
import { Wrapper } from './CartItem.styles';

type Props = {
	item: CartItemType;
	add_to_cart: (clicked_item: CartItemType) => void;
	remove_from_cart: (id: number) => void;
};

function CartItem({ item, add_to_cart, remove_from_cart }: Props) {
	return (
		<Wrapper>
			<div>
				<h3>{item.title}</h3>
				<div className="information">
					<p>Price: ${item.price}</p>
					<p>Total: ${(item.amount * item.price).toFixed(2)}</p>
				</div>
				<div className="buttons">
					<Button
						size="small"
						disableElevation
						variant="contained"
						onClick={() => remove_from_cart(item.id)}
					>
						-
					</Button>
					<p>{item.amount}</p>
					<Button
						size="small"
						disableElevation
						variant="contained"
						onClick={() => add_to_cart(item)}
					>
						+
					</Button>
					<img src={item.image} alt={item.title} />
				</div>
			</div>
		</Wrapper>
	);
}

export default CartItem;
