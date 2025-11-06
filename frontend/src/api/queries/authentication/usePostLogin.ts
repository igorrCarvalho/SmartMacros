import type { SignInBody, SignInResponse, SignUpBody, SignUpResponse, useMutationFunctionType } from "../../../types";
import { api } from "../../axios";
import { UseRequestProcessor } from "../../services/request-processor";

export const usePostLogin: useMutationFunctionType<SignInBody, SignInResponse> = (options) => {
    const { mutation } = UseRequestProcessor();

    async function loginFn(body: SignInBody): Promise<SignInResponse> {
        const { data } = await api.post<SignInResponse>("auth/login", body);
        return data;
    }

    return mutation<SignInBody, SignInResponse>(loginFn, { ...options });
}
