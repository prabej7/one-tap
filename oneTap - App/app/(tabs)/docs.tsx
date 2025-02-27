import { View } from "@/components/Themed"
import { DocHead, DocumentBody } from "@/components/ui";
import globalStyles from "@/constants/globalStyles";
import { useState } from "react";

const Docs: React.FC = () => {
    const [isSearch, setSearch] = useState<boolean>(false);

    return <View style={globalStyles.container} >
        <DocHead onSearch={() => setSearch(!isSearch)} />
        <DocumentBody search={isSearch} />
    </View>
};

export default Docs;

