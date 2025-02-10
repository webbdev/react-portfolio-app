import axios from 'axios';

// Use environment variable with a fallback for local development
//const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000/api/projects/';
// const API_URL = 'http://127.0.0.1:8000/api/projects/';

const DATA_URL = '/data.json';

export const getProjects = async () => {
    try {
        const response = await axios.get(DATA_URL);
        return response.data.projects;
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
};

export const getProjectCount = async () => {
    try {
        const response = await axios.get(DATA_URL);
        return response.data.projects.length; // Count number of projects    
    } catch (error) {
        console.error('Error fetching project count:', error);
        return 0;
    }
};

// console.log("Data URL:", DATA_URL);
