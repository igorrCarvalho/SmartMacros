import type {
  QueryKey,
  UseQueryOptions,
  UseQueryResult,
  UseMutationOptions,
  UseMutationResult,
} from "@tanstack/react-query";

export type ShadTooltipProps = {
  content: string;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
}

export type UserAuthenticationProps = {
  type: "signIn" | "signUp";
}

export type AuthenticationStore = {
  isAuth: boolean;
  email: string;
  password: string;
  setPassword: (password: string) => void;
  setEmail: (email: string) => void;
}

export type AuthenticationFormProps = {
  submitMethod: () => void;
  switchButtonMethod: () => void;
  title: string;
  description: string;
  submitLabel: string;
  switchButtonLabel: string;
}

export type SignUpBody = {
  email: string;
  password: string;
}

export type SignUpResponse = {
  id: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export type useQueryFunctionType<Params, Data> = (
  params: Params,
  options?: Omit<UseQueryOptions<Data, Error>, "queryKey" | "queryFn"> & {
    queryKey?: QueryKey;
  }
) => UseQueryResult<Data, Error>;

export type useMutationFunctionType<Vars, Data> = (
  options?: Omit<UseMutationOptions<Data, Error, Vars>, "mutationFn">
) => UseMutationResult<Data, Error, Vars>;
