import { Text, View } from "@/components/Themed";
import { NotificationType } from "@/store/slices/notificationSlice"
import {
  Check,
  CheckCheck,
  MessageSquareDot,
} from "lucide-react-native";
import { useDevTheme } from "@/hooks";
import { StyleSheet } from "react-native";

interface Props {
  data: NotificationType;
}

const NotificationCard: React.FC<Props> = ({ data }) => {

  const { title, accessedBy, createdAt, isSeen } = data;
  const { text, primary } = useDevTheme();

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <View>
          <MessageSquareDot color={text} />
        </View>
        <View>
          <Text style={styles.title}>{title}</Text>
          <View style={{ flexDirection: "row", gap: 6 }}>
            <Text>Accessed by: {accessedBy}</Text>
            <Text>|</Text>
            <Text style={styles.date}>{new Date(createdAt).toLocaleTimeString([], { hourCycle: 'h12' })}</Text>
          </View>
        </View>
      </View>
      {isSeen ? <CheckCheck color={primary} /> : <Check color={text} />}
    </View>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 0,
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontFamily: "Medium",
    fontSize: 18,
  },
  date: {
    fontFamily: "Light",
  },
});
