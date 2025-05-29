import mongoose from 'mongoose';


const reviewSchema = new mongoose.Schema({
user:{type:mongoose.Schema.Types.ObjectId,
    ref:'User'
},
productId:{
type:mongoose.Schema.Types.ObjectId,
ref:'Product'
},
rating:{
    type:Number,
    required:true,
    min:1,
    max:5,
    default:0
},
reviewText:{
    type:String,
    required:true,

}
},{timestamps:true});


const Review = mongoose.models.Review || mongoose.model('Review',reviewSchema);


export default Review;