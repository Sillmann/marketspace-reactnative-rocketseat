import { TouchableOpacity } from "react-native";
import { HStack, VStack, Text, Image } from "native-base";

import { UserPhoto } from "./UserPhoto";
import { Button } from "@components/Button";

import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';

import defaultUserPhotoImg from '@assets/profile.png';
import AdsSvg from '@assets/ads.svg';
import IconRight from '@assets/iconright.png';

import { useAuth } from '@hooks/useAuth';

import { api } from '@services/api'
import { AppError } from '@utils/AppError'


export function HomeHeader() {

  const { user, signOut } = useAuth();

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleNew(){
    navigation.navigate('new');
  }


  return(

    <VStack 
      p={3}
    >

      <HStack 
        bg='gray.600'
        pt={16}
        pb={5}
        px={8}
        alignItems='center'
        w="full"
      >

        <UserPhoto
          source={{ uri: `${api.defaults.baseURL}/images/${user.avatar}`}}
          size={16}
          alt="User Image"
          mr={4}
        />

        <VStack
          mr={5}
        >
          <Text color='gray.100'>Boas Vindas</Text>
          <Text color='gray.100'>{user.name}</Text>
        </VStack>

        <Button 
          title="Criar anúncio"
          variant="outline"
          width="120"
          onPress={handleNew}
        />

      </HStack>

      <Text 
        color="gray.300" 
        fontSize={16} 
        >Compre produtos variados
      </Text>  

    </VStack>  

)
}