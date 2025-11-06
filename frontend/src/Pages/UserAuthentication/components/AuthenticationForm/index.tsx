import LabeledInput from "../../../../components/LabeledInput";
import { Button } from "../../../../components/ui/button";
import { useAuthenticationStore } from "../../../../stores/useAuthenticationStore";
import type { AuthenticationFormProps } from "../../../../types";

export default function AuthenticationForm({
    title,
    description,
    submitMethod,
    submitLabel,
    switchButtonLabel,
    switchButtonMethod
}: AuthenticationFormProps) {
    const { email, setEmail, password, setPassword } = useAuthenticationStore((state) => state);

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>, callback: (value: string) => void): void {
        const { value } = e.target;
        callback(value);
    }

    return (
        <div className="flex flex-col gap-10 w-xl">
            <div className="flex flex-col">
                <span className="text-lg font-semibold text-zinc-700">{title}</span>
                <span className="text-sm font-semibold text-zinc-500">{description}</span>
            </div>
            <form className="flex flex-col gap-10" onSubmit={submitMethod}>
                <div className="flex flex-col gap-3">
                    <LabeledInput
                        autoFocus
                        required={true}
                        id={"email"}
                        placeholder={"email@example.com"}
                        label={"Email"}
                        value={email}
                        onChange={(value) => handleInputChange(value, setEmail)}
                    />
                    <LabeledInput
                        required={true}
                        id={"password"}
                        type={"password"}
                        placeholder={"Your secure password"}
                        label={"Password"}
                        value={password}
                        onChange={(value) => handleInputChange(value, setPassword)}
                    />
                </div>
                <div className="flex flex-col gap-3">
                    <Button
                        className="w-full cursor-pointer"
                        variant="default"
                        type="submit"
                    >
                        {submitLabel}
                    </Button>
                    <Button
                        className="w-full cursor-pointer border"
                        variant={"outline"}
                        onClick={switchButtonMethod}
                    >
                        {switchButtonLabel}
                    </Button>
                </div>
            </form>
        </div>
    );
}