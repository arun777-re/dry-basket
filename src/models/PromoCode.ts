import mongoose from 'mongoose';


const offerSchema = new mongoose.Schema({
    code:{
        type:String,
        required:true,
        unique:true,
        uppaercase:true,
        trim:true
    },
    description:String,
    discountType:{
        type:String,
        enum:['percentage','flat'],
        default:'percentage',
        required:true
    },
    value:{
        type:Number,
        required:true,

    },
    minOrderAmount:{
        type:Number,
        default:0
    },
    appliesToCategories:[String],
    expiresAt:{
        type:Date,
        default:null
    },
    usageLimit:{
        type:Number,
        default:0,
        required:true,
    },
    timesUsed:{
        type:Number,
        default:0
    },
    active:{
        type:Boolean,
        required:false,
        default:true,
    }
},{timestamps:true});


const Offer = mongoose.models.Offer || mongoose.model('Offer',offerSchema);

export default Offer;