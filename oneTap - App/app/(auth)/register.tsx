import { View } from "@/components/Themed"
import { Cover, Line, RegisterForm, TermAndPolicy } from "@/components/ui";
import { Button } from "@/components/ui";
import { StyleSheet } from "react-native";
import { useRouter } from "expo-router";

const login: React.FC = () => {
    const { push } = useRouter();
    return <View style={styles.container} >
        <Cover path={require("../../assets/images/register.svg")} />
        <RegisterForm />
        <Line />
        <Button variant="secondary" onPress={() => push("/(auth)")} width={"100%"} >Login</Button>
        <TermAndPolicy />
    </View>
};

export default login;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 48,
        width: "100%"
    },

})