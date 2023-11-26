import { useState, useEffect } from 'react';
import { Heading,
         Text,
         ScrollView,
         VStack,
         HStack,
         Image,
         useToast
         } from 'native-base';

import { useNavigation, useRoute } from '@react-navigation/native';         
import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { TouchableOpacity } from 'react-native';    

import { Dimensions, StatusBar } from 'react-native';

import Carousel from 'react-native-reanimated-carousel';

import { Button } from '@components/Button';
import { ProductDTO } from '@dtos/ProductDTO';    
import { api } from '@services/api';
import { AppError } from '@utils/AppError';

import IconLeft from '@assets/left.png';         
import IconEdit from '@assets/edit.png';         

type RouteParams = {
  id: string;
};

export function MyAd(){

  const route = useRoute();
  const { id } = route.params as RouteParams;

  const toast = useToast();

  const width = Dimensions.get('window').width;

  const [product, setProduct] = useState({} as ProductDTO);

  const navigation = useNavigation<AppNavigatorRoutesProps>();
  function handleGoBack() {
    navigation.navigate('myads' );
  };

  function handleGoEditAd() {
    console.log(product.name);
    console.log(product.id);
    navigation.navigate('editad', {
      title: product.name,
      description: product.description,
      price: product.price.toString(),
      images: product.product_images,
      //  paymentMethods: product.payment_methods.map((item) => item.key),
//       {product.payment_methods.map((paymentMethod) => (
                            
//         paymentMethod.key
// ))}
      isNew: product.is_new,
      acceptTrade: product.accept_trade,
      id: product.id,
    } );
  };


  const handleChangeAdVisibility = async () => {
    try {
      // setIsChangingVisibilityLoading(true);
      const data = await api.patch(`products/${id}`, {
        is_active: !product.is_active,
      });

      setProduct((state) => {
        return {
          ...state,
          is_active: !state.is_active,
        };
      });
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível deletar. Tente Novamente!";

      if (isAppError) {
        toast.show({
          title,
          placement: "top",
          bgColor: "red.500",
        });
      }
    } finally {
      // setIsChangingVisibilityLoading(false);
    }
  };


  const handleDeleteAd = async () => {
    try {
      // setIsDeletingLoading(true);
      await api.delete(`products/${id}`);

      navigation.navigate('myads');
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível deletar. Tente Novamente!";

      if (isAppError) {
        toast.show({
          title,
          placement: "top",
          bgColor: "red.500",
        });
      }
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const productData = await api.get(`products/${id}`);
        setProduct(productData.data);
        // setIsLoading(false);
      } catch (error) {
        const isAppError = error instanceof AppError;
        const title = isAppError
          ? error.message
          : "Não foi possível receber os dados do anúncio. Tente Novamente!";

        if (isAppError) {
          toast.show({
            title,
            placement: "top",
            bgColor: "red.500",
          });
        }
      }
    };

    loadData();
  }, []);


return(

  <ScrollView>

    <VStack 
      p={6}
      mt={6}
    >

      <HStack
        justifyContent={'space-between'}
        mb={6}
      >

      <TouchableOpacity
        onPress={handleGoBack}
      >

        <Image 
          source={IconLeft}
          alt='Back'
        />

      </TouchableOpacity>



      <TouchableOpacity
        onPress={handleGoEditAd}
      >

        <Image 
          source={IconEdit}
          alt='Edit'
        />

      </TouchableOpacity>

      </HStack>



      <Carousel
        loop
        width={320}
        height={320}
        // autoPlay={product.product_images.length > 1}
        data={product.product_images}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <Image
            w='full'
            h={80}
            source={{
              uri: `${api.defaults.baseURL}/images/${item.path}`,
            }}
            alt='Ad Image'
            resizeMode='cover'
            borderColor='gray.400'
            borderWidth={1}
          />
        )}
      />




      <VStack
        bg='gray.500'
        h={8}
        w={24}
        borderRadius={50}
        alignItems='center'
        justifyContent='center'
        mt={3}
      >

        <Text
          fontSize={14}
          color='gray.100'       
        >
        {product.is_new ? 'Novo' : 'Usado' }
        </Text>  

      </VStack>    



      <HStack
      justifyContent='space-between'
      width='full'
      >

      <Text
        fontSize={20}
        fontFamily={'heading'}
      >  
        {product.name}
      </Text>

      <Text
        fontSize={20}
        fontFamily={'heading'}
        color='blue.400'
      > 
        R${' '}{product.price}
      </Text>

    </HStack>



    <Text
        fontSize={18}
        fontFamily={'body'}
        color='gray.400'
      >  
        {product.description}
    </Text>




    <Heading 
      color="gray.300" 
      fontSize={14} 
      my={5}>
      Aceita troca?{" "}
      <Text 
        fontWeight="normal"
      >{product.accept_trade ? "Sim" : "Não"}
      </Text>

    </Heading>     




    <Heading 
      color="gray.300" 
      fontSize={14} 
      mb={2}>
      Meios de Pagamento:
    </Heading>

    <Text>
    {/* {product.payment_methods.map((paymentMethod) => (
                            
                              paymentMethod.key
    ))}  */}
    </Text>

   
    {/* {product.payment_methods.includes('boleto') && (
        <HStack 
          alignItems='center'>

          <Text 
            ml={2} 
            color='gray.300'
          >
            Boleto
          </Text>
        </HStack>
    )}

    {product.payment_methods.includes('pix') && (
        <HStack 
          alignItems="center">

          <Text 
            ml={2} 
            color='gray.300'
          >Pix
          </Text>
        </HStack>
    )}

  
    {product.payment_methods.includes('cash') && (
        <HStack 
          alignItems="center">

          <Text 
            ml={2} 
            color='gray.300'
          >Dinheiro
          </Text>
        </HStack>
    )}

    {product.payment_methods.includes('card') && (
        <HStack 
          alignItems="center">

          <Text 
            ml={2} 
            color='gray.300'
          >Cartão de Crédito
          </Text>
        </HStack>
    )}

    {product.payment_methods.includes('deposit') && (
        <HStack 
          alignItems="center">

          <Text 
            ml={2} 
            color='gray.300'
          >Depósito Bancário
          </Text>
        </HStack>
    )} */}




      <HStack
        mt={6}
        justifyContent={'space-between'}
      >

        <Button 
            title={
              product.is_active ? "Desativar Anúncio" : "Ativar Anúncio"
            }
            w={150}
            onPress={handleChangeAdVisibility}
        />

        <Button 
            title='Excluir Anúncio'
            w={140}
            variant='outline'
            // ml={3}
            // onPress={handleNewPreview}
            onPress={handleDeleteAd}
        />

      </HStack>  

      <>
    <Text
        mt={36}
    >
      {/* {product.payment_methods.map((item) => item.key)} */}
      {/* {product.payment_methods.map(
                  (payment_method) => payment_method.key
                )} */}
      </Text>
      </>



    </VStack>

  </ScrollView>
);
}