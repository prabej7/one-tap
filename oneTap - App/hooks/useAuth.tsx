import { api } from "@/constants/api";
import { set as setUser } from "@/store/slices/userSlice";
import { set as setDocument } from "@/store/slices/documentSlice";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import axios, { AxiosError } from "axios";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { setLogs } from "@/store/slices/logSlice";
import { setNotifications } from "@/store/slices/notificationSlice";

const useAuth = () => {
  const { getItem } = useAsyncStorage("token");
  const [isLoading, setLoading] = useState<boolean>(false);
  const { push } = useRouter();
  const dispatch = useDispatch();
  const [token, setToken] = useState<string>('');
  const { id } = useSelector((state: RootState) => state.user);

  const fetchUser = async () => {
    const storedToken = await getItem();

    if (!storedToken) {
      console.log("No TOken");
      setToken("");
      return push("/(auth)");
    }

    setToken(token);
    try {
      setLoading(true);
      const { data } = await axios.get(api + "user/" + storedToken);

      const { data: documentData } = await axios.get(api + "document", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      const { data: logsData } = await axios.get(api + "logs", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        }
      })

      const { data: notificationData } = await axios.get(api + "notification", {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        }
      })

      dispatch(setNotifications(notificationData.notifications))
      dispatch(setLogs(logsData.logs))
      dispatch(setUser(data.user));
      dispatch(setDocument(documentData.documents));
    } catch (error) {
      const { status } = error as AxiosError;
      if (status == 401) {
        console.log(status);
        return push("/(auth)");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) fetchUser();
  }, [token]);

  return { fetchUser, isLoading };
};

export default useAuth;
