// Get the transactions of an address from here
// https://ubiquity.api.blockdaemon.com/v1/ethereum/mainnet/account/0xb646D87963Da1FB9D192Ddba775f24f33e857128/txs


// Get the balance of the address from here
// https://ubiquity.api.blockdaemon.com/v1/ethereum/mainnet/account/0x10F767924C19a5B62f257a72f90Bb45eb88Ba2e9


// Get the details of a transaction from the transaction hash 
// https://ubiquity.api.blockdaemon.com/v1/ethereum/mainnet/tx/0xae825a5cb6ca16c45550fc4641649ae8be29bc301396749bb1e611ec0aee4247

// Get the transactions in a block 
// https://ubiquity.api.blockdaemon.com/v1/ethereum/mainnet/block/0x2444165297806ad5598e4569e5823b3df0cde3e48b346781ab632fa6cef1a0ec

// Get the hash of all the transactions in a block
// https://ubiquity.api.blockdaemon.com/v2/ethereum/mainnet/block/0x2444165297806ad5598e4569e5823b3df0cde3e48b346781ab632fa6cef1a0ec



console.log("ayo")
function displayTransactions () {
    let transactionContainer = document.getElementById("transactionDetail")
    console.log(transactionContainer, "line 20")
  
    let renderData = `
    <tr>
              <td>0x398beb396d5a5aa...</td>
              <td>Transfer</td>
              <td id="result">166625</td>
              <td>26 mins ago (sep-14-2022)</td>
              <td><a href="blue-block-explorer-address-detail.html">0x6d83b25142ed37f...</a></td>
              <td><a href="blue-block-explorer-address-detail.html">0x64acf4bd261e264...</a></td>
              <td>0.0023 Ether</td>
              <td>4.2331256</td>
      </tr>
    `
   // transactionContainer.innerHTML += renderData;
   }
  
   displayTransactions()
  