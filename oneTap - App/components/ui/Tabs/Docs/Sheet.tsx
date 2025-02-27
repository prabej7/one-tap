import { View, Modal, StyleSheet, TouchableWithoutFeedback } from "react-native";

interface Props {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode
}

const Sheet: React.FC<Props> = ({ open, onClose, children }) => {
    return (
        <Modal animationType="slide" transparent visible={open} onRequestClose={onClose}>
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={styles.overlay}>
                    <TouchableWithoutFeedback>

                        {children}

                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContainer: {
        height: "50%",
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },
});

export default Sheet;
