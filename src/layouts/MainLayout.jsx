import React, { useEffect } from 'react'
import Header from '../components/Header'
import { Outlet, useLocation } from 'react-router-dom'

const MainLayout = () => {
	const location = useLocation()
	useEffect(() => {
		window.scrollTo(0, 0)
	}, [location.pathname])

	return (
		<>
			<Header />
			<main className='grow bg-grey dark:bg-lightDark'>
				<Outlet />
			</main>
		</>
	)
}

export default MainLayout
