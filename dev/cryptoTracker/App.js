import React from 'react';

import { NavigationContainer } from '@react-navigation/native'

import CoinsStack from './src/components/coins/CoinsStack'
import {View, Text} from 'react-native'
const App = () => {

  return (
    <NavigationContainer>
      <CoinsStack></CoinsStack>
    </NavigationContainer>
  );
};


export default App;
