import {useState} from "react";
import "./App.css"
import {
    Keypair,
    Horizon,
    Networks,
    TransactionBuilder,
    BASE_FEE,
    Operation,
    Asset,
  } from "diamante-sdk-js";
  
function App(){    
    const [message,setmessage] = useState("")
    const [assetName, setAssetName] = useState("");
    const [asset, setAsset] = useState("");
    const [myAddress, setMyAddress] = useState(""); 
    const [loading, setLoading] = useState(""); 
    const [balance,setBalance] = useState("");
    const [dapp_owner, setDappOwner] = useState("")
    const [intermediary_address,setIA] = useState("")
    const connnectWallet = async () => {      
      const server = new Horizon.Server(
          "https://diamtestnet.diamcircle.io" 
        //"https://mainnet.diamcircle.io/" //mainnet
      );
      
      const ext_resp = await window.diam.connect();
        if (ext_resp.status !== 200) {
          alert("Something went wrong opening extension")
    
        }
        console.log(ext_resp.message[0])
        setMyAddress(ext_resp.message[0])
        try {
          const account = await server.loadAccount(ext_resp.message[0]);          
          const nativeBalance = account.balances.find(balance => balance.asset_type === "native"); 
          console.log(nativeBalance)
          setBalance(nativeBalance.balance)
          } catch (error) {
              console.error(error);
          }

    }   
    const handleMintbtnClick = async () => {
        
    
        setLoading(true)
        setmessage("fetching issuer pubic address to pay the fee")
        // setMyAddress(ext_resp.message[0]);
    
        var headersList = {
          "Accept": "*/*",
        }
    
        var response = await fetch("http://localhost:5000/get-dapp-owner-account", {
          method: "POST",
          headers: headersList
        });
    
        var data = await response.json();
        console.log("dapp issuer address received ", data.data);
    
        setDappOwner(data.data.dapp_owner)
    
    
        const server = new Horizon.Server("https://diamtestnet.diamcircle.io");
        const sourceAccount = await server.loadAccount(myAddress);
        console.log(sourceAccount)
        var transaction = new TransactionBuilder(sourceAccount, {
          fee: BASE_FEE,
          networkPassphrase: "Diamante Testnet",
        })
          .addOperation(
            Operation.payment({
              destination: data.data.dapp_owner, //
              asset: Asset.native(),
              amount: "4.00001", //in mainnet it would be 0.0000003 DIAM
            })
          )
          //  .addOperation(Operation.changeTrust({ asset }))
    
          .setTimeout(0)
          .build();
    
        var xdr = transaction.toXDR("base64");
    
        var resp = await window.diam.sign(xdr, true, "Diamante Testnet");
        if (resp.response.status !== 200) {
          alert("fee payment failed");
        }
    
    
        // if (response.status === 200) {
    
        if (resp.response.status === 200) {
          alert("Fee payment done");
        }
    
        headersList = {
          Accept: "*/*",
          "Content-Type": "application/json",
        };
    
        var bodyContent = JSON.stringify({
          asset_name: assetName,
        });
    
        setmessage("creating IA account with the fee paid")
        response = await fetch("http://localhost:5000/create_asset", {
          method: "POST",
          body: bodyContent,
          headers: headersList,
        });
    
        data = await response.json();
    
    
        console.log(data, " data received", myAddress)
        setIA(data.data.intermediary_address)
        if (response.status !== 200) {
          alert("IA generation failed");
        }
    
    
        setAsset(assetName);
    
        const asset = new Asset(data.data.asset_name, data.data.intermediary_address);
        setLoading(false)
    
        const receiverAddress = await server.loadAccount(myAddress);        
    
    
        transaction = new TransactionBuilder(receiverAddress, {
          fee: BASE_FEE,
          networkPassphrase: "Diamante Testnet",
        })
          .addOperation(Operation.changeTrust({ asset }))
          .setTimeout(0)
          .build();
    
        xdr = transaction.toXDR("base64");
        resp = await window.diam.sign(xdr, true, "Diamante Testnet");
        if (resp.response.status === 200) {
          alert("Trustline created for asset ", data.data.asset_name);
        }
      }

      const handleTransferAsset = async () => {

        setLoading(true)
        setmessage("minting the asset from IA to user account ")
        let headersList = {
          Accept: "*/*",
          "Content-Type": "application/json",
        };
    
        console.log(myAddress, " heheh")
    
        let bodyContent = JSON.stringify({
          address: myAddress,
          asset_name: asset,
        });
    
        console.log(asset)
    
        let response = await fetch("http://localhost:5000/mint_asset", {
          method: "POST",
          body: bodyContent,
          headers: headersList,
        });
    
        let data = await response.json();
        console.log(data);
    
        if (data.data === "Asset transfered") {
          setmessage("Asset Minted")
        }
      };

return(
    <>
    <button onClick={connnectWallet}>Connect Wallet</button>
    {myAddress && <div>Wallet Address: {myAddress} </div>}
    {balance && <div>DIAM Wallet Balance: {balance} </div>}
    <form>    
        <input
          type="text"
          value={assetName}
          onChange={(e) => {
            setAssetName(e.target.value);
          }}
          style={{ marginRight: '10px' }}
        />        
        <button type="button" onClick={handleMintbtnClick}>
          Create Asset
        </button>
        {dapp_owner && <div>DApp Owner Address: {dapp_owner} </div>}
        {intermediary_address && <div>Intermediary Address: {intermediary_address} </div>}
      </form>

      <button type="button" onClick={handleTransferAsset} style={{ marginTop: '10px' }}>
        Mint Asset
      </button>

      {loading && (
        <div style={{ marginTop: '20px', color: 'blue' }}>
          {message}
        </div>
      )}
      </>
);
}
export default App;