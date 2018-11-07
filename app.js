var express = require("express");
var app = new express();
var path = require("path");
var url = require('url');
app.use(express.static(path.join(__dirname,"src")));

app.post("/phpexecute",function(request,response){
    console.log(request);
    response.end();
})

app.listen(process.env.PORT || 4000, function(){
    console.log("sd");
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