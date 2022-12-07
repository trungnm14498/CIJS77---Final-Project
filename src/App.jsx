import { CartEmpty, CartItems, Home, ItemDetail, Login, MenuItems, Order, Payment, Register, Information, UserUpdate, AdminMenu, AdminDetailMenu, AdminAddItem, AdminFeedbacks, AdminOrderHistories, MainMenu, PageNotFound } from './pages'
import { Route, Routes } from 'react-router-dom';
import { Header, Footer } from './components';
import Protected from './Protected/Protected';
import { isLoginedSelector, getRoleSelector } from "./redux/selectors"
import { useSelector } from "react-redux";

function App() {
	const isLogined = useSelector(isLoginedSelector)
	const role = useSelector(getRoleSelector);
	return (
		<div>
			<Header />
			{/* <Routes>
				<Route path='/' element={<Home />} />
				<Route path='/menu/all' element={<MainMenu />} />
				<Route path='/menu/:type' element={<MenuItems />} />
				<Route path='/menu/:type/:itemId' element={<ItemDetail />} />
				<Route path='/cartEmpty' element={<CartEmpty />} />
				<Route path='/cartItems' element={<CartItems />} />
				<Route path='/order' element={<Order />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				// logined
				<Route path='/information' element={<Protected isLoggedIn={isLogined}><Information /></Protected>} />
				<Route path='/userUpdate' element={<Protected isLoggedIn={isLogined}><UserUpdate /></Protected>} />
				// user
				<Route path='/payment' element={<Protected isLoggedIn={isLogined}><Payment /></Protected>} />
				// admin
				<Route path='/admin-menu' element={<AdminMenu />} />
				<Route path='/admin-menu/:itemId' element={<AdminDetailMenu />} />
				<Route path='/admin-menu/addNewItem' element={<AdminAddItem />} />
				<Route path='/admin-feedback' element={<AdminFeedbacks />} />
				<Route path='/admin-order-history' element={<AdminOrderHistories />} />
				<Route path='*' element={<PageNotFound />} />
			</Routes> */}

			<Routes>
				<Route path='/' element={<Home />} />
				<Route path='/menu/all' element={<MainMenu />} />
				<Route path='/menu/:type' element={<MenuItems />} />
				<Route path='/menu/:type/:itemId' element={<ItemDetail />} />
				<Route path='/cartEmpty' element={<CartEmpty />} />
				<Route path='/cartItems' element={<CartItems />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />

				<Route path='/information' element={<Protected isLoggedIn={isLogined} link="*"><Information /></Protected>} />
				<Route path='/userUpdate' element={<Protected isLoggedIn={isLogined} link="*"><UserUpdate /></Protected>} />
				<Route path='/order' element={<Protected isLoggedIn={isLogined} link="*"><Order /></Protected>} />


				<Route path='/payment' element={<Protected isLoggedIn={isLogined} link="*"><Payment /></Protected>} />

				<Route path='/admin-menu' element={<Protected isLoggedIn={isLogined && role === "admin"} link="*"><AdminMenu /></Protected>} />
				<Route path='/admin-menu/:itemId' element={<Protected isLoggedIn={isLogined && role === "admin"} link="*"><AdminDetailMenu /></Protected>} />
				<Route path='/admin-menu/addNewItem' element={<Protected isLoggedIn={isLogined && role === "admin"} link="*"><AdminAddItem /></Protected>} />
				<Route path='/admin-feedback' element={<Protected isLoggedIn={isLogined && role === "admin"} link="*"><AdminFeedbacks /></Protected>} />
				<Route path='/admin-order-history' element={<Protected isLoggedIn={isLogined && role === "admin"} link="*"><AdminOrderHistories /></Protected>} />
				<Route path='*' element={<PageNotFound />} />
			</Routes>
			<Footer />
		</div >
	)
}

export default App;
