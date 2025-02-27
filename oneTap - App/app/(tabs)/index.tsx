import Alert from "@/components/Alert";
import { Text, View } from "@/components/Themed";
import { Card, Head, RecentDocs, RecentLogs } from "@/components/ui";
import Sheet from "@/components/ui/Tabs/Docs/Sheet";
import { base_api } from "@/constants/api";
import globalStyles from "@/constants/globalStyles";
import { useAuth, useBiometricAuth } from "@/hooks";
import { RootState } from "@/store/store";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";

// Initialize socket once outside the component
const socket = io(base_api, {
  transports: ["websocket"], // Use WebSocket
  reconnection: true, // Enable auto-reconnection
  reconnectionAttempts: 5, // Retry 5 times
  reconnectionDelay: 3000, // Delay 3 seconds before retrying
});

export interface AlertType {
  uuid: string;
  sender: string;
}

export default function TabOneScreen() {
  const { fetchUser } = useAuth();
  const { uuid } = useSelector((state: RootState) => state.user);
  const [alert, setAlert] = useState<AlertType | null>(null);
  const alertRef = useRef<AlertType | null>(null);

  const { handleBiometricAuth } = useBiometricAuth();

  const handleUUID = useCallback(
    (newLog: AlertType) => {
      console.log("Received alert:", newLog);

      // Prevent setting the same alert multiple times
      if (alertRef.current?.uuid === newLog.uuid) return;

      alertRef.current = newLog;
      setAlert(newLog); // Update state once
      fetchUser();
    },
    [fetchUser]
  );



  useEffect(() => {
    console.log("Setting up socket connection...");


    const handleConnect = () => {
      console.log("Socket Connected!");
      socket.emit("id", { uuid });
    };


    if (socket.connected) {
      handleConnect();
    }

    socket.on("connect", handleConnect);

    socket.on("disconnect", () => {
      console.log("Socket disconnected!");
    });

    // Setup the uuid event handler
    if (!alert)
      socket.on("uuid", handleUUID);

    return () => {
      console.log("Cleaning up socket listeners...");
      socket.off("connect", handleConnect);
      socket.off("disconnect");
      socket.off("uuid", handleUUID); // Clean up the uuid listener
    };
  }, [uuid]); // Depend on uuid and handleUUID

  const onAccept = async () => {
    if (await handleBiometricAuth()) {
      socket.emit("accept", {
        receiver: alert?.sender,
        uuid,
      });
      setAlert(null);
      fetchUser();
    }
  };

  const onDecline = async () => {
    socket.emit("decline", {
      receiver: alert?.sender,
      uuid,
    });
    setAlert(null);
    fetchUser();
  };

  return (
    <View style={[globalStyles.container, { gap: 18 }]}>
      <Head />
      <Card />
      <View style={{ width: "100%", height: 0.5, backgroundColor: "gray" }} />
      <RecentLogs limit={1} />
      <View style={{ width: "100%", height: 0.5, backgroundColor: "gray" }} />
      <RecentDocs />
      <View style={{ width: "100%", height: 0.5, backgroundColor: "gray" }} />

      {alert?.uuid && (
        <Sheet
          open={Boolean(alert)}
          onClose={() => {
            alertRef.current = null;
            setAlert(null);
          }}
        >

          <Alert uuid={alert?.sender} onAccept={onAccept} onDecline={onDecline} />
        </Sheet>
      )}
    </View>
  );
}