import { Text, View } from "@/components/Themed";
import { StyleSheet } from 'react-native'
const Line: React.FC = () => {
    return <View style={{ flexDirection: "row", alignItems: "center", marginVertical: 12 }} >
        <View style={styles.line} ></View>
        <Text style={{ marginHorizontal: 12 }} >Or</Text>
        <View style={styles.line} ></View>
    </View>
};

export default Line;

const styles = StyleSheet.create({
    line: {
        flex: 1,
        height: 1,
        backgroundColor: "grey"
    },
})