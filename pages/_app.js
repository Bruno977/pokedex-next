import { PokemonsProvider } from "../context/PokemonsContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <PokemonsProvider>
        <Component {...pageProps} />
      </PokemonsProvider>
    </>
  );
}

export default MyApp;
