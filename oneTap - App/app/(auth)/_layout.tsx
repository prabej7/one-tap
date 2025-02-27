import { Stack } from "expo-router"

const _layout = () => {
    return <Stack screenOptions={{ headerShown: false }} >
        <Stack.Screen name="index" />
        <Stack.Screen name="register" />
        <Stack.Screen name="info"   />
    </Stack>
};

export default _layout;