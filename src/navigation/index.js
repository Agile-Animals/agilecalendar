import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import LoginScreen from '../screens/LoginScreen'

const Stack = createStackNavigator()

const LoginStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={LoginScreen} />
  </Stack.Navigator>
)

export { LoginStack }
