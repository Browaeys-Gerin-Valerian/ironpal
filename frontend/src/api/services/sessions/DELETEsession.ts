import axios from 'axios';
import { SESSION } from '../../routes/routes.api';

export const DELETEsession = async (id: number) => {
    try {
        const response = await axios.delete(`${SESSION.DELETE}/${id}`);
        return response;
    } catch (error: any) {
        console.error('Erreur lors de la suppression de la session :', error);
        throw error.response?.data || error.message;
    }
};