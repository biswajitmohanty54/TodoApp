import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export interface TodoCardProps {
  index: number; // made required
  title: string;
  time: string;
  isCompleted: boolean;
  onDelete: (index: number) => void;
  onEdit: (index: number) => void;
  onToggleComplete: (index: number) => void;
}

const TodoCard: React.FC<TodoCardProps> = ({ index, title, time, isCompleted, onDelete, onEdit, onToggleComplete }) => {
  return (
    <View style={[styles.card, isCompleted && styles.completed]}>
      <View style={styles.left}>
        <TouchableOpacity onPress={() => onToggleComplete(index)} style={styles.checkbox}>
          <Text>{isCompleted ? "✓" : ""}</Text>
        </TouchableOpacity>

        <View style={styles.textWrap}>
          <Text style={[styles.title, isCompleted && styles.titleCompleted]} numberOfLines={1}>
            {title}
          </Text>
          <Text style={styles.time}>{time}</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity onPress={() => onEdit(index)} style={styles.actionBtn}>
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onDelete(index)} style={styles.actionBtn}>
          <Text style={[styles.actionText, styles.deleteText]}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TodoCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 2,
  },
  left: { flexDirection: "row", alignItems: "center", flex: 1 },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  textWrap: { flex: 1 },
  title: { fontSize: 16, fontWeight: "500" },
  titleCompleted: { textDecorationLine: "line-through", color: "#999" },
  time: { fontSize: 12, color: "#666", marginTop: 4 },
  actions: { flexDirection: "row" },
  actionBtn: { paddingHorizontal: 8, paddingVertical: 6, marginLeft: 8 },
  actionText: { fontSize: 14, color: "#007AFF" },
  deleteText: { color: "#d11a2a" },
  completed: { opacity: 0.7 },
});
