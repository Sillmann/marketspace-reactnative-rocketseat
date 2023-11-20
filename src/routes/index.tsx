import { useTheme } from 'native-base';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { AuthRoutes } from './auth.routes';
import { AppRoutes } from './app.routes';

export function Routes(){

	const colors = useTheme();

	const theme = DefaultTheme;

  return(
		<NavigationContainer theme={theme}>
			<AuthRoutes />	
		</NavigationContainer>
  )
}  