import { useState } from 'react';

// import { VStack, HStack, Box, Image, FlatList, Text, View, useToast, Heading, ScrollView, Modal, Icon, Pressable } from 'native-base';

import { VStack, HStack, Text, Icon, Pressable, Badge, Switch, Box, Radio, Checkbox  } from "native-base"
// import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { Button } from "@components/Button";

import { AntDesign } from '@expo/vector-icons';

import { storageFilterSave } from '@storage/storageFilter';

import { FilterDTO } from '@dtos/FilterDTO';

import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';

export function Filter(){

  // const [showNew, setShowNew] = useState(false);
  // const [showUsed, setShowUsed] = useState(false);

  const [isNew, setIsNew] = useState(false);
  const [acceptTrade, setAcceptTrade] = useState(false);
  const [boleto, setBoleto] = useState(false);
  const [pix, setPix] = useState(false);
  const [dinheiro, setDinheiro] = useState(false);
  const [cartao, setCartao] = useState(false);
  const [deposito, setDeposito] = useState(false);
  
  // async function storageUserAndTokenSave(userData: UserDTO, token: string){
  //   try {
  //     await storageUserSave(userData);
  //     await storageAuthTokenSave(token);
  //   } catch (error) {
  //     throw error;
  //   }
  // }
  const navigation = useNavigation<AppNavigatorRoutesProps>();


  async function applyFilters() {

    const filter: FilterDTO = {
      isNew:isNew,
      acceptTrade:acceptTrade,
      pix:pix,
      boleto:boleto,
      cash:dinheiro,
      deposit:deposito,
      card:cartao,
    };

    console.log(filter);

    try {
      await storageFilterSave(filter);
    } catch (error) {
      throw error;
    }

    navigation.navigate('home');

   
  }


  return(
 

<VStack //flex={1}
h="582"
mb={0}
mt="auto"
roundedTop="2xl"
roundedBottom={0}
bg="gray.600"
px={6}
py={8}
>

  <HStack
    justifyContent={'space-between'}
    alignItems={'center'}
    mb={6}
  >
    <Text
      fontFamily={'heading'}
      fontSize="lg"
    >
      Filtrar Anúncios
    </Text>

    <Icon
      as={AntDesign}
      name="close"
      size={6}
      color="gray.400"
      
    />
  </HStack>

   <VStack
        // flex={1}
        justifyContent="flex-start"
      >
        <Text
          size="sm"
          bold
          h={6}
          mb={2}
        >
          Condição
        </Text>

        <HStack>

        <Radio.Group
              name="productCondition"
              value={isNew ? "new" : "used"}
              onChange={(nextValue) => {
                setIsNew(nextValue === "new" ? true : false);
              }}
            >
              <HStack>
                <Radio value="new" my="2" size="sm">
                  <Text color="gray.200" fontSize={14}>
                    Novo
                  </Text>
                </Radio>
                <Radio value="used" my="2" ml={5} size="sm">
                  <Text color="gray.200" fontSize={14}>
                    Usado
                  </Text>
                </Radio>
              </HStack>
            </Radio.Group>

          {/* <Pressable
            disabled={!showUsed}
            onPress={() => setShowNew(!showNew)}
          >
            <Badge
              rounded="full"
              bg={
                showNew && showUsed
                  ? 'blue.light'
                  : showNew && !showUsed
                  ? 'blue.light'
                  : 'gray.500'
              }
              textTransform="uppercase"
              mr={3}
              px={3}
              flexDirection="row"
            >
              <HStack alignItems="center">
                <Text
                  fontFamily="heading"
                  color={showNew ? 'white' : 'gray.300'}
                >
                  NOVO
                </Text>
                {showNew ? (
                  <AntDesign
                    name="closecircle"
                    size={13}
                    color="white"
                    marginLeft={6}
                  />
                ) : null}
              </HStack>
            </Badge>
          </Pressable>

          <Pressable
            disabled={!showNew}
            onPress={() => setShowUsed(!showUsed)}
          >
            <Badge
              rounded="full"
              // bg={showUsed ? 'bluelight' : 'gray.5'}
              bg={
                showNew && showUsed
                  ? 'blue.light'
                  : !showNew && showUsed
                  ? 'blue.light'
                  : 'gray.500'
              }
              textTransform="uppercase"
              mr={3}
              px={3}
              flexDirection="row"
            >
              <HStack alignItems="center">
                <Text
                  fontFamily="heading"
                  color={showUsed ? 'white' : 'gray.300'}
                >
                  USADO
                </Text>
                {showUsed ? (
                  <AntDesign
                    name="closecircle"
                    size={13}
                    color="white"
                    marginLeft={6}
                  />
                ) : null}
              </HStack>
            </Badge>
          </Pressable> */}
        </HStack> 
      </VStack> 

      <VStack
        mt={8}
        alignItems="flex-start"
      >
        <Text
          size="sm"
          bold
        >
          Aceita troca?
        </Text>
        <Switch
          onToggle={() => setAcceptTrade(!acceptTrade)}
          size="lg"
          mt="-360px"
          isChecked={acceptTrade}
          offTrackColor="gray.500"
          onTrackColor="blue.light"
        />
      </VStack>

      <VStack>
        <Text
          size="sm"
          bold
        >
          Meios de pagamentos aceitos
        </Text>

        
        <Box mt="-350px">
          
        <Checkbox 
          value="boleto" 
          onChange={setBoleto} 
          isChecked={boleto}>
          <Text color="gray.300" fontSize={16}>
            Boleto
          </Text>
        </Checkbox>

        <Checkbox 
          value="pix"
          onChange={setPix} 
          isChecked={pix}>
          <Text color="gray.300" fontSize={16}>
            Pix
          </Text>
        </Checkbox>

        <Checkbox 
          value="cash"
          onChange={setDinheiro} 
          isChecked={dinheiro}>
          <Text color="gray.300" fontSize={16}>
            Dinheiro
          </Text>
        </Checkbox>

        <Checkbox 
          value="card"
          onChange={setCartao} 
          isChecked={cartao}>
          <Text color="gray.300" fontSize={16}>
            Cartão de Crédito
          </Text>
        </Checkbox>

        <Checkbox 
          value="deposit"
          onChange={setDeposito} 
          isChecked={deposito}>
          <Text color="gray.300" fontSize={16}>
            Depósito Bancário
          </Text>
        </Checkbox>
        
          {/* <BouncyCheckbox
            text="Boleto"
            size={20}
            disableBuiltInState={true}
            
            fillColor="#647AC7"
            iconStyle={{
              borderRadius: 4,
            }}
            innerIconStyle={{
              borderRadius: 4,
              borderColor: '#5F5B62',
            }}
            textStyle={{
              textDecorationLine: 'none',
              color: '#3E3A40',
            }}

          />

          <BouncyCheckbox
            text="Pix"
            size={20}
            disableBuiltInState={true}
           
            fillColor="#647AC7"
            iconStyle={{
              borderRadius: 4,
            }}
            innerIconStyle={{
              borderRadius: 4,
              borderColor: '#5F5B62',
            }}
            textStyle={{
              textDecorationLine: 'none',
              color: '#3E3A40',
            }}

          />

          <BouncyCheckbox
            text="Dinheiro"
            size={20}
            disableBuiltInState={true}
            
            fillColor="#647AC7"
            iconStyle={{
              borderRadius: 4,
            }}
            innerIconStyle={{
              borderRadius: 4,
              borderColor: '#5F5B62',
            }}
            textStyle={{
              textDecorationLine: 'none',
              color: '#3E3A40',
            }}

          />

          <BouncyCheckbox
            text="Cartão de Crédito"
            size={20}
            disableBuiltInState={true}
          
            fillColor="#647AC7"
            iconStyle={{
              borderRadius: 4,
            }}
            innerIconStyle={{
              borderRadius: 4,
              borderColor: '#5F5B62',
            }}
            textStyle={{
              textDecorationLine: 'none',
              color: '#3E3A40',
            }}

          />

          <BouncyCheckbox
            text="Depósito Bancário"
            size={20}
            disableBuiltInState={true}
          
            fillColor="#647AC7"
            iconStyle={{
              borderRadius: 4,
            }}
            innerIconStyle={{
              borderRadius: 4,
              borderColor: '#5F5B62',
            }}
            textStyle={{
              textDecorationLine: 'none',
              color: '#3E3A40',
            }}

          /> */}
        </Box>

        <HStack
          justifyContent="space-between"
          mt={24}
        >
          <Button
            title="Resetar Filtros"
            variant="gray"
            w="48%"
            px={6}

          />

          <Button
            title="Aplicar Filtros"
            variant="black"
            w="48%"
            px={6}
            onPress={applyFilters}
          />
        </HStack>
      </VStack>





</VStack>    
    
   
  )
}  