import LabeledInput from "../../../../components/LabeledInput";
import { Button } from "../../../../components/ui/button";
import { useAuthenticationStore } from "../../../../stores/useAuthenticationStore";

export default function AuthenticationForm({ title, description, submitMethod, submitLabel, switchButtonLabel, switchButtonMethod }) {
    const { email, setEmail } = useAuthenticationStore((state) => state);

    function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>): void {
        const { value } = e.target;
        setEmail(value);
    }

    return (
        <div className="flex flex-col gap-10 w-xl">
            <div className="flex flex-col">
                <span className="text-lg font-semibold text-zinc-700">{title}</span>
                <span className="text-sm font-semibold text-zinc-500">{description}</span>
            </div>
            <div className="flex flex-col gap-3">
                <LabeledInput
                    autoFocus
                    required={true}
                    id={"email"}
                    placeholder={"email@example.com"}
                    label={"Email"}
                    value={email}
                    onChange={handleEmailChange}
                />
                <LabeledInput
                    required={true}
                    id={"password"}
                    type={"password"}
                    placeholder={"Your secure password"}
                    label={"Password"}
                />
            </div>
            <div className="flex flex-col gap-3">
                <Button className="w-full cursor-pointer" variant="default" onClick={submitMethod}>{submitLabel}</Button>
                <Button className="w-full cursor-pointer border" variant={"outline"} onClick={switchButtonMethod}>{switchButtonLabel}</Button>
            </div>
        </div>
    );
}