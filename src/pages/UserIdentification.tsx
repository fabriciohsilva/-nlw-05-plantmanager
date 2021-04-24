import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TextInput,
  Platform,
  Keyboard,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Button } from "../components/Button";

import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { clearPlants } from "../libs/storage";

export function UserIdentification() {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [name, setName] = useState<string>();

  const navigation = useNavigation();

  function handlerInputBlur() {
    setIsFocused(false);
    setIsFilled(!!name);
  }

  function handlerInputFocus() {
    setIsFocused(true);
  }

  function handlerInputChange(value: string) {
    setIsFilled(!!value);
    setName(value);
  }

  async function handleConfirm() {
    if (!name) {
      return Alert.alert("Me diz como chamar você 😢");
    }

    await AsyncStorage.setItem("@plantmanager:user", name);

    navigation.navigate("Confirmation", {
      title: 'Prontinho',
      subTitle: 'Agora vamos começar a cuidar das suas plantinhas com muito cuidado',
      buttonText: 'Começar',
      icon: 'smile',
      nextScreen: 'PlantSelect',
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.form}>
              <View style={styles.header}>
                <Text style={styles.emoji}>{isFilled ? "😄" : "😀"}</Text>
                <Text style={styles.title}>
                  Como podemos {"\n"}chamar você?
                </Text>
              </View>
              <TextInput
                style={[
                  styles.input,
                  (isFocused || isFilled) && { borderColor: colors.green },
                ]}
                placeholder="Digite um nome"
                onBlur={handlerInputBlur}
                onFocus={handlerInputFocus}
                onChangeText={handlerInputChange}
              />
              <View style={styles.footer}>
                <Button text="Confirmar" onPress={handleConfirm} />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
  },
  content: {
    flex: 1,
    width: "100%",
  },
  form: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 54,
  },
  header: {
    alignItems: "center",
  },
  emoji: {
    fontSize: 44,
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    textAlign: "center",
    color: colors.heading,
    fontFamily: fonts.heading,
    marginTop: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: colors.gray,
    color: colors.heading,
    width: "100%",
    fontSize: 18,
    marginTop: 50,
    padding: 10,
    textAlign: "center",
  },
  footer: {
    width: "100%",
    marginTop: 40,
    paddingHorizontal: 20,
  },
});
