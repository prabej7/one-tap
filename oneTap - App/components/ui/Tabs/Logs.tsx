import { Text, View } from "@/components/Themed";
import { useDevTheme } from "@/hooks";
import { StyleSheet, FlatList } from "react-native";
import { Logs as LogsIcon, } from 'lucide-react-native';
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import LogCard from "./LogCard";


interface Props {
    limit?: number;
}

const Logs: React.FC<Props> = ({ limit }) => {
    const { primary, text } = useDevTheme();
    const logs = useSelector((state: RootState) => state.logs);

    // Conditionally reverse logs only if `limit` is provided
    const displayedLogs = limit ? [...logs].reverse().slice(0, limit) : logs;

    return (
        <View style={{ width: "100%" }}>
            <Text style={[styles.title]}>
                {limit ? "RECENT LOGS" : (
                    <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
                        <LogsIcon color={text} size={24} />
                        <Text style={styles.heading}>LOGS</Text>
                    </View>
                )}
            </Text>


            <FlatList
                style={!limit && { height: 620 }}
                data={displayedLogs}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <LogCard item={item} isLimit={limit ? true : false} />}
                ListEmptyComponent={<Text style={{ textAlign: "center", marginVertical: 10, color: "gray" }}>No logs available.</Text>}

            />
        </View>
    );
};

export default Logs;

const styles = StyleSheet.create({
    logs: {
        flexDirection: "column",
    },
    log: {
        flexDirection: "row",
        gap: 6,
        borderRadius: 7,
        paddingVertical: 12,
        marginVertical: 6,
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        fontFamily: "Medium",
        marginBottom: 12,
        fontSize: 16,
        alignItems: "center",
    },
    heading: {
        fontFamily: "Bold",
        fontSize: 24
    }
});
