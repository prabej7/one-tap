import { Text, View } from "@/components/Themed";
import Sheet from "./Sheet";
import { Camera, Smartphone, Upload, X } from "lucide-react-native";
import Input from "../../Input";
import Colors from "@/constants/Colors";
import Button from "../../Button";
import * as ImagePicker from "expo-image-picker";
import { useAuth, useDevTheme } from "@/hooks";
import { useState } from "react";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { api } from "@/constants/api";
import axios from "axios";
import Catcher from "../../Notification/Catcher";

interface Props {
  open: boolean;
  onClose: () => void;
}

const AddDocument: React.FC<Props> = ({ onClose, open }) => {
  const { text } = useDevTheme();
  const { fetchUser } = useAuth();
  const [name, setName] = useState<string>("");
  const { getItem } = useAsyncStorage("token");
  const [loading, setLoading] = useState<boolean>(false);

  const [results, setResult] = useState<ImagePicker.ImagePickerResult>();
  const pickImage = async (
    option: "launchImageLibraryAsync" | "launchCameraAsync"
  ) => {
    const result = await ImagePicker[option]({
      mediaTypes: ["images"],
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      setResult(result);
    }
  };

  const onSubmit = async () => {
    setLoading(true);
    if (results && results.assets)
      try {
        const { assets } = results;
        const fileUri = assets[0].uri;

        const formData = new FormData();
        formData.append("name", name);
        formData.append("file", {
          uri: fileUri,
          name: assets[0].fileName || "image.jpg",
          type: "image/jpeg",
        } as any);

        await axios.post(api + "document/upload", formData, {
          headers: {
            Authorization: "Bearer " + (await getItem()),
            "Content-Type": "multipart/form-data",
          },
        });

        fetchUser();
        setName("");
        setResult(undefined);
      } catch (error) {
        console.log("Error during upload:", error);
      } finally {
        setLoading(false);
        onClose();
      }
  };
  return (
    <Sheet
      open={open}
      onClose={() => {
        onClose();
        setResult(undefined);
      }}
    >
      <View
        style={{
          height: 250,
          padding: 12,
          gap: 12,
          alignItems: "center",
          paddingVertical: 24,
        }}
      >
        <Catcher />
        <Text style={{ fontSize: 16, fontFamily: "Bold" }}>
          <Upload color={text} size={18} />
          {"    "}
          Upload one
        </Text>
        <Input
          placeholder="Document name"
          textAlign="center"
          onChangeText={setName}
          width={"100%"}
          value={name}
        />
        {!results ? (
          <View style={{ width: "100%", flexDirection: "row", gap: 10 }}>
            <Button
              icon={<Smartphone size={18} color={Colors.dark.text} />}
              variant="primary"
              disabled={loading}
              onPress={() => pickImage("launchImageLibraryAsync")}
              style={{ flex: 1 }}
            >
              <Text style={{ color: Colors.dark.text }}>
                Select from device
              </Text>
            </Button>

            <Button
              icon={<Camera size={18} color={Colors.dark.primary} />}
              variant="secondary"
              onPress={() => pickImage("launchCameraAsync")}
              disabled={loading}
              style={{ flex: 1 }}
            >
              <Text>Click with camera</Text>
            </Button>
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              gap: 6,
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 12,
            }}
          >
            <Text>Selected {results.assets && results.assets[0].fileName}</Text>
            <X color={text} size={16} onPress={() => setResult(undefined)} />
          </View>
        )}

        <Button
          variant="primary"
          width={"100%"}
          onPress={onSubmit}
          disabled={loading}
        >
          Upload
        </Button>
      </View>
    </Sheet>
  );
};

export default AddDocument;
