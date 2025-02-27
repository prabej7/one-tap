import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Docs, Head, ID, Payment, UUID } from "./components";
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { fillUpForm } from "./mods";
import { esewaLoginBtn, khaltiLoginBtn } from "./constants";
import axios from 'axios'
import { api, base_url } from "./constants/api";
import { useDispatch } from "react-redux";
import { set } from "./store/slices/userSlice";
import { setDocuments } from "./store/slices/documentSlice";

const socket = io(base_url);
gsap.registerPlugin(useGSAP);

export type Page = "docs" | "payment" | "id";

function App() {
  const dispatch = useDispatch();
  const [uuid, setUUID] = useState<string>("");
  const [page, setPage] = useState<Page>("id");
  const [declinedMessage, setDeclineMessage] = useState<string>("");
  useEffect(() => {
    socket.on("connect", () => {
      socket.emit("id", { uuid: "B55H001" });
    })

    socket.on("accept", async (data: { uuid: string }) => {
      try {
        const { data: userData } = await axios.get(api + "user-by-uuid/" + data.uuid);

        if (userData.user.isBlocked) {
          setDeclineMessage("Card is deactivated.");
          return;
        }

        dispatch(set(userData.user));

        const { data: documentData } = await axios.get(api + "document-by-uuid/" + data.uuid);

        dispatch(setDocuments(documentData.documents))
        setUUID(data.uuid);
        gsap.to(".main", { height: "400px", duration: 0.5, ease: "power1.inOut" });
      } catch {
        setDeclineMessage("Something went wrong!");
      }

    });

    socket.on("decline", () => {
      setDeclineMessage("User declined!")
    })

    socket.on("uuid", (uuid) => {
      setUUID(uuid);
      gsap.to(".main", { height: "400px", duration: 0.5, ease: "power1.inOut" });
    });

    return () => {
      socket.off("uuid");
    };

    //eslint-disable-next-line
  }, [socket]);

  const onCommandClick = (name: Page) => {
    setPage(name);
  }

  const onPayment = (name: string) => {
    if (name == "esewa") {
      fillUpForm("9823114749", "2265", "username", "password", esewaLoginBtn);
    } else if (name == "khalti") {
      fillUpForm("9845", "4444", "id", "password", khaltiLoginBtn);
    }
  }

  useEffect(() => {
    if (uuid)
      gsap.to(".main", { height: "400px", duration: 0.5, ease: "power1.inOut" });
  }, [uuid]);

  return (
    <div className={`h-[120px] w-64 p-6 transition-all ease-in-out main`} >
      <Head selected={page} uuid={uuid} onClick={onCommandClick} />
      <UUID uuid={uuid} />
      {declinedMessage && <p className="text-red-500 font-light absolute pl-12" >{declinedMessage}</p>}
      {uuid &&
        <>
          {page == "payment" && <Payment onSubmit={onPayment} />}
          {page == "docs" && <Docs />}
          {page == "id" && <ID />}
        </>}

    </div>
  );
}

export default App;
