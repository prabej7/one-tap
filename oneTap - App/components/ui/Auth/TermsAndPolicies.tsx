import { Text } from "@/components/Themed"

const TermAndPolicy: React.FC = () => {
    return <Text style={{ textAlign: "center", paddingVertical: 12 }} >By continuing you agree to to our{"\n"} <Text style={{ fontFamily: "SemiBold" }} >Terms and Service</Text> and <Text style={{ fontFamily: "SemiBold" }} >Privacy Policy.</Text></Text>
};

export default TermAndPolicy