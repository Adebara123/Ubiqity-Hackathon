const BASEURL = "https://api.etherscan.io";
const APIKEY = "S32VXKUD9JSDHR39CBUSRUKKEC938A63XU";

async function getEtherPrice () {
    try {
      const url = new URL(`${BASEURL}/api?module=stats&action=ethprice&apikey=${APIKEY}`)
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


  async function getEtherCirculatingSupply () {
    try {
      const url = new URL(`${BASEURL}/api?module=stats&action=ethsupply2&apikey=${APIKEY}`)
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Data not found");
      }
      const result = await response.json();
      const res = {
        circulatingSupply: (result.result.EthSupply/ 1e18).toString().slice(0, 12),
        BurntFee: (result.result.BurntFees/ 1e18).toString().slice(0, 12)
      }
     return res;
    } catch (err) {
      console.error(err);
    }
  }
  


  async function getEtherCumulativeInfo () {
    try {
      const url = new URL(`https://ubiquity.api.blockdaemon.com/v1/ethereum/mainnet/tx/estimate_fee?apiKey=bd1b4uvVUUl8KUHvGEscJT8K1C98kU8qSNnPFG2JcUPV0Hi`)
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Data not found");
      }
      const etherPrice = await getEtherPrice()
      const result = await response.json();
      const res = {
        latestBlock: result.most_recent_block,
        slowGas: result.estimated_fees.slow.max_total_fee,
        mediumGas: result.estimated_fees.medium.max_total_fee,
        fastGas: result.estimated_fees.fast.max_total_fee,
       mediumGasPrice: ((result.estimated_fees.medium.max_total_fee / 1e18) * etherPrice).toString().slice(0,9)
      }
     return res;
    } catch (err) {
      console.error(err);
    }
  }


function displayEtherInfo (ethPrice, supplyAndBurn, cumulativeInfo) {
  let etherContainer = document.getElementById("etherInfo")

  let renderData = `
  <div class="col-lg-3 col-md-6 col-sm-6 col-12 position-relative">
  <div class="item">
    <div class="title">
      <div class="icon"></div>
      <h5>ETHER PRICE</h5>
    </div>
    <div class="text">
      <span>$${ethPrice} </span>
    </div>
  </div>
  </div>
  <div class="col-lg-3 col-md-6 col-sm-6 col-12 position-relative">
  <div class="item">
    <div class="title">
      <div class="icon"></div>
      <h5>Circulating supply</h5>
    </div>
    <div class="text">
      <span>$${supplyAndBurn.circulatingSupply}</span>
    </div>
  </div>
  </div>
  <div class="col-lg-3 col-md-6 col-sm-6 col-12 position-relative">
  <div class="item">
    <div class="title">
      <div class="icon"></div>
      <h5>Burnt Fee</h5>
    </div>
    <div class="text">
      <span>$${supplyAndBurn.BurntFee}</span>
    </div>
  </div>
  </div>
  <div class="col-lg-3 col-md-6 col-sm-6 col-12 position-relative">
  <div class="item">
    <div class="title">
      <div class="icon"></div>
      <h5>LATEST BLOCK NUMBER</h5>
    </div>
    <div class="text">
      <span>${cumulativeInfo.latestBlock}</span>
    </div>
  </div>
  </div>
  <div class="col-lg-3 col-md-6 col-sm-6 col-12 position-relative">
  <div class="item">
    <div class="title">
      <div class="icon"></div>
      <h5>Slow Gas Fee</h5>
    </div>
    <div class="text">
      <span
        >${cumulativeInfo.slowGas} Gwei </i
      ></span>
    </div>
  </div>
  </div>
  <div class="col-lg-3 col-md-6 col-sm-6 col-12 position-relative">
  <div class="item">
    <div class="title">
      <div class="icon"></div>
      <h5>Medium Gas Fee</h5>
    </div>
    <div class="text">
      <span>${cumulativeInfo.mediumGas} Gwei</span>
    </div>
  </div>
  </div>
  <div class="col-lg-3 col-md-6 col-sm-6 col-12 position-relative">
  <div class="item">
    <div class="title">
      <div class="icon"></div>
      <h5>Fast Gas Fee</h5>
    </div>
    <div class="text">
      <span>${cumulativeInfo.fastGas} Gwei </span>
    </div>
  </div>
  </div>
  <div class="col-lg-3 col-md-6 col-sm-6 col-12 position-relative">
  <div class="item">
    <div class="title">
      <div class="icon"></div>
      <h5>Medium Gas Price</h5>
    </div>
    <div class="text">
      <span>$${cumulativeInfo.mediumGasPrice}</span>
    </div>
  </div>
  </div>
  `
  etherContainer.innerHTML += renderData;
 }



 async function showAllData () {
    try {
        const ethPrice = await getEtherPrice()
        const supplyAndFee = await getEtherCirculatingSupply()
        const commulativeInfo = await  getEtherCumulativeInfo()
        displayEtherInfo(ethPrice, supplyAndFee, commulativeInfo)
    } catch (err) {
        
    }
 }

 showAllData()