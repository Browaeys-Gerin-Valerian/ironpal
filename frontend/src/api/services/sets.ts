
import axios from 'axios';
import { Set } from '../../interfaces/entities/Set';

export const updateSet = async (
    setId: number,
    payload: Partial<Set>
) => {
    try {
        const response = await axios.patch(`/sets/${setId}`, payload);
        return response;
    } catch (error: any) {
        console.error(
            'Error modifying session:',
            error.response?.data || error.message
        );
        throw error.response?.data || error.message;
    }
};


