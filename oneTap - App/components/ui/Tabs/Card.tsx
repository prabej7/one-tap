import { Text, View } from "@/components/Themed"
import { useDevTheme } from "@/hooks";
import { StyleSheet, Pressable } from "react-native";
import { CircleSmall, CreditCard, IdCard } from 'lucide-react-native';

import Colors from "@/constants/Colors";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const Card: React.FC = () => {
    const { uuid, fullName, createdAt, isBlocked } = useSelector((state: RootState) => state.user);
    const { primary, shadow } = useDevTheme();
    return <Pressable
        style={[
            styles.container,
            { backgroundColor: primary, boxShadow: shadow }]}
    >
        <View style={[{ backgroundColor: primary }, styles.head]}>
            <View style={[{ backgroundColor: primary }]}>
                <Text style={{ color: Colors.dark.text }} >Card No.: {uuid}</Text>
                <Text style={styles.name} >{fullName}</Text>
            </View>
            <View style={[{ backgroundColor: primary }]}  >
                <Text style={{ textAlign: "right", color: "white" }} >Issued on {"\n"} {new Date(createdAt).toLocaleDateString()}</Text>
            </View>
        </View>
        <View style={[{ backgroundColor: primary, display: "flex", justifyContent: "center", alignItems: "center" }]} >
            <Text style={styles.title} >ONE TAP</Text>
            <Text style={styles.subTitle} >TAP, STORE, PAY</Text>
            {/* <Image source={require("../../../assets/images/card.svg")} contentFit="contain" style={{ width: "100%", height: 60 }} /> */}

        </View>
        <View style={[{ backgroundColor: primary, display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }]} >
            <Text style={{ color: Colors.dark.text }} >Validity till {new Date(new Date(createdAt).setFullYear(new Date(createdAt).getFullYear() + 1)).toLocaleDateString()}</Text>
            <Text style={{ color: Colors.dark.text }}><CircleSmall fill="white" size={16} />{isBlocked ? "  Inactive" : "  Active"}  </Text>
        </View>
    </Pressable>
};

export default Card;

const styles = StyleSheet.create({
    container: {
        height: 160,
        width: "100%",
        borderRadius: 7,
        padding: 12,
        marginVertical: 24,
        justifyContent: "space-between",


    },
    name: {
        fontFamily: "Medium",
        color: Colors.dark.text
    },
    title: {
        fontFamily: "Black",
        fontSize: 28,
        textAlign: "center",
        color: Colors.dark.text
    },
    subTitle: {
        textAlign: "center",
        color: Colors.dark.text
    },
    head: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",

    },
})