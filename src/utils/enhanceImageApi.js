import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;
const MAXIMUM_RETRIES = 20;

export const enhancedImageAPI = async (file) => {
    try {
        const taskId = await uploadImage(file);
      

        const enhancedImageData = await PollForEnhancedImage(taskId);
       
        return enhancedImageData;
    } catch (error) {
        console.log("Error enhancing image:", error.message);
    }
};

const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image_file", file,);
    formData.append("scale_factor", 1);    
    const { data } = await axios.post(
        `${BASE_URL}/api/tasks/visual/scale`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
                "X-API-KEY": API_KEY,
            },
        }
    );

    if (!data?.data?.task_id) {
        throw new Error("Failed to upload image! Task ID not found.");
    }
    return data.data.task_id;
};

const PollForEnhancedImage = async (taskId, retries = 0) => {
    const result = await fetchEnhancedImage(taskId);

    if (result.state === 4) {
       

        if (retries >= MAXIMUM_RETRIES) {
            throw new Error("Max retries reached. Please try again later.");
        }

        // wait for 2 second
        await new Promise((resolve) => setTimeout(resolve, 2000));

        return PollForEnhancedImage(taskId, retries + 1);
    }

  
    return result;
};

const fetchEnhancedImage = async (taskId) => {
    const { data } = await axios.get(
        `${BASE_URL}/api/tasks/visual/scale/${taskId}`,
        {
            headers: {
                "X-API-KEY": API_KEY,
            },
        }
    );
    if (!data?.data) {
        throw new Error("Failed to fetch enhanced image! Image not found.");
    }

    return data.data;
};

