import Button from '@material-ui/core/Button';
import { CartItemType } from '../App';
import { Wrapper } from './Item.styles';

type Props = {
	item: CartItemType;
	handle_add_to_cart: (clicked_item: CartItemType) => void;
};
function Item({ item, handle_add_to_cart }: Props) {
	return (
		<Wrapper>
			<img src={item.image} alt={item.title} />
			<div className="">
				<h3>{item.title}</h3>
				<p>{item.description}</p>
				<h3>${item.price}</h3>
			</div>
			<Button onClick={() => handle_add_to_cart(item)}>Add to Cart</Button>
		</Wrapper>
	);
}

export default Item;
