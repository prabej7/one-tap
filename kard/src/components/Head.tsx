import { CreditCard, File, IdCard } from 'lucide-react'
import { useEffect } from 'react';
import gsap from 'gsap';
import { Page } from '@/App';

interface Props {
    uuid: string;
    onClick: (name: Page) => void;
    selected: Page;
}

const Head: React.FC<Props> = ({ uuid, onClick, selected }) => {

    const options: { name: string; icon: React.ReactNode, }[] = [
        {
            name: "payment",
            icon: <CreditCard size={25} />,

        },
        {
            name: "docs",
            icon: <File size={25} />,

        },
        {
            name: "id",
            icon: < IdCard />,

        }
    ];

    useEffect(() => {
        if (uuid) {
            setTimeout(() => {
                gsap.to(".options", { display: "flex" })
            }, 500);

        }
    }, [uuid]);


    return <div>
        <div className="flex flex-col justify-center items-center" >
            <h1 className=" text-3xl font-black text-primary" >Kard</h1>
            <p className="text-xs font-light text-slate-700" >"Your personal decentralized wallet."</p>
        </div>
        {uuid && <div className='hidden justify-between my-6 options' >
            {options.map(({ icon, name }) => {
                return <div key={name}
                    className={`bg-primary p-2 rounded-full ${selected == name ? "text-white" : "text-slate-700"}`}
                    onClick={() => onClick(name.toLowerCase() as Page)}
                >
                    {icon}
                </div>;
            })}
        </div>}

    </div>
};

export default Head;