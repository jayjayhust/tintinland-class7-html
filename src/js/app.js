let web3;
let chainId;
let accountAddress;
// from remix
let contract_abi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "cloneFactory",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "erc20Template",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "createFee",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newFee",
				"type": "uint256"
			}
		],
		"name": "ChangeCreateFee",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "newStdTemplate",
				"type": "address"
			}
		],
		"name": "ChangeStdTemplate",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "erc20",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "creator",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "erc20Type",
				"type": "uint256"
			}
		],
		"name": "NewERC20",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferPrepared",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Withdraw",
		"type": "event"
	},
	{
		"stateMutability": "payable",
		"type": "fallback"
	},
	{
		"inputs": [],
		"name": "_CLONE_FACTORY_",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "_CREATE_FEE_",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "_ERC20_TEMPLATE_",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "_NEW_OWNER_",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "_OWNER_",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "_USER_STD_REGISTRY_",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "newFee",
				"type": "uint256"
			}
		],
		"name": "changeCreateFee",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "claimOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "symbol",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "totalSupply",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "decimals",
				"type": "uint8"
			}
		],
		"name": "createStdERC20",
		"outputs": [
			{
				"internalType": "address",
				"name": "newERC20",
				"type": "address"
			}
		],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getTokenByUser",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "stds",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "initOwner",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newStdTemplate",
				"type": "address"
			}
		],
		"name": "updateStdTemplate",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	}
];

async function connect() {
  if(window.ethereum) {
    try {
      await window.ethereum.enable();
    } catch (error) {
      console.error("User denied account access!");
    }
    web3 = new Web3(window.ethereum); // Web3构造函数，构建Web3实例
  } else if(window.web3) {
    web3 = new Web3(window.ethereum); // Web3构造函数，构建Web3实例
  } else {
    alert("Please install wallet!");
  }

  // query data
  chainId = await web3.eth.getChainId();
  var blockNumber = await web3.eth.getBlockNumber();
  var block = await web3.eth.getBlock(blockNumber);
  var blockTimestamp = block.timestamp;
  var account = await web3.eth.getAccounts();
  accountAddress = account[0];
  var balance = await web3.eth.getBalance(accountAddress);

  // update UI
  document.getElementById("chain_id").innerText = chainId;
  document.getElementById("block_number").innerText = blockNumber;
  document.getElementById("block_timestamp").innerText = blockTimestamp;
  document.getElementById("account_address").innerText = accountAddress;
  document.getElementById("account_balance").innerText = balance;
}

async function create_erc20_token() {
  var contractAddress = document.getElementById("erc20_factory_contract_addr").value; 
  var instance = new web3.eth.Contract(contract_abi, contractAddress);
  var totalSupply = document.getElementById("total_supply").value;
  var tokenName = document.getElementById("token_name").value; 
  var tokenSymbol = document.getElementById("token_symbol").value;
  
  var transferData = instance.methods.createStdERC20(tokenName, tokenSymbol, totalSupply, 18).encodeABI();

  // query gas and gas price
  var estimateGasRes = await web3.eth.estimateGas({
    to: contractAddress,
    data: transferData,
    from: accountAddress,
    value: '0x0'
  });
  var gasPrice = await web3.eth.getGasPrice();

  // get nounce
  let nonce = await web3.eth.getTransactionCount(accountAddress);

  // prepare tranaction data for transfer
  let rawTransaction = {
    from: accountAddress,
    to: contractAddress, // here is the contract address
    nonce: web3.utils.toHex(nonce),
    gasPrice: gasPrice,
    gas: estimateGasRes * 2,
    value: '0x0',
    data: transferData,
    chainId: chainId
  };

  // send transaction
  web3.eth.sendTransaction(rawTransaction).on("transactionHash", function(hash){
    console.log("txHash: ", hash);
  });
}
