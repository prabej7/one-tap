import { View } from "@/components/Themed";
import { StyleSheet } from "react-native";
import Head from "./Head";
import Catcher from "./Catcher";
import Body from "./Body";
import { useEffect } from "react";
import axios from "axios";
import { api } from "@/constants/api";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useAuth } from "@/hooks";

const Notification: React.FC = () => {
  const { getItem } = useAsyncStorage("token");
  const { fetchUser } = useAuth();

  useEffect(() => {

    (async () => {
      await axios.patch(api + "/notification", {}, {
        headers: {
          Authorization: `Bearer ${await getItem()}`
        }
      })
      fetchUser();
    })();

  }, []);

  return (
    <View style={[styles.container]}>
      <Catcher />
      <View style={{ paddingVertical: 12 }}></View>
      <Head />
      <Body />
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    height: 700,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
});
