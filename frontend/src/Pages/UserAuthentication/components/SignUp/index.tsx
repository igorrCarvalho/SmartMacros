import { useNavigate } from "react-router-dom";
import AuthenticationForm from "../AuthenticationForm";

export default function SignUp({}) {
    const nav = useNavigate();
    return (
        <AuthenticationForm
            title="Register to SmartMacros"
            description="Enter your email below to create your account"
            submitMethod={() => {}}
            submitLabel={"Register"}
            switchButtonMethod={() => nav("/signin")}
            switchButtonLabel={"Sign In"}
        />
    );
}