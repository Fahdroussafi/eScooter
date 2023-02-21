import React, { useState } from "react";
import { AppLoadingProps } from "expo-app-loading";
import AppLoading from "expo-app-loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RootStack from "./navigators/RootStack";
import { CredentialsContext } from "./components/CredentialsContext";
import { Credentials } from "./types";

export default function App(): JSX.Element {
  const [appReady, setAppReady] = useState(false);
  const [storedCredentials, setStoredCredentials] = useState<
    Credentials | undefined
  >(undefined);

  const checkLoginCredentials = async (): Promise<void> => {
    try {
      const result = await AsyncStorage.getItem("userCredentials");
      if (result !== null) {
        setStoredCredentials(JSON.parse(result));
      } else {
        setStoredCredentials(undefined);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const appLoadingProps: AppLoadingProps = {
    startAsync: checkLoginCredentials,
    onFinish: () => setAppReady(true),
    onError: console.warn,
  };

  if (!appReady) {
    return <AppLoading {...appLoadingProps} />;
  }

  return (
    <CredentialsContext.Provider
      value={{ storedCredentials, setStoredCredentials }}>
      <RootStack />
    </CredentialsContext.Provider>
  );
}
