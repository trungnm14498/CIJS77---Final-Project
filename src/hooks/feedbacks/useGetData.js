import { useState, useEffect } from 'react';
import axios from 'axios';

const getData = (api) => {
    return axios.get(api);
};

export function useGetData(enabled = true, api) {
    const [data, setData] = useState([]);
    const [randomData, setRandomData] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        getData(api)
            .then((response) => {
                setData(response.data);
                setRandomData(response.data.sort(() => 0.5 - Math.random()).slice(0, 3));
            })
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [enabled]);

    return { data, randomData, isLoading, error, setData };
}
