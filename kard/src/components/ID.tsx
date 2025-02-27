import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

const ID: React.FC = () => {

    const { iid } = useSelector((state: RootState) => state.user)
    
    return <div className="flex justify-center items-center h-48" >
        <img src={iid} className="h-52 mt-6 rounded"  />
    </div>
};

export default ID;