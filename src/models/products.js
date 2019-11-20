var mongoose = require('mongoose');

var shopSchema = new mongoose.Schema({
    shop_name:{
        type:String,
        required:'Not Empty'
    },
    shop_image:{
        type: String, 
        required: true
    },
    shop_offer:{
        type: String, 
        required: true
    },
    shop_number:{
        type: String, 
        required: true
    },
    category:{
        type: String, 
        required: true
    },
    created_date:{
        type:Date,
        default:Date.now
    }
});

var Ofshop =mongoose.model('Ofshop', shopSchema);

module.exports= Ofshop;