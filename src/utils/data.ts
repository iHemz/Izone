import { MealKeys } from "@/enum";
import { IProps, MealItemProps } from "..";

export const icards: IProps[] = [
  {
    label: "Calories",
    value: "0",
    goal: "2,000",
    color: "#ff6b6b",
  },
  {
    label: "Protein",
    value: "0",
    goal: "150g",
    color: "#46cd64",
  },
  {
    label: "Carbs",
    value: "0",
    goal: "250g",
    color: "#ffd93d",
  },
  {
    label: "Fat",
    value: "0",
    goal: "70g",
    color: "#6bcb77",
  },
];

export const recentMeals: MealItemProps[] = [
  {
    name: "Grilled Chicken Salad",
    calories: 350,
    protein: 35,
    carbs: 20,
    fat: 15,
  },
  {
    name: "Quinoa and Black Bean Bowl",
    calories: 400,
    protein: 15,
    carbs: 60,
    fat: 10,
  },
  {
    name: "Salmon with Roasted Vegetables",
    calories: 450,
    protein: 40,
    carbs: 25,
    fat: 20,
  },
];

export const fetchKeys = (start = 0, limit?: number) =>
  Object.values(MealKeys).slice(start, limit);
