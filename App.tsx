import { StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'react-native';
import { useFonts, Karla_400Regular, Karla_700Bold} from '@expo-google-fonts/karla';
import { NativeBaseProvider } from 'native-base';
import { Loading } from '@components/Loading';
import { THEME } from './src/theme';
import { Routes } from './src/routes';

export default function App() {

  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>

    {/* <View style={styles.container}> */}

      

      <StatusBar 
        barStyle="light-content" 
        backgroundColor="transparent" 
        translucent
      /> 

{/* <Routes/> */}

      {/* { fontsLoaded ? <Text style={{fontFamily: 'Karla_700Bold'}}></Text> : <Loading /> } */}
      { fontsLoaded ? <Routes/> : <Loading/>}

    {/* </View> */}

    </NativeBaseProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F7F7F8',
//     alignItems: 'center',
//     justifyContent: 'center'
//   },
// });
