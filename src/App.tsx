import Drawer from '@material-ui/core/Drawer';
import React from 'react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from '@material-ui/core/Badge';
import { Wrapper, StyledButton } from './App.styles';
import Item from './Item/Item';
import Cart from './Cart/Cart';

//Types

export type CartItemType = {
	id: number;
	category: string;
	image: string;
	price: number;
	title: string;
	amount: number;
	description: string;
};

const fetch_products = async (): Promise<CartItemType[]> =>
	await (await fetch('https://fakestoreapi.com/products')).json();

function App() {
	const [cart_open, set_cart_open] = useState(false);
	const [cart_items, setcart_items] = useState([] as CartItemType[]);
	const { data, isLoading, error } = useQuery<CartItemType[]>(
		'products',
		fetch_products
	);

	const get_total_items = (items: CartItemType[]) =>
		items.reduce((total: number, item) => total + item.amount, 0);
	const handle_add_to_cart = (clicked_item: CartItemType) => {
		setcart_items((prev) => {
			const is_item_available = prev.find(
				(item) => item.id === clicked_item.id
			);
			if (is_item_available) {
				return prev.map((item) =>
					item.id === clicked_item.id
						? { ...item, amount: item.amount + 1 }
						: item
				);
			}

			//First time the item is added
			return [...prev, { ...clicked_item, amount: 1 }];
		});
	};
	const handle_remove_from_cart = (id: number) => {
		setcart_items((prev) =>
			prev.reduce((total, item) => {
				if (item.id === id) {
					if (item.amount === 1) return total;
					return [...total, { ...item, amount: item.amount - 1 }];
				} else {
					return [...total, item];
				}
			}, [] as CartItemType[])
		);
	};

	if (isLoading) return <LinearProgress />;
	if (error) return <div>Something went wrong</div>;
	return (
		<Wrapper>
			<Drawer
				anchor="right"
				open={cart_open}
				onClose={() => set_cart_open(false)}
			>
				<Cart
					cart_items={cart_items}
					handle_add_to_cart={handle_add_to_cart}
					handle_remove_from_cart={handle_remove_from_cart}
				/>
			</Drawer>
			<StyledButton onClick={() => set_cart_open(true)}>
				<Badge badgeContent={get_total_items(cart_items)} color="error">
					<AddShoppingCartIcon />
				</Badge>
			</StyledButton>

			<Grid container spacing={3}>
				{data?.map((item) => (
					<Grid item key={item.id} xs={12} sm={4}>
						<Item item={item} handle_add_to_cart={handle_add_to_cart} />
					</Grid>
				))}
			</Grid>
		</Wrapper>
	);
}

export default App;
