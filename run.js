var express = require("express");
var app = express();
var cors = require('cors')

const ALLOWED_HEADERS=`*`
const ALLOWED_ORIGINS=`*`

function parseValues(originalValues) {
    let parsedValues = originalValues;
    if (originalValues.includes(',')) {
      parsedValues = originalValues.split(',');
    }
    return parsedValues;
}

let corsOpts = {};
const origin = parseValues(ALLOWED_ORIGINS);
const allowedHeaders = parseValues(ALLOWED_HEADERS);
corsOpts = ({
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  preflightContinue: true,
  allowedHeaders,
  origin,
});

const NUM_PICS = 43;
const BASE_IMAGE = process.env.BASE_PATH || "https://raw.githubusercontent.com/Web3bazaar/api-metadata/master/static/images/"


// enable cors
app.use(cors(corsOpts))

let port = process.env.PORT || 3000;
app.listen(port, () => 
{
    console.log("Server running on port ", port);
});

const infoContent = {
    id : '<id>' , 
    name : 'NFT #',
    description : "Friendly Creature that enjoys long swims in the ocean. ",
    image : BASE_IMAGE,
    externalURL : process.env.BASE_API || '',
    attributes : [
        {
            "trait_type": "Base", 
            "value": "Starfish"
          }, 
          {
            "trait_type": "Eyes", 
            "value": "Big"
          }, 
          {
            "display_type": "boost_number", 
            "trait_type": "Aqua Power", 
            "value": 40
          },
          {
            "display_type": "date", 
            "trait_type": "birthday", 
            "value": 1546360800
          }
    ]
}

const contractInfo = 
{
  "name": "Web3 Bazaar ERC-1155 Test Collection",
  "description": "These are series of randomly generated NFTs under a ERC-155 smart contract hosted on the Mumbai Testnet and deployed by the Web3 Bazaar with the purpose of testing the smart contract trades with this asset type.",
  "image": "https://raw.githubusercontent.com/Web3bazaar/api-metadata/master/static/mario.png",
  "banner": "https://raw.githubusercontent.com/Web3bazaar/api-metadata/master/static/opensea-banner.png",
  "banner_url": "https://raw.githubusercontent.com/Web3bazaar/api-metadata/master/static/opensea-banner.png",
  "external_link": "https://github.com/web3bazaar/",
  "seller_fee_basis_points": 15,
  "fee_recipient": "0xA7Cc2E2050A607c813437C1c074f82322Cc0C8aE" 
}

app.get("/", (req, res, next) => 
{
    res.json( contractInfo  );
});

/**
 * ERC 1155 
 */
app.get("/1155/detail", (req, res, next) => 
{
    let path = 'https://raw.githubusercontent.com/Web3bazaar/api-metadata/master/static/banner/erc1155.png'
    let info = contractInfo;
    info.banner = path;
    info.image = path;
    info.banner_url = path;
    info.name = "Web3 Bazaar ERC-1155 Test Collection";
    info.description = "These are series of randomly generated NFTs under a ERC-155 smart contract hosted on the Mumbai Testnet and deployed by the Web3 Bazaar with the purpose of testing the smart contract trades with this asset type.";
    res.json( info );
});

app.get("/1155/detail/:id", (req, res, next) => 
{
    console.log('input ', req.params.id);
    let id = req.params.id; //parseInt(req.params.id, 16);
    
    if(id < 1){
        console.log('There isnt any id valid');
        res.json( {name : "Id from query not vale", ' <!!!!> ' : "Id from query not vale", in : req.params.id} );
    }
    else{
        const picID = id % (NUM_PICS);
        res.json(
            { 
                id : id,
                name : infoContent.name +  id ,
                description: infoContent.description +  id,
                externalURL: infoContent.externalURL +  id,
                image: infoContent.image +  picID + '.jpg',
             });
    }
   
});

/**
 * ERC 721 
 */
 app.get("/721/detail", (req, res, next) => 
 {
     let erc721Path = 'https://raw.githubusercontent.com/Web3bazaar/api-metadata/master/static/banner/erc721.png'
     let info = contractInfo;
     info.banner = erc721Path;
     info.image = erc721Path;
     info.banner_url = erc721Path;
     info.name = "Web3 Bazaar ERC-721 Test Collection";
     info.description = " These are series of randomly generated NFTs under a ERC-721 smart contract hosted on the Mumbai Testnet and deployed by the Web3 Bazaar with the purpose of testing the smart contract trades with this asset type."
     res.json( info );
 });
 
 app.get("/721/detail/:id", (req, res, next) => 
 {
     console.log('input ', req.params.id);
     let id = req.params.id; //parseInt(req.params.id, 16);
     
     if(id < 1){
         console.log('There isnt any id valid');
         res.json( {name : "Id from query not vale", ' <!!!!> ' : "Id from query not vale", in : req.params.id} );
     }
     else{
         const picID = id % (NUM_PICS);
         res.json(
             { 
                 id : id,
                 name : infoContent.name +  id ,
                 description: infoContent.description +  id,
                 externalURL: infoContent.externalURL +  id,
                 image: infoContent.image +  picID + '.jpg',
              });
     }
    
 });
 

