import { CopyButton } from "@/components/CopyButton";
import { HomeHeader } from "@/components/HomeHeader";
import { Igrid } from "@/components/Igrid";
import { RecentMeals } from "@/components/RecentMeals";
import { ReminderToggle } from "@/components/ReminderToggle";
import { ShareButton } from "@/components/ShareButton";
import { useLoadMeals } from "@/hooks/useLoadMeals";
import { globalStyles } from "@/styles/global";
import { ScrollView, Text, View } from "react-native";

export default function Index() {
  const { meals, loadMeals, stats } = useLoadMeals();
  return (
    <ScrollView style={globalStyles.container}>
      <View style={globalStyles.header}>
        <Text style={globalStyles.title}>Izone</Text>
        <ShareButton stats={stats} />
      </View>
      <HomeHeader />
      <Igrid stats={stats} />
      <CopyButton stats={stats} />
      <ReminderToggle />
      <RecentMeals
        recentMeals={meals.slice(Math.max(0, meals.length - 3)).reverse()}
        onDelete={loadMeals}
      />
    </ScrollView>
  );
}
