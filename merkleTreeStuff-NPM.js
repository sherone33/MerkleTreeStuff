console.log("NODE REPORTING FOR DUTY!");

const { MerkleTree } = require("merkletreejs");
const keccak256 = require("keccak256");

   
////////////////////////////////////////////////////////////
//
// PART I:
// 
let winningBidsAddresses =  [ "0x14dC79964da2C08b23698B3D3cc7Ca32193d9955", "0x976EA74026E726554dB657fA54763abd0C3a0aa9", 
"0x9965507D1a55bcC2695C58ba16FB37d819B0A4dc", "0x15d34AAf54267DB7D7c367839AAf71A00a2C6A65", "0x90F79bf6EB2c4f870365E785982E1f101E93b906" ]

// 1. Create the "LeafNodesArray":
const leafNodesArray = winningBidsAddresses.map(currentAddress => keccak256(currentAddress));
console.log("\nleafNodesArray = ");
console.log(leafNodesArray);

// 2. Use this "LeafNodesArray" to generate a MerkleTree:
const merkleTree = new MerkleTree(leafNodesArray, keccak256, { sortPairs: true });
console.log("\nmerkleTree = ");
console.log(merkleTree);
// Log it out again, in a prettier "tree"-like format:
console.log("\n\n'merkleTree.toString()':\n\n", merkleTree.toString());

// 3. Finally, grab the ROOT HASH PROOF of the MerkleTree:
const rootHash = merkleTree.getRoot();
console.log("\n\n-ROOT HASH = \n", rootHash);



console.log("\n\n\n<<< ===END PART 1=== >>>\n\n\n");


////////////////////////////////////////////////////////////
//
// PART II: CHECKING VALIDITY OF ETH ADDRESS against the MerkleTree ("CLIENT SIDE")
// 
console.log("\n<<< ===PART 2 - 'CLIENT-SIDE' CHECKING=== >>>\n\n");


// I. Verify a A VALID ETH Addres:
const validETHAddressToCheck = leafNodesArray[0]; // Should be this address: "0x14dC79964da2C08b23698B3D3cc7Ca32193d9955";

// 1. GET THE PROOF:
var hexProof = merkleTree.getHexProof(validETHAddressToCheck);
console.log("Here's hexProof # 1 = ", hexProof);

// 2. VERIFY this Address using the Proof:
console.log("\n\nDOES THIS ADDRESS EXIST IN OUR WHITELIST???\nAnswer is: ");
console.log(merkleTree.verify(hexProof, validETHAddressToCheck, rootHash));

// II. Now test an INVALID ETH Addres:
// 1. Invalid Address:
const invalidETHAddressToCheck = "0x14dC79964da2C08b23698B3D3cc7Ca32193d9956"; // it's the same as leafNodesArray[0] but with the last character changed
hexProof = merkleTree.getHexProof(invalidETHAddressToCheck);
console.log("\n\nAnd here's hexProof # 2 = ", hexProof);

// 2. ATTEMPT to VERIFY this Address using the Proof:
console.log("\n\nDOES THIS ADDRESS EXIST IN OUR WHITELIST LIST???\nAnswer is: ");
console.log(merkleTree.verify(hexProof, invalidETHAddressToCheck, rootHash));