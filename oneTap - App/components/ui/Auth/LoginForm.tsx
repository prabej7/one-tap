import { Text, View } from "@/components/Themed"
import { useDevTheme } from "@/hooks";
import { StyleSheet } from 'react-native';
import { Checkbox } from "tamagui";
import Input from "../Input";
import { Check, Eye, EyeOff } from 'lucide-react-native'
import { useState } from "react";
import Button from "../Button";
import axios, { AxiosError } from 'axios'
import { api } from "@/constants/api";
import { useAsyncStorage } from "@react-native-async-storage/async-storage"
import { useRouter } from "expo-router";
import Colors from "@/constants/Colors";

const LoginForm: React.FC = () => {
    const [isRemember, setRemember] = useState<boolean>(false);
    const [showPass, setShowPass] = useState<boolean>(false);
    const toggle = () => setShowPass(!showPass);
    const { primary } = useDevTheme();

    const [uuid, setUUID] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [formStatus, setFormStatus] = useState<"loading" | "error" | "stable">("stable");
    const [error, setError] = useState<string>("");

    const { setItem } = useAsyncStorage("token");
    const { push } = useRouter();

    const onSubmit = async () => {
        setFormStatus("loading");
        try {
            const { data } = await axios.post(api + "user/login", { uuid, password });
            if (isRemember) {
                setItem(data.token);
            }
            setFormStatus("stable");
            push("/(tabs)");
        } catch (err) {
            const { status } = err as AxiosError;
            if (status == 401) {
                setError("Either Card no. or password is incorrect.")
            } else {
                console.log(err)
                setError("Something went wrong!");
            }
            setFormStatus("error");
        }
    }



    return <View style={styles.formContainer}   >
        <View style={styles.titleContainer} >
            <Text style={styles.title} >Login to <Text style={{ color: primary, fontFamily: "Black" }} >One Tap</Text></Text>
            <Text>Enter your card no. and password to login.</Text>
        </View>
        {formStatus == "error" && <Text style={{ color: "#f44336" }} >{error}</Text>}
        <View style={styles.form} >
            <Input placeholder="Card Number" onChangeText={setUUID} />
            <View>
                <Input placeholder="Password" secureTextEntry={!showPass} onChangeText={setPassword} />
                {showPass ? <Eye color={primary} style={styles.icon} onPress={toggle} /> : <EyeOff color={primary} style={styles.icon} onPress={toggle} />}
            </View>

            <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }} >
                <View style={{ display: "flex", flexDirection: "row", gap: 6, alignItems: "center" }} >
                    <Checkbox checked={isRemember} onCheckedChange={(value) => setRemember(value as boolean)} style={{ backgroundColor: isRemember ? primary : undefined }}  >
                        <Checkbox.Indicator  >
                            <Check color={Colors.light.background} />
                        </Checkbox.Indicator>
                    </Checkbox>
                    <Text>Remember me</Text>
                </View>
                <Text>Forgot password?</Text>
            </View>
            <Button variant="primary" disabled={formStatus == "loading"} onPress={onSubmit}  >
                Login
            </Button>

        </View>
    </View>
};

export default LoginForm;

const styles = StyleSheet.create({
    formContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 12
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: 16,
        width: "100%"
    },
    titleContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    title: {
        fontSize: 28,
        fontFamily: "Bold"
    },
    input: {
        fontFamily: "Regular",
    },
    icon: {
        position: "absolute",
        zIndex: 1,
        right: 12,
        top: "25%"
    }
})