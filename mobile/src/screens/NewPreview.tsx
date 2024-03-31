import { Dimensions } from "react-native";

import { Center, ScrollView, Text, VStack, Image, HStack, Heading, useToast } from 'native-base';

import Carousel from "react-native-reanimated-carousel";
import { api } from "@services/api";
import { AppError } from "@utils/AppError";

import { UserPhoto } from "@components/UserPhoto";
import { useAuth } from '@hooks/useAuth';

import { useNavigation, useRoute } from "@react-navigation/native";
import { AppStackNavigatorRoutesProps } from "@routes/app.routes";

import { Button } from "@components/Button";

type RouteParams = {
  title: string;
  description: string;
  price: string;
  images: any[];
  paymentMethods: string[];
  isNew: boolean;
  acceptTrade: boolean;
};

export function NewPreview(){

  const navigation = useNavigation<AppStackNavigatorRoutesProps>();

  const toast = useToast();

  const { user } = useAuth();

  const route = useRoute();
  const {
    title,
    description,
    price,
    images,
    paymentMethods,
    isNew,
    acceptTrade,
  } = route.params as RouteParams;

  const width = Dimensions.get("window").width;

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handlePublish = async () => {

    console.log('publicando') ;
    console.log(paymentMethods);

    try {
      const product = await api.post("/products", {
        name: title,
        description,
        price: parseInt(price.replace(/[^0-9]/g, "")),
        payment_methods: paymentMethods,
        is_new: isNew,
        accept_trade: acceptTrade,
      });

      const imageData = new FormData();

      images.forEach((item) => {
        const imageFile = {
          ...item,
          name: user.name + "." + item.name,
        } as any;

        imageData.append("images", imageFile);
      });

      imageData.append("product_id", product.data.id);

      const imagesData = await api.post("/products/images", imageData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigation.navigate("myads", {
        id: product.data.id,
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não publicado o anúncio. Tente novamente mais tarde!";

      if (isAppError) {
        toast.show({
          title,
          placement: "top",
          bgColor: "red.500",
        });
      }
    } finally {
    }
  };

  return(
    <ScrollView 
      // contentContainerStyle={{ flexGrow: 1 }}
      // p={6}
      // contentContainerStyle={{ flexGrow: 1 }}
    >

    <VStack
      mt={6}
      p={6}
    >

    <Center>

      <Text>
        Pré visualização do anúncio
      </Text>

      <Text>
        É assim que seu produto vai aparecer!
      </Text>
      
    </Center>

    <Carousel
      loop
      width={width}
      height={320}
      autoPlay={images.length > 1}
      data={images}
      scrollAnimationDuration={1000}
      renderItem={({ item }) => (
        <Image
          w="full"
          h={80}
          source={{
            uri: item.uri
              ? item.uri
              : `${api.defaults.baseURL}/images/${item.path}`,
          }}
          alt="Ad Image"
          resizeMode="cover"
          borderColor="gray.400"
          borderWidth={1}
        />
      )}
    />

    <HStack
      alignItems='center'
    >

      {/* <UserPhoto
          source={{ uri: 'https://github.com/sillmann.png'}}
          size={12}
          alt="User Image"
          mr={4}
      /> */}

      <UserPhoto
          source={{ uri: `${api.defaults.baseURL}/images/${user.avatar}`}}
          size={12}
          alt="User Image"
          m={4}
      />

      <Text>
        {user.name}
      </Text>

    </HStack>   

    <VStack
      bg='gray.400'
      h={12}
      w={24}
      borderRadius={50}
      alignItems='center'
      justifyContent='center'
      m={2}
    >

      <Text
      fontSize={14}
      color='white'    
      >
      {isNew ? 'Novo' : 'Usado' }
      </Text>  

    </VStack>   

    {/* <Heading
      justifyContent='space-between'
      width='full'
    > */}

    <HStack
      justifyContent='space-between'
      width='full'
    >

      <Text
        fontSize={20}
        fontFamily={'heading'}
      >  
        {title}
      </Text>

      <Text
        fontSize={20}
        fontFamily={'heading'}
        color='blue.400'
      > 
        R${' '}{price}
      </Text>

    </HStack>

    <Text
        fontSize={18}
        fontFamily={'body'}
        color='gray.400'
      >  
        {description}
    </Text>
     
    <Heading 
      color="gray.300" 
      fontSize={14} 
      my={5}>
      Aceita troca?{" "}
      <Text 
        fontWeight="normal"
      >{acceptTrade ? "Sim" : "Não"}
      </Text>

    </Heading>     


    <Heading 
      color="gray.300" 
      fontSize={14} 
      mb={2}>
      Meios de Pagamento:
    </Heading>

    {paymentMethods.includes('boleto') && (
        <HStack 
          alignItems='center'>
          {/* <Barcode size={20} color={color} /> */}
          <Text 
            ml={2} 
            color='gray.300'
          >
            Boleto
          </Text>
        </HStack>
    )}

    {paymentMethods.includes('pix') && (
        <HStack 
          alignItems="center">
          {/* <Barcode size={20} color={color} /> */}
          <Text 
            ml={2} 
            color='gray.300'
          >Pix
          </Text>
        </HStack>
    )}

    {paymentMethods.includes('cash') && (
        <HStack 
          alignItems="center">
          {/* <Barcode size={20} color={color} /> */}
          <Text 
            ml={2} 
            color='gray.300'
          >Dinheiro
          </Text>
        </HStack>
    )}

    {paymentMethods.includes('card') && (
        <HStack 
          alignItems="center">
          {/* <Barcode size={20} color={color} /> */}
          <Text 
            ml={2} 
            color='gray.300'
          >Cartão de Crédito
          </Text>
        </HStack>
    )}

    {paymentMethods.includes('deposit') && (
        <HStack 
          alignItems="center">
          {/* <Barcode size={20} color={color} /> */}
          <Text 
            ml={2} 
            color='gray.300'
          >Depósito Bancário
          </Text>
        </HStack>
    )}


    <HStack
        mt={6}
    >

    <Button 
        title='Voltar e Editar'
        w={130}
        onPress={handleGoBack}
    />

    <Button 
        title='Publicar'
        w={130}
        variant='outline'
        ml={12}
        onPress={handlePublish}
    />

    </HStack>   

    </VStack>

    </ScrollView>    

  );    
}