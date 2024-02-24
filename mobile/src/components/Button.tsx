import { Button as ButtonNativeBase, IButtonProps, Text } from 'native-base';

type Props = IButtonProps & {
  title: string;
}

export function Button({ title,variant,...rest}:Props){
  return(
    <ButtonNativeBase
      h={12}
      w='full'
      bg={variant === 'outline' ? 'gray.100' : 'gray.500'}
      
      _pressed={{
        bg:variant === 'outline' ? 'gray.400' : 'blue.default'
      }}
      {...rest}
    >
      <Text
        color={variant === 'outline' ? 'white' : 'black'}
        fontFamily='heading'
        fontSize='sm'
      >
        {title}
      </Text>
    </ButtonNativeBase>  
  );
}