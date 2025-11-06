import { useMutation, type UseMutationOptions } from "@tanstack/react-query";
import { useAuthenticationStore } from "../../../stores/useAuthenticationStore";
import { api } from "../../axios";

export type RefreshResponse = { access_token: string };

export function useRefreshToken(
  options?: Omit<UseMutationOptions<RefreshResponse, Error, void>, "mutationFn">
) {
  const setToken = useAuthenticationStore((s) => s.setToken);

  return useMutation<RefreshResponse, Error, void>({
    mutationFn: async () => {
      const { data } = await api.post<RefreshResponse>("/auth/refresh");
      return data;
    },
    onSuccess: (data) => {
      setToken(data.access_token);
    },
    ...options,
  });
}