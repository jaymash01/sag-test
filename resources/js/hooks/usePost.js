import { useState } from "react";

const usePost = (uri, payload = null) => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePost = () => {
    setError(null);
    setLoading(true);

    window.axios.post(uri, payload)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(error);
      });
  };

  return { data, loading, error, handlePost };
};

export default usePost;
