import { VStack, Text, Center, Heading } from 'native-base';

import LogoSvg from './../assets/logo.svg';

export function SignIn(){
  return(
    <VStack flex={1}>
      <Center my={24}>
        <LogoSvg />
        <Text fontSize={'xl'} color={'gray.100'} fontFamily="heading">marketspace</Text>
        <Text fontSize={'sm'} color={'gray.300'} fontFamily="body">Seu espaço de compra e venda</Text>
      </Center>
      <Center>
      <Heading fontSize={'lg'} color={'gray.100'} fontFamily="heading">
        Acesse sua conta
      </Heading>
      </Center>
    </VStack>
  )
}
