import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import HomeStack from './navigation/homeStack.js';
import store from './redux/store.js';

export default function App() {
  return (
    <NavigationContainer>
      <ReduxProvider store={store}>
        <HomeStack />
      </ReduxProvider>
    </NavigationContainer>
  );
}
