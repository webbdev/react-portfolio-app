import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
	return (
		<footer id='footer' className='container'>
			<div className='w-full mx-auto text-center'>
				<div className='flex flex-wrap mt-12 md:mt-16 text-[22px] xs:text-[24px] sm:text-[30px]'>
					<div className='w-full sm:w-1/3 mb-8 md:mb-11 sm:text-left'>
						<Link
							to="mailto:forrwebdev@gmail.com"
							target='_self'
						>
							Email
						</Link>
					</div>
					<div className='w-full sm:w-1/3 mb-6 md:mb-11'>
						<Link
							to="https://www.linkedin.com/"
							target='_blank'
							rel='noreferrer noopener'
						>
							Linkedin
						</Link>
					</div>
					<div className='w-full sm:w-1/3 mb-6 md:mb-11 sm:text-right'>
						<Link
							to="https://github.com/webbdev"
							target='_blank'
							rel='noreferrer noopener'
						>
							Github
						</Link>
					</div>
				</div>
				<div className="flex justify-center py-5">
					<p className='text-[13px] tracking-[3px] md:text-[14px]'>© {new Date().getFullYear()} TANYA</p>
				</div>
			</div>
		</footer>
	)
}

export default Footer