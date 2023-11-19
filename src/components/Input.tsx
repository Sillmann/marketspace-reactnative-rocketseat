import { Input as NativeBaseInput, IInputProps } from 'native-base';

export function Input({...rest}:IInputProps){
  return(
    <NativeBaseInput
      h={12}
      w="90%"
      margin={4}
      bg="gray.700"
      borderWidth={1}
      fontSize="md"
      color="gray.100"
      fontFamily="body"
      placeholderTextColor="gray.500"
      {...rest}
    />
  );
}