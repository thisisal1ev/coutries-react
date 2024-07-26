import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home, { getCountries } from './pages/Home'
import PNF from './pages/PageNotFound'
import Detail, { fetchAPI } from './pages/Detail'

const App = () => {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route element={<MainLayout />}>
				<Route
					path='/'
					loader={getCountries}
					element={<Home />}
					errorElement={<PNF />}
				/>
				<Route
					path='/:name'
					loader={fetchAPI}
					element={<Detail />}
					errorElement={<PNF />}
				/>
				<Route path='*' element={<PNF />} />
			</Route>
		)
	)

	return <RouterProvider router={router} />
}

export default App
