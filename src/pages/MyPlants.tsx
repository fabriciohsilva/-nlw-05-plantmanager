import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Platform,
  FlatList,
  Image,
  Alert,
} from "react-native";
import { formatDistance } from "date-fns";
import { pt } from "date-fns/locale";

import { loadPlant, PlantProps, savePlant } from "../libs/storage";

import waterDrop from "../assets/waterdrop.png";
import { Header } from "../components/Header";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { PlantCardSecondary } from "../components/PlantCardSecondary";

export function MyPlants() {
  const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWatered, setNextWatered] = useState<string>();

  useEffect(() => {
    async function loadStorageData() {
      const plantStoraged = await loadPlant();
      const nextTime = formatDistance(
        new Date(plantStoraged[0].dateTimeNotification).getTime(),
        new Date().getTime(),
        { locale: pt }
      );

      setNextWatered(
        `Não esqueça de regar a ${plantStoraged[0].name} às ${nextTime}.`
      );

      setMyPlants(plantStoraged);
      setLoading(false);
    }
    loadStorageData();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.spotLight}>
        <Image style={styles.spotLightImage} source={waterDrop} />
        <Text style={styles.spotLightText}>{nextWatered}</Text>
      </View>
      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>Próximas regadas</Text>
        <FlatList
          data={myPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardSecondary
              data={item}
              onPress={() => {}}
            />
          )}
          showsVerticalScrollIndicator={false}
          // contentContainerStyle={{ flex: 1 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 50,
    backgroundColor: colors.background,
  },
  spotLight: {
    backgroundColor: colors.blue_light,
    paddingHorizontal: 20,
    borderRadius: 20,
    height: 110,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  spotLightImage: {
    width: 60,
    height: 60,
  },
  spotLightText: {
    flex: 1,
    color: colors.blue,
    paddingHorizontal: 20,
  },
  plants: {
    flex: 1,
    width: "100%",
  },
  plantsTitle: {
    fontSize: 24,
    fontFamily: fonts.heading,
    color: colors.heading,
    marginVertical: 20,
  },
});
