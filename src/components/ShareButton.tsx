import { colors } from "@/styles/global";
import { Ionicons } from "@expo/vector-icons";
import { Share, TouchableOpacity } from "react-native";
import { IProps } from "..";

export function ShareButton({ stats }: { stats: IProps[] }) {
  const onShare = async () => {
    await Share.share({
      title: "!zone Daily Summary",
      message: `IZone Daily Summary\n${stats.map((item) => `\n${item.label}: ${item.value}${item.label === "Calories" ? "" : "g"}`).join("")}`,
    });
  };

  return (
    <TouchableOpacity onPress={onShare}>
      <Ionicons name="share-outline" size={24} color={colors.primary} />
    </TouchableOpacity>
  );
}
