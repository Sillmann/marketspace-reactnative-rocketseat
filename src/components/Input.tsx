import { Input as NativeBaseInput, IInputProps } from 'native-base';

export function Input({...rest}:IInputProps){
  return(
    <NativeBaseInput
      h={12}
      w="full"
      bg="gray.700"
      px={4}
      borderWidth={1}
      fontSize="md"
      color="gray.100"
      fontFamily="body"
      mb={4}
      placeholderTextColor="gray.500"
      {...rest}
    />
  );
}