import { Text, View } from "@/components/Themed"
import { AccountBody, AccountHead } from "@/components/ui";
import globalStyles from "@/constants/globalStyles";

const Settings: React.FC = () => {
    return <View style={globalStyles.container} >
        <AccountHead />
        <AccountBody />
    </View>
};

export default Settings;