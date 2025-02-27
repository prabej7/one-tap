import { RootState } from "@/store/store";
import { useSelector } from "react-redux";


const Docs: React.FC = () => {
    const documents = useSelector((state: RootState) => state.documents);
    // Function to handle print action
    const handlePrint = (src: string) => {
        window.open(src, '_blank');
    };

    return (
        <div className="flex w-full justify-center p-6">
            <table className="w-full bg-white overflow-hidden">
                <thead>
                    <tr className="bg-primary text-white">
                        <th className="py-3 px-6 text-left">Name</th>
                        <th className="py-3 px-6 text-left">Link</th>
                    </tr>
                </thead>
                <tbody className="max-h-24 overflow-hidden">
                    {documents.map(({ name, path }) => {
                        return (
                            <tr className="border border-t-0 border-gray-300 hover:bg-green-50 transition" key={name}>
                                <td className="py-3 px-6 font-light">{name}</td>
                                <td className="py-3 px-6 text-primary hover:underline cursor-pointer">
                                    <button onClick={() => handlePrint(path)}>Print</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Docs;
