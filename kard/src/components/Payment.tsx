import { useState } from "react";

interface Props {
    onSubmit: (payment: string) => void;
}

const Payment: React.FC<Props> = ({ onSubmit }) => {
    const [payment, setPayment] = useState<string>("esewa");

    const payments: { name: string; value: string }[] = [
        {
            name: "Esewa",
            value: "esewa"
        },
        {
            name: "Khalti",
            value: "khalti"
        }
    ];

    return <div>
        <form className="max-w-sm mx-auto flex flex-col justify-center gap-3 mt-3 h-44" onSubmit={(e) => {
            e.preventDefault();

            onSubmit(payment);
        }} >
            <label className="font-light text-slate-700"  >Select a payment:</label>
            <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-slate-700 dark:focus:ring-green-500 dark:focus:green-blue-500" onChange={(e) => setPayment(e.target.value)} >
                {payments.map(({ name, value }) => {
                    return <option key={name} value={value}  >{name}</option>
                })}
            </select>
            <button type="submit" className="text-white bg-primary hover:bg-primary focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-violet-900 dark:green:bg-blue-700 focus:outline-none dark:focus:bg-primary w-full cursor-pointer"  >Login</button>
        </form>

    </div>
};

export default Payment;