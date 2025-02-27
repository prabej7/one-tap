import { Text, View } from "@/components/Themed";
import Colors from "@/constants/Colors";
import { RootState } from "@/store/store";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import Button from "../../Button";
import { Camera } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { api } from "@/constants/api";
import { useAuth, useDevTheme } from "@/hooks";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { Image } from "expo-image";
const AccountBody: React.FC = () => {
  const { avatar, isBlocked } = useSelector((state: RootState) => state.user);
  const [isLoading, setLoading] = useState<boolean>(false);
  const { text } = useDevTheme();
  const { fullName, email, uuid } = useSelector(
    (state: RootState) => state.user
  );
  const { getItem } = useAsyncStorage("token");
  const { fetchUser } = useAuth();

  const onUploadProfilePic = async (
    option: "launchImageLibraryAsync" | "launchCameraAsync"
  ) => {
    setLoading(true);
    try {
      const result = await ImagePicker[option]({
        mediaTypes: ["images"],
        allowsEditing: false,
        quality: 1,
      });
      const { assets } = result;
      if (assets) {
        const fileUri = assets[0].uri;

        const formData = new FormData();
        formData.append("file", {
          uri: fileUri,
          name: assets[0].fileName || "image.jpg",
          type: "image/jpeg",
        } as any);

        await axios.patch(api + "user/avatar", formData, {
          headers: {
            Authorization: "Bearer " + (await getItem()),
            "Content-Type": "multipart/form-data",
          },
        });

        fetchUser();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const [isDeactivateLoading, setDeactivateLoading] = useState<boolean>(false);
  const toggleActivate = async () => {
    setDeactivateLoading(false);
    try {
      await axios.patch(
        api + "user/block",
        { isBlocked },
        { headers: { Authorization: "Bearer " + (await getItem()) } }
      );
      await fetchUser();
    } catch (error) {
      console.log(error);
    } finally {
      setDeactivateLoading(false);
    }
  };

  return (
    <View style={{ width: "100%" }}>
      <View style={styles.infoContainer}>
        {avatar ? (
          <Image source={avatar} style={styles.avatar} contentFit="cover" />
        ) : (
          <View style={styles.imgContainer}>
            <Text style={styles.logo}>{fullName.slice(0, 1)}</Text>
          </View>
        )}

        <View>
          <Text style={styles.infoTitle}>Personal Info</Text>
          <Text>Card No.: {uuid}</Text>
          <Text>Name: {fullName}</Text>
          <Text>Email: {email}</Text>
        </View>
      </View>
      <View style={{ gap: 12 }}>
        <Button
          variant="secondary"
          onPress={() => onUploadProfilePic("launchImageLibraryAsync")}
          icon={<Camera color={text} />}
          disabled={isLoading}
        >
          Update Profile Picture
        </Button>
        <Button
          variant="secondary"
          borderColor={isBlocked ? "#22c55e" : "#ef4444"}
          color={isBlocked ? "#22c55e" : "#ef4444"}
          disabled={isDeactivateLoading}
          onPress={toggleActivate}
        >
          {isBlocked ? "Activate Account" : "Deactivate Account"}
        </Button>
      </View>
    </View>
  );
};

export default AccountBody;

const styles = StyleSheet.create({
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    padding: 24,
    alignItems: "center",
  },
  imgContainer: {
    backgroundColor: Colors.dark.primary,
    borderRadius: "50%",
    height: 75,
    width: 75,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    fontFamily: "Black",
    fontSize: 52,
    color: Colors.dark.text
  },
  infoTitle: {
    fontFamily: "Bold",
    fontSize: 18,
  },
  avatar: {
    aspectRatio: 1,
    width: "30%",
    borderRadius: 1000,
  },
});
