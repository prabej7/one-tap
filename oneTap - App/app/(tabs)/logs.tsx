import { Text, View } from "@/components/Themed"
import { RecentLogs } from "@/components/ui";
import globalStyles from "@/constants/globalStyles"

const Logs: React.FC = () => {
    return <View style={globalStyles.container} >
        <RecentLogs />
    </View>
};

export default Logs;