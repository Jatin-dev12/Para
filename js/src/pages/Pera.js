import React, { useEffect, useState } from "react";
import { PeraWalletConnect } from "@perawallet/connect";

const peraWallet = new PeraWalletConnect({
  shouldShowSignTxnToast: false,
});

function Pera() {
  const [accountAddress, setAccountAddress] = useState(null);
  const [algoAmount, setAlgoAmount] = useState(null);
  const [buyAmount, setBuyAmount] = useState(null);
  const [assets, setAssets] = useState([]);
  const isConnectedToPeraWallet = !!accountAddress;

  function handleConnectWalletClick() {
    peraWallet
      .connect()
      .then((newAccounts) => {
        // Setup the disconnect event listener
        peraWallet.connector?.on("disconnect", handleDisconnectWalletClick);

        setAccountAddress(newAccounts[0]);
      })
      .catch((error) => {
        // You MUST handle the reject because once the user closes the modal, peraWallet.connect() promise will be rejected.
        // For the async/await syntax you MUST use try/catch
        if (error?.data?.type !== "CONNECT_MODAL_CLOSED") {
          // log the necessary errors
        }
      });
  }

  function handleDisconnectWalletClick() {
    peraWallet.disconnect();
    setAccountAddress(null);
    setAlgoAmount(null);
    setBuyAmount(null);
  }

  useEffect(() => {
    if (accountAddress) {
      const fetchData = async () => {
        const algoAsset = await peraWallet.getAsset({
          id: 137020565,
          address: accountAddress,
        });
        const algoAmount = (algoAsset.amount / 1000000).toFixed(2);
        setAlgoAmount(algoAmount);

        // Fetch the BUY token
        const buyAsset = await peraWallet.getToken("buy");
        const buyAssetId = buyAsset.asset_id;
        const buyAssetObj = await peraWallet.getAsset({
          id: buyAssetId,
          address: accountAddress,
        });
        const buyAmount = (buyAssetObj.amount / 1000000).toFixed(2);
        setBuyAmount(buyAmount);

        // Fetch the user's assets
        const fetchedAssets = await Promise.all(
          (
            await peraWallet.getAssets({
              address: accountAddress,
            })
          ).map(async (id) => {
            const assetObj = await peraWallet.getAsset({
              id ,
              address: accountAddress,
            });
            return {
              id: assetObj.asset_id,
              name: assetObj.params.name,
              amount: (assetObj.amount / 1000000).toFixed(2),
            };
          })
        );
        setAssets(fetchedAssets);
      };

      fetchData();
    }
  }, [accountAddress]);

  // ...

  return (
    <div>
      <button
        onClick={
          isConnectedToPeraWallet ? handleDisconnectWalletClick : handleConnectWalletClick
        }
      >
        {isConnectedToPeraWallet ? "Disconnect" : "Connect to Pera Wallet"}
      </button>
      {isConnectedToPeraWallet && (
        <div>
          <p>Wallet Address: {accountAddress.substring(0, 10)}...{accountAddress.slice(-10)}</p>
          <p>ALGO Amount: {algoAmount}</p>
          <p>BUY Amount: {buyAmount}</p>
        </div>
      )}
    </div>
  );
}

export default Pera;