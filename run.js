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

// enable cors
app.use(cors(corsOpts))

let port = process.env.PORT || 3000;
app.listen(port, () => 
{
    console.log("Server running on port ", port);
});

const infoContent = {
    name : 'Item Nº:',
    description : "Item Desc: ",
    image : "https://raw.githubusercontent.com/Web3bazaar/api-metadata/master/static/sample/"
}

app.get("/", (req, res, next) => 
{
    res.json( {name : "example 2"} );
});

app.get("/detail", (req, res, next) => 
{
    res.json( {name : "example 1"} );
});


app.get("/detail/:id", (req, res, next) => 
{
    console.log('input ', req.params.id);
    let id = req.params.id; //parseInt(req.params.id, 16);
    
    if(id < 1 || id > 90){
        console.log('There isnt any id valid');
        res.json( {name : "Id from query not vale", ' <!!!!> ' : "Id from query not vale", in : req.params.id} );
    }
    else{
        infoContent
        res.json(
            { 
                id : id,
                name : infoContent.name +  id ,
                description: infoContent.description +  id,
                image: infoContent.image +  id + '.jpg',
             });
    }
   
});

