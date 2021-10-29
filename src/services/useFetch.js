import { useState, useEffect } from 'react';
import axios from 'axios';

export function useFetch(params) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const response = await axios(params);
        setData(response.data);
      } catch (e) {
        setError(e);
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [params]);

  return { data, error, loading };
}
