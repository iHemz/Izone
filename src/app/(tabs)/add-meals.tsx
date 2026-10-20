import { MealKeys } from "@/enum";
import { MealItemProps } from "@/index";
import { addMeal } from "@/storage/meals";
import { colors, globalStyles } from "@/styles/global";
import { fetchKeys } from "@/utils/data";
import * as Haptics from "expo-haptics";
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const initialMealState: MealItemProps = {
  [MealKeys.Name]: "",
  [MealKeys.Calories]: 0,
  [MealKeys.Protein]: 0,
  [MealKeys.Carbs]: 0,
  [MealKeys.Fat]: 0,
};

export default function AddMeals() {
  const [meal, setMeal] = useState<MealItemProps>({ ...initialMealState });

  const handleAddMeal = async () => {
    if (!meal.name || !meal.calories) {
      Alert.alert("Invalid Input", "Please enter a meal name and calories");
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      return;
    }
    await addMeal(meal);
    setMeal({ ...initialMealState });
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Alert.alert("Success", "Meal added successfully!");
    router.push("/");
  };

  const handleInputChange = (field: MealKeys, value: string) => {
    setMeal((prevMeal) => ({
      ...prevMeal,
      [field]: field === MealKeys.Name ? value : parseFloat(value),
    }));
  };

  return (
    <ScrollView style={globalStyles.container}>
      <Text style={globalStyles.title}>Add Meals</Text>

      {[MealKeys.Name, MealKeys.Calories].map((field) => (
        <TextInput
          key={field}
          style={[styles.input, styles.rowInput]}
          placeholder={field}
          placeholderTextColor={colors.textSecondary}
          {...(field !== MealKeys.Name && { keyboardType: "numeric" })}
          value={(meal[field] || "").toString()}
          onChangeText={(value) => handleInputChange(field, value)}
        />
      ))}

      <View style={styles.row}>
        {fetchKeys(2).map((field) => (
          <TextInput
            key={field}
            placeholder={`${field} (g)`}
            placeholderTextColor={colors.textSecondary}
            style={[styles.input, styles.rowInput]}
            keyboardType="numeric"
            value={(meal[field] || "").toString()}
            onChangeText={(value) => handleInputChange(field, value)}
          />
        ))}
      </View>

      <TouchableOpacity onPress={handleAddMeal} style={styles.button}>
        <Text style={styles.buttonText}>Add Meal</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.surface,
    color: colors.text,
    padding: 16,
    borderRadius: 10,
    fontSize: 16,
    marginTop: 16,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  rowInput: {
    flex: 1,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 24,
  },
  buttonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: "bold",
  },
});
