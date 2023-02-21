import React, { useState, useEffect } from "react";
import MapView, { Marker } from "react-native-maps";
import Constants from "expo-constants";

import { Button } from "react-native-elements";

const HomeScreen = () => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    async function fetchMarkers() {
      // const appUrl = Constants.expoConfig.extra.appUrl;
      const appUrl = "http://192.168.9.31:8080";
      const url = `${appUrl}/api/scouter/getScouter`;

      const response = await fetch(url);
      const data = await response.json();
      setMarkers(data);
    }
    fetchMarkers();
  }, []);

  return (
    <MapView
      style={{ flex: 1, width: "100%", height: "100%" }}
      initialRegion={{
        latitude: 32.3123,
        longitude: -9.2311,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}>
      {markers.map((marker, index) => (
        <Marker
          key={index}
          coordinate={{
            latitude: parseFloat(marker.latitude),
            longitude: parseFloat(marker.longitude),
          }}
          title={marker.nom}
          description={marker.description}
          image={require("../assets/icone.png")}
        />
      ))}
    </MapView>
  );
};

export default HomeScreen;
