import styled from "styled-components/native";
import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import Constants from "expo-constants";

const StatusBarHeight = Constants.statusBarHeight;

// colors
export const Colors = {
  primary: "#ffffff",
  secondary: "#E5E7EB",
  tertiary: "#1F2937",
  darkLight: "#9CA3AF",
  brand: "#75B4E3",
  green: "#10B981",
  red: "#EF4444",
};

const { primary, secondary, tertiary, darkLight, brand, green, red } = Colors;

export const StyledContainer = styled.View`
  padding-top: ${StatusBarHeight + 120}px;
  flex: 1;
  backgroundcolor: "#fff";
`;

export const InnerContainer = styled.View`
  width: 100%;
  align-items: center;
`;

export const WelcomeContainer = styled(InnerContainer)`
  padding: 25px;
  padding-top: 10px;
  justify-content: center;
`;

export const PageTitle = styled.Text`
  text-align: center;
  margin-bottom: 10px;
  font-weight: bold;
  color: ${red};
  font-size: 25px;
  letter-spacing: 9px;
  ${(props) => props.welcome && `font-size: 25px;`}
`;

export const SubTitle = styled.Text`
  font-size: 18px;
  margin-bottom: 20px;
  letter-spacing: 5px;
  font-weight: bold;
  color: ${tertiary};

  ${(props) =>
    props.welcome &&
    `
    margin-bottom: 5px;
    font-weight: normal;
  `}
`;

export const StyledFormArea = styled.View`
  width: 70%;
  height: 100%;
`;

export const StyledTextInput = styled.TextInput`
  background-color: ${secondary};
  padding: 15px;
  padding-left: 55px;
  padding-right: 55px;
  border-radius: 5px;
  font-size: 16px;
  height: 60px;
  margin-vertical: 3px;
  margin-bottom: 10px;
  color: ${tertiary};
`;

export const StyledInputLabel = styled.Text`
  color: ${red};
  font-size: 13px;
  text-align: left;
`;

export const LeftIcon = styled.View`
  left: 15px;
  top: 38px;
  position: absolute;
  z-index: 1;
`;

export const RightIcon = styled.TouchableOpacity`
  right: 15px;
  top: 38px;
  position: absolute;
  z-index: 1;
`;

export const ButtonText = styled.Text`
  color: ${primary};
  font-size: 14px;
  letter-spacing: 2px;
`;

export const StyledButton = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${red};
  justify-content: center;
  border-radius: 30px;
  margin-vertical: 15px;
  height: 50px;
  align-items: center;
`;

export const StyledButtonLogout = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${red};
  justify-content: center;
  border-radius: 30px;
  margin-vertical: 10px;
  height: 50px;
  align-items: center;
`;

export const MsgBox = styled.Text`
  text-align: center;
  font-size: 13px;
  color: ${(props) => (props.type === "SUCCESS" ? green : red)};
`;

export const Line = styled.View`
  height: 1px;
  width: 100%;
  background-color: ${darkLight};
  margin-vertical: 20px;
`;

export const ExtraView = styled.View`
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  margin-top: 15px;
`;

export const ExtraText = styled.Text`
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: ${darkLight};
  font-size: 14px;
`;

export const TextLink = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  font-size: 14px;
`;

export const TextLinkContent = styled.Text`
  color: ${red};
  font-size: 16px;
  font-weight: bold;
`;
