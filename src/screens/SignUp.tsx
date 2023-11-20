import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { VStack, 
         Text, 
         Center, 
         useToast, 
         ScrollView,
         Image } from 'native-base';

import { useNavigation } from '@react-navigation/native';         

import LogoSvg from '@assets/logo.svg';
import Profile from "@assets/profile.png";
import { Input } from '@components/Input';
import { Button } from '@components/Button';

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import { api } from '@services/api';

export function SignUp(){

  const toast = useToast();

  type userImageSelectedProps = {
    selected: boolean;
    photo: {
      uri: string;
      name: string;
      type: string;
    };
  };

  const [userImageSelected, setUserImageSelected] = useState({
    selected: false,
  } as userImageSelectedProps);

  const userForm = new FormData();

  const [name, setName ] = useState('');
  const [email, setEmail ] = useState('');
  const [tel, setTel ] = useState('');
  const [password, setPassword ] = useState('');
  const [passwordConfirm, setPasswordConfirm ] = useState('');

  const navigation = useNavigation();

  function handleGoBack(){
    navigation.goBack();
  }

async function handleSignUp() {

    const avatar = {
      ...userImageSelected.photo,
      name: `${name}.${userImageSelected.photo.name}`.toLowerCase(),
    };    

    userForm.append("avatar", avatar);
    userForm.append("name", name.toLowerCase());
    userForm.append("email", email.toLowerCase());
    userForm.append("tel", tel);
    userForm.append("password", password);    

    console.log('userForm');
    console.log(userForm);

    await api.post("/users", userForm, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    // try{
    //   const response = await api.post('/users',{ avatar, name, email, tel, password },
    //     {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },  
    //     }    
    //   );
    //   console.log(response.data);
    // } catch (error) {
    //     console.log(error);
    // }
  }

  const handleUserPhotoSelect = async () => {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (photoSelected.canceled) {
        return;
      }

      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(
          photoSelected.assets[0].uri
        );

        if (photoInfo.size && photoInfo.size / 1024 / 1024 > 5) {
          return toast.show({
            title: "Essa imagem é muito grande. Escolha uma de até 5MB.",
            placement: "top",
            bgColor: "red.500",
          });
        }

        const fileExtension = photoSelected.assets[0].uri.split(".").pop();

        const photoFile = {
          name: `${fileExtension}`.toLowerCase(),
          uri: photoSelected.assets[0].uri,
          type: `${photoSelected.assets[0].type}/${fileExtension}`,
        } as any;

        setUserImageSelected({
          selected: true,
          photo: { ...photoFile },
        });

        toast.show({
          title: "Foto selecionada!",
          placement: "top",
          bgColor: "green.500",
        });
      }
    } catch (error) {
      toast.show({
        title: "Erro! Tente novamente mais tarde!",
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      // setIsLoading(false);
    }
  };  

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

          <TouchableOpacity onPress={handleUserPhotoSelect}>

            {userImageSelected.selected ? (
                <Image
                  w="20"
                  h="20"
                  borderRadius="full"
                  borderWidth="2"
                  borderColor="blue.light"
                  source={{
                    uri: userImageSelected.photo.uri,
                  }}
                  alt="User Image"
                />
              ) : (

              <Image 
                source={Profile} 
                alt="User Image" 
                mt={6}
              />
              )}

          </TouchableOpacity>

        </Center>

        <Center>

        <Input 
          placeholder='Nome'
          onChangeText={setName}
        />

        <Input 
          placeholder='E-mail'
          onChangeText={setEmail}
        />

        <Input 
          placeholder='Telefone'
          onChangeText={setTel}
        />

        <Input 
          placeholder='Senha'
          onChangeText={setPassword}
          secureTextEntry
        />

        <Input 
          placeholder='Confirmar Senha'
          onChangeText={setPasswordConfirm}
          secureTextEntry
        />
        
        <Button 
          title='Criar'
          onPress={handleSignUp}
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
