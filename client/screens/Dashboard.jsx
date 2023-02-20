import React, { useState, useEffect, useCallback, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ImageBackground,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Card, Button, Icon } from "react-native-elements";

import Constants from "expo-constants";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { CredentialsContext } from "./../components/CredentialsContext";

const Dashboard = () => {
  const navigation = useNavigation();
  const [scouters, setScouters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const appUrl = Constants.expoConfig.extra.appUrl;
    const url = `${appUrl}/api/scouter/getScouter`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setScouters(json);
        setLoading(false);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const clearLogin = () => {
    AsyncStorage.removeItem("userCredentials")
      .then(() => {
        setStoredCredentials("");
      })
      .catch((error) => console.log(error));
  };

  return (
    <ImageBackground
      source={require("../assets/bg.png")}
      style={styles.BgImage}
      resizeMode="cover">
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Dashboard</Text>
        </View>
        <FlatList
          data={scouters}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <Card key={item.id}>
              <Card.Title>{item.nom}</Card.Title>
              <Card.Divider />
              <Text style={{ marginBottom: 10 }}>{item.description}</Text>
              <Button
                icon={<Icon name="code" color="#ffffff" />}
                buttonStyle={{
                  borderRadius: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  marginBottom: 0,
                }}
                title="VIEW NOW"
                onPress={() => navigation.navigate("Trotinette")}
              />
            </Card>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
        <Button
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginBottom: 10,
            marginTop: 20,
            width: "50%",
            alignSelf: "center",
            borderRadius: 20,
            backgroundColor: "#000",
          }}
          title="Logout"
          onPress={() => clearLogin()}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#000",
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    justifyContent: "center",
    textAlign: "center",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    justifyContent: "center",
    textAlign: "center",
  },
  BgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});

export default Dashboard;
