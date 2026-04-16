import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieReviews = ({ queryKey }) => {
  const id = queryKey[1];
  return api.get(`/movie/${id}/reviews`); 
};

export const useMovieReviewsQuery = (id) => {
  return useQuery({
    queryKey: ["movie-reviews", id],
    queryFn: fetchMovieReviews,
    select: (result) => result.data.results,
  });
};