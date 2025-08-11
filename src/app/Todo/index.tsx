import * as LocalAuthentication from "expo-local-authentication";
import React, { useState } from "react";
import { Alert, FlatList, Platform, StyleSheet, Text, View } from "react-native";
import ActionButton from "../../components/ActionButton";
import AddTodo from "../../components/AddTodo";
import Header from "../../components/Header";
import TodoCard from "../../components/TodoCard";

export interface TodoData {
  title: string;
  isCompleted: boolean;
  time: string;
}

const Todo: React.FC = () => {
  const [data, setData] = useState<TodoData[]>([]);
  const [open, setOpen] = useState(false);
  const [todo, setTodo] = useState<string>("");
  const [editIndex, setEditIndex] = useState<number | null>(null);

  // Authentication method
  const authenticate = async (): Promise<boolean> => {
    if (Platform.OS === "web") {
      return window.confirm("Authenticate to continue?"); // Web fallback
    }

    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    if (!hasHardware) {
      Alert.alert("Error", "Your device does not support biometric authentication.");
      return false;
    }
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    if (!isEnrolled) {
      Alert.alert("Error", "No biometric credentials found. Please set up Face ID or Fingerprint.");
      return false;
    }
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate to continue",
      fallbackLabel: "Enter Passcode",
    });
    return result.success;
  };

  const onSubmitTodo = async () => {
    const auth = await authenticate();
    if (!auth) return;

    if (!todo.trim()) {
      Alert.alert("Warning!!", "Please enter your Todo");
      return;
    }

    if (editIndex !== null) {
      setData((prev) => prev.map((it, i) => (i === editIndex ? { ...it, title: todo } : it)));
      setEditIndex(null);
    } else {
      const finalData: TodoData = {
        title: todo,
        isCompleted: false,
        time: new Date().toLocaleString("en-US", { hour: "numeric", minute: "numeric", hour12: true }),
      };
      setData((prev) => [...prev, finalData]);
    }

    setTodo("");
    setOpen(false);
  };

  const onDeleteTodo = (index: number) => {
    if (Platform.OS === "web") {
      // Web fallback
      if (window.confirm("Are you sure you want to delete this task?")) {
        setData((prev) => prev.filter((_, i) => i !== index));
      }
    } else {
      Alert.alert("Confirm Delete", "Are you sure you want to delete this task?", [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setData((prev) => prev.filter((_, i) => i !== index));
          },
        },
      ]);
    }
  };

  const onEditTodo = async (index: number) => {
    setTodo(data[index].title);
    setEditIndex(index);
    setOpen(true);
  };

  const onToggleComplete = (index: number) => {
    setData((prev) => prev.map((it, i) => (i === index ? { ...it, isCompleted: !it.isCompleted } : it)));
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.todoContainer}>
        <FlatList
          data={data}
          contentContainerStyle={{ gap: 10 }}
          ListEmptyComponent={() => <Text style={styles.noDataFound}>No Data Found</Text>}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => <TodoCard index={index} title={item.title} time={item.time} isCompleted={item.isCompleted} onDelete={onDeleteTodo} onEdit={onEditTodo} onToggleComplete={onToggleComplete} />}
        />
      </View>
      <AddTodo
        isActive={open}
        onClose={() => {
          setOpen(false);
          setEditIndex(null);
          setTodo("");
        }}
        value={todo}
        onchangeText={(e) => setTodo(e)}
        onPressSubmit={onSubmitTodo}
      />
      <ActionButton onPress={() => setOpen(true)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  todoContainer: {
    padding: 20,
    gap: 10,
  },
  noDataFound: {
    color: "gray",
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
  },
});

export default Todo;
