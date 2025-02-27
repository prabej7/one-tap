import { Text, View } from "@/components/Themed";
import { Button, Cover, Input } from "@/components/ui";
import { StyleSheet, TextInput } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useRef, useState } from "react";
import { useDevTheme } from "@/hooks";
import axios from "axios";
import { api } from "@/constants/api";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { getToken } from "tamagui";
import { useRouter } from "expo-router";
import * as ImagePicker from 'expo-image-picker'
import { X } from "lucide-react-native";

const Info: React.FC = () => {
    const [fullName, setFullName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [formStatus, setFormStatus] = useState<"stable" | "loading" | "error">("stable");
    const { offBg, text } = useDevTheme();
    const { getItem } = useAsyncStorage("token");
    const { push } = useRouter();
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
        setFormStatus("loading");
        try {
            if (results && results.assets) {
                const formData = new FormData();
                formData.append("fullName", fullName);
                formData.append("email", email);
                formData.append("file", {
                    uri: results?.assets[0].uri,
                    name: results.assets[0].fileName || "image.jpg",
                    type: "image/jpeg",
                } as any);
                await axios.patch(api + "user/", formData, {
                    headers: {
                        Authorization: `Bearer ${await getItem()}`,
                        "Content-Type": "multipart/form-data"
                    }
                })
                setFormStatus("stable");
                push('/(tabs)');
            }
        } catch (error) {
            console.log(error)
            setFormStatus("error");
        }
    }

    return (
        <KeyboardAwareScrollView
            contentContainerStyle={{
                width: "100%", paddingHorizontal: 24,
                backgroundColor: offBg,
                flex: 1
            }}
            enableOnAndroid={true}
            extraScrollHeight={100}
            keyboardShouldPersistTaps="handled"
        >
            <Cover path={require("../../assets/images/info.svg")} />
            <View style={{ gap: 12 }} >
                <View style={{ width: "100%" }}>
                    <Text style={styles.title}>One more step</Text>
                    <Text>Type your full name and email.</Text>
                </View>
                {formStatus == "error" && <Text style={{ color: "#f44336" }} >Something went wrong.</Text>}
                <View style={styles.form}>
                    <Input placeholder="Full name" returnKeyType="next" onChangeText={setFullName} />
                    <Input placeholder="Email" keyboardType="email-address" returnKeyType="done" onChangeText={setEmail} />
                    {results && results.assets ? <View style={{
                        alignItems: "center", justifyContent: "center",
                        flexDirection: "row", gap: 12
                    }} >
                        <Text>Selected {results.assets[0].fileName}</Text>
                        <X color={text} size={16} onPress={() => setResult(undefined)} />
                    </View> : <Button variant="secondary" onPress={() => pickImage("launchImageLibraryAsync")}  >Upload an ID</Button>}

                    <Button variant="primary" onPress={onSubmit} disabled={formStatus == "loading"} >Submit</Button>
                </View>
            </View>


        </KeyboardAwareScrollView>
    );
};

export default Info;

const styles = StyleSheet.create({
    title: {
        fontFamily: "Black",
        fontSize: 24,
    },
    form: {
        width: "100%",
        gap: 12,
    },
});
