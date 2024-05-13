import { useEffect, useState } from "react";
import createAxiosInstance from "../createAxiosInstance";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type TApiResponse = {
    data: any,
    error: any,
    loading: boolean
}

const useFetch = (url: string): TApiResponse => {

    const [data, setData] = useState<any>();
    const [error, setError] = useState<any>();
    const [loading, setLoading] = useState<boolean>(false);

    /* eslint-enable @typescript-eslint/no-explicit-any */
    useEffect(() => {

        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await createAxiosInstance.get(url);
                setData(response.data.results);
                //console.log(response.data.results);
                /* eslint-disable @typescript-eslint/no-explicit-any */
            } catch (error: any) {
                setError(error);
                console.error('Request failed:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

    }, [url])

    return { data, error, loading };
}

export default useFetch;