import { useEffect, useState } from 'react'

const Carousel = () => {
	const data = ["1", "2", "3", "4"]
	const [currentIndex, setCurrentIndex] = useState(0)
	const carouselScroll =() => {
		if (currentIndex === data.length-1) {
			return setCurrentIndex(0)
		}
		return setCurrentIndex(currentIndex+1)
	}

	return (
		<div className='carousel-container'>
			{data.map((item, index) => (
				<h1
					className='carousel-item'
					key={index}
				>
					{item}
				</h1>
			))}
		</div>
  )
}

export default Carousel