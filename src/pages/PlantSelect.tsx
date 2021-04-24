import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/core";

import { EnviromentButton } from "../components/EnviromentButton";
import { Header } from "../components/Header";
import { Load } from "../components/Load";
import { PlantCardPrimary } from "../components/PlantCardPrimary";

import { PlantProps } from "../libs/storage";

import api from "../services/api";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface EnviromentsProps {
  key: string;
  title: string;
}

export function PlantSelect() {
  const [enviroments, setEnviroments] = useState<EnviromentsProps[]>([]);
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
  const [enviromentsSelected, setnviromentsSelected] = useState("all");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  const navigation = useNavigation();

  async function fetchEnviroment() {
    const { data } = await api.get(
      `plants_environments?_sort=title&_order=asc`
    );
    setEnviroments([{ key: "all", title: "Todos" }, ...data]);
  }

  async function fetchPlants() {
    const { data } = await api.get(
      `plants?_sort=name&order=asc&_page=${page}&_limit=8`
    );

    if (!data) {
      return setLoading(true);
    }

    if (page > 1) {
      setPlants((oldValue) => [...oldValue, ...data]);
      setFilteredPlants((oldValue) => [...oldValue, ...data]);
    } else {
      setPlants(data);
      setFilteredPlants(data);
    }

    setLoading(false);
    setLoadingMore(false);
  }

  function handlerEnviromentSelected(enviroment: string) {
    setnviromentsSelected(enviroment);

    if (enviroment === "all") {
      return setFilteredPlants(plants);
    }

    const filtered = plants.filter((plant) =>
      plant.environments.includes(enviroment)
    );
    setFilteredPlants(filtered);
  }

  function handlerFetchMore(distance: number) {
    if (distance < 1) {
      return;
    }

    setLoadingMore(true);
    setPage((oldValue) => oldValue + 1);
    fetchPlants();
  }

  function handlerPlantSelect(plant: PlantProps) {
    navigation.navigate('PlantSave', {plant});
  }

  useEffect(() => {
    fetchEnviroment();
  }, []);

  useEffect(() => {
    fetchPlants();
  }, []);

  if (loading) {
    return <Load />;
  }

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>Em qual ambiente</Text>
      <Text style={styles.subTitle}>Você quer colocar sua planta</Text>

      <View>
        <FlatList
          data={enviroments}
          keyExtractor={(item) => String(item.key)}
          renderItem={({ item }) => (
            <EnviromentButton
              title={item.title}
              active={item.key === enviromentsSelected}
              onPress={() => handlerEnviromentSelected(item.key)}
            />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.enviromentList}
        />
      </View>

      <View style={styles.plants}>
        <FlatList
          data={filteredPlants}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <PlantCardPrimary
              data={item}
              onPress={() => handlerPlantSelect(item)}
            />
          )}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) =>
            handlerFetchMore(distanceFromEnd)
          }
          ListFooterComponent={
            loadingMore ? <ActivityIndicator color={colors.green} /> : <></>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 16,
    color: colors.heading,
    fontFamily: fonts.heading,
    lineHeight: 20,
    marginTop: 15,
  },
  subTitle: {
    fontSize: 16,
    color: colors.heading,
    fontFamily: fonts.text,
    lineHeight: 20,
  },
  enviromentList: {
    height: 40,
    justifyContent: "center",
    marginBottom: 5,
    marginVertical: 32,
  },
  plants: {
    flex: 1,
    justifyContent: "center",
  },
});
