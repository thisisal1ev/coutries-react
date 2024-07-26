import { useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import search from '../assets/img/search.svg'

const API = 'https://restcountries.com/v3.1/all'

let options = {
	style: 'decimal',
	useGrouping: true,
	minimumFractionDigits: 0,
	maximumFractionDigits: 2,
}

const Home = () => {
	const countries = useLoaderData()
	const [searchContent, setSearchContent] = useState('')
	const [selectValue, setSelectValue] = useState('')

	const handleSearchChange = e => {
		setSearchContent(e.target.value)
	}

	const handleSelectChange = e => {
		setSelectValue(e.target.value)
	}

	const filterCountry = country => {
		if (searchContent.trim() === '') {
			return true
		}
		return country.name.common
			.toLowerCase()
			.includes(searchContent.toLowerCase())
	}

	const filterCountryByRegion = country => {
		if (selectValue.trim() === '' || selectValue.trim() === 'All') {
			return true
		}
		return country.region === selectValue
	}

	const filteredCountries = countries.filter(filterCountry)
	const filteredCountriesByRegion = filteredCountries.filter(
		filterCountryByRegion
	)

	return (
		<div className='py-12 min-h-screen dark:bg-midDark'>
			<div className='w-full max-w-[1320px] px-5 mx-auto'>
				{/* Input & Select */}
				<div className='flex flex-col items-end sm:flex-row sm:justify-between'>
					{/* Input */}
					<div className='relative w-full max-w-[480px] mb-5 sm:mr-10 sm:mb-0'>
						<input
							value={searchContent}
							onChange={handleSearchChange}
							className='w-full py-[18px] pl-[74px] outline-none rounded-md shadow-input text-sm text-textColor dark:bg-lightDark dark:text-white'
							type='search'
							placeholder='Search for a country…'
						/>
						<img
							className='absolute top-5 left-8'
							src={search}
							alt='search icon'
						/>
					</div>

					{/* Select */}
					<select
						onChange={handleSelectChange}
						defaultValue='DEFAULT'
						className='px-6 py-5 shadow-input w-52 text-sm text-textColor space-y-2 rounded-md bg-white dark:text-white dark:bg-lightDark'
					>
						<option value='DEFAULT' disabled>
							Filter by region
						</option>
						<option value='All'>All</option>
						<option value='Africa'>Africa</option>
						<option value='Americas'>America</option>
						<option value='Asia'>Asia</option>
						<option value='Europe'>Europe</option>
						<option value='Oceania'>Oceania</option>
					</select>
				</div>

				<div className='pt-12'>
					<ul className='grid grid-cols-1 gap-10 sm:grid-cols-2 md:gap-x-12 md:gap-y-10 lg:gap-x-16 lg:gap-y-14 lg:grid-cols-3 xl:grid-cols-4 xl:gap-[75px]'>
						{filteredCountriesByRegion.map(country => {
							return (
								<li
									className='shadow-listItem bg-white rounded-md dark:bg-lightDark dark:text-white'
									key={country.name.common}
								>
									<Link to={country.name.common}>
										<img
											src={country.flags.png}
											className='xl:w-[264px] h-[160px] w-full'
											width={264}
											height={160}
											alt={country.name.common + ' flag'}
										/>
										<div className='pt-6 px-6 pb-11'>
											<h3 className='text-lg leading-6 font-bold mb-4'>
												{country.name.common}
											</h3>
											<div className='text-sm leading-4 font-light space-y-2'>
												<p>
													<b className='font-semibold'>Population:</b>{' '}
													<span>
														{country.population.toLocaleString(
															'uz-Uz',
															options
														)}
													</span>
												</p>
												<p>
													<b className='font-semibold'>Region:</b>{' '}
													<span>{country.region}</span>
												</p>
												<p>
													<b className='font-semibold'>Capital:</b>{' '}
													<span>
														{country.capital ? country.capital : 'No capital'}
													</span>
												</p>
											</div>
										</div>
									</Link>
								</li>
							)
						})}
					</ul>
				</div>
			</div>
		</div>
	)
}

export const getCountries = async () => {
	const res = await fetch(API)
	const data = await res.json()
	if (!res.ok) {
		throw Error('Failed to fetch states, please refresh your browser!')
	}
	return data
}

export default Home
