import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export const requestPermission = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === Notifications.PermissionStatus.GRANTED;
};

export const cancelAllNotifications = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync();
};

export const scheduleMealPushNotifications = async () => {
  await cancelAllNotifications();

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "IZone",
      body: "Time to log your launch!",
    },
    trigger: {
      hour: 12,
      minute: 0,
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
    },
  });

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "IZone",
      body: "Time to log your dinner!",
    },
    trigger: {
      hour: 18,
      minute: 0,
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
    },
  });
};
