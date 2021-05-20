

import Main from "./main"
import "../styles/global.css";
import "../styles/custom.css"

function MyApp({ Component, pageProps }) {
  return (
    <Main> 
       <Component {...pageProps} />
     </Main>
  );
}

export default MyApp;
