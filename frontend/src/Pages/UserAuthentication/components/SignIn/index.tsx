import { useNavigate } from "react-router-dom";
import AuthenticationForm from "../AuthenticationForm";
import { usePostLogin } from "../../../../api/queries/authentication/usePostLogin";
import { useAuthenticationStore } from "../../../../stores/useAuthenticationStore";

export default function SignIn({}) {
    const nav = useNavigate();
    const { email, password } = useAuthenticationStore((state) => state);
    const { mutate: loginMutate, isPending: isLoginPending } = usePostLogin();

    function handleUserSignIn(e) {
        e.preventDefault();
        loginMutate({ email, password }, {
            onSuccess: (loginData) => {
                useAuthenticationStore.getState().setToken(loginData.access_token);
                nav("/dashboard");
            }
        });
    }
    return (
        <AuthenticationForm
            title="Sign In to SmartMacros"
            description="Enter your email below to login to your account"
            submitMethod={handleUserSignIn}
            submitLabel={"Login"}
            switchButtonMethod={(e) => {
                e.preventDefault();
                nav("/signup");
            }}
            switchButtonLabel={"Sign Up"}
        />
    );
}