import { colors } from "@/styles/global";
import {
  cancelAllNotifications,
  requestPermission,
  scheduleMealPushNotifications,
} from "@/utils/notification";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

const REMINDER_KEY = "push_notifications";

export function ReminderToggle() {
  const [enabled, setEnabled] = useState(false);

  const load = async () => {
    const value = await AsyncStorage.getItem(REMINDER_KEY);
    setEnabled(value === "true");
  };
  useEffect(() => {
    load();
  }, []);

  const toggle = async (value: boolean) => {
    if (value) {
      const granted = await requestPermission();
      if (!granted) return;
      await scheduleMealPushNotifications();
    } else {
      await cancelAllNotifications();
    }
    setEnabled(value);
    await AsyncStorage.setItem(REMINDER_KEY, String(value));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Meal Reminders</Text>
      <Switch
        value={enabled}
        onValueChange={toggle}
        trackColor={{
          false: colors.surface,
          true: colors.primary,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
  },
  label: {
    color: colors.text,
    fontSize: 16,
  },
});
