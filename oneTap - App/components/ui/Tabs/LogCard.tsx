import { Text, View } from "@/components/Themed";
import { api } from "@/constants/api";
import { useAuth, useDevTheme } from "@/hooks";
import { LogType } from "@/store/slices/logSlice";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";
import { CircleArrowDown, CircleChevronRight, CircleX, ScanEye, Trash2 } from "lucide-react-native";
import { useState } from "react";
import { ActivityIndicator, Alert, Pressable, StyleSheet } from "react-native";

interface Props {
    item: LogType;
    isLimit?: boolean;
}

const LogCard: React.FC<Props> = ({ item, isLimit }) => {
    const { getItem } = useAsyncStorage("token");
    const { text, primary, red, green, offBg } = useDevTheme();
    const { push } = useRouter();
    const { fetchUser } = useAuth();

    const [isDeleting, setDeleting] = useState<boolean>(false);
    const [isPressed, setPressed] = useState<boolean>(false);

    const navigateToLogs = () => {
        if (isLimit) {
            push("/(tabs)/logs");
        }
    };

    const onDelete = async () => {
        setDeleting(true);
        try {
            await axios.delete(api + `logs/${item.id}`, {
                headers: {
                    Authorization: `Bearer ${await getItem()}`,
                },
            });
            fetchUser();
        } catch (error) {
            Alert.alert("Error", "Something went wrong!");
        } finally {
            setDeleting(false);
        }
    };

    return (
        <Pressable
            style={({ pressed }) => [
                styles.log,
                { backgroundColor: pressed && isLimit ? "gray" : "transparent" },
            ]}
            onPress={navigateToLogs}
            onPressIn={() => setPressed(true)}
            onPressOut={() => setPressed(false)}
        >
            <View style={[styles.row, { backgroundColor: "transparent" }]}>
                {item.title === "Requested" && <CircleArrowDown color={!isLimit ? primary : text} strokeWidth={1} size={32} />}
                {item.title === "Accepted" && <ScanEye color={!isLimit ? green : text} strokeWidth={1} size={32} />}
                {item.title === "Declined" && <CircleX color={!isLimit ? red : text} strokeWidth={1} size={32} />}
                <View style={[styles.textContainer, { backgroundColor: "transparent" }]}>
                    <Text style={{ fontFamily: "Bold", fontSize: 18 }}>{item.title}: {item.accessedBy}</Text>
                    <Text>{new Date(item.createdAt).toLocaleString([], { hourCycle: "h12" })}</Text>
                </View>
            </View>
            {isLimit ? (
                <Pressable onPress={navigateToLogs}>
                    <CircleChevronRight color={text} size={25} strokeWidth={1} />
                </Pressable>
            ) : isDeleting ? (
                <ActivityIndicator color={primary} />
            ) : (
                <Trash2 color={text} size={25} strokeWidth={1} onPress={onDelete} />
            )}
        </Pressable>
    );
};

export default LogCard;

const styles = StyleSheet.create({
    log: {
        flexDirection: "row",
        gap: 6,
        borderRadius: 7,
        paddingVertical: 12,
        marginVertical: 6,
        justifyContent: "space-between",
        alignItems: "center",
    },
    row: {
        flexDirection: "row",
        gap: 12,
        alignItems: "center",
        borderRadius: 7,
        padding: 5,
    },
    textContainer: {
        padding: 5,
        borderRadius: 5,
    }
});
