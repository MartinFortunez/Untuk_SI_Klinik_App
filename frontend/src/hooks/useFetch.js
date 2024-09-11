import { useQuery } from "react-query";
import { api } from "../api/api";

const useFetch = (url, queryKey) => {
  const { data, isSuccess } = useQuery(queryKey, () => api("get", url, ""), {
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    staleTime: Infinity,
  });

  return { data, isSuccess };
};

export default useFetch;
