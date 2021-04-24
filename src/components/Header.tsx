import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

import userImg from "../assets/profile.jpg";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

export function Header() {
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    async function loadStorageUserName() {
      const user = await AsyncStorage.getItem("@plantmanager:user");
      setUserName(user || '');
    }

    loadStorageUserName();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.userName}>{userName}</Text>
      </View>
      <Image style={styles.image} source={userImg} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: getStatusBarHeight(),
  },
  greeting: {
    fontSize: 32,
    fontFamily: fonts.text,
    color: colors.heading,
    lineHeight: 40,
  },
  userName: {
    fontSize: 32,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 40,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 40,
  },
});
