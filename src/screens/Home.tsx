import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { VStack, HStack, Image, FlatList, Text, View } from 'native-base';

import { HomeHeader } from '@components/HomeHeader';    

import { Input } from '@components/Input';

import SearchPng from '@assets/search.png';
import DividerPng from '@assets/divider.png';
import FilterPng from '@assets/filter.png';

import TenisVermelhoPng from '@assets/tenisvermelho.png';
import BicicletaPng from '@assets/bicicleta.png';
import ArmarioPng from '@assets/armario.png';


export function Home(){

  const [products, setProducts]= useState(['tenis','bicicleta','armario']);

  
  return(
    <VStack flex={1}>
      <HomeHeader/>
      <HStack
        alignItems="center"
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
        data={products}
        keyExtractor={item => item}
        numColumns={2}
        renderItem={({item})=>(
          <View ml={3}>
            <TouchableOpacity>
              <Text>{item}</Text>
              <Image 
                source={TenisVermelhoPng}
                alt="Tenis"
              />
            </TouchableOpacity>
          </View>
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