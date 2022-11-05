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
      
      return result;
    } catch (err) {
      console.error(err);
    }
  };

  // function that fetches block information 
  const fetchBlockInformation = async function (protocol, network,APIKEY, block_identifier) {
    try {
      const url = new URL(`${baseURL}/v1/${protocol}/${network}/block/${block_identifier}?apiKey=${APIKEY}`)
      const response = await fetch(url);5
      if (!response.ok) {
        throw new Error("Data not found");
      }
      const result = await response.json();
      

      return result;
    } catch (err) {
      console.error(err);
    }
  };


    const dataResult = async function () {
     const data = await fetchCurrentBlockNumber("ethereum", "mainnet", "bd1b4uvVUUl8KUHvGEscJT8K1C98kU8qSNnPFG2JcUPV0Hi");

   for (let i = data; i >=  data-20; i--) {

     const res = await  fetchBlockInformation("ethereum", "mainnet", "bd1b4uvVUUl8KUHvGEscJT8K1C98kU8qSNnPFG2JcUPV0Hi", i)
     displayBlock(res);

   }

    }  
  dataResult()


  // function that displayes the UI

  

 function displayBlock (input) {
  let blockContainer = document.getElementById("block-detail")

  let renderData = `
  <tr id="block-detail">
      <td >${input.number}</td>
      <td>${input.date}</td>
      <td>${input.num_txs} transactions </td>
      <td>completed</td>
      <td><a href="blue-block-explorer-rich-list.html?block_txn=${input.parent_id}">${input.parent_id.toString().slice(0,20)}...</a></td>
      <td><a href="blue-block-explorer-rich-list.html?block_txn=${input.id}">${input.id.toString().slice(0,20)}...</a></td>
  </tr>
  `
  blockContainer.innerHTML += renderData;
 }
 
// Transfer value to next page
 const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (seachParams, prop) => seachParams.get(prop),
 })

 let txn_value = params.block_txn


 const getBlockTransactions = async function (protocol, network,txnHash,APIKEY) {
  try {
    const url = new URL(`${baseURL}/v1/${protocol}/${network}/block/${txnHash}?apiKey=${APIKEY}`)
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Data not found");
    }
    const result = await response.json();

    const data = await result.txs.slice(0,50).map(resp => {
      return {
        from: resp.events[0].source,
        tx_hash: resp.events[0].transaction_id,
        tx_fee: (resp.events[0].amount / 1e18),
        date: resp.date,
        block: resp.block_number,
        to: resp.events[1]?.destination == undefined ? "0x00000000000000000000" : resp.events[1].destination,
        value: (resp.events[1]?.amount/ 1e18) === undefined ? 0 : (resp.events[1]?.amount/ 1e18)  
      }
    })
    
    return data;
  } catch (err) {
    console.error(err);
  }
}



function displayTransactions (data) {
  let transactionContainer = document.getElementById("transactionDetail")

  let renderData = `
  <tr>
    <td><a href="TransacrionDetail.html?block_detail=${data.tx_hash}">${data.tx_hash.slice(0,20)}...</a></td>
    <td>${data.block}</td>
    <td>${data.date}</td>
    <td><a href="blue-block-explorer-address-detail.html?address_details=${data.from}">${data.from.slice(0,20)}...</a></td>
    <td><a href="blue-block-explorer-address-detail.html?address_details=${data.to}">${data.to.slice(0,20)}...</a></td>
    <td>${data.value.toString().slice(0,6) == NaN.toString() ? 0 : data.value.toString().slice(0,6)} Ether</td>
    <td>${data.tx_fee.toString().slice(0,9)} </td>
  </tr>
  `
 transactionContainer.innerHTML += renderData;
 }

 async function transactionDataResult() {

    try {
    
      const data = await getBlockTransactions("ethereum", "mainnet",txn_value, "bd1b4uvVUUl8KUHvGEscJT8K1C98kU8qSNnPFG2JcUPV0Hi")
      data.map(res => displayTransactions(res))
      
    } catch (error) {
    
  }
  
 }

 transactionDataResult() 


 let block_value = params.block_detail
 let address_value = params.address_details

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

    } catch (err) {
      console.error(err)
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





async function fetchTransactionHashDetail (protocol, network, tranactionHash, APIKEY)  {
  try {
    const url = new URL(`${baseURL}/v1/${protocol}/${network}/tx/${tranactionHash}?apiKey=${APIKEY}`)
    const response = await fetch(url);
    if (response.ok) {
      const result = await response.json();
      const res = {
        transaction_hash: result.id,
        status: result.status,
        block: result.block_number,
        timestamp: result.date,
        from: result.events[0].source,
        to: result.events[1]?.destination == undefined ? "0x00000000000000000000" : result.events[1].destination,
        value: (result.events[1]?.amount/ 1e18) == undefined ? 0 : (result.events[1]?.amount/ 1e18), 
        transaction_fee: (result.events[0].amount / 1e18),
        base_fee: result.events[0].meta.base_fee,
        gas_limit: result.events[0].meta.gas_limit,
        gas_price: result.events[0].meta.gas_price,
        burnt_fees: result.events[0].meta.fee_burned, 
      }
      return res;
    }else {
      return null
    }

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

    transaction_button.addEventListener("click", async function (e) {
      e.preventDefault()


      const res = await fetchTransactionHashDetail("ethereum", "mainnet", transaction_search.value, "bd1b4uvVUUl8KUHvGEscJT8K1C98kU8qSNnPFG2JcUPV0Hi")

      
      if (transaction_search.value.length == 66) {
        if(res != null) {
          window.location.assign(`TransacrionDetail.html?block_detail=${transaction_search.value}`)
        }
        else {
          window.location.assign(`blue-block-explorer-rich-list.html?block_txn=${transaction_search.value}`)
        }
      }
      else if (transaction_search.value.length == 42) {
        window.location.assign(`blue-block-explorer-address-detail.html?address_details=${transaction_search.value}`)?.assign(`TransacrionDetail.html?block_detail=${transaction_search.value}`)
      }
      
    
      
      transaction_search.value = ""
    })
    
    } catch (error) {

     }
  }

  clickTransaction()
