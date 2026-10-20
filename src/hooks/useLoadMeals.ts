import { getMeals } from "@/storage/meals";
import { icards } from "@/utils/data";
import { useFocusEffect } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { MealItemResponse } from "..";

export function useLoadMeals() {
  const [meals, setMeals] = useState<MealItemResponse[]>([]);

  const loadMeals = async () => {
    const meals = await getMeals();
    setMeals(meals);
  };

  const stats = useMemo(
    () =>
      meals.reduce(
        (acc, meal) => {
          acc[0] = {
            ...acc[0],
            value: String(Number(acc[0].value) + meal.calories),
          };
          acc[1] = {
            ...acc[1],
            value: String(Number(acc[1].value) + meal.protein),
          };
          acc[2] = {
            ...acc[2],
            value: String(Number(acc[2].value) + meal.carbs),
          };
          acc[3] = {
            ...acc[3],
            value: String(Number(acc[3].value) + meal.fat),
          };

          return acc;
        },
        [...icards],
      ),
    [meals],
  );

  useFocusEffect(
    useCallback(() => {
      loadMeals();
    }, []),
  );

  return { meals, loadMeals, stats };
}
