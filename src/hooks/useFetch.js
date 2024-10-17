import axios from "axios";
import { useEffect, useState } from "react";

export const useFetch = (endpoint, page, characters, films, pilots) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  axios.defaults.baseURL = "https://sw-api.starnavi.io/";

  useEffect(() => {
    const params = {
      page,
      characters,
      films,
      pilots,
    };
    async function fetchData() {
      try {
        const { data } = await axios.get(endpoint, { params });
        setData(data);
        console.log(
          "endpoint:",
          endpoint,
          "page:",
          page,
          "character:",
          characters,
          data
        );
      } catch (error) {
        setError(error);
      }
    }
    fetchData();
  }, [characters, endpoint, films, page, pilots]);
  return { data, error };
};
