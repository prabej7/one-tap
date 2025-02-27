import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';


const useBiometricAuth = () => {
    const [isBiometricSupported, setIsBiometricSupported] = useState(false);

    useEffect(() => {
        (async () => {
            const compatible = await LocalAuthentication.hasHardwareAsync();
            setIsBiometricSupported(compatible);
        })();
    }, []);

    const handleBiometricAuth = async () => {
        try {

            const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
            if (!savedBiometrics) {
                return true;
                return Alert.alert('No Biometrics Found', 'Please set up biometric authentication on your device.');
            }


            const authResult = await LocalAuthentication.authenticateAsync({
                promptMessage: 'Authenticate with Biometrics',
                fallbackLabel: 'Enter Password',
            });

            if (authResult.success) {
                return true;
            } else {
                return false
            }
        } catch (error) {
            Alert.alert('Error', 'An error occurred during authentication.');
            console.error(error);
        }
    };

    return { handleBiometricAuth };
};

export default useBiometricAuth;