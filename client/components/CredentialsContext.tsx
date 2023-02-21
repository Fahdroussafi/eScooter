import { createContext } from "react";
import { Credentials } from "../types";

export const CredentialsContext = createContext<{
  storedCredentials: Credentials | undefined;
  setStoredCredentials: (credentials: Credentials | undefined) => void;
}>({
  storedCredentials: undefined,
  setStoredCredentials: () => {},
});
