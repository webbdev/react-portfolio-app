import React, { useEffect, useState } from 'react';
import { getProjects, getProjectCount } from '../services/api';
import ProjectListing from './ProjectListing';
import Spinner from './Spinner';

const ProjectListings = () => {
    const [projects, setProjects] = useState([]);
    const [visibleProjects, setVisibleProjects] = useState(4); // State to track visible projects
    const [totalProjects, setTotalProjects] = useState(0); // State for project count
    const [loading, setLoading] = useState(true);
	const [isFadingIn, setIsFadingIn] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [projectData, projectCount] = await Promise.all([
                    getProjects(),
                    getProjectCount(),
                ]);
                setProjects(projectData);
                setTotalProjects(projectCount); // Set the total project count
            } catch (error) {
                console.log('Error fetching data', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Handler to show more projects
    const handleLoadMore = () => {
		setIsFadingIn(false);
		setTimeout(() => {
            setVisibleProjects((prevVisible) => prevVisible + 4); // Load 4 more projects
            setIsFadingIn(true); // Trigger animation
        }, 100); // Small delay to allow new projects to render
    };

    return (
        <>
            <section id="projects" className="container">
                <div className="mb-12 md:mb-20">
                    {loading ? (
                        <Spinner />
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
                                
								{projects.slice(0, visibleProjects).map((project, index) => (
                                    <div
                                        key={project.id}
                                        className={`${
                                            isFadingIn && index >= visibleProjects - 4
                                                ? 'animate-fadeIn'
                                                : ' '
                                        }`}
                                    >
                                        <ProjectListing project={project} />
                                    </div>
                                ))}
                            </div>
                            {visibleProjects < totalProjects && (
                                <div className="text-center mt-10 md:mt-12 lg:mt-16">
                                    <button
                                        onClick={handleLoadMore}
                                        className="px-4 py-2 underline underline-offset-4 hover:underline-offset-8"
                                    >
                                        Load More
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </>
    );
};

export default ProjectListings;
