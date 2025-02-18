import { useCallback, useEffect, useState } from "react";
import { api } from "./api";

const useApi = <T>(
  path: string | null
): { data: T | null; isLoading: boolean; error: Error | null; refetch: () => void } => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const fetchData = useCallback(async () => {
    if (!path) {
      setData(null);
      setIsLoading(false);
      setError(null);
      return;
    }

    try {
      setIsLoading(true);
      const response: T = await api(path);
      setData(response);
    } catch (error) {
      setError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [path]);

  useEffect(() => {
    if (path) {
      fetchData();
    }
  }, [path, fetchData]);

  const refetch = () => {
    fetchData();
  };

  return { data, isLoading, error, refetch };
};

export default useApi;
