import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import "@/styles/globals.css";
import { AuthProvider } from "../context/AuthContext";

const App = ({ Component, pageProps }: AppProps) => {
  const theme = extendTheme({
    fonts: {
      heading: "Roboto;",
      body: "Roboto;",
    },
  });

  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  );
};

export default App;
