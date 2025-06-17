import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "http://localhost:3000";

export const fetchProfile = async () => {
  const response = await axios.get(`${API_URL}/profile`);
  return response.data;
};

export const useProfile = () =>
  useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });
