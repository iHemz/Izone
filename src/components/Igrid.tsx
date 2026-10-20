import { StyleSheet, View } from "react-native";
import { IProps } from "..";
import { Icard } from "./Icard";

export function Igrid({ stats }: { stats: IProps[] }) {
  return (
    <View style={styles.grid}>
      {stats.map((item, index) => (
        <Icard
          key={index}
          label={item.label}
          value={item.label === "Calories" ? item.value : `${item.value}g`}
          goal={item.goal}
          color={item.color}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    justifyContent: "space-between",
  },
});
