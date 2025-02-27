import { Text, View } from "@/components/Themed"
import { Button, Input } from "@/components/ui";
import { api } from "@/constants/api";
import Colors from "@/constants/Colors";

import globalStyles from "@/constants/globalStyles"
import { useAuth, useDevTheme } from "@/hooks";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import axios from "axios";
import * as ImagePicker from 'expo-image-picker';
import { Camera, Smartphone, Upload, X } from "lucide-react-native";
import { useEffect, useState } from "react";

const Add: React.FC = () => {
    const { text, primary } = useDevTheme();
    const [loading, setLoading] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [results, setResult] = useState<ImagePicker.ImagePickerResult>();
    const { getItem } = useAsyncStorage("token");
    const { fetchUser } = useAuth();
    const pickImage = async (option: "launchImageLibraryAsync" | "launchCameraAsync") => {
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
        if (results && results.assets) {
            try {
                // Ensure the image is in the right format for the backend
                if (results) {

                }
                const { assets } = results;

                const fileUri = assets[0].uri;

                // Check the file extension and MIME type (optional but useful)
                const mimeType = assets[0].type || 'image/jpeg';

                // Prepare the form data for the request
                const formData = new FormData();
                formData.append("name", name);
                formData.append('file', {
                    uri: fileUri,
                    name: assets[0].fileName || 'image.jpg', // Default name if not provided
                    type: 'image/jpeg',
                } as any);

                // Make the POST request using fetch
                await axios.post(api + 'document/upload', formData, {
                    headers: {
                        Authorization: "Bearer " + await getItem(),
                        "Content-Type": 'multipart/form-data',
                    }
                });

                fetchUser();
                setResult(undefined);
            } catch (error) {
                console.log("Error during upload:", error);
            } finally {
                setLoading(false);
            }
        }
    }

    return <View style={[globalStyles.container, { justifyContent: "center" }]} >

        <View style={{ width: "100%", gap: 12 }} >

            <Text style={{ fontSize: 24, textAlign: "center", fontFamily: "Bold" }} >
                <Upload color={text} size={18} />
                {"    "}
                Upload one</Text>
            <Input placeholder="Document name" textAlign="center" onChangeText={setName} width={"100%"} />

            {!results ? <View style={{ width: "100%", flexDirection: "row", gap: 10 }}>

                <Button
                    variant="primary"
                    disabled={loading}
                    onPress={() => pickImage("launchImageLibraryAsync")}
                    style={{ flex: 1 }}
                >
                    <Smartphone size={18} color={Colors.dark.text} />
                    Select from device
                </Button>

                <Button
                    icon={<Camera size={18} color={primary} />}
                    variant="secondary"
                    onPress={() => pickImage("launchCameraAsync")}
                    disabled={loading}
                    style={{ flex: 1 }}
                >

                    <Text>Click with camera</Text>
                </Button>
            </View> : <View style={{ flexDirection: "row", gap: 6, alignItems: "center", justifyContent: "center", paddingVertical: 12 }} >
                <Text>Selected {results.assets && results.assets[0].fileName}</Text>
                <X color={text} size={16} onPress={() => setResult(undefined)} />
            </View>}
        </View>

        <Button variant="primary" disabled={loading} style={{ marginTop: 12, width: "100%" }} onPress={onSubmit}  >Submit</Button>

    </View>
};

export default Add;