import { VStack, Text, Center, Heading, ScrollView } from 'native-base';

import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorRoutesProps } from '@routes/auth.routes';

import LogoSvg from '@assets/logo.svg';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

export function SignIn(){

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleNewAccount(){
    navigation.navigate('signUp');
  }

  return(
    <ScrollView
      contentContainerStyle={{ flexGrow: 1}}
      showsVerticalScrollIndicator={false}
    >

      <VStack 
        flex={1}
        pb={12}
        px={6}
      >

        <Center my={12}>
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

        <Text mt={24}>
          Ainda não tem acesso ?
        </Text>

        <Button 
          title='Criar uma conta'
          variant="outline"
          onPress={handleNewAccount}
        />

        </Center>
      </VStack>

    </ScrollView>

  )
}
