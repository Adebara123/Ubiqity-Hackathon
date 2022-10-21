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
      
  
     console.log("line 24", result);
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
      <td ><a href="TransacrionDetail.html?block_detail=${input.number}">${input.number}</a></td>
      <td>${input.date}</td>
      <td>${input.num_txs} transactions </td>
      <td>completed</td>
      <td><a href="blue-block-explorer-rich-list.html?block_txn=${input.parent_id}">${input.parent_id.toString().slice(0,20)}...</a></td>
      <td><a href="blue-block-explorer-rich-list.html?block_txn=${input.id}">${input.id.toString().slice(0,20)}</a></td>
  </tr>
  `
  blockContainer.innerHTML += renderData;
 }
 
// Transfer value to next page
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
    console.log(result)
    const data = await result.txs.slice(0,50).map(resp => {
      return {
        from: resp.events[0].source,
        tx_hash: resp.events[0].transaction_id,
        tx_fee: (resp.events[0].amount / 1e18),
        date: resp.date,
        block: resp.block_number,
        
      }
    })
    console.log("queried data", data)
    

  // console.log("line 24", result.txs);
    return data;
  } catch (err) {
    console.error(err);
  }
}
// getBlockTransactions("ethereum", "mainnet",txn_value, "bd1b4uvVUUl8KUHvGEscJT8K1C98kU8qSNnPFG2JcUPV0Hi")



function displayTransactions (data) {
  let transactionContainer = document.getElementById("transactionDetail")

  let renderData = `
  <tr>
    <td><a href="TransacrionDetail.html?block_detail=${data.tx_hash}">${data.tx_hash.slice(0,20)}...</a></td>
    <td>${data.block}</td>
    <td>${data.date}</td>
    <td><a href="blue-block-explorer-address-detail.html">${data.from.slice(0,20)}...</a></td>
    <td><a href="blue-block-explorer-address-detail.html">0xDB65702A9b26f8a...</a></td>
    <td>0.11 Ether</td>
    <td>${data.tx_fee.toString().slice(0,9)} </td>
  </tr>
  `
 transactionContainer.innerHTML += renderData;
 }

 //displayTransactions()

 async function transactionDataResult() {

  try {

    const data = await getBlockTransactions("ethereum", "mainnet",txn_value, "bd1b4uvVUUl8KUHvGEscJT8K1C98kU8qSNnPFG2JcUPV0Hi")
    data.map(res => displayTransactions(res))
    
  } catch (error) {
    
  }
  
 }

 transactionDataResult() 


 let block_value = params.block_detail
 console.log(block_value, "line 155")





