import { colors } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import * as Haptics from "expo-haptics";
import { Alert, StyleSheet, Text, TouchableOpacity } from "react-native";
import { IProps } from "..";

export function CopyButton({ stats }: { stats: IProps[] }) {
  const onCopy = async () => {
    const summary = `IZone Daily Summary\n${stats.map((item) => `\n${item.label}: ${item.value}${item.label === "Calories" ? "" : "g"}`).join("")}`;

    await Clipboard.setStringAsync(summary);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert("Copied", "Izone Summary copied to clipboard!");
  };

  return (
    <TouchableOpacity style={styles.button} onPress={onCopy}>
      <Ionicons name="copy-outline" size={18} color={colors.primary} />
      <Text style={styles.text}>Copy Summary</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 16,
  },
  text: {
    color: colors.primary,
    fontSize: 14,
  },
});
