import { globalStyles } from "@/styles/global";
import { Text, View } from "react-native";
import { MealItemResponse } from "..";
import { MealItem } from "./MealItem";

export function RecentMeals({
  recentMeals,
  onDelete,
}: {
  recentMeals: MealItemResponse[];
  onDelete: () => void;
}) {
  return (
    <View style={{ marginTop: 30 }}>
      <Text style={globalStyles.sectionTitle}>Recent Meals</Text>
      {recentMeals.map((meal, index) => (
        <MealItem key={index} {...meal} onDelete={onDelete} />
      ))}
    </View>
  );
}
