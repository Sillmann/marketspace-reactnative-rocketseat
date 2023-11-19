import { VStack } from 'native-base';

import { HomeHeader } from '@components/HomeHeader';    

import { Input } from '@components/Input';

export function Home(){
  return(
    <VStack flex={1}>
      <HomeHeader/>
      <Input placeholder='Buscar anúncio'/>
    </VStack>
  );
}