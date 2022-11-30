import { CartEmpty, CartItems, Home, ItemDetail, Login, MenuItems, Order, Payment, Register, Information, UserUpdate, AdminUpdateMenu, AdminDetailMenu, AdminAddItem, AdminFeedbacks, AdminOrderHistories } from './pages'
import { Route, Routes } from 'react-router-dom';
import { Header, Footer } from './components';

function App() {
	return (
		<div>
			<Header />
			<Routes>
				<Route path='/' element={<Home />}></Route>
				<Route path='/menu/:type' element={<MenuItems />}></Route>
				<Route path='/menu/:type/:itemId' element={<ItemDetail />}></Route>
				<Route path='/cartEmpty' element={<CartEmpty />}></Route>
				<Route path='/cartItems' element={<CartItems />}></Route>
				<Route path='/order' element={<Order />}></Route>
				<Route path='/payment' element={<Payment />}></Route>
				<Route path='/login' element={<Login />}></Route>
				<Route path='/information' element={<Information />}></Route>
				<Route path='/userUpdate' element={<UserUpdate />}></Route>
				<Route path='/register' element={<Register />}></Route>
				<Route path='/admin-menu' element={<AdminUpdateMenu />}></Route>
				<Route path='/admin-menu/:itemId' element={<AdminDetailMenu />}></Route>
				<Route path='/admin-menu/addNewItem' element={<AdminAddItem />}></Route>
				<Route path='/admin-feedback' element={<AdminFeedbacks />}></Route>
				<Route path='/admin-order-history' element={<AdminOrderHistories />}></Route>

			</Routes>
			<Footer />
		</div >
	)
}

export default App;
