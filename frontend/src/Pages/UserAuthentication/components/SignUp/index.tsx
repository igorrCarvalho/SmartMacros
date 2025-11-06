import { useNavigate } from "react-router-dom";
import AuthenticationForm from "../AuthenticationForm";
import { usePostUser } from "../../../../api/queries/authentication/usePostUser";
import { useAuthenticationStore } from "../../../../stores/useAuthenticationStore";
import { usePostLogin } from "../../../../api/queries/authentication/usePostLogin";

export default function SignUp({}) {
    const nav = useNavigate();
    const { email, password } = useAuthenticationStore((state) => state);
    const { mutate, isPending } = usePostUser();
    const { mutate: loginMutate, isPending: isLoginPending } = usePostLogin();

    function handleUserSubmit(e) {
        e.preventDefault();
        mutate({ email, password }, {
            onSuccess: () => {
                loginMutate({ email, password }, {
                    onSuccess: (loginData) => {
                        useAuthenticationStore.getState().setToken(loginData.access_token);
                        nav("/dashboard");
                    }
                });
            },
        });
    }
    return (
        <AuthenticationForm
            title="Register to SmartMacros"
            description="Enter your email below to create your account"
            submitMethod={handleUserSubmit}
            submitLabel={"Register"}
            switchButtonMethod={(e) => {
                e.preventDefault();
                nav("/signin");
            }}
            switchButtonLabel={"Sign In"}
        />
    );
}