const { Router, response } = require('express')
const bankJs = require('../models/Bank')
const router = Router()

router.get('/', async (req, res) => {
  const banks = await bankJs.Bank.getAll()

  res.render('index', {
    title: 'Banks list',
    isIndex: true,
    banks
  })
})

router.get('/calculate',  async (req, res) => {
  const banks = await bankJs.Bank.getAll()
  console.log(banks);
  res.render('calculate', {
    title: 'Banks list',
    isIndex: true,
    banks
  })
})

router.post('/calculate',  async (req, res) => {
  const banks = await bankJs.Bank.getAll()
  console.log(req.body);
  console.log(req.body.initial_loan);
  console.log(req.body.down_payment);
  console.log(req.body.Bank);
  let initial_loan = Number(req.body.initial_loan);
  let down_payment = Number(req.body.down_payment);
  let bank_id = req.body.Bank;
  bankJs.Bank.getById(bank_id)
  .then((response)=>{
    
    console.log(response);
  })
  .catch(err=>
    {
      res.statusCode(404).json("Not found! 404 error.")
    })
})

router.get('/create', (req, res) => {
  res.render('creating_bank')

})


router.post('/create', async (req, res) => {
  let new_bank = {
    bank_name : req.body.create_bank_name,
    interest_rate : req.body.create_interest_rate,
    maximum_loan :  req.body.create_maximum_loan,
    minimum_down_payment : req.body.create_minimum_down_payment,
    loan_term : req.body.create_loan_term
  }
  bankJs.Bank.insert(new_bank);
    res.redirect('/');


})


router.post('/update',  (req, res) => {
  console.log("hi man, you are in update request!")



  
  
  const bank = {
      bank_name : req.body.change_bank_name,
      interest_rate : req.body.change_interest_rate.replace(" %", ""),
      maximum_loan :  req.body.change_maximum_loan.replace(" $", ""),
      minimum_down_payment : req.body.change_minimum_down_payment.replace(" $", ""),
      loan_term : req.body.change_loan_term.replace(" mounths", ""),  
      _id : req.body._id
  }

  console.log("hi man you need to get a job");
  bankJs.Bank.update(bank)
  .then(()=>{
   return bankJs.Bank.getAll()
  })
  .then((banks)=>{
   console.log(banks)
    res.redirect("/")
  }) 
})

router.post('/delete',(req, res) => {
  bankJs.Bank.delete(req.body.id)
  res.redirect('/')
})



module.exports = router