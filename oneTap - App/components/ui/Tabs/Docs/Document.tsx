import { Text, View } from "@/components/Themed";
import { Document as DocumentType } from "@/constants/types";
import { useAuth, useDevTheme } from "@/hooks";
import { Image } from "expo-image";
import { Globe, Lock, LockOpen, Trash2 } from "lucide-react-native";
import { ActivityIndicator, StyleSheet } from "react-native";
import Button from "../../Button";
import { useState } from "react";
import ErrorText from "../../ErrorText";
import axios from "axios";
import { api } from "@/constants/api";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import { primary } from "@/constants/Colors";

interface Props {
  document: DocumentType;
  onClose: () => void;
}

const Document: React.FC<Props> = ({
  document: { id, name, path, createdAt, visibility }, onClose
}) => {
  const { text, red } = useDevTheme();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const { getItem } = useAsyncStorage("token");
  const [isDeleting, setDeleting] = useState<boolean>(false);
  const { fetchUser } = useAuth();

  const onVisibility = async () => {
    setLoading(true);
    try {
      axios.patch(
        api + "document/visibility",
        { id },
        {
          headers: {
            Authorization: `Bearer ${await getItem()}`,
          },
        }
      );
      fetchUser();
      onClose();
    } catch (error) {
      console.log(error);
      setError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    setDeleting(true);
    try {
      await axios.delete(api + `document/${id}`, {
        headers: {
          Authorization: `Bearer ${await getItem()}`,
        }
      })
      fetchUser();
      onClose();
    } catch (error) {
      setError("Something went wrong!");
    } finally {
      setDeleting(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingRight: 12 }} >


        <View style={styles.infoContainer}>
          <Text style={styles.name}>{name}</Text>
          <View style={{ flexDirection: "row", gap: 3, alignItems: "center" }}>
            {visibility ? (
              <Globe color={text} size={14} />
            ) : (
              <Lock color={text} size={14} />
            )}
            <Text>{visibility ? "Public" : "Private"}</Text>
            <Text> | {new Date(createdAt).toLocaleString()}</Text>
          </View>
          <ErrorText>{error}</ErrorText>
        </View>
        {isDeleting ? <ActivityIndicator size="large" color={primary} /> : <Trash2 color={red} size={28} strokeWidth={1.5} onPress={onDelete} />}

      </View>
      <View style={styles.imgContainer}>
        <Image source={path} style={styles.img} contentFit="contain" />
      </View>

      <View style={{ paddingHorizontal: 24 }}>
        <Button variant="primary" onPress={onVisibility} disabled={isLoading}>
          {visibility ? "Change to Private" : "Change to Public"}
        </Button>
      </View>
    </View>
  );
};

export default Document;

const styles = StyleSheet.create({
  container: {
    height: 600,
    paddingHorizontal: 12,
  },
  img: {
    height: undefined,
    width: "100%",
    aspectRatio: 1,
  },
  name: {
    fontFamily: "Bold",
    fontSize: 24,
  },
  infoContainer: {
    padding: 24,
  },
  imgContainer: {
    marginVertical: 24,
  },
});
