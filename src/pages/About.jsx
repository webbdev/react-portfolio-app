import { useOutletContext } from 'react-router-dom';
import banner from '../assets/images/london.jpg'

const about = {
	img: "",
	intro_1: "Hi, I'm Tanya,",
	introParagraph: [
		"a Front End Web Developer based in London, UK, with a passion for creating seamless, user-friendly digital experiences.", 
		"I specialise in building responsive and accessible websites and web apps using modern technologies like HTML5, CSS3, JavaScript, React.js, Node.js, Python, Django, and other.",
		"I’m driven to deliver clean, efficient code and constantly explore new technologies to enhance performance and usability."
	],
	skillsLng: [
		'JavaScript', 'TypeScript', 'Node.js', 'Python', 'HTML5', 'CSS3'
	],
	skillsFramework: [
		'React.js', 'Vue.js', 'jQuery', 'Django', 'Express.js', 'Tailwind\u00a0CSS'
	],
	skillsOther: [
		'Git', 'MongoDB', 'SQL', 'APIs', 'Jest', 'VS\u00a0Code'
	]
}

const About = () => {
	const { isFadingOut } = useOutletContext() || {};

	return (
		<section 
			id="about"
			className={`container text-[16px] md:text-[18px] leading-[1.6] ${
				isFadingOut ? 'animate-fadeOut' : 'animate-fadeIn'
			}`}
		>
			<div className="pt-[70px] md:pt-[113px] mb-[40px] md:mb-[66px] lg:mb-[80px]"></div>
			<div className='border-b border-black grid grid-cols-1 md:grid-cols-2 md:gap-8 lg:gap-16 xl:gap-16 pb-12 md:pb-20'>
				<div className="md:pr-10 lg:pr-14">
					<img 
						src={banner} 
						alt="London"
						className="hidden md:block"
						width={382}
						height={680}
					/>
				</div>
				<div className="lg:pl-6">
					<div className="flex h-full">
						<div className="md:mt-[5px] lg:mt-[10%] xl:mt-[15%]">
							<h1 className="text-[30px] md:text-[46px] lg:text-[50px] mb-5 md:mb-6">
								{about.intro_1}
							</h1>
							<div className="max-w-[90%]">
								{about.introParagraph.map((intro_par, index) =>
									<p key={index} className="mb-3">{intro_par}</p>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>

			<div id="skills" className="pt-12 md:pt-16 pb-16 md:pb-24">
				<h2 className="text-[30px] md:text-[46px] lg:text-[50px] mb-8 md:mb-10 text-center border-b-2 md:border-b-4 border-transparent hover:border-red transition-all duration-500">
					My Technical Skills
				</h2>
			
				<div className="grid md:grid-cols-3 gap-6 xl:gap-8">
					<div className="bg-white border border-gray-100 shadow-sm hover:shadow-lg rounded-lg px-6 pt-9 lg:pt-12 pb-10 lg:pb-14 transition-shadow duration-500">
						<div className='flex flex-col justify-center'>
							<h3 className="text-lg text-center font-bold mb-5 lg:mb-6">Languages</h3>
							<div className='flex justify-center'>
								<ul className="grid gap-4 lg:gap-5 text-left">
									{about.skillsLng.map((skill, index) => 
										<li key={index}>
											<span className='border-2 border-black rounded-full w-4 h-4 text-[12px] md:text-[15px] text-red px-1 mr-4'>✔</span>{skill}
										</li>
									)}
								</ul>
							</div>
						</div>
					</div>

					<div className="bg-white border border-gray-100 shadow-sm hover:shadow-lg rounded-lg px-6 pt-9 lg:pt-12 pb-10 lg:pb-14 transition-shadow duration-300">
						<div className='flex flex-col justify-center'>
							<h3 className="text-lg text-center font-bold mb-5 lg:mb-6">Frameworks / Libraries</h3>
							<div className='flex justify-center'>
								<ul className="grid gap-4 lg:gap-5 text-left">
									{about.skillsFramework.map((skill, index) => 
										<li key={index}>
											<span className='border-2 border-black rounded-full w-4 h-4 text-[12px] md:text-[15px] text-red px-1 mr-4'>✔</span>{skill}
										</li>
									)}
								</ul>
							</div>
						</div>
					</div>

					<div className="bg-white border border-gray-100 shadow-sm hover:shadow-lg rounded-lg px-6 pt-9 lg:pt-12 pb-10 lg:pb-14 transition-shadow duration-300">
						<div className='flex flex-col justify-center'>
							<h3 className="text-lg text-center font-bold mb-5 lg:mb-6">Other</h3>
							<div className='flex justify-center'>
								<ul className="grid gap-4 lg:gap-5 text-left">
									{about.skillsOther.map((skill, index) => 
										<li key={index}>
											<span className='border-2 border-black rounded-full w-4 h-4 text-[12px] md:text-[15px] text-red px-1 mr-4'>✔</span>{skill}
										</li>
									)}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>

		</section>
	)
}

export default About