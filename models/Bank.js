const { Schema, model } = require('mongoose')
let mongoose = require('mongoose');
const bankSchema = new Schema({
  bank_name: {
    type: String,
    required: true
  },
  interest_rate: {
    type: Number,
    required: true
  },
  maximum_loan : {
    type: Number,
    required: true
  },
  minimum_down_payment: {
    type: Number,
    required: true
  },
  loan_term :{
    type: Number,
    required: true
  }

})
const bankModel = mongoose.model('Bank', bankSchema);
class Bank {
    static insert(bank) {
      return new bankModel(bank).save();
  }
    static getAll() {
      return bankModel.find();
  }
  static getById(id) {
       {
          return bankModel.findById(id);
      }
     // else {
     //     return Promise.reject("(Id is not valid)IT`s good trying, friend). But not today!");
     // }
  }
  static delete(_id) {
      return bankModel.findByIdAndDelete(mongoose.Types.ObjectId(_id),function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Deleted : ", docs);
        }
      })
  }
  static update(bank) {
    
      return bankModel.findByIdAndUpdate(bank._id, { bank_name:bank.bank_name, interest_rate:bank.interest_rate, maximum_loan:bank.maximum_loan,   minimum_down_payment:bank.minimum_down_payment,  loan_term:bank.loan_term}, { new: true })
  }

}
module.exports = { Bank };































