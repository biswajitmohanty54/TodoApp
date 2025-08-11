import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

const ActionButton = ({ onPress }: { onPress: any }) => {
  return (
    <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={onPress}>
      <MaterialIcons name="add" style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#007AFF",
    width: 60,
    height: 60,
    borderRadius: 60,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    right: 24,
    bottom: 45,
  },
  icon: {
    fontSize: 20,
    color: "white",
  },
});

export default ActionButton;
