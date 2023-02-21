import React, { useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import axios from "axios";

import KeyboardAvoidingWrapper from "../components/KeyboardAvoidingWrapper";

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

import { Props, MessageProps, Credentials, MyTextInputProps } from "../types";

const RegisterScreen = ({ navigation }: Props) => {
  const [hidePassword, setHidePassword] = useState(true);
  const [message, setMessage] = useState<MessageProps["message"]>();
  const [messageType, setMessageType] = useState<MessageProps["type"]>();

  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);

  const handleSignup = (
    credentials: Credentials,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    handleMessage(null as any, null as any);
    // const appUrl = Constants.expoConfig.extra.appUrl;
    const appUrl = "http://http://192.168.9.31:8080";
    const url = `${appUrl}/api/auth/register`;
    axios
      .post(url, credentials)
      .then((response) => {
        const result = response.data;
        const { message, status, data, token, name } = result;

        if (status !== "SUCCESS") {
          handleMessage(message, status);
        } else {
          navigation.navigate("Home");
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
    message: string,
    status: string
  ) => {
    AsyncStorage.setItem("userCredentials", JSON.stringify(credentials))
      .then(() => {
        handleMessage(message, status);
        setStoredCredentials(credentials);
      })
      .catch((error) => {
        handleMessage("Persisting login failed", "ERROR");
        console.log(error);
      });
  };

  return (
    <KeyboardAvoidingWrapper>
      <StyledContainer>
        <InnerContainer>
          <StatusBar style="dark" />
          <PageTitle>eScouter</PageTitle>
          <SubTitle>SIGNUP</SubTitle>

          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
            }}
            onSubmit={(values, { setSubmitting }) => {
              if (
                values.email == "" ||
                values.password == "" ||
                values.name == "" ||
                values.confirmPassword == ""
              ) {
                handleMessage("Please fill in all fields.", "ERROR");
                setSubmitting(false);
              } else if (values.password !== values.confirmPassword) {
                handleMessage("Passwords do not match.", "ERROR");
                setSubmitting(false);
              } else {
                handleMessage("Signing up...", "SUCCESS");
                handleSignup(values, setSubmitting);
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
                  label="Full Name"
                  icon="person"
                  placeholder="Enter your full name"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("name")}
                  onBlur={handleBlur("name")}
                  value={values.name}
                />

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

                <MyTextInput
                  label="Confirm Password"
                  icon="lock"
                  placeholder="* * * * * * * *"
                  placeholderTextColor={darkLight}
                  onChangeText={handleChange("confirmPassword")}
                  onBlur={handleBlur("confirmPassword")}
                  value={values.confirmPassword}
                  secureTextEntry={hidePassword}
                  isPassword={true}
                  hidePassword={hidePassword}
                  setHidePassword={setHidePassword}
                />
                <MsgBox type={messageType}>{message}</MsgBox>

                {!isSubmitting && (
                  <StyledButton onPress={handleSubmit}>
                    <ButtonText>SIGNUP</ButtonText>
                  </StyledButton>
                )}

                {isSubmitting && (
                  <StyledButton disabled={true}>
                    <ActivityIndicator size="large" color={primary} />
                  </StyledButton>
                )}
                <Line />
                <ExtraView>
                  <ExtraText>Already have an account? </ExtraText>
                  <TextLink onPress={() => navigation.navigate("LoginScreen")}>
                    <TextLinkContent> Login</TextLinkContent>
                  </TextLink>
                </ExtraView>
              </StyledFormArea>
            )}
          </Formik>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
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

export default RegisterScreen;
