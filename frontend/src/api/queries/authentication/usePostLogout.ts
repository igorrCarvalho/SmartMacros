import { useMutation, useQueryClient, type UseMutationOptions } from "@tanstack/react-query";
import { useAuthenticationStore } from "../../../stores/useAuthenticationStore";
import { api } from "../../axios";

export type LogoutVars = void;
export type LogoutResult = { ok: boolean } | void;

export function useLogout(
  options?: Omit<UseMutationOptions<LogoutResult, Error, LogoutVars>, "mutationFn">
) {
  const qc = useQueryClient();
  const logoutStore = useAuthenticationStore((s) => s.logout);

  return useMutation<LogoutResult, Error, LogoutVars>({
    mutationFn: async () => {
      const { data } = await api.post<LogoutResult>("/auth/logout");
      return data;
    },
    onSuccess: async (data, _vars, _ctx) => {
      logoutStore();
      await qc.resetQueries();
    },
    onError: (err, _vars, _ctx) => {
      logoutStore();
    },
    ...options,
  });
}
