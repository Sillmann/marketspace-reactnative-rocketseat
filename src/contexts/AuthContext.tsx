import { createContext, ReactNode, useState, useEffect } from 'react';
import { UserDTO } from '@dtos/UserDTO';
import { api } from '@services/api';
import { storageUserSave, storageUserGet, storageUserRemove } from '@storage/storageUser';
import { storageAuthTokenSave, storageAuthTokenGet, storageAuthTokenRemove } from '@storage/storageAuthToken';

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => Promise<void>;   
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextDataProps>({} as AuthContextDataProps);  

type AuthContextProviderProps = {
  children: ReactNode;
}


export function AuthContextProvider({ children }: AuthContextProviderProps){

  const [user, setUser] = useState<UserDTO>({} as UserDTO);

  async function loadUserData(){
    try {
      const userLogged = await storageUserGet();
      const token = await storageAuthTokenGet();
     
      if ( userLogged && token ){
        userAndTokenUpdate(userLogged, token);
      }
    } catch (error) {
      throw error;
    }
    
  }

  function userAndTokenUpdate(userData: UserDTO, token: string) {

      // anexar a informação no cabeçalho para as requisicoes
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // persistir os dados
      setUser(userData);  
  }

  async function storageUserAndTokenSave(userData: UserDTO, token: string){
    try {
      await storageUserSave(userData);
      await storageAuthTokenSave(token);
    } catch (error) {
      throw error;
    }
  }
  
  useEffect(()=>{
    loadUserData();
  },[]);  

  async function signIn(email: string, password: string){
 
    try {

      const { data } = await api.post('/sessions',{ email, password });

      if (data.user && data.token) {
  
        // armazenar os dados no dispositivo
        await storageUserAndTokenSave(data.user, data.token);

        userAndTokenUpdate(data.user, data.token);
  
      }
    } catch (error) {

      throw error;
   
    }

  }

  async function signOut(){
    try {
      setUser({} as UserDTO);
      await storageUserRemove();
      await storageAuthTokenRemove();

    } catch (error) {
      throw error;
    }
  }
  
  
  return (

 	<AuthContext.Provider value={{ user, signIn, signOut }}>
    {children}
  </AuthContext.Provider>

  );
}
