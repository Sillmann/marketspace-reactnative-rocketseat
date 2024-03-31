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
import { AppStackNavigatorRoutesProps } from "@routes/app.routes";

import { TouchableOpacity } from 'react-native';    

import { Dimensions, StatusBar } from 'react-native';

import Carousel from 'react-native-reanimated-carousel';

import { Button } from '@components/Button';
import { UserPhoto } from "@components/UserPhoto";
import { ProductDTO } from '@dtos/ProductDTO';    
import { api } from '@services/api';
import { AppError } from '@utils/AppError';

import IconLeft from '@assets/left.png';         
import IconEdit from '@assets/edit.png';         
import IconDeposit from '@assets/deposit.png';         
import IconPix from '@assets/pix.png';         
import IconCash from '@assets/cash.png';         
import IconCard from '@assets/card.png';         
import IconBoleto from '@assets/boleto.png';     

import { useAuth } from '@hooks/useAuth';

type RouteParams = {
  id: string;
};

export function MyAd(){


  const { user } = useAuth();

  const route = useRoute();
  const { id } = route.params as RouteParams;

  const toast = useToast();

  const [paymentMethods, setPaymentMethods] = useState<string[]>([]);

  const width = Dimensions.get('window').width;

  const [product, setProduct] = useState({} as ProductDTO);

  const navigation = useNavigation<AppStackNavigatorRoutesProps>();
  function handleGoBack() {
    navigation.goBack();
  };

  function handleGoEditAd() {
    navigation.navigate('editad', { id } );

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

        setPaymentMethods(

          productData.data.payment_methods.map(
            (payment_method:any) => payment_method.name
          )

        );

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

      <HStack
         alignItems='center'
         mt={3}
      >

        <UserPhoto
                // source={{ uri: 'https://github.com/sillmann.png'}}
                source={{ uri: `${api.defaults.baseURL}/images/${user.avatar}`}}
                size={10}
                alt="User Image"
                mr={4}
              />

        <Text color='gray.100'>{user.name}</Text>

      </HStack>

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
      mt={3}
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

        {/* R${' '}
        {product.price.toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
        })} */}

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


    <VStack>


          {paymentMethods.map((item) => (
            <HStack>

              <Text>
                {item === 'Boleto' && (
                  <Image 
                    source={IconBoleto}
                    alt='Boleto'
                  />
                )}

                {item === 'Pix' && (
                  <Image 
                    source={IconPix}
                    alt='Pix'
                  />
                )}

                {item === 'Dinheiro' && (
                  <Image 
                    source={IconCash}
                    alt='Dinheiro'
                  />
                )}

                {item === 'Card' && (
                  <Image 
                    source={IconCard}
                    alt='Cartão de Crédito'
                  />
                )}

                {item === 'Depósito Bancário' && (
                  <Image 
                    source={IconDeposit}
                    alt='Depósito Bancário'
                  />
                )}

                {" "}{item}
              </Text> 

              

            </HStack>
          ))}

      
    </VStack>        
    
    
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
      
      </Text>
      </>



    </VStack>

  </ScrollView>
);
}