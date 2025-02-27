import { View } from "@/components/Themed"
import { Image } from 'expo-image';
import { StyleSheet } from 'react-native'

interface Props {
    path: any
}

const Cover: React.FC<Props> = ({ path }) => {
    return <View>
        <Image source={path} style={styles.image} contentFit="contain" />
    </View>
};

export default Cover;

const styles = StyleSheet.create({
    image: {
        width: "100%",
        maxWidth: 270,
        height: undefined,
        aspectRatio: 1
    },
})