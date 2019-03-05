var express = require('express');
var router = express.Router();
var request = require("request");
var cors = require("cors");
var bodyParser = require('body-parser');
var clientId = "AbOqLzAB6a-CyqMbj6TGE8ZLreaBKNFNecBMM7xHobWI_KXErRgjW_b4NWEalCReUHsP4Nzv7sBlXn8B";
var secret = "EGIQtUQj-nGxOX5kQ2KNJoeHm7TSjvAVOOATVa_mQHHwrky3Q3wipUk9gyK-ayojyTTAbkdnvkl-gIKx";
var app = express();
var basicAuth = new Buffer(clientId+":"+secret).toString('base64') ;
var accessToken="";
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


router.get('/accesstoken',function (req,res,next) {
console.log("entering /accesstoken");
    try{
    var options = {
        method: 'POST',
        url: 'https://api.paypal.com/v1/oauth2/token',
        headers : {
            'authorization': "Basic "+basicAuth,
            'accept': "application/json",
            'accept-language': "en_US",
            'cache-control': "no-cache",
            'content-type': "application/x-www-form-urlencoded",

        },
        body: 'grant_type=client_credentials&response_type=token&return_authn_schemes=true'

    }
        console.log("kumar");
    request(options, function (error, response, body) {
        console.log("Suresh");
        if (error) {
            console.log("error");
            throw new Error(error);
            return res.send(JSON.stringify(error));
        }
        else{
            console.log(body);
            accessToken=JSON.parse(body).access_token;
            res.send(JSON.parse(body).access_token);

        }
    });

}catch(e) {
    console.log(e);
        return res.send(JSON.stringify(e));
}

})

router.get('/create', function(req, res, next) {
    try{

        var payLoad = {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "transactions": [
                {
                    "amount": {
                        "total": "30.11",
                        "currency": "USD",
                        "details": {
                            "subtotal": "30.00",
                            "tax": "0.07",
                            "shipping": "0.03",
                            "handling_fee": "1.00",
                            "shipping_discount": "-1.00",
                            "insurance": "0.01"
                        }
                    },
                    "description": "The payment transaction description.",
                    "custom": "EBAY_EMS_90048630024435",
                    "invoice_number": "4878723231589673",
                    "payment_options": {
                        "allowed_payment_method": "INSTANT_FUNDING_SOURCE"
                    },
                    "soft_descriptor": "ECHI5786786",
                    "item_list": {
                        "items": [
                            {
                                "name": "hat",
                                "description": "Brown hat.",
                                "quantity": "5",
                                "price": "3",
                                "tax": "0.01",
                                "sku": "1",
                                "currency": "USD"
                            },
                            {
                                "name": "handbag",
                                "description": "Black handbag.",
                                "quantity": "1",
                                "price": "15",
                                "tax": "0.02",
                                "sku": "product34",
                                "currency": "USD"
                            }
                        ],
                        "shipping_address": {
                            "recipient_name": "Brian Robinson",
                            "line1": "4th Floor",
                            "line2": "Unit #34",
                            "city": "San Jose",
                            "country_code": "US",
                            "postal_code": "95131",
                            "phone": "011862212345678",
                            "state": "CA"
                        }
                    }
                }
            ],
            "note_to_payer": "Contact us for any questions on your order.",
            "redirect_urls": {
                "return_url": "https://google.com",
                "cancel_url": "https://example.com/cancel"
            }
        };
        console.log("accessToken"+accessToken);
         //   var accessToken = "A21AAF7IC5UlS3AwLBhTwSw3C-kafv70B5YGkxwApi4zDhF3Th6T7uxZBi4qD_be5YHQB51DNMQgYSms5bOSU8TszeRp0mMKQ";
            var _dataToSend = {

            }

            var options = {
                method: 'POST',
                url: 'https://api.paypal.com/v1/payments/payment',
                headers : {
                    'content-type': "application/json",
                    'authorization': "Bearer "+accessToken,
                    'cache-control': "no-cache"

                },
                body: payLoad,
                json:true

            }
            request(options, function (error, response, body) {
                if (error) {
                    throw new Error(error);
                }
                else{
                    setTimeout(()=>{
                        res.send(body);
  
                    },60000)    
            }
            });

    }catch(e) {
        console.log(e)
    }
});

router.post('/execute', function(req, res, next) {
    try{
        console.log(req);
        var payLoad = req.body;


console.log(payLoad);
          //  var accessToken = "A21AAF7IC5UlS3AwLBhTwSw3C-kafv70B5YGkxwApi4zDhF3Th6T7uxZBi4qD_be5YHQB51DNMQgYSms5bOSU8TszeRp0mMKQ";
            var _dataToSend = {
                "payer_id": payLoad.payerID
            }
            var options = {
                method: 'POST',
                url:  "https://api.paypal.com/v1/payments/payment/{payment_id}/execute/".replace('{payment_id}', payLoad.paymentID),
                headers : {
                    'content-type': "application/json",
                    'authorization': "Bearer "+accessToken,
                    'cache-control': "no-cache"
                },
                body: _dataToSend,
                json:true

            }

            request(options, function (error, response, body) {
                if (error) {
                    throw new Error(error);
                }
                else{
                    //console.log(response)
                    console.log(body)
                    res.send(body);
                }
            });


    }catch(e) {
        console.log(e)
    }
});

router.post('/success-payments', function(req, res, next) {
    try{
        var token = req.query.token;
        var payerId = req.query.payerID;

        getAccessToken(function(data) {

            var accessToken = JSON.parse(data).access_token;

            var options = {
                method: 'GET',
                url:  configuration.GET_PAYMENT_DETAILS.replace('{payment_id}', token),
                headers : {
                    'content-type': "application/json",
                    'authorization': "Bearer "+accessToken,
                    'cache-control': "no-cache",
                    'PayPal-Partner-Attribution-Id' : configuration.BN_CODE
                }

            }
            console.log(options)
            request(options, function (error, response, body) {
                if (error) {
                    throw new Error(error);
                }
                else{
                    res.send(body);
                }
            });

        });
    }catch(e) {
        console.log(e)
    }
});

router.post("/phpexecute",function(request,response){
    console.log(request);
    response.end();
})


var initialize = function(req) {  

    var clientId =  "AY5u6ALS8wSiidBDeDC2d07hxdzv__YgXiO8I_l_U1E0wZ3rx4oUqSvpPZiFgbSTTie_OmC-kqSAgvFv";
    var clientSecret = "EDfBd2q4tdWg7zyE5UXoGVh9G6LabjDo_qo9Rb9g-kA5J8QUpK3vCRM9A7TuvLvZgZ5u8WOEUjeQy-vs";
  
  
    const AUTH = new Buffer(clientId + ':' + clientSecret).toString('base64');
    
    const options = {
      uri: 'https://api.sandbox.paypal.com'+'/v1/oauth2/token',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic '+AUTH
          },
        form: { grant_type: 'client_credentials' } };
    
    return new Promise(function(resolve, reject) {
      request(options, function (err, response) {
        if (err) {
            console.error('error in accestoken ',err);
            reject(err);
        }
      
        var access_token = JSON.parse(response.body).access_token; 
        console.log('token ',access_token);
        resolve(access_token);
      });
    });
  
}

// create agreement token
router.post('/create-agreement-token', function(req, res){
    try {

    console.log("create agreement token");
  
    var options = {
        uri: 'https://api.sandbox.paypal.com' + '/v1/billing-agreements/agreement-tokens',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: {
            "description": "RDP Billing Agreement",
            "shipping_address":
            {
                "line1": "1350 North First Street",
                "city": "San Jose",
                "state": "CA",
                "postal_code": "95112",
                "country_code": "US",
                "recipient_name": "John Doe"
            },
            "payer":
            {
                "payment_method": "PAYPAL"
            },
            "plan":
            {
                "type": "CHANNEL_INITIATED_BILLING",
                "merchant_preferences":
                {
                    "return_url": "https://amazon.com/",
                    "cancel_url": "https://amazon.com/",
                    "notify_url": "https://amazon.com/",
                    "accepted_pymt_type": "INSTANT",
                    "skip_shipping_address": false,
                    "immutable_shipping_address": true
                }
            }
        },
        json: true
            
    };

    initialize(req).then(function(access_token){
        options.headers.Authorization = 'Bearer '+access_token;
        request(options, function (err, response) {
            if (err) {
                console.error(err);
                return res.sendStatus(500);
            }
            res.json(response.body);
        });
    }).catch(e=> res.status(500).json(e));
} catch(e) {
    console.log(e);
    res.status(500).json(e)
}
});


  // create agreement
  router.post('/create-agreement', function(req, res){
    try {

    console.log("create agreement");
  
    var options = {
        uri: 'https://api.sandbox.paypal.com' + '/v1/billing-agreements/agreements',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: {
            "token_id": req.body.token
        },
        json: true
            
    };

    initialize(req).then(function(access_token){
        options.headers.Authorization = 'Bearer '+access_token;
        request(options, function (err, response) {
            if (err) {
                console.error(err);
                return res.sendStatus(500);
            }
            console.log(response.body);
            res.json(response.body);
        });
    }).catch(e=> res.status(500).json(e));
} catch(e) {
    console.log(e);
    res.status(500).json(e)
}
});


app.listen(8081,function(){
    console.log("listening on 8081");
})



app.use(router);

module.exports = router;