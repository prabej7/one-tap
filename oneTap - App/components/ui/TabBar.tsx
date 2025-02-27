import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { View, Text } from "../Themed";
import { TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";
import {
    Feather,
    MaterialIcons,
    Ionicons,

} from "@expo/vector-icons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useDevTheme } from "@/hooks";
import { House, File, CirclePlus, Logs, UserRoundCog } from 'lucide-react-native'
interface Props extends BottomTabBarProps { }

interface IconProps {
    focused: boolean;
    color: string;
    size: number;
}

const TabBar: React.FC<Props> = ({ state, descriptors, navigation }) => {
    const { primary, text, background } = useDevTheme();
    const icons: Record<string, (props: IconProps) => JSX.Element> = {
        index: (props) => <House color={props.color} size={25} />,
        docs: (props) => (<File size={25} color={props.color} />),
        add: (props) => <CirclePlus color={props.color} size={25} />,
        logs: (props) => (<Logs color={props.color} size={25} />),
        settings: (props) => (<UserRoundCog color={props.color} size={25} />),
    };

    return (
        <View style={[styles.navBar, { backgroundColor: background }]}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: "tabLongPress",
                        target: route.key,
                    });
                };

                const label =
                    typeof options.tabBarLabel === "string"
                        ? options.tabBarLabel
                        : typeof options.tabBarLabel === "function"
                            ? options.tabBarLabel({
                                focused: state.index === index,
                                color: isFocused ? primary : text,
                                position: "below-icon",
                                children: route.name,
                            })
                            : options.title !== undefined
                                ? options.title
                                : route.name;

                const IconComponent = icons[route.name]; // Get the correct icon function

                return (
                    <TouchableOpacity
                        key={route.key}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={styles.tabBarItem}
                    >
                        {IconComponent && (
                            <IconComponent
                                focused={isFocused}
                                color={isFocused ? primary : text}
                                size={25}
                            />
                        )}
                        <Text
                            style={{
                                color: isFocused ? primary : text,
                                fontFamily: "Regular",
                            }}
                        >
                            {label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

export default TabBar;

const styles = StyleSheet.create({
    navBar: {
        position: "absolute",
        bottom: 25,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 25,
        shadowColor: "black",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
        shadowOpacity: 0.1,
    },
    tabBarItem: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});