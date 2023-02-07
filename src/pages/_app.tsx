import type { AppProps } from 'next/app';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import '@/styles/globals.css';

const App = ({ Component, pageProps }: AppProps) => {
  const theme = extendTheme({
    fonts: {
      heading: 'Roboto;',
      body: 'Roboto;',
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default App;
