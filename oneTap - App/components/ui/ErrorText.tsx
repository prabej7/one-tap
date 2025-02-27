import { Text, TextProps } from "../Themed";

const ErrorText: React.FC<TextProps> = (props) => {
  return (
    <Text {...props} lightColor="#f44336" darkColor="#f44336">
      {props.children}
    </Text>
  );
};

export default ErrorText;
