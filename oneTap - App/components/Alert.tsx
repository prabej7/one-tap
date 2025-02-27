import { StyleSheet } from "react-native";
import { Text, View } from "./Themed";
import { Button } from "./ui";

interface Props {
  uuid: string;
  onAccept: () => void;
  onDecline: () => void;
}

const Alert: React.FC<Props> = ({ uuid, onAccept, onDecline }) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Card Scanned Alert!</Text>
        <Text>Your card is being used by: {uuid}</Text>
      </View>

      <View style={styles.optn}>
        <Button variant="primary" onPress={onAccept} >Accept</Button>
        <Button variant="secondary" onPress={onDecline} >Decline</Button>
      </View>
    </View>
  );
};

export default Alert;

const styles = StyleSheet.create({
  container: {
    height: 150,
    padding: 18,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
  },
  title: {
    fontFamily: "Bold",
    fontSize: 24,
  },
  text: {},
  optn: {
    flexDirection: "row",
    gap: 12,
    justifyContent: "center",
  },
});
