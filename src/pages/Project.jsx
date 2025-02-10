import React, { useCallback, useEffect, useState } from 'react'
import { useParams, useLoaderData, Link, useOutletContext } from 'react-router-dom'
import useEmblaCarousel from 'embla-carousel-react'
import parse from 'html-react-parser'
import { FaArrowRight } from 'react-icons/fa'
import { TfiArrowCircleLeft, TfiArrowCircleRight } from "react-icons/tfi"

const Project = () => {
	const { id } = useParams();
    const project = useLoaderData();
    const [prevId, setPrevId] = useState(null);
    const [nextId, setNextId] = useState(null);
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [slidesCount, setSlidesCount] = useState(0);
    const { isFadingOut } = useOutletContext() || {};
    const [imageLoaded, setImageLoaded] = useState(
        Array(project.images.length).fill(false)
    );

    const scrollPrev = useCallback(() => {
        if (emblaApi) emblaApi.scrollPrev();
    }, [emblaApi]);

    const scrollNext = useCallback(() => {
        if (emblaApi) emblaApi.scrollNext();
    }, [emblaApi]);

    const scrollTo = useCallback((index) => {
        if (emblaApi) emblaApi.scrollTo(index);
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
    
        const updateSlides = () => {
            setSlidesCount(emblaApi.slideNodes().length);
            setSelectedIndex(emblaApi.selectedScrollSnap());
        };
    
        emblaApi.on('select', updateSlides);
        emblaApi.on('reInit', updateSlides); // Ensures the correct slide count when changing projects
    
        updateSlides(); // Ensure correct initial count
    
        return () => {
            emblaApi.off('select', updateSlides);
            emblaApi.off('reInit', updateSlides);
        };
    }, [emblaApi, project]);    

    useEffect(() => {
        if (emblaApi) {
            // Update the slides count when the project changes
            setSlidesCount(emblaApi.slideNodes().length);
    
            // Reset the carousel to the first slide
            emblaApi.scrollTo(0);
            setSelectedIndex(0); // Reset the selected index
        }
    }, [emblaApi, project, id]); // Run this effect when the project or id changes

    // Handle image load event
    const handleImageLoad = (index) => {
        setImageLoaded((prev) => {
            const updated = [...prev];
            updated[index] = true;
            return updated;
        });
    };

    useEffect(() => {
        const fetchProjectIds = async () => {
            try {
                const response = await fetch('/data.json');
                const data = await response.json();
    
                // Assuming the data contains a projects array
                const projectIds = data.projects.map(project => project.id);
    
                const currentIndex = projectIds.indexOf(parseInt(id));
                if (currentIndex !== -1) {
                    // Find previous and next IDs
                    const prevIndex = (currentIndex - 1 + projectIds.length) % projectIds.length;
                    const nextIndex = (currentIndex + 1) % projectIds.length;
    
                    setPrevId(projectIds[prevIndex]);
                    setNextId(projectIds[nextIndex]);
                }
            } catch (error) {
                console.error('Failed to fetch project IDs', error);
            }
        };
    
        fetchProjectIds();
    }, [id]);

	return (
		<div
            className={`container pb-12 md:pb-20 ${
				isFadingOut ? 'animate-fadeOut' : 'animate-fadeIn'
			}`}
        >
			<div className="pt-[70px] md:pt-[113px] mb-[34px] md:mb-[50px]"></div>

			{/* Spinner while images are loading */}
			<div className='mb-6 md:mb-10'>
          
                <div className="flex mx-auto justify-center relative">
                    {/* Arrows */}
                    <div className="flex justify-center align-middle mx-auto md:px-5 absolute md:relative z-[2] left-2 top-[41%]">
                        <button className="embla__prev" onClick={scrollPrev}>
                            <TfiArrowCircleLeft className="text-[26px] md:text-[32px]" />
                        </button>
                    </div>

                    {/* Embla Carousel */}
                    <div className="md:max-w-[920px] w-full text-center mx-auto">
                        <div className="embla">
                            <div className="embla__viewport" ref={emblaRef}>
                                <div className="embla__container">
                                    {project.images.map((image, index) => (
                                        <div className="embla__slide" key={image.id}>
											{/* Responsive placeholder */}
                                            <div
                                                className={`relative w-full ${
                                                    imageLoaded[index] ? 'hidden' : 'block'
                                                }`}
                                                style={{ paddingBottom: '53.26%' }} // Aspect ratio 490/920 = 53.26%
                                            >
                                                <div className="absolute top-0 left-0 w-full h-full bg-gray-300 flex justify-center items-center">
                                                    <span className="text-gray-500">Loading...</span>
                                                </div>
                                            </div>
                                            {/* Image */}
                                            <img
                                                src={image.image} // Use the actual image URL
                                                alt={project.title}
                                                className={`w-full ${imageLoaded[index] ? 'block' : 'hidden'}`}
                                                onLoad={() => handleImageLoad(index)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Arrows */}
                    <div className="flex justify-center align-middle mx-auto md:px-5 absolute md:relative z-[2] right-2 top-[41%]">
                        <button className="embla__next" onClick={scrollNext}>
                            <TfiArrowCircleRight className="text-[26px] md:text-[32px]" />
                        </button>
                    </div>
                </div>

				{/* Dots */}
				<div className="embla__dots flex justify-center mt-6">
					{Array.from({ length: slidesCount }).map((_, index) => (
						<button
							key={index}
							className={`embla__dot w-2 h-2 mx-1.5 rounded-full ${
								index === selectedIndex ? 'bg-gray-950' : 'bg-gray-300'
							}`}
							onClick={() => scrollTo(index)}
						/>
					))}
                </div>
			
			</div>

			<div className='project-info'>
				<div className='flex justify-center md:px-10'>
					<div className='md:max-w-[92%] lg:max-w-[90%] mx-auto'>
                        <div className="mb-6 border-t border-b border-gray-300 text-[16px] md:text-[18px] pr-4 md:px-4 lg:px-6">
							
                            <h2 className="uppercase text-[28px] md:text-[36px] tracking-[1.5px] md:tracking-[2px] mt-8 md:mt-12 mb-2 md:mb-4 font-medium">
                                {project.title}
                            </h2>
                            <h4 className="text-[20px] md:text-[22px] mb-6 md:mb-8 text-gray-600">
                                {project.subtitle}
                            </h4>
                            <div className="project-description leading-[1.8] md:leading-[2] text-[16px] md:text-[18px] mb-8 text-gray-700">
                                {parse(project.description)}
                            </div>

                            <div className='mb-6'>
                                <p className="uppercase font-medium mb-3 text-[16px] md:text-[18px] text-gray-800">
                                    Key Features:
                                </p>
                                <ul className="list-disc pl-6 text-[15px] md:text-[16px] leading-[1.8] md:leading-[2] text-gray-700">
                                    {project.key_features.map((feature, index) => (
                                        <li key={index} className="mb-2">
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>

							<div className='mb-6'>
                                <p className="uppercase font-medium mb-3 text-[16px] md:text-[18px] text-gray-800">
                                    Tech Stack:
                                </p>
                                <p className="text-[15px] md:text-[16px] leading-[1.8] text-gray-700">
                                    {project.tech_stack}
                                </p>
							</div>
						</div>

                        <Link
                            to={project.url}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="uppercase font-medium inline-flex items-center md:px-4 lg:px-6 text-[14px] md:text-[16px] text-gray-800 hover:text-red transition-all duration-500 group"
                        >
                            [ <span className="mr-2">View project</span>{' '}
                            <FaArrowRight className="text-[12px] md:text-[14px] mt-[-2px] transition-transform duration-500 group-hover:translate-x-1 group-hover:scale-110" /> ]
                        </Link>
					</div>
				</div>
			</div>

			<div className='flex justify-center mt-12 md:mt-16 mx-auto text-center text-[15px] md:text-[16px]'>
                {prevId && (
                    <Link
                        to={`/${prevId}`}
                        className="text-black bg-transparent hover:underline hover:underline-offset-2 border border-gray-300 px-9 py-2 transition-all mr-3"
                    >
                        Prev
                    </Link>
                )}
                {nextId && (
                    <Link
                        to={`/${nextId}`}
                        className="text-black bg-transparent hover:underline hover:underline-offset-2 border border-gray-300 px-9 py-2 transition-all ml-3"
                    >
                        Next
                    </Link>
                )}
			</div>
		
		</div>
	)
}

const projectLoader = async ({ params }) => {
  // Fetch the data from the JSON file
  const response = await fetch('/data.json');
  const data = await response.json();
  
// console.log("Fetched data:", data);

  // Check if the data contains the "projects" array
  if (!data.projects || !Array.isArray(data.projects)) {
    console.error("Expected an array of projects, but received:", data);
    return {}; // Return empty if it's not an array
  }

  // Find the project with the matching id
  const projectData = data.projects.find(project => project.id === parseInt(params.id));
  
  // Handle case where the project is not found
  if (!projectData) {
    console.error("Project with id", params.id, "not found");
    return {}; // Return empty if project not found
  }

  return projectData; // Return the found project data
};

export {Project as default, projectLoader};