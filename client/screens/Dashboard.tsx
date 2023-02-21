import React, { useState, useEffect, useCallback, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from "react-native";
import { Card } from "react-native-elements";

import Constants from "expo-constants";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { CredentialsContext } from "../components/CredentialsContext";

import { ScouterProps } from "../types";
import { ScrollView } from "react-native-gesture-handler";

type DashboardProps = {
  scouters: ScouterProps[];
  refreshing: boolean;
  onRefresh: () => void;
  clearLogin: () => void;
  CardsComponentsProps: any;
};

const Dashboard: React.FC<DashboardProps> = ({ CardsComponentsProps }) => {
  const [scouters, setScouters] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const { storedCredentials, setStoredCredentials } =
    useContext(CredentialsContext);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const fetchData = async () => {
    // const appUrl = Constants.expoConfig.extra.appUrl;
    // const appUrl = "http://192.168.9.31:8080";
    // const url = `${appUrl}/api/scouter/getScouter`;
    const response = await fetch(
      "http://192.168.9.31:8080/api/scouter/getScouter"
    );
    const data = await response.json();
    const transformedData = data.map((item: any) => {
      return {
        id: item.id,
        nom: item.nom,
        description: item.description,
      };
    });
    setScouters(transformedData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const clearLogin = () => {
    AsyncStorage.removeItem("userCredentials")
      .then(() => {
        setStoredCredentials("" as any);
      })
      .catch((error) => console.log(error));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
      </View>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {scouters.map((scouter: ScouterProps, index) => {
          return (
            <View
              key={index}
              style={{
                marginBottom: 20,
                marginTop: 20,
                flexDirection: "row",
                justifyContent: "center",
              }}>
              <Card
                {...CardsComponentsProps}
                key={index}
                containerStyle={{
                  width: "70%",
                  borderRadius: 20,
                  backgroundColor: "#90EE90",
                  justifyContent: "center",
                }}>
                <Card.Title
                  style={{
                    color: "#000",
                    fontSize: 20,
                    fontWeight: "bold",
                    letterSpacing: 3,
                  }}>
                  {scouter.nom}
                </Card.Title>
                <Card.Divider
                  style={{
                    backgroundColor: "#000",
                    height: 1,
                    width: "100%",
                  }}
                />
                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}>
                  <Card.Image
                    source={require("../assets/scooter-icon.png")}
                    style={{
                      width: 50,
                      height: 50,
                    }}
                  />

                  <Text
                    style={{
                      alignSelf: "center",
                      marginLeft: 10,
                      color: "#000",
                      fontSize: 15,
                    }}>
                    {scouter.description}
                  </Text>
                </View>
              </Card>
            </View>
          );
        })}
      </ScrollView>
      <TouchableOpacity style={styles.button} onPress={clearLogin}>
        <Text style={styles.buttonText}>LOGOUT</Text>
      </TouchableOpacity>
    </View>
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
    textAlign: "center",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    justifyContent: "center",
    textAlign: "center",
  },
  button: {
    height: 40,
    width: "50%",
    backgroundColor: "#000",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 5,
  },
});

export default Dashboard;
