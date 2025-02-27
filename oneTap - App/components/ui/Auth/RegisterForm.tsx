import { Text, View } from "@/components/Themed"
import { useDevTheme } from "@/hooks";
import { ActivityIndicator, StyleSheet } from "react-native";
import Input from "../Input";
import Button from "../Button";
import { useState } from "react";
import { Eye, EyeOff } from 'lucide-react-native'
import axios, { AxiosError } from "axios";
import Colors from "@/constants/Colors";
import { api } from "@/constants/api";
import { useRouter } from "expo-router";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
const RegisterForm: React.FC = () => {
    const { setItem } = useAsyncStorage("token")
    const { primary } = useDevTheme();
    const [showPass, setShowPass] = useState<boolean>(false);
    const toggle = () => setShowPass(!showPass);
    const { push } = useRouter();
    const [formStatus, setFormStatus] = useState<"stable" | "error" | "loading">("stable");
    const [error, setError] = useState<string>("");

    const [uuid, setUUID] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const onSubmit = async () => {
        setFormStatus("loading");
        try {
            const { data } = await axios.post(api + "/user/register", { uuid, password });
            setItem(data.token);
            setFormStatus("stable");
            push("/(auth)/info");
        } catch (error) {
            const { status } = error as AxiosError;
            if (status == 409) {
                setError("User already exists.");
            } else {
                setError("Something went wrong!");
            }

            setFormStatus("error");
        }
    }

    return <View style={{ width: "100%", gap: 24 }} >
        <View style={styles.titleContainer} >
            <Text style={styles.title} >Register to <Text style={{ color: primary, fontFamily: "Black" }} >One Tap</Text></Text>
            <Text>Enter your card number and password.</Text>
        </View>
        {formStatus == "error" && <Text style={{ color: "#f44336" }} >{error}</Text>}
        <View style={styles.form} >
            <Input placeholder="Card Number" onChangeText={setUUID} />
            <View>
                <Input placeholder="Password" secureTextEntry={!showPass} onChangeText={setPassword} />
                {showPass ? <Eye color={primary} style={styles.icon} onPress={toggle} /> : <EyeOff color={primary} style={styles.icon} onPress={toggle} />}
            </View>
            <Button variant="primary" disabled={formStatus == "loading"} disabledStyle={{ backgroundColor: "gray" }} onPress={onSubmit}  >
                {formStatus == "loading" ? <ActivityIndicator size="small" color={Colors.dark.text} /> : "Register"}
            </Button>
        </View>
    </View>
};

export default RegisterForm;

const styles = StyleSheet.create({
    titleContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    title: {
        fontSize: 28,
        fontFamily: "Bold"
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: 16
    },
    icon: {
        position: "absolute",
        zIndex: 1,
        right: 12,
        top: "25%"
    }
})