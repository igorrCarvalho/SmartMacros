import type { SignUpBody, SignUpResponse, useMutationFunctionType } from "../../../types";
import { api } from "../../axios";
import { UseRequestProcessor } from "../../services/request-processor";

export const usePostUser: useMutationFunctionType<SignUpBody, SignUpResponse> = (options) => {
    const { mutation } = UseRequestProcessor();

    async function signupFn(body: SignUpBody): Promise<SignUpResponse> {
        const { data } = await api.post<SignUpResponse>("auth/signup", body);
        return data;
    }

    return mutation<SignUpBody, SignUpResponse>(signupFn, { ...options });
}