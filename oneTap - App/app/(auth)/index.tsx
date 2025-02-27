import { View } from "@/components/Themed";
import { StyleSheet } from 'react-native';
import { Button } from "@/components/ui";
import { Cover, Line, LoginForm, TermAndPolicy } from "@/components/ui";
import { useRouter } from "expo-router";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { useEffect } from "react";

const Login: React.FC = () => {

    const { push } = useRouter();
    const { getItem } = useAsyncStorage("token");

    useEffect(() => {

        (async () => {
            if (await getItem()) {
                push("/(tabs)")
            }
        })();

    }, []);

    return <View style={styles.container}   >
        <Cover path={require("../../assets/images/login.svg")} />
        <LoginForm />
        <Line />
        <Button variant="secondary" onPress={() => push("/(auth)/register")} width={"100%"} >Register</Button>
        <TermAndPolicy />
    </View>
};

export default Login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 48,
        width: "100%"
    },
    image: {
        width: "100%",
        maxWidth: 270,
        height: undefined,
        aspectRatio: 1
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: "grey"
    },

})

