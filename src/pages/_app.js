import { GeneralProvider } from "@/context";
import "@/styles/globals.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


export default function App({ Component, pageProps }) {
  return (
    <GeneralProvider>
      <Component {...pageProps} />
      <ToastContainer theme="dark"/>
    </GeneralProvider>
  );
}
