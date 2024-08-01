import { useState } from "react";
import "./App.css";

import {
  Keypair,
  Horizon,
  Networks,
  TransactionBuilder,
  BASE_FEE,
  Operation,
  Asset,
} from "diamante-sdk-js";


function App() {
  const [issuer, setIssuer] = useState("");
  const [message, setmessage] = useState("");
  const [myAddress, setMyAddress] = useState(""); 
  const [loading, setLoading] = useState(false);

  const handleMakeIssuer = async () => {

    setLoading(true)
    setmessage("creating issuer keypair for dapp owner")
    try {
      let headersList = {
        Accept: "*/*",
      };

      let response = await fetch("http://localhost:5000/create_issuer", {
        method: "GET",
        headers: headersList,
      });

      let data = await response.json();
      setIssuer(data.issuer);
      setLoading(false)

    } catch (e) {
      console.log(e);
      setLoading(false)

    }
  };

  const handleFundIssuer = async () => {


    const ext_resp = await window.diam.connect();
    if (ext_resp.status === 200) {

      setLoading(true)
      setmessage("funding issuer keypair")
      setMyAddress(ext_resp.message[0]);

      const server = new Horizon.Server("https://diamtestnet.diamcircle.io");
      const sourceAccount = await server.loadAccount(ext_resp.message[0]);

      const transaction = new TransactionBuilder(sourceAccount, {
        fee: BASE_FEE,
        networkPassphrase: "Diamante Testnet",
      })
        .addOperation(
          Operation.createAccount({
            destination: issuer,
            startingBalance: "5",
          })
        )
        .setTimeout(0)
        .build();

      const xdr = transaction.toXDR("base64");

      const resp = await window.diam.sign(xdr, true, "Diamante Testnet");



      if (resp.response.status === 200) {
        alert("Issuer account active");
      } else {
        alert("Something went wrong!");
      }

      console.log(resp.toString(), "Check status");

      setLoading(false)
    } else {
      alert("Error");
      setLoading(false)
    }
  };

  




  // return (
  //   <>
  //     <button onClick={handleMakeIssuer}>Make Issuer</button>
  //     {issuer && <div>Issuer is {issuer}</div>}

  //     <button onClick={handleFundIssuer}>Fund Issuer</button>

  //     <form>
  //       <input
  //         type="text"
  //         value={assetName}
  //         onChange={(e) => {
  //           setAssetName(e.target.value);
  //         }}
  //       />
  //       <button type="button" onClick={handleMintbtnClick}>
  //         create Asset
  //       </button>
  //     </form>

  //     <button type="button" onClick={handleTransferAsset}>
  //       mint asset
  //     </button>
  //   </>
  // );
  return (
    <>
      <button onClick={handleMakeIssuer} style={{ marginBottom: '10px' }}>
        Make Issuer
      </button>
      {issuer && <div>Issuer is {issuer}</div>}
      <button onClick={handleFundIssuer} style={{ marginBottom: '10px' }}>
        Fund Issuer
      </button>     
      
    </>
  );

}

export default App;
