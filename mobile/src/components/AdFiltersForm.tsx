/* eslint-disable indent */
import { PaymentMethodsDTO } from '@dtos/PaymentsMethodDTO';
import { AntDesign } from '@expo/vector-icons';
import { Badge, Box, HStack, Pressable, Switch, Text, VStack } from 'native-base';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

import { useState } from 'react';

// import { defaultFiltersValues } from '@screens/Home';
import { Button } from './Button';

export type FilterObjectType = {
  showNew: boolean;
  showUsed: boolean;
  acceptTrade: boolean;
  paymentMethods: PaymentMethodsDTO[];
};

type AdFiltersFormProps = {
  currentFiltersValues: FilterObjectType;
  setCurrentFiltersValues: (filters: FilterObjectType) => void;
  setIsOpenFilterModal: (isOpen: boolean) => void;
};

export const defaultFiltersValues: FilterObjectType = {
  showNew: true,
  showUsed: true,
  acceptTrade: false,
  paymentMethods: ['pix', 'card', 'boleto', 'cash', 'deposit'],
};

export const AdFiltersForm = ({
  currentFiltersValues,
  setCurrentFiltersValues,
  setIsOpenFilterModal,
}: AdFiltersFormProps) => {
  const [showNew, setShowNew] = useState<boolean>(currentFiltersValues.showNew);
  const [showUsed, setShowUsed] = useState<boolean>(currentFiltersValues.showUsed);
  const [acceptTrade, setAcceptTrade] = useState<boolean>(
    currentFiltersValues.acceptTrade,
  );
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<
    PaymentMethodsDTO[]
  >(currentFiltersValues.paymentMethods);

  function handleSelectPaymentMethod(selectedMethod: PaymentMethodsDTO) {
    if (selectedPaymentMethods.includes(selectedMethod)) {
      setSelectedPaymentMethods(
        selectedPaymentMethods.filter((method) => method !== selectedMethod),
      );
    } else {
      setSelectedPaymentMethods([...selectedPaymentMethods, selectedMethod]);
    }
  }

  function handleResetFilters() {
    setCurrentFiltersValues(defaultFiltersValues);
    setShowNew(defaultFiltersValues.showNew);
    setShowUsed(defaultFiltersValues.showUsed);
    setAcceptTrade(defaultFiltersValues.acceptTrade);
    setSelectedPaymentMethods(defaultFiltersValues.paymentMethods);
  }

  function applyFilters() {
    setCurrentFiltersValues({
      showNew,
      showUsed,
      acceptTrade,
      paymentMethods: selectedPaymentMethods,
    });

    setIsOpenFilterModal(false);
  }

  // useEffect(() => {
  //   console.log('------- selectedPaymentMethods ---------');
  //   console.log('selectedPaymentMethods: ', selectedPaymentMethods);
  //   console.log('showNew:', showNew);
  //   console.log('showUsed:', showUsed);
  //   console.log('acceptTrade:', acceptTrade);
  //   console.log('----------------*******************----------------');
  // }, []);

  // useEffect(() => {
  // console.log('showNewRef: ', showNewRef.current.children[0].props.children[0]);
  // console.log(showUsedRef);
  // }, []);

  return (
    <>
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
          <Pressable
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
          </Pressable>
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
          <BouncyCheckbox
            text="Boleto"
            size={20}
            disableBuiltInState={true}
            isChecked={selectedPaymentMethods.includes('boleto')}
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
            onPress={() => handleSelectPaymentMethod('boleto')}
          />

          <BouncyCheckbox
            text="Pix"
            size={20}
            disableBuiltInState={true}
            isChecked={selectedPaymentMethods.includes('pix')}
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
            onPress={() => handleSelectPaymentMethod('pix')}
          />

          <BouncyCheckbox
            text="Dinheiro"
            size={20}
            disableBuiltInState={true}
            isChecked={selectedPaymentMethods.includes('cash')}
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
            onPress={() => handleSelectPaymentMethod('cash')}
          />

          <BouncyCheckbox
            text="Cartão de Crédito"
            size={20}
            disableBuiltInState={true}
            isChecked={selectedPaymentMethods.includes('card')}
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
            onPress={() => handleSelectPaymentMethod('card')}
          />

          <BouncyCheckbox
            text="Depósito Bancário"
            size={20}
            disableBuiltInState={true}
            isChecked={selectedPaymentMethods.includes('deposit')}
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
            onPress={() => handleSelectPaymentMethod('deposit')}
          />
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
            onPress={handleResetFilters}
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
    </>
  );
};
