import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Modal from "react-native-modal";

const AddTodo = ({ isActive, onClose, value, onchangeText, onPressSubmit }: { isActive: boolean; onClose: any; value: string; onchangeText: (item: string) => void; onPressSubmit: () => void }) => {
  return (
    <Modal isVisible={isActive} style={styles.modal} onBackButtonPress={onClose} onBackdropPress={onClose}>
      <View style={styles.container}>
        <Text style={styles.Title}>Add Todo</Text>
        <TextInput style={styles.InputContainer} placeholder="Enter your Todo" value={value} onChangeText={onchangeText} />
        <TouchableOpacity style={styles.button} onPress={onPressSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: "flex-end",
  },
  container: {
    padding: 20,
    backgroundColor: "white",
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    gap: 15,
  },
  Title: {
    fontSize: 24,
    color: "black",
    fontWeight: "bold",
  },
  InputContainer: {
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    fontSize: 16,
    color: "black",
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 15,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    textTransform: "uppercase",
  },
});
export default AddTodo;
