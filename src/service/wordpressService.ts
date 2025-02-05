import axios from "axios";
import { Post } from "../types/Post";

const API_URL = "http://localhost/wp/wp-json/wp/v2";

export const getPosts = async (): Promise<Post[]> => {
  try {
    const response = await axios.get<Post[]>(`${API_URL}/posts`);
    return response.data;
  } catch (error) {
    console.error("Error obteniendo los posts:", error);
    return [];
  }
};
