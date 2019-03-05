var express = require("express");
var app = new express();
var path = require("path");
var request = require("request");
var url = require('url');
var cors = require("cors");
var bodyParser = require('body-parser');
var clientId = "AbOqLzAB6a-CyqMbj6TGE8ZLreaBKNFNecBMM7xHobWI_KXErRgjW_b4NWEalCReUHsP4Nzv7sBlXn8B";
var secret = "EGIQtUQj-nGxOX5kQ2KNJoeHm7TSjvAVOOATVa_mQHHwrky3Q3wipUk9gyK-ayojyTTAbkdnvkl-gIKx";
var accessToken="";
var basicAuth = new Buffer(clientId+":"+secret).toString('base64') ;
//var ecbtserver = require('./routes/index');
//var usersRouter = require('./routes/users');
app.use(express.static(path.join(__dirname,"src")));

app.post("/phpexecute",function(request,response){
    console.log(request);
    response.end();
})

app.listen(process.env.PORT || 4000, function(){
    console.log("sd");
})

app.get("/buyingstuff",function(request,response){

response.end("hello this is my shopping website");
})
app.get("/thankyou",function(request,response){

    response.end("You are order is confirmed. Please wait redirecting to merchnat app..");
    })

app.get("/createba",function(request,response){
    console.log("createba");

    var json={
        "name": "Plan awesome override agreement",
        "description": "PayPal payment agreement that overrides merchant preferences and shipping fee and tax information.",
        "start_date": "2018-11-1T00:13:49Z",
        "plan": {
            "id": "P-8PM652587F987751NZDT5QUQ",
            "state": "ACTIVE",
            "name": "Plan Gold",
            "description": "Plan with regular and trial payment definitions.",
            "type": "INFINITE",
            "payment_definitions": [
                {
                    "id": "PD-7T4759164P388682NZDT5QUQ",
                    "name": "monthly subscription",
                    "type": "REGULAR",
                    "frequency": "Day",
                    "amount": {
                        "currency": "USD",
                        "value": "1"
                    },
                    "cycles": "0",
                    "charge_models": [
                        {
                            "id": "CHM-18R946224T967245GZDT5QUQ",
                            "type": "TAX",
                            "amount": {
                                "currency": "USD",
                                "value": "1"
                            }
                        },
                        {
                            "id": "CHM-26J01906H0987261RZDT5QUQ",
                            "type": "SHIPPING",
                            "amount": {
                                "currency": "USD",
                                "value": "1"
                            }
                        }
                    ],
                    "frequency_interval": "1"
                }
            ],
            "merchant_preferences": {
                "setup_fee": {
                    "currency": "USD",
                    "value": "3"
                },
                "max_fail_attempts": "11",
                "return_url": "https://example.com/",
                "cancel_url": "https://example.com/cancel",
                "auto_bill_amount": "YES",
                "initial_fail_amount_action": "CONTINUE"
            }
        },
        "links": [
            {
                "href": "https://www.sandbox.paypal.com/cgi-bin/webscr?cmd=_express-checkout&token=EC-86H07325RP3470242",
                "rel": "approval_url",
                "method": "REDIRECT"
            },
            {
                "href": "https://api.sandbox.paypal.com/v1/payments/billing-agreements/EC-86H07325RP3470242/agreement-execute",
                "rel": "execute",
                "method": "POST"
            }
        ]
    };

   /* var mylink=json.links[0];
    var url = new URL(mylink);
    var c = url.searchParams.get("token");*/
    var json={"id":"EC-86H07325RP3470242"}
    console.log("EC-86H07325RP3470242");
    response.json(json);
})

app.post("/executeba",function(request,response){
    console.log("executeba");

    json={
        "id": "I-DF740Y3A8A28",
        "state": "Active",
        "description": "PayPal payment agreement that overrides merchant preferences and shipping fee and tax information.",
        "start_date": "2018-11-01T07:00:00Z",
        "payer": {
            "payment_method": "paypal",
            "status": "verified",
            "payer_info": {
                "email": "usbuyer1@test.com",
                "first_name": "us",
                "last_name": "buyer",
                "payer_id": "E3T96SHQTY9EJ",
                "shipping_address": {
                    "recipient_name": "John Doe",
                    "line1": "Sure 123 Townsend St",
                    "line2": "Floor 6",
                    "city": "San Francisco",
                    "state": "CA",
                    "postal_code": "94107",
                    "country_code": "US"
                }
            }
        },
        "shipping_address": {
            "recipient_name": "John Doe",
            "line1": "Sure 123 Townsend St",
            "line2": "Floor 6",
            "city": "San Francisco",
            "state": "CA",
            "postal_code": "94107",
            "country_code": "US"
        },
        "plan": {
            "payment_definitions": [
                {
                    "type": "REGULAR",
                    "frequency": "Day",
                    "amount": {
                        "value": "1.00"
                    },
                    "cycles": "0",
                    "charge_models": [
                        {
                            "type": "TAX",
                            "amount": {
                                "value": "1.00"
                            }
                        },
                        {
                            "type": "SHIPPING",
                            "amount": {
                                "value": "1.00"
                            }
                        }
                    ],
                    "frequency_interval": "1"
                }
            ],
            "merchant_preferences": {
                "setup_fee": {
                    "value": "3.00"
                },
                "max_fail_attempts": "11",
                "auto_bill_amount": "YES"
            },
            "currency_code": "USD"
        },
        "links": [
            {
                "href": "https://api.sandbox.paypal.com/v1/payments/billing-agreements/I-DF740Y3A8A28",
                "rel": "self",
                "method": "GET"
            }
        ],
        "agreement_details": {
            "outstanding_balance": {
                "value": "0.00"
            },
            "cycles_remaining": "0",
            "cycles_completed": "0",
            "next_billing_date": "2018-11-01T10:00:00Z",
            "last_payment_date": "2018-10-31T09:27:59Z",
            "last_payment_amount": {
                "value": "3.00"
            },
            "final_payment_date": "1970-01-01T00:00:00Z",
            "failed_payment_count": "0"
        }
    };
    response.json(json);
})

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/accesstoken',function (req,res,next) {
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

app.get('/create', function(req, res, next) {

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
           //res.send(JSON.parse(body).access_token);

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
      
                        },15000)    
                }
                });
    
        }catch(e) {
            console.log(e)
        }

        }
    });

}catch(e) {
    console.log(e);
        return res.send(JSON.stringify(e));
}
   

    
    
});

app.post('/execute', function(req, res, next) {
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
