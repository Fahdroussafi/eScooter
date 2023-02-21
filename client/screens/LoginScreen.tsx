import React, { useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import axios from "axios";

import { Formik } from "formik";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { CredentialsContext } from "../components/CredentialsContext";

import Constants from "expo-constants";

import {
  StyledContainer,
  InnerContainer,
  PageTitle,
  SubTitle,
  StyledFormArea,
  LeftIcon,
  StyledInputLabel,
  StyledTextInput,
  RightIcon,
  Colors,
  StyledButton,
  ButtonText,
  MsgBox,
  Line,
  ExtraView,
  ExtraText,
  TextLink,
  TextLinkContent,
} from "../components/styles";
import { View, ActivityIndicator } from "react-native";

const { darkLight, primary, red } = Colors;
import { Octicons, Ionicons } from "@expo/vector-icons";

import { MessageProps, Credentials, Props, MyTextInputProps } from "../types";

const LoginScreen = ({ navigation }: Props) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState<MessageProps["message"]>();
  const [messageType, setMessageType] = useState<MessageProps["type"]>();

  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);

  const handleLogin = (
    credentials: Credentials,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    handleMessage(null as any, null as any);

    // const appUrl = Constants.expoConfig.extra.appUrl;
    const appUrl = "http://192.168.9.31:8080";
    const url = `${appUrl}/api/auth/login`;
    axios
      .post(url, credentials)
      .then((response) => {
        const result = response.data;
        const { message, status, data, token, name } = result;

        if (status !== "SUCCESS") {
          handleMessage(message, status);
        } else {
          persistLogin({ ...data, token, name }, message, status);
        }
        setSubmitting(false);
      })
      .catch((error) => {
        setSubmitting(false);
        if (error.response) {
          const { message } = error.response.data;
          handleMessage(message, "ERROR");
        }
      });
  };

  const handleMessage = (
    message: MessageProps["message"],
    type: MessageProps["type"]
  ) => {
    setMessage(message);
    setMessageType(type);
  };

  const persistLogin = (
    credentials: Credentials,
    message: MessageProps["message"],
    type: MessageProps["type"]
  ) => {
    AsyncStorage.setItem("userCredentials", JSON.stringify(credentials))
      .then(() => {
        handleMessage(message, type);
        setStoredCredentials(credentials);
      })
      .catch((error) => {
        handleMessage("Persisting login failed", "ERROR");
        console.log(error);
      });
  };

  return (
    <StyledContainer>
      <InnerContainer>
        <StatusBar style="dark" />
        <PageTitle>eScooter</PageTitle>
        <SubTitle>LOGIN</SubTitle>
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={(values, { setSubmitting }) => {
            if (values.email == "" || values.password == "") {
              handleMessage("Please fill in all fields", "ERROR");
              setSubmitting(false);
            } else {
              handleMessage("Logging in...", "SUCCESS");
              handleLogin(values, setSubmitting);
            }
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            isSubmitting,
          }) => (
            <StyledFormArea>
              <MyTextInput
                label="Email Address"
                icon="mail"
                placeholder="Enter your email address"
                placeholderTextColor={darkLight}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
                keyboardType="email-address"
              />
              <MyTextInput
                label="Password"
                icon="lock"
                placeholder="* * * * * * * *"
                placeholderTextColor={darkLight}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
                secureTextEntry={hidePassword}
                isPassword={true}
                hidePassword={hidePassword}
                setHidePassword={setHidePassword}
              />
              <MsgBox type={messageType}>{message}</MsgBox>
              {!isSubmitting && (
                <StyledButton onPress={handleSubmit}>
                  <ButtonText>LOGIN</ButtonText>
                </StyledButton>
              )}

              {isSubmitting && (
                <StyledButton disabled={true}>
                  <ActivityIndicator size="large" color={primary} />
                </StyledButton>
              )}
              <Line />
              <ExtraView>
                <ExtraText>Don't have an account already?</ExtraText>
                <TextLink onPress={() => navigation.navigate("RegisterScreen")}>
                  <TextLinkContent> Create a new account</TextLinkContent>
                </TextLink>
              </ExtraView>
            </StyledFormArea>
          )}
        </Formik>
      </InnerContainer>
    </StyledContainer>
  );
};

const MyTextInput = ({
  label,
  icon,
  isPassword,
  hidePassword,
  setHidePassword,
  ...props
}: MyTextInputProps) => {
  return (
    <View>
      <LeftIcon>
        <Octicons name={icon} size={30} color={red} />
      </LeftIcon>
      <StyledInputLabel>{label}</StyledInputLabel>
      <StyledTextInput {...props} />
      {isPassword && (
        <RightIcon onPress={() => setHidePassword(!hidePassword)}>
          <Ionicons
            name={hidePassword ? "md-eye-off" : "md-eye"}
            size={30}
            color={darkLight}
          />
        </RightIcon>
      )}
    </View>
  );
};

export default LoginScreen;
