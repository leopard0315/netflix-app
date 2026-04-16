import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchRelatedMovies = ({ queryKey }) => {
  const id = queryKey[1];
  return api.get(`/movie/${id}/recommendations`);
};

export const useRelatedMoviesQuery = (id) => {
  return useQuery({
    queryKey: ["related-movies", id],
    queryFn: fetchRelatedMovies,
    select: (result) => result.data,
  });
};