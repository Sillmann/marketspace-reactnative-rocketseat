import { useState, useEffect } from "react";
import {
  ScrollView,
  Text,
  VStack,
  HStack,
  Button as NativeButton,
  Image,
  Heading,
  useTheme,
  useToast,
  Box,
} from "native-base";

import { Dimensions } from "react-native";

import { useNavigation, useRoute } from "@react-navigation/native";
import { AppStackNavigatorRoutesProps } from "@routes/app.routes";

import Carousel from "react-native-reanimated-carousel";

import { Button } from "@components/Button";

import { AppError } from "@utils/AppError";
import { api } from "@services/api";

import IconLeft from '@assets/left.png';         
import IconDeposit from '@assets/deposit.png';         
import IconPix from '@assets/pix.png';         
import IconCash from '@assets/cash.png';         
import IconCard from '@assets/card.png';         
import IconBoleto from '@assets/boleto.png';       

import { ProductDTO } from "../dtos/ProductDTO";
import { Loading } from "@components/Loading";
// import { GeneratePaymentMethods } from "@utils/generatePaymentMethods";

type RouteParams = {
  id: string;
};

export const Ad = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState({} as ProductDTO);

  const width = Dimensions.get("window").width;

  const { colors } = useTheme();

  const route = useRoute();
  const toast = useToast();

  const { id } = route.params as RouteParams;

  const [paymentMethods, setPaymentMethods] = useState<string[]>([]);

  const navigation = useNavigation<AppStackNavigatorRoutesProps>();

  const handleGoBack = () => {
    navigation.navigate('homeBottom');
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        const productData = await api.get(`products/${id}`);
        setProduct(productData.data);

        setPaymentMethods(

          productData.data.payment_methods.map(
            (payment_method) => payment_method.name
          )

        );

        setIsLoading(false);
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

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
          >
            <VStack flex={1} mb={6}>
              <HStack w="full" justifyContent="space-between" mt={10}>
                <NativeButton variant="secondary" px={5} onPress={handleGoBack}>

                  <Image 
                    source={IconLeft}
                    alt='Back'
                  />

                </NativeButton>
              </HStack>

              <Box
                position="relative"
                alignItems="center"
                justifyContent="center"
              >
                {!product.is_active && (
                  <Heading
                    flex={1}
                    textTransform="uppercase"
                    color="white"
                    fontSize="lg"
                    position="absolute"
                    zIndex={100}
                    bg="gray.300"
                    p={1}
                    w={240}
                    textAlign="center"
                    borderRadius={10}
                  >
                    Anúncio Desativado
                  </Heading>
                )}
                <Carousel
                  loop
                  width={width}
                  height={320}
                  autoPlay={product.product_images.length > 1}
                  data={product.product_images}
                  scrollAnimationDuration={1000}
                  renderItem={({ item }) => (
                    <Image
                      blurRadius={product.is_active ? 0 : 10}
                      w="full"
                      h={80}
                      source={{
                        uri: `${api.defaults.baseURL}/images/${item.path}`,
                      }}
                      alt="Ad Image"
                      resizeMode="cover"
                      borderColor="gray.300"
                      borderWidth={1}
                    />
                  )}
                />
              </Box>

              <VStack px={5}>
                <Heading
                  my={2}
                  textTransform="uppercase"
                  color="blue.default"
                  fontSize={14}
                  mt={4}
                >
                  {product.is_new ? "NOVO" : "USADO"}
                </Heading>
                <HStack
                  w="full"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Heading color="gray.200" fontSize={22} fontFamily="heading">
                    {product.name}
                  </Heading>
                  <Text color="blue.light" fontFamily="heading">
                    <Heading
                      color="blue.light"
                      fontFamily="heading"
                      fontSize={20}
                    >
                       R${' '}
                       {product.price.toLocaleString('pt-BR', {
                          minimumFractionDigits: 2,
                        })}

                    </Heading>
                  </Text>
                </HStack>

                <Text mt={2} color="gray.300">
                  {product.description}
                </Text>

                <Heading color="gray.300" fontSize={14} my={5}>
                  Aceita troca?{" "}
                  <Text fontWeight="normal">
                    {product.accept_trade ? "Sim" : "Não"}
                  </Text>
                </Heading>

                <Heading color="gray.300" fontSize={14} mb={2}>
                  Meios de Pagamento:
                </Heading>

                {/* {GeneratePaymentMethods(
                  product.payment_methods.map(
                    (payment_method) => payment_method.key
                  ),
                  colors.gray[300]
                )} */}

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



              </VStack>
            </VStack>

          </ScrollView>
          <HStack
            w="full"
            p={5}
            bg="white"
            alignItems="center"
            justifyContent="space-between"
          >
            <Text color="blue.light" fontFamily="heading">

              <Heading color="blue.light" fontFamily="heading" fontSize={24}>

                R${' '}
                {product.price.toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                })}
                
              </Heading>
            </Text>

            <Button
              title="Entrar em contato"
              // icon={<WhatsappLogo color="white" weight="fill" size={20} />}
              alignItems="center"
              justifyContent="center"
              w="50%"

              // <Image 
              //   source={IconRight}
              //   alt='Back'
              // />
            />
          </HStack>
        </>
      )}
    </>
  );
};
