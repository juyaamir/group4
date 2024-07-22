import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const GlobalFunction = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(url);
        setData(data);
      } catch (err) {
        setError(toast.error(toast.error(err.response.data.message)));
      }
      setLoading(false);
    };

    fetchData();
  }, [url]);

  return { data, setData, loading, error };
};

export default GlobalFunction;
