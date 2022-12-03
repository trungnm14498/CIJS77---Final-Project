import { useState, useEffect } from 'react';
import axios from 'axios';

const getData = (api) => {
    return axios.get(api);
};

export function useGetOrderHistories(enabled = true, api) {
    const [ordersByYear, setOrdersByYear] = useState([]);
    const [count, setCount] = useState(0);
    const [filters, setFilters] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        getData(api)
            .then(function (response) {
                setCount(response.data.length);
                setOrdersByYear(response.data);
                response.data.reverse().map(order => {
                    setFilters((prev) => [...prev, order.time.substring(order.time.length - 4, order.time.length)])
                })
            }).catch((err) => {
                setError(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [enabled]);

    return { ordersByYear, count, isLoading, error, filters, setIsLoading };
}