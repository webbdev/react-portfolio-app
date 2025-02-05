import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Contact from '../components/Contact';
import ScrollToTop from '../components/ScrollToTop';

const MainLayouts = () => {
	const [isFadingOut, setIsFadingOut] = useState(false);
  
	return (
		<>
			<ScrollToTop />
			<Header setIsFadingOut={setIsFadingOut}/>
			<main>
				<Outlet context={{ isFadingOut }} />
				{!location.pathname.startsWith('/not') && <Contact />}
			</main>
			<Footer />
		</>
	)
}

export default MainLayouts