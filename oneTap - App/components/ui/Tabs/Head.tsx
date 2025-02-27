import { Text, View } from "@/components/Themed";
import { useDevTheme } from "@/hooks";
import { StyleSheet } from "react-native";
import { Bell } from "lucide-react-native";
import { useState } from "react";
import Sheet from "./Docs/Sheet";
import Notification from "../Notification/Notification";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import Colors from "@/constants/Colors";

const Head: React.FC = () => {
  const notifications = useSelector((state: RootState) => state.notification);
  const [isNotifactionTab, setNotificationTab] = useState<boolean>(false);
  const { text } = useDevTheme();

  let noOfNotifications = notifications.reduce((count, notification) => {
    return count + (notification.isSeen ? 0 : 1);
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OneTap</Text>
      <View style={styles.notificationIconContainer} >
        <Bell color={text} size={25} onPress={() => setNotificationTab(true)} />
        {noOfNotifications != 0 && <View style={styles.notificationBadge} >
          <Text style={{ position: "relative", bottom: 2, color: Colors.dark.text }} >{noOfNotifications}</Text>
        </View>}

      </View>

      <Sheet open={isNotifactionTab} onClose={() => setNotificationTab(false)}>
        <Notification />
      </Sheet>
    </View>
  );
};

export default Head;

const styles = StyleSheet.create({
  title: {
    fontFamily: "Black",
    fontSize: 22,
  },
  icon: {},
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  notificationIconContainer: {
    position: "relative"
  },
  notificationBadge: {
    position: "absolute",
    zIndex: 1,
    right: -2,
    top: -5,
    backgroundColor: "#ef4444",
    borderRadius: 100,
    height: 15,
    width: 15,
    justifyContent: "center",
    alignItems: "center",
  }
});
