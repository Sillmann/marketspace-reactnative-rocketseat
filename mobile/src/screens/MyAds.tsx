import { useState, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';

import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { AppStackNavigatorRoutesProps } from "@routes/app.routes";

import { Center,
         Text,
         Heading,
         ScrollView,
         VStack,
         HStack,
         useToast,
         FlatList,
         Image,
         Box,
         Select } from 'native-base';

import { ProductDTO } from '@dtos/ProductDTO';     
import { AppError } from '@utils/AppError';    
import { api } from '@services/api';      

export function MyAds(){

  const navigation = useNavigation<AppStackNavigatorRoutesProps>();

  function handleGoMyAd( id:string ) {
    navigation.navigate('myad', { id } );
  };

  const toast = useToast();

  const [products, setProducts] = useState<ProductDTO[]>([]);

  const [adType, setAdType] = useState('all');

  const filter = adType === 'active' ? true : false;

  const productsFiltered = products.filter((product) => {
    if (adType === 'all') {
      return true;
    }

    return product.is_active === filter;
  });

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        try {
          const productsData = await api.get(`/users/products`);

          setProducts(productsData.data);
          
        } catch (error) {
          const isAppError = error instanceof AppError;
          const title = isAppError
            ? error.message
            : 'Não foi possível receber seus anúncios. Tente Novamente!';

          if (isAppError) {
            toast.show({
              title,
              placement: 'top',
              bgColor: 'red.500',
            });
          }
        } finally {
          // setIsLoading(false);
        }
      };

      loadData();
    }, [])
  );
  

return(
  <ScrollView>
    
    <VStack 
      p={6}
      mt={6}
    >

    <Center>
      <Heading 
        color='gray.200' 
        fontSize={22} 
        fontFamily='heading'
      >Meus Anúncios
      </Heading>  
    </Center>
    


    <HStack
      w='full'
      justifyContent='space-between'
      my={7}
      alignItems='center'
      px={5}
    >

      <Text 
        color='gray.300' 
        fontSize={16}
      >{products.length} anúncios
      </Text>

      <Select
        selectedValue={adType}
        placeholder='Escolha um tipo'
        minWidth='110'
        color='gray.300'
        onValueChange={(itemValue) => setAdType(itemValue)}
        _selectedItem={{
          borderColor: 'blue.light',
          borderWidth: 1,
          borderRadius: 8,
        }}
      >
        <Select.Item label='Todos' value='all' />
        <Select.Item label='Ativos' value='active' />
        <Select.Item label='Inativos' value='inactive' />
      </Select>
    </HStack>


    <FlatList
      flex={1}
      px={5}
      columnWrapperStyle={{ justifyContent: 'space-between' }}
      numColumns={2}
      data={productsFiltered}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (

        <TouchableOpacity
          onPress={()=>handleGoMyAd( item.id )}
        >
        

        <VStack
        position='relative'
        >

          <Box position='relative' alignItems='center' justifyContent='center'>

            {!item.is_active && (
              <Text
                flex={1}
                textTransform="uppercase"
                color="white"
                fontSize="xs"
                position="absolute"
                zIndex={100}
                bg="gray.300"
                p={1}
                w={100}
                textAlign="center"
                borderRadius={10}
              >
                Anúncio Desativado
              </Text>
            )}

            <Heading
                textTransform='uppercase'
                color='white'
                fontSize={10}
                bg={item.is_new ? 'blue.light' : 'gray.200'}
                position='absolute'
                zIndex={100}
                borderRadius={10}
                py={1}
                px={2}
                right={1}
                top={1}
              >
                {item.is_new ? 'Novo' : 'Usado' }
            </Heading>


            <Image
              w={32}
              h={24}
              source={{
                uri:`${api.defaults.baseURL}/images/${item.product_images[0].path}`
              }}
              alt={item.name}
              borderRadius={10}
              borderWidth={1}
              borderColor='gray.500'
            />

            <Text //color={active ? 'gray.200' : 'gray.400'} 
              fontSize={14} 
              mt={1}>
              {item.name}
            </Text>

            <Heading //color={active ? 'gray.200' : 'gray.400'} 
              fontSize={14}>

              R${' '}
              {item.price.toLocaleString('pt-BR', {
                minimumFractionDigits: 3,
              })}

            </Heading>

          </Box>

        </VStack>
        
        </TouchableOpacity>




        // <AdCard
        //   width='40'
        //   title={item.name}
        //   image={`${api.defaults.baseURL}/images/${item.product_images[0].path}`}
        //   active={item.is_active}
        //   used={!item.is_new}
        //   price={item.price.toString()}
        //   id={item.id}
        // />
      )}
      // ListEmptyComponent={() => (
      //   <Center flex={1}>
      //     {adType === 'all' && (
      //       <Text color='gray.300' textAlign='center'>
      //         Você ainda não criou nenhum anúncio. {'\n'}
      //         Clique em + para criar seu primeiro!
      //       </Text>
      //     )}
      //     {adType === 'active' && (
      //       <Text color='gray.300' textAlign='center'>
      //         Você não tem nenhum produto ativo!
      //       </Text>
      //     )}
      //     {adType === 'inactive' && (
      //       <Text color='gray.300' textAlign='center'>
      //         Você não tem nenhum produto inativo!
      //       </Text>
      //     )}
      //   </Center>
      // )}
    />



    </VStack>

  </ScrollView>
);
}