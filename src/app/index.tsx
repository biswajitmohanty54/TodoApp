import { Image } from "expo-image";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
//import Logo from "../../assets/images/logo.png";

const Home = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.Logo} source={require("../../assets/images/Logo.png")} placeholder={"Logo"} />
      <Text style={styles.Title}>Welcome Simplify Your Day</Text>
      <Text style={styles.SubTitle}>Organize Your Tasks, One Step at a Time</Text>
      <TouchableOpacity style={styles.Login}>
        <Link href={"/Todo"} style={styles.LoginButton}>
          Let's Begin
        </Link>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#007AFF",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
  Logo: {
    width: 80,
    height: 80,
    objectFit: "fill",
  },
  Title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  SubTitle: {
    fontSize: 18,
    fontWeight: "400",
    color: "white",
  },
  Login: {
    backgroundColor: "white",
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 15,
  },
  LoginButton: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Home;
