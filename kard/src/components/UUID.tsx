interface Props {
    uuid?: string
}
const UUID: React.FC<Props> = ({ uuid }) => {
    return <div className="flex justify-center" >
        <p className="font-light text-sm text-slate-700" >{uuid ? <>UUID: <span className="font-bold" >{uuid}</span></> : "Place your card..."}</p></div>
};

export default UUID;