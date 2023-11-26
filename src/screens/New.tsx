import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Center, Text, View, ScrollView, Image, HStack, VStack, Radio, Switch, Checkbox } from 'native-base';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import LeftPng from '@assets/left.png';

import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import { useNavigation } from '@react-navigation/native';
import { AppNavigatorRoutesProps } from '@routes/app.routes';

export function New(){

  const navigation = useNavigation<AppNavigatorRoutesProps>();
  
  const [images, setImages] = useState<any[]>([]);
  const [isNew, setIsNew] = useState<boolean>(true);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [acceptTrade, setAcceptTrade] = useState<boolean>(false);
  const [paymentMethods, setPaymentMethods] = useState<string[]>([]);
    
  const handleAdPhotoSelect = async () => {
    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (photoSelected.canceled) {
        return;
      }

      // if (images.length > 2) {
      //   throw new AppError("Só pode selecionar 3 fotos!");
      // }

      if (photoSelected.assets[0].uri) {
        const photoInfo = await FileSystem.getInfoAsync(
          photoSelected.assets[0].uri
        );

        // if (photoInfo.size && photoInfo.size / 1024 / 1024 > 5) {
        //   return toast.show({
        //     title: "Essa imagem é muito grande. Escolha uma de até 5MB.",
        //     placement: "top",
        //     bgColor: "red.500",
        //   });
        // }

        const fileExtension = photoSelected.assets[0].uri.split(".").pop();

        const photoFile = {
          name: `${fileExtension}`.toLowerCase(),
          uri: photoSelected.assets[0].uri,
          type: `${photoSelected.assets[0].type}/${fileExtension}`,
        } as any;

        setImages((images) => {
          return [...images, photoFile];
        });

        // toast.show({
        //   title: "Foto selecionada!",
        //   placement: "top",
        //   bgColor: "green.500",
        // });
      }
    } catch (error) {
      // const isAppError = error instanceof AppError;
      // const title = isAppError
      //   ? error.message
      //   : "Não foi possível selecionar a imagem. Tente novamente!";

      // if (isAppError) {
      //   toast.show({
      //     title,
      //     placement: "top",
      //     bgColor: "red.500",
      //   });
      // }
    } finally {
      // setIsLoading(false);
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  function handleNewPreview(){
    navigation.navigate('newpreview', {
      title,
      description,
      price,
      images,
      paymentMethods,
      isNew,
      acceptTrade,
    });
  }

  

  return(
    <ScrollView 
      p={6}
      contentContainerStyle={{ flexGrow: 1 }}
    >

      <TouchableOpacity>

        <Image 
            source={LeftPng}
            alt="Go Back"
            mt={12}
        />

      </TouchableOpacity>

      <Center mt={-7}>

        <Text 
          fontSize={20} 
        >
          Criar anúncio
        </Text>

      </Center>

      <Text
        fontSize={20} 
        mt={6}
      >
        Imagens
      </Text>

      <Text
        fontSize={16} 
        color="gray.400" 
      >
        Escolha até 3 imagens para mostrar o quanto o seu produto é incrível!
      </Text>

      <HStack my={5}>
            {images.length > 0 &&
              images.map((imageData) => (
                <Image
                  w={88}
                  h={88}
                  mr={2}
                  source={{
                    uri: imageData.uri,
                  }}
                  alt="Imagem do novo anúncio"
                  resizeMode="cover"
                  borderRadius={8}
                  key={imageData.uri}
                />
              ))}

            {images.length < 3 && (
              <Button
                bg="gray.500"
                w={88}
                h={88}
                ml={2}
                _pressed={{
                  borderWidth: 1,
                  bg: "gray.500",
                  borderColor: "gray.400",
                }}
                onPress={handleAdPhotoSelect}
              >
                {/* <Plus color={colors.gray[400]} /> */}
              </Button>
            )}
          </HStack>




      <Text
        fontSize={20} 
        mt={6}
      >
        Sobre o produto
      </Text>

      <Input 
          placeholder='Título do anúncio'
          onChangeText={setTitle}
      />

      <Input 
          placeholder='Descrição do produto'
          multiline={true}
          numberOfLines={5}
          mt={6}
          onChangeText={setDescription}
      />

      <Radio.Group
        name='typeProduct'
        value={isNew ? "newProduct" : "usedProduct"}
        onChange={(nextValue) => {
          setIsNew(nextValue === 'newProduct' ? true : false);
        }}
      >
       
        <HStack mt={6}>

          <Radio
            value='newProduct'
          >
            <Text>
              Produto novo
            </Text>
          </Radio>

          <Radio
            value='usedProduct'
            ml={6}
          >
            <Text>
              Produto usado
            </Text>
          </Radio>

        </HStack>

      </Radio.Group>

      <Text
        fontSize={20} 
        mt={3}
      >
        Venda
      </Text>

      <View>

        <Input 
          placeholder='            Valor do produto'
          onChangeText={setPrice}
        />

        {/* <Text           
          ml={6}
          mt={-9}
          h={12}
          fontSize={16} 
        >
          R$
        </Text> */}

      </View>

      <Text
        fontSize={20} 
        mt={3}
      >
        Aceita troca ?
      </Text>

      <View>

        <Switch
          size={12}
          m={0}
          onToggle={(value) => setAcceptTrade(value)}
          value={acceptTrade}
        />

      </View>

      <Text
        fontSize={20} 
        mt={3}
      >
        Meios de Pagamento
      </Text>

      <Checkbox.Group
        onChange={(value) => setPaymentMethods(value)}   
        value={paymentMethods}   
      >
       
          <Checkbox
            value='boleto'
          >
            <Text
            fontSize={18} 
            >Boleto
            </Text>
          </Checkbox>

          <Checkbox
            value='pix'
          >
            <Text
            fontSize={18} 
            >Pix
            </Text>
          </Checkbox>

          <Checkbox
            value='cash'
          >
            <Text
            fontSize={18} 
            >Dinheiro
            </Text>
          </Checkbox>

          <Checkbox
            value='card'
          >
            <Text
            fontSize={18} 
            >Cartão de Crédito
            </Text>
          </Checkbox>

          <Checkbox
            value='deposit'
          >
            <Text
            fontSize={18} 
            >Depósito Bancário
            </Text>
          </Checkbox>

      </Checkbox.Group>

      <HStack
        mt={6}
      >

        <Button 
            title='Cancelar'
            w={130}
            onPress={handleGoBack}
        />

        <Button 
            title='Avançar'
            w={130}
            variant='outline'
            ml={12}
            onPress={handleNewPreview}
        />

      </HStack>  
      
      <View h={20}></View>

    </ScrollView>
   
  
  );

}