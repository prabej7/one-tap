import { Text, View } from "@/components/Themed";
import { useDevTheme } from "@/hooks";
import { CirclePlus, File, Search, X } from "lucide-react-native";
import { StyleSheet } from "react-native";
import { useState } from "react";
import AddDocument from "./AddDocument";

interface Props {
  onSearch: () => void;
}

const DocHead: React.FC<Props> = ({ onSearch }) => {
  const [isSearch, setSearch] = useState<boolean>(false);
  const { text } = useDevTheme();
  const [isAdd, setAdd] = useState<boolean>(false);

  const toggleSearch = () => {
    setSearch(!isSearch);
    onSearch();
  };

  return (
    <View style={styles.container}>
      <View
        style={{ flexDirection: "row", gap: 12, alignItems: "center" }}
      >
        <File color={text} size={24} />
        <Text style={styles.title}>Documents</Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
        <CirclePlus
          color={text}
          size={24}
          onPress={() => {
            setAdd(true);
          }}
        />
        {isSearch ? (
          <X color={text} size={24} onPress={toggleSearch} />
        ) : (
          <Search color={text} size={24} onPress={toggleSearch} />
        )}
        <AddDocument open={isAdd} onClose={() => setAdd(false)} />
      </View>
    </View>
  );
};

export default DocHead;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 6,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
    textAlign: "left",
    fontFamily: "Bold",
  },
});
