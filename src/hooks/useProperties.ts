import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_URL = "http://localhost:3000";

export const fetchProperties = async () => {
  const response = await axios.get(`${API_URL}/properties`);
  return response.data;
};

export const useProperties = () =>
  useQuery({
    queryKey: ["properties"],
    queryFn: fetchProperties,
  });
