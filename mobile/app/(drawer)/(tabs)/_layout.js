import { StyleSheet, Button, Image} from 'react-native'
import React from 'react'
import { Tabs, router } from 'expo-router'
import { Feather, AntDesign } from '@expo/vector-icons';
import { DrawerToggleButton } from '@react-navigation/drawer';
import { API_BASE_URL } from "@env";
import { useSelector } from "react-redux";

export default function _layout() {
  const picturePath = useSelector(state => state.user.data.user.picturePath)

  return (
   <Tabs screenOptions={{headerLeft: () => <DrawerToggleButton tintColor='#000' />}}>
    <Tabs.Screen name='feed' options={{
      tabBarIcon: ({color}) => (
        <Feather name="list" size={24} color={color} />
      ),
      tabBarLabel: 'Feed',
      headerTitle: 'Feed',
      headerLeft: () => <Image 
        source={{ uri: `${API_BASE_URL}/assets/${picturePath}`}}
        width={25}
        height={25}
        style={styles.image}
      />,
      headerRight: () => <Button onPress={() => router.push('feed/new')} title='Add Post' />
    }} />
    <Tabs.Screen name='profile' options={{
      tabBarIcon: ({color}) => (
        <AntDesign name="user" size={24} color={color} />
      ),
      tabBarLabel: 'Profile',
      headerTitle: 'Profile'
    }} />
   </Tabs>
  )
}


const styles = StyleSheet.create({
  image: {
    borderRadius: 40,
    borderColor: 'black',
    margin: 10,
  }
});
