import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/core";

import { Feather } from "@expo/vector-icons";

import wateringImg from "../assets/watering.png";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

export function Welcome() {
  const navigation = useNavigation();

  function handleStart() {
    navigation.navigate("UserIdentification");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          Gerencie {"\n"}suas plantas de {"\n"}forma fácil
        </Text>

        <Image
          style={styles.imgContainer}
          source={wateringImg}
          resizeMode="contain"
        />
        <Text style={styles.subTitle}>
          Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar sempre
          que você precisar
        </Text>

        <TouchableOpacity
          style={styles.nextButton}
          activeOpacity={0.7}
          onPress={handleStart}
        >
          <Feather name="chevron-right" style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    padding: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: fonts.heading,
    marginTop: 38,
    lineHeight: 34,
    fontSize: 28,
    textAlign: "center",
    color: colors.heading,
  },
  imgContainer: {
    height: Dimensions.get("window").width * 0.7,
  },
  subTitle: {
    fontFamily: fonts.text,
    fontSize: 18,
    textAlign: "center",
    paddingHorizontal: 20,
    color: colors.heading,
  },
  nextButton: {
    backgroundColor: colors.green,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    marginBottom: 10,
    height: 56,
    width: 56,
  },
  buttonIcon: {
    color: colors.white,
    fontSize: 32,
  },
});
