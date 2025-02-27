import { Text, View } from "@/components/Themed";
import { useDevTheme } from "@/hooks";
import { BellDot } from "lucide-react-native";
import { StyleSheet } from "react-native";

const Head: React.FC = () => {
  const { text } = useDevTheme();
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <BellDot color={text} />
        <Text style={styles.title}>Notifications</Text>
      </View>
    </View>
  );
};

export default Head;

const styles = StyleSheet.create({
  container: {},
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  title: {
    fontFamily: "Bold",
    fontSize: 24,
  },
});
