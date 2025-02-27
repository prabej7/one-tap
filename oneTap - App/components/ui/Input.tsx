import { useDevTheme } from '@/hooks';
import { InputProps, Input as InputTamangUI } from 'tamagui';

const Input: React.FC<InputProps> = (props) => {
    const { primary, offBg, text } = useDevTheme();
    return <InputTamangUI {...props} style={{ fontFamily: "Regular" }} focusStyle={{ borderColor: primary }} borderColor={"#b8b5f7"} backgroundColor={offBg} color={text}  />
};

export default Input;

