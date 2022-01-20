import { useState } from "react";

function useApi(apiFunc) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [networkError, setNetworkError] = useState(false);

  const request = async (...args) => {
    setLoading(true);
    const response = await apiFunc(...args);
    if (!response.ok) {
      setLoading(false);

      if (response.problem === "NETWORK_ERROR") return setNetworkError(true);
      else return setError(true);
    }
    if (networkError) setNetworkError(false);
    if (error) setError(false);

    setData(response.data);
    setLoading(false);
  };

  return { data, error, networkError, loading, request };
}

export default useApi;