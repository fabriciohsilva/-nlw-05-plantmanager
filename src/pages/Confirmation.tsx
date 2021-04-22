import React, { useState } from "react";
import { Text, View, StyleSheet, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/core";

import { Button } from "../components/Button";

import colors from "../styles/colors";
import fonts from "../styles/fonts";


export function Confirmation() {
  const navigation = useNavigation();
  function handleContinue() {
    navigation.navigate("PlantSelect");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>😄</Text>
        <Text style={styles.title}>Prontinho</Text>
        <Text style={styles.subTitle}>
          Agora vamos começar a cuidar das suas plantinhas com muito cuidado.
        </Text>
        <View style={styles.footer}>
          <Button text="Começar" onPress={handleContinue} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 30,
  },
  emoji: {
    fontSize: 78,
  },
  title: {
    fontSize: 22,
    lineHeight: 38,
    textAlign: "center",
    color: colors.heading,
    fontFamily: fonts.heading,
    marginTop: 15,
  },
  subTitle: {
    fontFamily: fonts.text,
    textAlign: "center",
    fontSize: 17,
    paddingVertical: 10,
    color: colors.heading,
  },
  footer: {
    width: "100%",
    paddingHorizontal: 50,
    marginTop: 20,
  },
});
