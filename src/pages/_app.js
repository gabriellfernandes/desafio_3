import { GeneralProvider } from "@/context";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <GeneralProvider>
      <Component {...pageProps} />
    </GeneralProvider>
  );
}
