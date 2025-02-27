import { Text, View } from "@/components/Themed";
import { RootState } from "@/store/store";
import { FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import DocumentCard from "./DocumentCard";
import { useEffect, useState } from "react";
import { DocumentState } from "@/store/slices/documentSlice";
import Sheet from "./Sheet";
import Document from "./Document";
import Input from "../../Input";
import Button from "../../Button";
import { Search } from "lucide-react-native";
import Colors from "@/constants/Colors";

interface Props {
  search: boolean;
}

const Body: React.FC<Props> = ({ search }) => {
  const [query, setQuery] = useState<string>("");
  const [filteredDocs, setFilteredDocs] = useState<DocumentState[]>([]);
  const documents = useSelector((state: RootState) => state.document);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedDocument, selectDocument] = useState<DocumentState>();

  const onSelect = (id: string) => {
    const document = documents.find((doc) => doc.id == id);
    if (document) {
      selectDocument(document);
      setOpen(true);
    }
  };

  useEffect(() => {
    if (query == "" || !search) {
      setFilteredDocs([]);
      return;
    }

    const fdocs = documents.filter((doc) =>
      doc.name.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredDocs(fdocs);
  }, [query, search]);

  return (
    <View style={styles.docs}>
      {search && (
        <View
          style={{
            flexDirection: "row",
            maxWidth: "100%",
            marginVertical: 12,
            marginBottom: 36,
            gap: 12,
          }}
        >
          <Input placeholder="Search" flex={1} onChangeText={setQuery} />
          <Button
            variant="primary"
            icon={<Search color={Colors.dark.text} />}
          ></Button>
        </View>
      )}

      {selectedDocument && (
        <Sheet
          children={<Document document={selectedDocument} onClose={() => selectDocument(undefined)} />}
          onClose={() => {
            setOpen(false);
            selectDocument(undefined);
          }}
          open={open}
        />
      )}
      <FlatList
        data={query && filteredDocs.length > 0 ? filteredDocs : documents}
        renderItem={({ item }) => (
          <DocumentCard document={item} onPress={onSelect} />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={{ gap: 12 }}
        ListEmptyComponent={<Text style={{ color: "gray", textAlign: "center" }} >No documents available.</Text>}
      />
    </View>
  );
};

export default Body;

const styles = StyleSheet.create({
  docs: {
    width: "100%",
    padding: 24,
  },
  row: {
    justifyContent: "space-between",
  },
});
