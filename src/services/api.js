import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/projects/';

export const getProjects = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error('Error fetching projects:', error);
        return [];
    }
}

export const getProjectCount = async () => {
    try {
        const response = await axios.get(`${API_URL}count/`);
        return response.data.total; // Assuming the API returns { "total": 10 }
    } catch (error) {
        console.error('Error fetching project count:', error);
        return 0; // Return 0 as a fallback if the API fails
    }
};