import axios from 'axios';


export const DELETEsession = async (userId: number, sessionId: number) => {
    try {
        const response = await axios.delete(`/users/${userId}/session/${sessionId}`);
        return response;
    } catch (error: any) {
        console.error('Erreur lors de la suppression de la session :', error);
        throw error.response?.data || error.message;
    }
};