import { useState } from "react";

const useHttpRequest = (requestConfigObj, applyDataFunc) => {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendHttpRequest = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfigObj.url, {
        method: requestConfigObj.method ? requestConfigObj.method : "GET" ,
        headers: requestConfigObj.headers ? requestConfigObj.headers: {},
        body: requestConfigObj.body ? JSON.stringify(requestConfigObj.body) : null
      });

      if (!response.ok) {
        throw new Error('Request failed!');
      }

      const data = await response.json();

      applyDataFunc(data)
    } catch (err) {
      setError(err.message || 'Something went wrong!');
    }
    setIsLoading(false);
  };  

  return {
    isLoading,
    error,
    sendHttpRequest
  }
}

export default useHttpRequest