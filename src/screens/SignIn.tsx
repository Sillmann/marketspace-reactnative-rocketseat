import { VStack, Text, Center, Heading } from 'native-base';

import LogoSvg from '@assets/logo.svg';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

export function SignIn(){
  return(
    <VStack 
      flex={1}>
      <Center my={24}>
        <LogoSvg />
        <Text fontSize={'xl'} color={'gray.100'} fontFamily="heading">marketspace</Text>
        <Text fontSize={'sm'} color={'gray.300'} fontFamily="body">Seu espaço de compra e venda</Text>
      </Center>
      <Center>
      <Heading fontSize={'lg'} color={'gray.100'} fontFamily="heading" marginBottom={6}>
        Acesse sua conta
      </Heading>

      <Input placeholder='e-mail'/>

      <Input placeholder='senha'/>

      <Button 
        title='Acessar'
      />

      </Center>
    </VStack>
  )
}
