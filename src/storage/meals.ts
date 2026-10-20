import AsyncStorage from "@react-native-async-storage/async-storage";
import { MealItemProps, MealItemResponse } from "..";

const STORAGE_KEY = "meals";

export const getMeals = async (): Promise<MealItemResponse[]> => {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const getRecentMeals = async () => {
  const meals = await getMeals();
  return meals.slice(meals.length - 3);
};

export const addMeal = async (meal: MealItemProps) => {
  const meals = await getMeals();
  const newMeal: MealItemResponse = {
    id: Date.now().toString(),
    ...meal,
    createdAt: Date.now().toString(),
  };
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([...meals, newMeal]));
  return newMeal;
};

export const deleteMeal = async (id: string) => {
  const meals = await getMeals();
  const newMeals = (await meals).filter((meal) => meal.id !== id);
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newMeals));
};

export const clearStorage = async () => {
  await AsyncStorage.removeItem(STORAGE_KEY);
};
