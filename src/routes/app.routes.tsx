import { useTheme } from 'native-base';

import { createBottomTabNavigator, BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

import { Home } from '@screens/Home';
import { MyAds } from '@screens/MyAds';
import { New } from '@screens/New';

import HomeSvg from '@assets/home.svg';
import AdsSvg from '@assets/ads.svg';
import OutSvg from '@assets/out.svg';

type AppRoutes = {
  home: undefined;
  myads: undefined;
}

export type AppNavigatorRoutesProps = BottomTabNavigationProp<AppRoutes>;

const { Navigator, Screen } = createBottomTabNavigator<AppRoutes>();

export function AppRoutes() {

  const { sizes, colors } = useTheme();

  const iconSize = sizes[6];

  return(
    <Navigator
      screenOptions={{ 
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.gray[400],
        tabBarInactiveTintColor: colors.gray[500],   
        tabBarStyle: {
          backgroundColor: colors.gray[700],
        }     
      }}
    >
      
      <Screen
        name='home'
        component={Home}
        
        options={{
          tabBarIcon: ({ color })=>(
            <HomeSvg fill={color} width={iconSize} height={iconSize}/>
          )          
        }}
      />

      <Screen
        name='myads'
        component={MyAds}

        options={{
          tabBarIcon: ({ color })=>(
            <AdsSvg fill={color} width={iconSize} height={iconSize}/>
          )          
        }}
      />

      <Screen
        name='new'
        component={New}
      />

    </Navigator>
  )
}