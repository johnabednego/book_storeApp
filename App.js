import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Home} from './screens/Home'
import { Book } from './screens/Book';
const Stack = createStackNavigator();

export default function App() { 
  return (
    <NavigationContainer>
    <Stack.Navigator 
    
    >
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerStyle:{"backgroundColor":"#fa7b32"},
          headerTitleAlign:"center",
          headerTitleStyle:{"color":"white", fontSize:25},
          headerTitle:"Bookstore"
        }}
        
      /> 
      <Stack.Screen
        name="Book"
        component={Book}
        options={({ route }) => ({ title: route.params.item.title,
          headerStyle:{"backgroundColor":"white"},
            headerTitleAlign:"center",
            headerTitleStyle:{"color":"black", fontSize:25, marginLeft:15},
        })}
     
        />
    </Stack.Navigator>
  </NavigationContainer>
  )
}



 

