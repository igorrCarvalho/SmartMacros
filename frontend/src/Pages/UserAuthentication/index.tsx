import { useMemo } from "react";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import type { UserAuthenticationProps } from "../../types";

export default function UserAuthentication({ type }: UserAuthenticationProps) {

    const authPagesOptions = {
        signIn: SignIn,
        signUp: SignUp,
    };

    const AuthPageComponent = useMemo(() => authPagesOptions[type], [type]);

    return (
    <div className="w-full h-full flex items-center justify-between px-20">
        <div>

        </div>
        <div className="p-8 rounded-lg border shadow-md w-fit h-[80%]">
            <div className="w-full flex items-center justify-center">
                <span className="text-primary text-2xl">SmartMacros</span>
            </div>
            <AuthPageComponent />
        </div>
    </div>
  );
}
