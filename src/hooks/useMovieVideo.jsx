import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchMovieVideo = ({ queryKey }) => {
  const id = queryKey[1];
  return api.get(`/movie/${id}/videos`);
};

export const useMovieVideoQuery = (id) => {
  return useQuery({
    queryKey: ["movie-video", id],
    queryFn: fetchMovieVideo,
    select: (result) => result.data.results.find(v => v.type === "Trailer" && v.site === "YouTube"),
  });
};