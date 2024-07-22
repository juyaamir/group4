import axios from "axios";
import { useState, useEffect } from "react"

const UseFetch = (url) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchData = async() => {
            setLoading(true);
            try {
                const result = await axios.get(url);
                setData(result.data);
            } catch (error) {
                setError(error)
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [url])
  return (
    {data, loading, error}
  )
}

export default UseFetch