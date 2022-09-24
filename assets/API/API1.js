const baseURL = "https://ubiquity.api.blockdaemon.com"


// function that fetches the current block 
const fetchCurrentBlockNumber = async function (protocol, network,APIKEY) {
    try {
  //    const url = new URL(`${baseURL}/v1/${protocol}/${network}/block/${block_identifier}?apiKey=${APIKEY}`)
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
      
  
   //   console.log("line 24", result);
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
     display(res);
     //console.log(res);

   }

    }  
  dataResult()


  // function that displayes the UI

  

 function display (input) {
  let blockContainer = document.getElementById("block-detail")

  let renderData = `
  <tr id="block-detail">
      <td ><a href="blue-block-explorer-rich-list.html">${input.number}</a></td>
      <td>${input.date}</td>
      <td>${input.num_txs} transactions </td>
      <td>completed</td>
      <td><a href="blue-block-explorer-address-detail.html">${input.parent_id}</a></td>
      <td><a href="blue-block-explorer-address-detail.html">${input.id}</a></td>
  </tr>
  `
  blockContainer.innerHTML += renderData;
 }
 
//  function getTextContent() {
//   let numberTextContent = document.getElementById("block-number")
//   console.log(numberTextContent)
//id="block-number" onclick="${getTextContent()}"
// }
   
  