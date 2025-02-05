import { Link } from 'react-router-dom'
import { FaExclamationTriangle, FaArrowLeft  } from 'react-icons/fa'

const NotFound = () => {
	return (
		<section className="container">
			<div className="pt-[113px] mb-[50px] md:mb-[80px]"></div>
			<div className='text-center flex flex-col justify-center items-center mb-10'>
				<FaExclamationTriangle className=" text-yellow-400 text-5xl md:text-6xl mb-5" />
				<h1 className="text-4xl md:text-5xl font-medium mb-5">404 Not Found</h1>
				<p className="text-xl mb-6">This page does not exist</p>
				<Link
					to="/"
					className="flex items-center underline underline-offset-4 hover:underline-offset-8"
				>
					Go Back
				</Link>
			</div>
		</section>
  	)
}

export default NotFound