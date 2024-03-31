import AsyncStorage from '@react-native-async-storage/async-storage';
import { FilterDTO } from '@dtos/FilterDTO';
import { FILTER_STORAGE } from '@storage/storageConfig';

export async function storageFilterSave(filter: FilterDTO){
  await AsyncStorage.setItem(FILTER_STORAGE,JSON.stringify(filter));
}

export async function storageFilterGet(){
  const storage = await AsyncStorage.getItem(FILTER_STORAGE);
  const filter: FilterDTO = storage ? JSON.parse(storage) : {};
  return filter;
}

export const storageFilterRemove = async () => {
  await AsyncStorage.removeItem(FILTER_STORAGE);
};
