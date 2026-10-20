import { MealItem } from "@/components/MealItem";
import { useLoadMeals } from "@/hooks/useLoadMeals";
import { clearStorage } from "@/storage/meals";
import { globalStyles } from "@/styles/global";
import * as Haptics from "expo-haptics";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Meals() {
  const { meals, loadMeals } = useLoadMeals();

  const handleClearAll = async () => {
    Alert.alert(
      "Clear All Meals",
      "Are  you sure you want to delete all meals?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear All",
          style: "destructive",
          onPress: async () => {
            await clearStorage();
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
            loadMeals();
          },
        },
      ],
    );
  };

  return (
    <ScrollView style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.title}>All Meals</Text>
        <TouchableOpacity onPress={handleClearAll}>
          <Text style={styles.clearButton}>Clear All</Text>
        </TouchableOpacity>
      </View>
      <View style={{ marginTop: 20 }}>
        {meals.map((meal, index) => (
          <MealItem key={index} {...meal} onDelete={loadMeals} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  clearButton: {
    color: "red",
    fontSize: 16,
  },
});
