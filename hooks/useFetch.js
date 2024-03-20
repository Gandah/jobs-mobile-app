import { useState, useEffect, useMemo } from "react";
import axios from 'axios';
// import { RAPID_API_KEY } from '@env';
// const rapidApiKey = RAPID_API_KEY;


const useFetch = (endpoint, query) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = useMemo(() => ({
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        headers: {
          'X-RapidAPI-Key': process.env.RAPID_API_KEY,
          'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        },
        params: { ...query },
      }), [endpoint, query]);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await axios.request(options);
            setData(response.data.data);
            setIsLoading(false);
        } catch (error) {
            setError('An error occurred. Please try again later');
            console.error(error);
          } finally {
            setIsLoading(false);
          }
    }

    useEffect(() => {
      /*If the component using this hook unmounts before the API call is completed, 
      it might result in setting the state on an unmounted component, which can lead to memory leaks.
      Use axios cancellation feature with useEffect cleanup to cancel the API request 
      if the component unmounts before the request is completed.*/ 
        const source = axios.CancelToken.source();
        options.cancelToken = source.token;
        fetchData();
    
        return () => {
          source.cancel("Component unmounted, request canceled.");
        };
      }, [endpoint, query]); // Use stable dependencies
    
      const refetch = fetchData; 


    return { data, isLoading, error, refetch }
}

export default useFetch;