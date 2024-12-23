import axios from "axios";
import { Session } from "../../interfaces/entities/Session";

export const getSession = async (userId: number, sessionId: string) => {
    try {
        const response = await axios.get(`users/${userId}/sessions/${sessionId}`);
        return response.data;
    } catch (error: any) {
        console.error("Error fetching session:", error);
        throw error.response?.data || error.message;
    }
};

export const getSessions = async (userId: number, month: number, year: number) => {
    try {
        const response = await axios.get(`/users/${userId}/sessions?month=${month}&year=${year}`);
        return response.data;
    } catch (error: any) {
        console.error("Error fetching session:", error);
        throw error.response?.data || error.message;
    }
};

interface CreateSession {
    title: string;
    session_date: string;
}

export const createSession = async (userId: number, payload: CreateSession) => {
    try {
        const response = await axios.post(`/users/${userId}/sessions`, payload);
        return response.data;
    } catch (error: any) {
        console.error("Error creating session:", error);
        throw error.response?.data || error.message;
    }
};

export const updateSession = async (userId: number, sessionId: number, updatedData: Partial<Session>) => {
    try {
        const response = await axios.put(`/users/${userId}/sessions/${sessionId}`, updatedData);
        return response.data;
    } catch (error: any) {
        console.error("Error modifying session:", error.response?.data || error.message);
        throw error.response?.data || error.message;
    }
};


export const deleteSession = async (userId: number, sessionId: number) => {
    try {
        const response = await axios.delete(`/users/${userId}/session/${sessionId}`);
        return response;
    } catch (error: any) {
        console.error('Erreur lors de la suppression de la session :', error);
        throw error.response?.data || error.message;
    }
};