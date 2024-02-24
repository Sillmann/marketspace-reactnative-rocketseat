import { StatusBar } from 'react-native';
import { useFonts, Karla_400Regular, Karla_700Bold} from '@expo-google-fonts/karla';
import { NativeBaseProvider } from 'native-base';
import { Loading } from '@components/Loading';
import { AuthContextProvider } from '@contexts/AuthContext';
import { THEME } from './src/theme';
import { Routes } from './src/routes';

export default function App() {

  const [fontsLoaded] = useFonts({ Karla_400Regular, Karla_700Bold });

  return (
    <NativeBaseProvider theme={THEME}>


      <StatusBar 
        barStyle="light-content" 
        backgroundColor="transparent" 
        translucent
      /> 

      <AuthContextProvider>
      
        { fontsLoaded ? <Routes/> : <Loading/>}
        
      </AuthContextProvider> 

    </NativeBaseProvider>
  );
}
