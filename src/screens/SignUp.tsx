import { VStack, 
         Text, 
         Center, 
         Heading, 
         ScrollView,
         Image } from 'native-base';

import { useNavigation } from '@react-navigation/native';         

import LogoSvg from '@assets/logo.svg';
import Profile from "@assets/profile.png";
import { Input } from '@components/Input';
import { Button } from '@components/Button';

export function SignUp(){

  const navigation = useNavigation();

  function handleGoBack(){
    navigation.goBack();
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
          <Text fontSize={'xl'} color={'gray.100'} fontFamily="heading">Boas Vindas</Text>
          
          <Text 
            fontSize={'sm'} 
            color={'gray.300'} 
            fontFamily="body"
            textAlign='center'>
            Crie sua conta e use o espaço para comprar itens variados e vender seus produtos
          </Text>

          <Image 
            source={Profile} 
            alt="User Image" 
            mt={6}
          />

        </Center>

        <Center>

        <Input placeholder='Nome'/>

        <Input placeholder='E-mail'/>

        <Input placeholder='Telefone'/>

        <Input placeholder='Senha'/>

        <Input placeholder='Confirmar Senha'/>
        
        <Button 
          title='Criar'
        />

        <Text mt={12}>
          Já tem uma conta ?
        </Text>

        <Button 
          title='Ir para o login'
          variant="outline"
          onPress={handleGoBack}
        />

        </Center>
      </VStack>

    </ScrollView>

  )
}
