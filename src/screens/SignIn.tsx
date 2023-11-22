import { useState } from 'react';
import { VStack, Text, Center, Heading, ScrollView, useToast } from 'native-base';

import { useNavigation } from '@react-navigation/native';
import { AuthNavigatorRoutesProps } from '@routes/auth.routes';

import LogoSvg from '@assets/logo.svg';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

import { api } from '@services/api';

import { useAuth } from '@hooks/useAuth';
import { AppError } from '@utils/AppError';

export function SignIn(){

  const { signIn } = useAuth();

  const toast = useToast();

  const [email, setEmail ] = useState('');
  const [password, setPassword ] = useState('');  

  const navigation = useNavigation<AuthNavigatorRoutesProps>();

  function handleNewAccount(){
    navigation.navigate('signUp');
  }

  async function handleSignIn() {

    try {
      await signIn(email, password );
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não possível foi entrar. Por favor tente novamente mais tarde.";

      if (isAppError) {
        toast.show({
          title,
          placement: "top",
          bgColor: "red.500",
        });
      }
    }

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

        <Input 
          placeholder='E-mail'
          onChangeText={setEmail}
        />

        <Input 
          placeholder='Senha'
          onChangeText={setPassword}
          secureTextEntry
        />        

        <Button 
          title='Acessar'
          onPress={handleSignIn}
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
