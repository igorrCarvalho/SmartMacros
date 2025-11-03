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
  setEmail: (email: string) => void;
}
