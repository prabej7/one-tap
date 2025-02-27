import { View } from "@/components/Themed";

const Catcher: React.FC = () => {
  return (
    <View
      style={{ justifyContent: "center", width: "100%", alignItems: "center" }}
    >
      <View
        style={{
          backgroundColor: "gray",
          height: 8,
          width: 100,
          borderRadius: 7,
          opacity: 0.5,
        }}
      ></View>
    </View>
  );
};

export default Catcher;
