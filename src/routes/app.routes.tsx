import { useTheme } from 'native-base';

import { Home } from '@screens/Home';
import { MyAds } from '@screens/MyAds';
import { SignOut } from '@screens/SignOut';

import { New } from '@screens/New';
import { NewPreview } from '@screens/NewPreview';
import { MyAd } from '@screens/MyAd';
import { EditAd } from '@screens/EditAd';

import HomeSvg from '@assets/home.svg';
import AdsSvg from '@assets/ads.svg';
import OutSvg from '@assets/out.svg';

import  { createBottomTabNavigator, 
          BottomTabNavigationProp 
        } from '@react-navigation/bottom-tabs';

import  {
          createNativeStackNavigator,
          NativeStackNavigationProp
        } from '@react-navigation/native-stack';
        
type BottomRoutes = {
  home: undefined
  myads: undefined
  signOut: undefined
}

type NativeStackRoutes = {
  homeBottom: BottomRoutes
  myad: { id: string }
  new: { id: string }
  editad: { id: string }
}

export type AppBottomNavigatorRoutesProps = BottomTabNavigationProp<BottomRoutes>

export type AppStackNavigatorRoutesProps = NativeStackNavigationProp<NativeStackRoutes>

const BottomTab = createBottomTabNavigator<BottomRoutes>()
const NativeStackTab = createNativeStackNavigator<NativeStackRoutes>()

function BottomTabHome() {
  
  const { sizes, colors } = useTheme();

  const iconSize = sizes[6];

  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colors.gray[200],
        tabBarInactiveTintColor: colors.gray[400],
        tabBarStyle: {
          backgroundColor: colors.gray[700],
          borderTopWidth: 0,
          paddingTop: sizes[5],
          paddingBottom: sizes[7]
        }
      }}
    >
      <BottomTab.Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: ({ color })=>(
            <HomeSvg fill={color} width={iconSize} height={iconSize}/>
          )          
        }}
      />

      <BottomTab.Screen
        name="MyAds"
        component={MyAds}
        options={{
          tabBarIcon: ({ color })=>(
            <AdsSvg fill={color} width={iconSize} height={iconSize}/>
          )          
        }}

      />
      <BottomTab.Screen
        name="signOut"
        component={SignOut}
        options={{
          tabBarIcon: ({ color })=>(
            <OutSvg fill={color} width={iconSize} height={iconSize}/>
          )          
        }}
      />

    </BottomTab.Navigator>
  )
}

export function AppRoutes() {

  return(
    <NativeStackTab.Navigator
      screenOptions={{ 
        headerShown: false,
      }}
    >
      
      <NativeStackTab.Screen
        name='homeBottom'
        component={BottomTabHome}
      />

      <NativeStackTab.Screen
        name='myad'
        component={MyAd}
      />

      <NativeStackTab.Screen
        name='new'
        component={New}
      />

      
      <NativeStackTab.Screen
        name='editad'
        component={EditAd}
      />

    </NativeStackTab.Navigator>
  )
}