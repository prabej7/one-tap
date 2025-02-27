import { Text, View } from "@/components/Themed";
import { useDevTheme } from "@/hooks";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { LogOut, UserRoundCog } from "lucide-react-native";
import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";

const AccountHead: React.FC = () => {
  const { text, primary } = useDevTheme();
  const [isPress, setPress] = useState<boolean>(false);

  const { removeItem } = useAsyncStorage("token");
  const { push } = useRouter();

  const onLogout = async () => {
    setPress(true);
    await removeItem();
    push("/(auth)");
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <UserRoundCog color={text} />
        <Text style={styles.title}>Account Settings</Text>
      </View>
      <Pressable
        onPress={onLogout}
        onLongPress={() => setPress(true)}
        style={styles.logOutContainer}
      >
        <LogOut color={isPress ? primary : text} />
      </Pressable>
    </View>
  );
};

export default AccountHead;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    gap: 12,
    justifyContent: "space-between",
  },
  title: {
    fontFamily: "Bold",
    fontSize: 24,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  logOutContainer: {},
});
