const baseURL = "https://ubiquity.api.blockdaemon.com"


// function that fetches the current block 
const fetchCurrentBlockNumber = async function (protocol, network,APIKEY) {
    try {
      const url = new URL(`${baseURL}/v1/${protocol}/${network}/sync/block_number?apiKey=${APIKEY}`)
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Data not found");
      }
      const result = await response.json();
      
  
     // console.log("line 24", result);
      return result;
    } catch (err) {
      console.error(err);
    }
  };

  // function that fetches block information 
  const fetchBlockInformation = async function (protocol, network,APIKEY, block_identifier) {
    try {
      const url = new URL(`${baseURL}/v1/${protocol}/${network}/block/${block_identifier}?apiKey=${APIKEY}`)
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Data not found");
      }
      const result = await response.json();
      
  
<<<<<<< HEAD
    console.log("line 24", result);
=======
   //   console.log("line 24", result);
>>>>>>> 18c41382b9de1cef93164740d36a9385fc4474a8
      return result;
    } catch (err) {
      console.error(err);
    }
  };


    const dataResult = async function () {
     const data = await fetchCurrentBlockNumber("ethereum", "mainnet", "bd1b4uvVUUl8KUHvGEscJT8K1C98kU8qSNnPFG2JcUPV0Hi");

   for (let i = data; i >=  data-20; i--) {
    //    console.log(i);

     const res = await  fetchBlockInformation("ethereum", "mainnet", "bd1b4uvVUUl8KUHvGEscJT8K1C98kU8qSNnPFG2JcUPV0Hi", i)
     displayBlock(res);
     //console.log(res);

   }

    }  
  dataResult()


  // function that displayes the UI

  

 function displayBlock (input) {
  let blockContainer = document.getElementById("block-detail")

  let renderData = `
  <tr id="block-detail">
      <td ><a href="blue-block-explorer-rich-list.html?block_number=${input.number}">${input.number}</a></td>
      <td>${input.date}</td>
      <td>${input.num_txs} transactions </td>
      <td>completed</td>
      <td><a href="blue-block-explorer-address-detail.html">${input.parent_id}</a></td>
      <td><a href="blue-block-explorer-rich-list.html?block_txn=${input.id}">${input.id}</a></td>
  </tr>
  `
  blockContainer.innerHTML += renderData;
 }
 

 const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (seachParams, prop) => seachParams.get(prop),
 })

 let txn_value = params.block_txn
 console.log(txn_value, "line 94")


 const getBlockTransactions = async function (protocol, network,txnHash,APIKEY) {
  try {
    const url = new URL(`${baseURL}/v1/${protocol}/${network}/block/${txnHash}?apiKey=${APIKEY}`)
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Data not found");
    }
    const result = await response.json();
<<<<<<< HEAD
  //  console.log(result)
=======
    console.log(result)
>>>>>>> 18c41382b9de1cef93164740d36a9385fc4474a8
    const data = await result.txs.slice(0,50).map(resp => {
      return {
        from: resp.events[0].source,
        tx_hash: resp.events[0].transaction_id,
        tx_fee: (resp.events[0].amount / 1e18),
        date: resp.date,
        block: resp.block_number,
        
      }
    })
<<<<<<< HEAD
   console.log("queried data", data)
=======
    console.log("queried data", data)
>>>>>>> 18c41382b9de1cef93164740d36a9385fc4474a8
    

  // console.log("line 24", result.txs);
    return data;
  } catch (err) {
    console.error(err);
  }
}
getBlockTransactions("ethereum", "mainnet",txn_value, "bd1b4uvVUUl8KUHvGEscJT8K1C98kU8qSNnPFG2JcUPV0Hi")



function displayTransactions () {
  let transactionContainer = document.getElementById("transactionDetail")

  let renderData = `
  <tr>
  <td>0x9d013c8ef057257b949d80...</td>
  <td>167373</td>
  <td>26 mins ago (sep-14-2022)</td>
  <td><a href="blue-block-explorer-address-detail.html">0x388C818CA8B9251...</a></td>
  <td><a href="blue-block-explorer-address-detail.html">0xDB65702A9b26f8a...</a></td>
  <td>0.11 Ether</td>
  <td>0.0000231 </td>
</tr>
  `
 transactionContainer.innerHTML += renderData;
 }


 displayTransactions()

 async function transactionDataResult() {


 const data = await getBlockTransactions("ethereum", "mainnet",txn_value, "bd1b4uvVUUl8KUHvGEscJT8K1C98kU8qSNnPFG2JcUPV0Hi")
 // console.log(data)
  
 }

//  transactionDataResult() 

<<<<<<< HEAD

 let block_value = params.block_detail
 let address_value = params.address_details
//  console.log(block_value, "line 155")
//  console.log(address_value, "line 158")


 const fetchAddressData = async function (protocol, network,address,APIKEY) {
  try {
    const url = new URL(`${baseURL}/v1/${protocol}/${network}/account/${address}/txs?apiKey=${APIKEY}`)
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Data not found");
    }
    const result = await response.json();
    const res = await result.data.map(data => {
      return {
          txn_hash: data.id,
          block_num: data.block_number,
          time: data.date,
          from: data.events[0].source,
          to: data.events[1]?.destination == undefined ? "0x00000000000000000000" : data.events[1].destination,
          value: (data.events[1]?.amount/ 1e18) === undefined ? 0 : (data.events[1]?.amount/ 1e18),
          txn_fee: (data.events[0].amount / 1e18),
       }
    })
    

  // console.log("line 169", result);
  // console.log("line 177", res);
    return res;
  } catch (err) {
    console.error(err);
  }
}




const fetchAddressBalance = async function (protocol, network,address,APIKEY) {
  try {
    const url = new URL(`${baseURL}/v1/${protocol}/${network}/account/${address}?apiKey=${APIKEY}`)
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Data not found");
    }
    const result = await response.json();
    const res = await (result[0].confirmed_balance) / 1e18;
    

  console.log("line 191", res);
    return res;
  } catch (err) {
    console.error(err);
  }
}





//balanceData, transactionData

async function displayAddessBalance (balanceData) {
  let balanceContainer = document.getElementById("addressBalance")
  let etherPrice = await getEtherPrice()
  // console.log("ether price 2", etherPrice)
  
  let renderAddress = `
  <tr>
      <td><strong>Address</strong></td>
      <td>${address_value}</td>
   </tr>
   <tr>
      <td><strong>Balance</strong></td>
      <td>${balanceData} Ether</td>
   </tr>
   <tr>
     <td><strong>Value</strong></td>
      <td>$${(etherPrice * balanceData).toString().slice(0,15)}</td>
   </tr>
  `
  balanceContainer.innerHTML += renderAddress;
  
  
    }


function displayAddressTransactions(transactionData) {
       
    let transactionContainer = document.getElementById("addressTransaction")
    let renderTransaction = `
    <tr>
        <td><a href="TransacrionDetail.html?block_detail=${transactionData.txn_hash}">${transactionData.txn_hash.slice(0,20)}...</a></td>
        <td>Transfer</td>
        <td>${transactionData.block_num}</td>
        <td>${transactionData.time}</td>
        <td><a href="blue-block-explorer-address-detail.html?address_details=${transactionData.from}">${transactionData.from.slice(0,20)}...</a></td>
        <td><a href="blue-block-explorer-address-detail.html?address_details=${transactionData.to}">${transactionData.to.slice(0,20)}...</a></td>
        <td>${transactionData.value.toString().slice(0,6)} Ether</td>
        <td>${transactionData.txn_fee.toString().slice(0,6)}</td>
   </tr>
      `
      transactionContainer.innerHTML += renderTransaction;
   }



  async function addressDataResult() {
  
  try {
    const balance = await fetchAddressBalance("ethereum", "mainnet",  address_value, "bd1b4uvVUUl8KUHvGEscJT8K1C98kU8qSNnPFG2JcUPV0Hi")
    displayAddessBalance(balance)
    const addressTransactions = await fetchAddressData("ethereum", "mainnet",  address_value, "bd1b4uvVUUl8KUHvGEscJT8K1C98kU8qSNnPFG2JcUPV0Hi")
    addressTransactions.map(res => displayAddressTransactions(res))

    } catch (error) {
    
    }

}

addressDataResult()



async function getEtherPrice () {
  try {
    const url = new URL(`https://api.etherscan.io/api?module=stats&action=ethprice&apikey=S32VXKUD9JSDHR39CBUSRUKKEC938A63XU`)
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Data not found");
    }
    const result = await response.json();
   // console.log("Ether price", result.result.ethusd)
    return result.result.ethusd;
  } catch (err) {
    console.error(err);
  }
}


async function displayTransactionFromHash (data) {

  let price = await getEtherPrice();
  let transactionContainer = document.getElementById("Transaction_Hash_details")
  let renderTransaction = `

   <div class="row block__props">
       <div class="col-sm-4 block__Height">
         <i class="fa-regular fa-circle-question">Transaction Hash:</i>
       </div>
       <div class="col-sm-8"> ${data.transaction_hash} </div>
   </div>

  <div class="row block__props">
      <div class="col-sm-4 block__Height">
        <i class="fa-regular fa-circle-question">Status:</i>
      </div>
      <div class="col-sm-8"> ${data.status} </div>
  </div>

  <!-- Block -->
  <div class="row block__props">
    <div class="col-sm-4 block__Height">
      <i class="fa-regular fa-circle-question"> Block:</i>
    </div>
    <div class="col-sm-8"> ${data.block} </div>
  </div>

  <!-- Time stamp -->
  <div class="row block__props">
    <div class="col-sm-4 block__Height">
      <i class="fa-regular fa-circle-question">Timestamp:</i>
    </div>
    <div class="col-sm-8"> ${data.timestamp} </div>
  </div>

  <!-- From Address -->
  <div class="row block__props">
    <div class="col-sm-4 block__reward">
      <i class="fa-regular fa-circle-question">From:</i>
    </div>
    <div class="col-sm-8"> ${data.from}</div>
  </div>

  <!-- To address -->
  <div class="row block__props">
    <div class="col-sm-4 Uncles__reward">
      <i class="fa-regular fa-circle-question">To:</i>
    </div>
    <div class="col-sm-8"> ${data.to}</a></div>
  </div>

  <!-- Value of transction -->
  <div class="row block__props">
    <div class="col-sm-4 Difficulty">
      <i class="fa-regular fa-circle-question">Value:</i>
    </div>
    <div class="col-sm-8">${data.value} Ether ($${price * data.value})</div>
  </div>

  <!-- Transaction fee -->
  <div class="row block__props">
    <div class="col-sm-4 Total__difficulty">
      <i class="fa-regular fa-circle-question">Transaction Fee:</i>
    </div>
    <div class="col-sm-8">${data.transaction_fee} Ether ($0.45) </div>
  </div>

  <!-- Base Fee -->
  <div class="row block__props">
    <div class="col-sm-4 Size">
      <i class="fa-regular fa-circle-question">Base fee:</i>
    </div>
    <div class="col-sm-8">${data.base_fee}</div>
  </div>

  <!-- Gas Limit section -->
  <div class="row block__props">
    <div class="col-sm-4 Gas__Limit">
      <i class="fa-regular fa-circle-question">Gas Limit:</i>
    </div>
    <div class="col-sm-8"> ${data.gas_limit} </div>
  </div>

  <!-- Gas price for this section -->
  <div class="row block__props">
    <div class="col-sm-4 Base__fee">
      <i class="fa-regular fa-circle-question">Gas price :</i>
    </div>
    <div class="col-sm-8"> ${data.gas_price} Gwei</div>
  </div>

  <!-- Gas used in this section -->
  <div class="row block__props">
    <div class="col-sm-4 Burnt__Fees">
      <i class="fa-regular fa-circle-question">Burnt Fees :</i>
    </div>
    <div class="col-sm-8">
      <i class="fa-solid fa-fire"></i>
      ${data.burnt_fees / 1e18} Ethers
    </div>
  </div>
    `
    transactionContainer.innerHTML += renderTransaction;
}


// displayTransactionFromHash()


//protocol, network, tranactionHash, APIKEY
async function fetchTransactionHashDetail (protocol, network, tranactionHash, APIKEY)  {
  try {
    const url = new URL(`${baseURL}/v1/${protocol}/${network}/tx/${tranactionHash}?apiKey=${APIKEY}`)
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Data not found");
    }
    const result = await response.json();
    const res = await  {
      transaction_hash: result.id,
      status: result.status,
      block: result.block_number,
      timestamp: result.date,
      from: result.events[0].source,
      to: result.events[1]?.destination == undefined ? "0x00000000000000000000" : result.events[1].destination,
      value: (result.events[1]?.amount/ 1e18) === undefined ? 0 : (result.events[1]?.amount/ 1e18), 
      transaction_fee: (result.events[0].amount / 1e18),
      base_fee: result.events[0].meta.base_fee,
      gas_limit: result.events[0].meta.gas_limit,
      gas_price: result.events[0].meta.gas_price,
      burnt_fees: result.events[0].meta.fee_burned
    }
    // console.log("Line 427", res)

    // console.log("line 426", result);
    return res;
  } catch (err) {
    console.error(err);
  }
}



  async function transactionHashDataResult () {
    try {
      const res = await fetchTransactionHashDetail("ethereum", "mainnet", block_value, "bd1b4uvVUUl8KUHvGEscJT8K1C98kU8qSNnPFG2JcUPV0Hi")
      await displayTransactionFromHash(res)

    } catch (error) {
      console.error(error)
    }
} 

transactionHashDataResult()

// Implementation of search for transaction details


let transaction_button = document.getElementById("transactionHash_btn")
let transaction_search = document.getElementById("transactionHashSearch")



async function clickTransaction () {
  try {

    transaction_button.addEventListener("click", async function () {

    const res =  await  fetchBlockInformation("ethereum", "mainnet", "bd1b4uvVUUl8KUHvGEscJT8K1C98kU8qSNnPFG2JcUPV0Hi", transaction_search.value)
        displayBlock(res);

      console.log(transaction_search.value)
    })
    
    } catch (error) {

     }
  }

  clickTransaction()
=======
// to: res.events[1].destination,
// from: res.events[1].source,
// block: res.block_number,
// tx_hash: res.events[1].transaction_id,
// value: amount/1e18,
// tx_fee: (res.events[0].meta.gas_price * res.events[0].meta.gas_used) / 1e18
>>>>>>> 18c41382b9de1cef93164740d36a9385fc4474a8
