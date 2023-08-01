import useSWR from "swr";

function useApi(key: string | null, fetcher: any, parameters: string[] = []) {
    const { data, isLoading, error } = useSWR(key, async () => await fetcher(...parameters));

    return {
        data,
        isLoading: isLoading,
        isError: !!error,
        error,
    };
}

export default useApi;
