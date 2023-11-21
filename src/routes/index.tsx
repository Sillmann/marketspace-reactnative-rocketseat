import { useContext } from 'react';
import { useTheme } from 'native-base';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { AuthRoutes } from './auth.routes';
import { AppRoutes } from './app.routes';
import { useAuth } from '@hooks/useAuth';

export function Routes(){

	const colors = useTheme();

	const theme = DefaultTheme;
	const { user } = useAuth();

  console.log("usuario logado", user);

  return(
		<NavigationContainer theme={theme}>
			<AuthRoutes />	
		</NavigationContainer>
  )
}  