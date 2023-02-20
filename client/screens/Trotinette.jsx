import React, { useState } from "react";
import { View, StyleSheet, Image, ImageBackground } from "react-native";
import { Button } from "react-native-elements";

import { useNavigation } from "@react-navigation/native";

const TrotinetteScreen = () => {
  const navigation = useNavigation();
  const [useEffect, setUseEffect] = useState([
    {
      id: 1,
      name: "Trotinette",
      description: "Trotinette",
      image:
        "https://www.les-scooters-electriques.com/wp-content/uploads/2019/10/les-scooters-electriques-1.jpg",
    },
    {
      id: 2,
      name: "Trotinette",
      description: "Trotinette",
      image:
        "https://www.les-scooters-electriques.com/wp-content/uploads/2019/10/les-scooters-electriques-1.jpg",
    },
    {
      id: 3,
      name: "Trotinette",
      description: "Trotinette",
      image:
        "https://www.les-scooters-electriques.com/wp-content/uploads/2019/10/les-scooters-electriques-1.jpg",
    },
    {
      id: 4,
      name: "Trotinette",
      description: "Trotinette",
      image:
        "https://www.les-scooters-electriques.com/wp-content/uploads/2019/10/les-scooters-electriques-1.jpg",
    },
    {
      id: 5,
      name: "Trotinette",
      description: "Trotinette",
      image:
        "https://www.les-scooters-electriques.com/wp-content/uploads/2019/10/les-scooters-electriques-1.jpg",
    },
  ]);

  return (
    <ImageBackground
      source={require("../assets/bg.png")}
      style={styles.container}
      resizeMode="cover">
      <View style={styles.container}>
        <Image style={styles.logo} source={require("../assets/REGISTER.png")} />
        <Button
          title="Back"
          onPress={() => navigation.navigate("Dashboard")}
          buttonStyle={{
            backgroundColor: "#FFA500",
            width: 200,
            height: 45,
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 5,
          }}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  BgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    marginBottom: 20,
  },
});

export default TrotinetteScreen;
