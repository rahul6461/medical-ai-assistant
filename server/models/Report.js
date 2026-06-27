import mongoose from 'mongoose';

const reportSchema=new mongoose.Schema({
    fileName: {type: String, required: true},
    fileType: {type:String, required:true},
    filePath: {type:String, required:true},
    extractedText: { type: String,required: true},
    analysis: {
        summary: {type: String},
        abnormalValues: [{type:String}],
        keyIndicators:[{type:String}],
        concerns: [{type:String}]
    },
    createdAt:{type:Date,default:Date.now}
});

export default mongoose.model('Report',reportSchema);