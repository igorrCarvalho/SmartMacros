import { useNavigate } from "react-router-dom";
import AuthenticationForm from "../AuthenticationForm";

export default function SignIn({}) {
    const nav = useNavigate();
    return (
        <AuthenticationForm
            title="Sign In to SmartMacros"
            description="Enter your email below to login to your account"
            submitMethod={() => {}}
            submitLabel={"Login"}
            switchButtonMethod={() => nav("/signup")}
            switchButtonLabel={"Sign Up"}
        />
    );
}