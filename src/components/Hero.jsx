const Hero = () => {
	const title = "Front End Web Developer";
	const text_1 = "Hello, I'm Tanya.";
	const text_2 = "I create web experiences.";
	const text_3 = "Here’s a\u00a0look at\u00a0some of\u00a0my\u00a0projects."

	return (
		<section id="hero" className='container'>
			<div className="pt-[70px] md:pt-[113px] mb-[44px] md:mb-[66px]"></div>
			<div className="">
				<h1 className="max-w-[270px] sm:max-w-[100%] text-[17px] md:text-[22px] uppercase tracking-[3px] mb-7 md:mb-10"> 
					{title}
				</h1>
				<div className="max-w-[88%] sm:max-w-[80%] md:max-w-[690px] mb-12 md:mb-16">
					<p className="text-[26px] xs:text-[28px] sm:text-[30px] md:text-[46px] lg:text-[52px] max-w-[400px] md:max-w-full">
						<span>{text_1}</span>
						<br />
						<span>{text_2}</span>
						<br />
						<span>{text_3}</span>
					</p>
				</div>
			</div>
		</section>
	)
}

export default Hero