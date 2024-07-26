import { useLoaderData, Link } from 'react-router-dom'

let options = {
	style: 'decimal',
	useGrouping: true,
	minimumFractionDigits: 0,
	maximumFractionDigits: 2,
}

const Detail = () => {
	let country = useLoaderData()
	country = country[0]

	return (
		<>
			<div className='py-10 md:py-16 lg:py-20 dark:bg-midDark dark:text-white'>
				<div className='w-full max-w-[1320px] px-5 mx-auto'>
					{/* back icon */}
					<div className='mb-10 md:mb-16 lg:mb-20'>
						<Link
							className='inline-flex items-center bg-white px-4 py-2.5 space-x-2 shadow-input rounded-md sm:px-8 dark:bg-lightDark'
							to='/'
						>
							<svg
								width='20'
								height='20'
								viewBox='0 0 1024 1024'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									fill='currentColor'
									d='M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64'
								/>
								<path
									fill='currentColor'
									d='m237.248 512l265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312z'
								/>
							</svg>
							&nbsp;
							<span className='text-base leading-5 text-textColor dark:text-white'>
								Back
							</span>
						</Link>
					</div>
					{/* main content */}
					<div className='flex flex-col justify-between items-start space-y-4 md:space-y-8 lg:space-x-20 lg:flex-row'>
						{/* flag */}
						<div className='w-full lg:w-1/2'>
							<img
								className='w-full rounded-2xl shadow-listItem'
								src={country.flags.png}
								alt={country.name.common + ' flag'}
							/>
						</div>
						{/* content */}
						<div className='w-full lg:w-1/2'>
							<h1 className='text-[28px] font-bold mb-6 md:text-[32px]'>
								{country.name.common}
							</h1>
							{/* info */}
							<div className='w-full flex flex-col justify-between items-start text-base leading-8 text-textColor mb-8 md:flex-row lg:mb-16 dark:text-white'>
								{/* right */}
								<div className='w-full md:w-5/12'>
									<p>
										<b>Native Name: </b>
										{country.name.common}
									</p>
									<p>
										<b>Population: </b>
										{country.population.toLocaleString('uz-Uz', options)}
									</p>
									<p>
										<b>Region: </b>
										{country.region}
									</p>
									<p>
										<b>Sub Region: </b>
										{country.subregion ? country.subregion : 'No subregion'}
									</p>
									<p>
										<b>Capital:</b>&nbsp;
										{country.capital ? country.capital : 'No capital'}
									</p>
								</div>
								{/* left */}
								<div className='w-full md:w-5/12'>
									<p>
										<b>Top Level Domain: </b>
										{country.tld}
									</p>
									{country.currencies &&
										Object.keys(country.currencies).map(currencyCode => (
											<p key={currencyCode}>
												<b>Currencies: </b>
												{country.currencies[currencyCode].name}
											</p>
										))}
									<p>
										<b>Languages: </b>
										{country.languages
											? Object.values(country.languages).map(
													(value, index, array) => (
														<span key={index}>
															{value}
															{index !== array.length - 1 ? ', ' : ''}
														</span>
													)
											  )
											: 'No languages'}
									</p>
								</div>
							</div>
							{/* Borders */}
							<div className='flex flex-col items-center lg:flex-row lg:items-center lg:space-x-4'>
								<p className='whitespace-nowrap text-base leading-6 text-textColor font-semibold dark:text-white'>
									Border Countries:
								</p>
								<div className='flex flex-wrap'>
									{country && country.borders && country.borders.length > 0 ? (
										country.borders.map((border, index) => (
											<span
												className='py-1 px-7 m-1.5 border-[#979797] shadow-borderItem rounded-sm text-sm bg-white font-light text-textColor dark:bg-lightDark dark:text-white'
												key={index}
											>
												{border}
											</span>
										))
									) : (
										<p>No border countries</p>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export const fetchAPI = async ({ params }) => {
	const { name } = params
	const res = await fetch(`https://restcountries.com/v3.1/name/${name}`)
	if (!res.ok) throw Error('No fetching country information')
	const data = await res.json()
	return data
}

export default Detail
