import React from 'react'

const ProjectListing = ({ project }) => {
	return (
		<div className="project-card relative bg-white">
			<a href={`/${project.id}`} className=''>
				<div>
					<img 
						src={project.image_mini} 
						alt={project.title}
						className='block w-full h-auto'
					/>

					<div className='overlay'>
						<div className='text'>
							<div className='text-[26px] lg:text-[28px] mb-2 md:mb-1 lg:mb-2'>{project.title}</div>
							<div className='text-[18px] lg:text-[20px]'>{project.subtitle}</div>
						</div>
					</div>
				</div>
			</a>
		</div>	
	)
}

export default ProjectListing