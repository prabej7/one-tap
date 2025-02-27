import { Text, View } from "@/components/Themed";
import { Document } from "@/constants/types";
import { Pressable, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Globe, Lock, LockOpen } from "lucide-react-native";
import Colors from "@/constants/Colors";

interface Props {
  document: Document;
  onPress: (id: string) => void;
}

const DocumentCard: React.FC<Props> = ({
  document: { name, path, visibility, id },
  onPress,
}) => {
  return (
    <Pressable style={styles.documentContainer} onPress={() => onPress(id)}>
      {visibility ? (
        <Globe color={Colors.light.text} style={styles.icon} size={18} />
      ) : (
        <Lock color={Colors.light.text} style={styles.icon} size={18} />
      )}
      <View style={styles.imgContainer}>
        <Image source={path} style={styles.img} />
      </View>
      <View style={styles.infoContainer}>
        <Text>{name}</Text>
      </View>
    </Pressable>
  );
};

export default DocumentCard;

const styles = StyleSheet.create({
  documentContainer: {
    gap: 12,
    width: 130,
    alignItems: "center",
  },
  img: {
    width: "100%",
    height: "100%",
    borderRadius: 7,
  },
  imgContainer: {
    width: 130,
    height: 130,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 7,
    overflow: "hidden",
    padding: 6,
  },
  infoContainer: {},
  name: {},
  icon: {
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 1,
    margin: 6,
  },
});
