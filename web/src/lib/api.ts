import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;
console.log("VITE_API_URL:", baseURL)

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});