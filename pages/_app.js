import { AppProvider } from "../context/AppContext";
import { PokemonsProvider } from "../context/PokemonsContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <AppProvider>
        <PokemonsProvider>
          <Component {...pageProps} />
        </PokemonsProvider>
      </AppProvider>
    </>
  );
}

export default MyApp;
