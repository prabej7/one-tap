import { View } from "@/components/Themed";
import { FlatList } from "react-native";
import NotificationCard from "./NotificationCard";
import { Separator } from "tamagui";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export interface NotificationType {
  title: string;
  date: string;
  accessedBy: string;
  isSeen: boolean;
}

const Body: React.FC = () => {
  const notifications = useSelector((state: RootState)=> state.notification);
  
  return (
    <View style={{ marginTop: 12 }}>
      <View>
        <FlatList
          data={notifications}
          renderItem={({ item }) => <NotificationCard data={item} />}
          ItemSeparatorComponent={() => (
            <View
              style={{ width: "100%", height: 0.5, backgroundColor: "gray" }}
            />
          )}
        />
      </View>
    </View>
  );
};

export default Body;
