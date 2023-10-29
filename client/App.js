import { View } from 'react-native';
import Navigation from './navigation';
import { store } from './store'
import { Provider } from 'react-redux'
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import BottomNavigator from './bottomNavigation'
export default function App() {
  const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
  },
};

  return (
    <Provider store={store}>
<PaperProvider theme={theme}>
      <Navigation />
</PaperProvider>
    </Provider>

  );
};