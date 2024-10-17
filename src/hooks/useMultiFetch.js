import axios from "axios";
import { useEffect, useState } from "react";

export const useMultiFetch = (films__in) => {
  const endpoint = "starships/";
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  axios.defaults.baseURL = "https://sw-api.starnavi.io/";

  useEffect(() => {
    async function fetchData() {
      try {
        const responce = await Promise.all(
          films__in.map((film__in) => axios.get(endpoint, { film__in }))
        );
        setData(responce);
        console.log("endpoint:", endpoint, data);
      } catch (error) {
        setError(error);
      }
    }
    fetchData();
  }, [data, endpoint, films__in]);
  return { data, error };
};
