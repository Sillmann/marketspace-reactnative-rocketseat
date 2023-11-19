import { TouchableOpacity } from "react-native";
import { HStack, VStack, Text, Image } from "native-base";

import { UserPhoto } from "./UserPhoto";
import { Button } from "@components/Button";

import defaultUserPhotoImg from '@assets/profile.png';
import AdsSvg from '@assets/ads.svg';
import IconRight from '@assets/iconright.png';

export function HomeHeader() {
  return(

    <VStack 
      flex={1}
      p={3}>


    <HStack 
      bg='gray.600'
      pt={16}
      pb={5}
      px={8}
      alignItems='center'
      w="full"
    >

      <UserPhoto
        source={{ uri: 'https://github.com/sillmann.png'}}
        size={16}
        alt="User Image"
        mr={4}
      />

      <VStack
        mr={5}
      >
        <Text color='gray.100'>Boas Vindas</Text>
        <Text color='gray.100'>Silvio</Text>
      </VStack>

      <Button 
        title="Criar anúncio"
        variant="outline"
        width="120"
      />

    </HStack>



    <Text 
      color="gray.300" 
      fontSize={16} 
      mt={5}
      alignItems="center"
      >Seus produtos anunciados para venda
    </Text>

    <HStack
      alignItems='center'
      bg="gray.500"
      w="327"
      h="66"
      pl="6"
    >
      
      {/* <Image source={{ uri: 'https://github.com/sillmann.png'}} color="#000" size="16" alt="imagem"/> */}

      <AdsSvg 
        height={22}
        width={22}
        fill="#647AC7"
      />

      <VStack
        pl="3"
        pr="6"
      >
        <Text>4</Text>
        <Text>anúncios ativos</Text>
      </VStack>

      <TouchableOpacity>
        <HStack
          alignItems="center"
        >

        <Text>Meus anúncios</Text>
        <Image 
          source={IconRight}
          alt="My Ads"
          ml={3}
        />

        </HStack>
      </TouchableOpacity>

    </HStack>

    <Text 
      color="gray.300" 
      fontSize={16} 
      >Compre produtos variados
    </Text>  


    </VStack>  


  )
}