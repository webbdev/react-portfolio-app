import { useOutletContext } from 'react-router-dom';
import React, { useEffect, useRef } from 'react';
import Hero from '../components/Hero'
import ProjectListings from '../components/ProjectListings'

const Home = () => {
	const { isFadingOut } = useOutletContext() || {};

	return (
		<div
			className={`${
				isFadingOut ? 'animate-fadeOut' : 'animate-fadeIn'
			}`}
		>
			<Hero />
			<ProjectListings />
		</div>
	)
}

export default Home