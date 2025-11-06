import { useMutation, useQuery, type QueryKey, type UseQueryOptions, type UseMutationOptions } from "@tanstack/react-query";

type QueryFn<D> = () => Promise<D>;

export function UseRequestProcessor() {
  function query<D>(
    key: QueryKey,
    fn: QueryFn<D>,
    options?: Omit<UseQueryOptions<D, Error>, "queryKey" | "queryFn">
  ) {
    return useQuery<D, Error>({
      queryKey: key,
      queryFn: fn,
      staleTime: 30_000,
      retry: 1,
      ...options,
    });
  }

  function mutation<V, D>(
    fn: (vars: V) => Promise<D>,
    options?: Omit<UseMutationOptions<D, Error, V>, "mutationFn">
  ) {
    return useMutation<D, Error, V>({
      mutationFn: fn,
      ...options,
    });
  }

  return { query, mutation };
}
