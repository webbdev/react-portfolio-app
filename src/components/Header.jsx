import { useState, useEffect } from 'react';
import { NavLink, Link, useOutletContext, useNavigate, useLocation } from 'react-router-dom';

const Header = ({ setIsFadingOut }) => {
	const [isOpen, setIsOpen] = useState(false); // Controls overlay menu
	const [prevScrollPos, setPrevScrollPos] = useState(0);
	const [visible, setVisible] = useState(true); // Controls header visibility on scroll

	// const { setIsFadingOut } = useOutletContext() || {};
    const navigate = useNavigate();
    const [isNavigating, setIsNavigating] = useState(false); // Prevent double navigation
	const location = useLocation(); // Get current location

	// Disable scrolling when the overlay menu is open
	useEffect(() => {
	  	document.body.style.overflow = isOpen ? 'hidden' : 'auto';
	}, [isOpen]);
  
	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};
  
	// Handle scroll to hide/show header
	const handleScroll = () => {
		const currentScrollPos = window.scrollY;
	
		if (currentScrollPos > 70) {
			setVisible(currentScrollPos < prevScrollPos);
		}
	
		setPrevScrollPos(currentScrollPos);
	};
  
	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});

	const handleLinkClick = (path) => {
		setIsOpen(false); // Close overlay menu on link click
		
		// Prevent multiple clicks or if clicking the current page
        if (isNavigating || location.pathname === path) {
            window.scrollTo({ top: 0, behavior: 'smooth' }); // Always scroll to top if staying on the same page
            return;
        }

        setIsNavigating(true);
        setIsFadingOut(true);

		setTimeout(() => {
			navigate(path); // Navigate after fade-out completes
            setIsFadingOut(false); // Reset fade state for new page
            setIsNavigating(false); // Allow navigation again
		}, 500); // Wait until the fade-out is complete before navigating

		window.scrollTo({ top: 0, behavior: 'smooth' });
	};

	const handleClick = (e)=>{
		e.preventDefault();
		setIsOpen(false); // Close overlay menu on link click
		
		window.scrollTo({
			top: document.querySelector("#contact").offsetTop,
			behavior: "smooth",
		});
	}
  
	return (
		<header
			id="header"
			className={`fixed w-full overflow-hidden z-10 h-[70px] md:h-28 ${
				visible ? 'top-0' : 'top-[-70px] md:top-[-115px]'
			}`}
		>
			<div className="container">
				<div className="flex h-[70px] md:h-28 items-center justify-between border-b border-black text-[19px] md:text-[28px]">
					<div className="logo uppercase text-[18px] xs:text-[20px] md:text-[28px]">
						<NavLink 
							to="/"
							onClick={(e) => {
								e.preventDefault();
								handleLinkClick('/');
							}}
						>
							Tanya
						</NavLink>
					</div>
		
					<nav 
						aria-label="Main Navigation"
						className='navbar'
					>
						<ul
							className={`fixed inset-0 bg-gray-800 bg-opacity-[95%]
								md:bg-transparent md:static flex flex-col md:flex-row md:justify-center items-center md:items-baseline 
								pt-[50%] md:pt-0 space-y-8 md:space-y-0 md:space-x-8 lg:space-x-12 xl:space-x-16 
								text-center text-white md:text-black tracking-[1px] md:tracking-[1px] ${
								isOpen ? 'block slideInRight' : 'slideOutRight md:flex'
							}`}
						>
							<li>
								<NavLink
									to="/"
									onClick={(e) => {
										e.preventDefault(); // Prevent default navigation
										handleLinkClick('/'); // Trigger fade-out then navigate
									}}
									className={({ isActive }) => isActive ? 'active-link' : ''}
								>
									Projects
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/about"
									onClick={(e) => {
										e.preventDefault(); // Prevent default navigation
										handleLinkClick('/about'); // Trigger fade-out then navigate
									}}
									className={({ isActive }) => isActive ? 'active-link' : ''}
								>
									About
								</NavLink>
							</li>
							<li>
								<Link
									to=""
									onClick={handleClick}
									className="hover:text-red"
								>
									Contact
								</Link>
							</li>
						</ul>
					</nav>

					{/* Hamburger Menu Button */}
					<button
						onClick={toggleMenu}
						aria-expanded={isOpen}
						aria-label="Toggle Menu"
						className={`md:hidden text-black focus:outline-none ${isOpen ? 'absolute top-6 right-8 text-white focus:outline-none transition-all' : ''}`}
					>
					{isOpen ? (
						<svg
							className="w-7 h-7"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					) : (
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M4 6h16M4 12h16m-7 6h7"
							/>
						</svg>
					)}
					</button>
				</div>
			</div>
		</header>
	);
}

export default Header