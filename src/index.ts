import { MealKeys } from "./enum";

export type IProps = {
  label: string;
  value: string;
  goal: string;
  color: string;
};

export type MealItemProps = {
  [MealKeys.Name]: string;
  [MealKeys.Calories]: number;
  [MealKeys.Protein]: number;
  [MealKeys.Carbs]: number;
  [MealKeys.Fat]: number;
};

export interface MealItemResponse extends MealItemProps {
  id: string;
  createdAt: string;
}
