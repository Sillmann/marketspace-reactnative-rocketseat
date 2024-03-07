import { useState, useCallback } from 'react';
import { TouchableOpacity } from 'react-native';
import { VStack, HStack, Box, Image, FlatList, Text, View, useToast, Heading } from 'native-base';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';

import { HomeHeader } from '@components/HomeHeader';    

import { Input } from '@components/Input';

import SearchPng from '@assets/search.png';
import DividerPng from '@assets/divider.png';
import FilterPng from '@assets/filter.png';

import TenisVermelhoPng from '@assets/tenisvermelho.png';
import BicicletaPng from '@assets/bicicleta.png';
import ArmarioPng from '@assets/armario.png';
import { ProductDTO } from '@dtos/ProductDTO';    
import { AppError } from '@utils/AppError';   
import { api } from '@services/api';    
import AdsSvg from '@assets/ads.svg';
import IconRight from '@assets/iconright.png';

export function Home(){

  const toast = useToast();

  //const [products, setProducts]= useState(['tenis','bicicleta','armario']);
  const [products, setProducts] = useState<ProductDTO[]>([]);

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

  const navigation = useNavigation<AppNavigatorRoutesProps>();

  function handleMyAds(){
    navigation.navigate('myads');
  }

  return(
    <VStack flex={1} >
      <HomeHeader/>

      <Text 
        color="gray.300" 
        fontSize={16} 
        mt={1}
        alignItems="center"
        ml={3}
        >Seus produtos anunciados para venda
      </Text>

      <HStack
        alignItems='center'
        bg="gray.500"
        w="327"
        h="66"
        pl="6"
        ml={3}
      >

        <AdsSvg 
          height={22}
          width={22}
          fill="#647AC7"
        />

        <VStack
          pl="3"
          pr="6"
        >
          <Text>{products.length}</Text>
          <Text>anúncios ativos</Text>
        </VStack>

        <TouchableOpacity
          onPress={handleMyAds}
        >

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




      <HStack
        alignItems="center"
        m={3}
      >

      <Input placeholder='Buscar anúncio'/>
      
      <Image 
        source={SearchPng}
        alt="Search"
        ml={-100}
      />

      <Image 
        source={DividerPng}
        alt="Divider"
        ml={3}
      />

      <Image 
        source={FilterPng}
        alt="Filter"
        ml={3}
      />

      </HStack>

      <FlatList
        flex={1}
        px={5}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        numColumns={2}

        data={products}
        // keyExtractor={item => item}
        keyExtractor={(item) => item.id}
        // numColumns={2}
        renderItem={({item})=>(
          // <View ml={3}>
            <TouchableOpacity>
              {/* <Text>{item.name}</Text> */}
              {/* <Image 
                source={TenisVermelhoPng}
                alt="Tenis"
              /> */}

              <VStack
                      position='relative'
              >

              <Box position='relative' alignItems='center' justifyContent='center'>  

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
                R$ {item.price}
              </Heading>

              </Box>

              </VStack>

            </TouchableOpacity>
          // </View>
        )}
      />

      {/* <Image 
        source={TenisVermelhoPng}
        alt="Tenis"
      />

      <Image 
        source={BicicletaPng}
        alt="Bicicleta"
      />     */}

      {/* <Image 
        source={ArmarioPng}
        alt="Armario"
      />     */}

    </VStack>
  );
}