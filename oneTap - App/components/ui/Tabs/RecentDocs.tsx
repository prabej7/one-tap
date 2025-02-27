import { Text, View } from "@/components/Themed"
import { useDevTheme } from "@/hooks";
import { RootState } from "@/store/store";
import { useRouter } from "expo-router";
import { CircleChevronRight, FileScan } from "lucide-react-native";
import { Pressable, StyleSheet } from "react-native";
import { FlatList } from "react-native";
import { useSelector } from "react-redux";

const RecentDocs: React.FC = () => {
    const { text } = useDevTheme();
    const documents = useSelector((state: RootState) => state.document);

    const limitedDocuments = [...documents].reverse().slice(0, 2);
    const { push } = useRouter();

    const navigateToDocuments = () => {
        push("/(tabs)/docs")
    }

    return <View style={styles.container} >
        <Text style={styles.title} >RECENT DOCS</Text>

        <View style={styles.logs} >
            <FlatList data={limitedDocuments} renderItem={({ item: { createdAt, name, id } }) => <Pressable style={({ pressed }) => [styles.log, pressed && { backgroundColor: "gray" }]} key={id} onPress={navigateToDocuments}  >

                <View style={{ flexDirection: "row", gap: 12, alignItems: "center", backgroundColor: "transparent" }} >
                    <FileScan color={text} strokeWidth={1} size={32} />
                    <View style={{ backgroundColor: "transparent" }} >
                        <Text style={{ fontFamily: "Bold", fontSize: 18 }} >{name}</Text>
                        <Text>{new Date(createdAt).toLocaleString()}</Text>
                    </View>
                </View>
                <Pressable onPress={navigateToDocuments} >
                    <CircleChevronRight color={text} size={25} strokeWidth={1} />
                </Pressable>
            </Pressable>}
                ListEmptyComponent={<Text style={{ textAlign: "center", marginVertical: 10, color: "gray" }}>No documents available.</Text>}
            />

        </View>
    </View>
};

export default RecentDocs;

const styles = StyleSheet.create({
    container: {
        width: "100%"
    },
    logs: {
        display: "flex",
        flexDirection: "column",

    },
    log: {
        display: "flex",
        flexDirection: "row",
        gap: 6,
        justifyContent: "space-between",
        borderRadius: 7,
        paddingVertical: 12,
        marginVertical: 6,
        // boxShadow: "2.5 2.5 0 0 #ffffff"
    },
    title: {
        fontFamily: "Medium",
        marginBottom: 12,
        fontSize: 16
    }
})