


window.onload = function ()
{

    let modal = document.getElementById("my_modal");
    let span = document.getElementsByClassName("close_modal_window")[0];
    
    let btn_submit_calculate = document.getElementById("btn_submit_calculate");
    let least_wrapper =  document.getElementById('wrapper');
    let update_form =  document.getElementById('update_form');
    
    function create_table(calculate_table_data,loan_term,mounthly_payment)
    {
        let table = document.createElement("table");
        // Добавляем только что созданный элемент в дерево DOM
        let calculation_form = document.getElementById("calculation_form");
        table.id='result_table_of_calculation';
        table.className='table';  

            insertAfter(table, calculation_form);
        
        let thead =  document.createElement('thead')
        table.appendChild(thead)

        let tbody = document.createElement('tbody')
        table.appendChild(tbody)


        thead.setAttribute('class','thead-dark')
        let tr =  document.createElement('tr')
        thead.appendChild(tr)

        let th2 =  document.createElement('th')
        th2.innerText = 'Month';
        tr.appendChild(th2)
        
        
        let th3 = document.createElement('th')
        th3.innerText = 'Total payment';
        tr.appendChild(th3)
        
        let th4 = document.createElement('th')
        th4.innerText = 'Interest payment';
        tr.appendChild(th4)
        
        let th5 = document.createElement('th')
        th5.innerText = 'Loan balance';
        tr.appendChild(th5)
        
        let th6 = document.createElement('th') 
        th6.innerText = 'Equity';
        tr.appendChild(th6)
        for (let i = 0; i < loan_term; i++) { 
            let tr = document.createElement('tr');
            tbody.appendChild(tr)
            for(let j = 0; j<5;j++)
            {
                if(j == 0)
                { 
                    let th = document.createElement('th');
                    th.setAttribute('scope','row')
                    th.innerText = i+1;
                    tr.appendChild(th)

                }
                else if(j == 1){
                    let td = document.createElement('td');
                    td.innerText = mounthly_payment;
                    tr.appendChild(td)
                }
                else {
                    let td = document.createElement('td');
                    td.innerText = calculate_table_data[i][j-2];
                    tr.appendChild(td)
                }

            }
        }
    }
    function toGetCalculationData(loan_term,initial_loan,down_payment,interest_rate,mounthly_payment)
    {
            let calculate_table = []
                let loan_balance;
                let previous_loan_balance;  
                let interest_payment;
                let equity;

                for(let i = 0;i<loan_term;i++){
                    if(i==0)
                    {
                        //get ready
                        previous_loan_balance = initial_loan - down_payment;                       
                    }
                       
                        interest_payment = (interest_rate/12)*previous_loan_balance;
                        loan_balance = previous_loan_balance - mounthly_payment+interest_payment;
                        equity =  initial_loan-loan_balance;
                        let calculate_row_month = [];
                        calculate_row_month.push(interest_payment.toFixed(2))
                        calculate_row_month.push(loan_balance.toFixed(2))
                        calculate_row_month.push(equity.toFixed(2))
                        calculate_table.push(calculate_row_month);
                        previous_loan_balance = loan_balance;
                }
                return calculate_table;
                
    }
    


    

    function insertAfter(newNode, existingNode) {
        existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
    }
    
    if(update_form!=null)
    {
            update_form.onclick = function(e){
            
            if(e.target.id == 'submit')
            {
                
            const data =  JSON.stringify({
                    change_bank_name:document.getElementsByName('change_bank_name')[0].value,
                    change_interest_rate:document.getElementsByName('change_interest_rate')[0].value,
                    change_maximum_loan:document.getElementsByName('change_maximum_loan')[0].value,
                    change_minimum_down_payment:document.getElementsByName('change_minimum_down_payment')[0].value,
                    change_loan_term:document.getElementsByName('change_loan_term')[0].value,
                    _id:document.getElementsByName('_id')[0].value
                })
                    return fetch('/update',{
                        method: "POST",
                        headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'Cache-Control': 'no-cache, no-store, must-revalidate'
                        },
                        body:JSON.stringify({
                            change_bank_name:document.getElementsByName('change_bank_name')[0].value,
                            change_interest_rate:document.getElementsByName('change_interest_rate')[0].value,
                            change_maximum_loan:document.getElementsByName('change_maximum_loan')[0].value,
                            change_minimum_down_payment:document.getElementsByName('change_minimum_down_payment')[0].value,
                            change_loan_term:document.getElementsByName('change_loan_term')[0].value,
                            _id:document.getElementsByName('_id')[0].value
                        }),
                    })
            }
            else{
                e.preventDefault()
            }
        }
    }
   
    
    if(least_wrapper)
    {
        least_wrapper.onclick =function(e)
        {
            if(e.target.id == "edit")
            {
                e.preventDefault()
                toEdit(e);
               
                return;
            }
        } 
    }
    if(btn_submit_calculate!=null)
    {
        btn_submit_calculate.onclick = function(e){


            e.preventDefault();
            let select = document.getElementById("select_name_bank");
           


            
            let initial_loan_input = document.getElementsByName('initial_loan')[0];
            let down_payment_input = document.getElementsByName('down_payment')[0];
            let initial_loan = Number(initial_loan_input.value);
            let down_payment = Number(down_payment_input.value);
            fetch('/bank/'+select.value).then(bank=>{
            return  bank.json()
            }).then(bankJson=>{
                if (down_payment < 0 || initial_loan < 0)
                {
                    throw  alert("Down payment and initial loan must be more then zero.")
                    
                }
                else if(down_payment>initial_loan)
                {
                    throw  alert("Down payment need to be less than initial loan.")
                   
                }
                
                else if(initial_loan > Number(bankJson.maximum_loan))
                {
                    throw  alert("I'm sorry, but this bank can't give you so large credit.")
                   
                }
                else if(down_payment < Number(bankJson.minimum_down_payment))
                {
                    throw  alert("I'm sorry, but this bank can't give for this bank so small down payment.")
                    
                }
                    return bankJson;
            })
            .then(jsonResponse=>{
                  let previous_table = document.getElementById("result_table_of_calculation")
                  if (previous_table!=null)
                  {
                      let container = document.getElementById('container')
                      container.removeChild(previous_table);
                  } 

                let initial_loan = Number(document.getElementsByName('initial_loan')[0].value)
                let down_payment =  Number(document.getElementsByName('down_payment')[0].value)
                let loan_term = Number(jsonResponse.loan_term)
                let interest_rate = Number(jsonResponse.interest_rate)/100
                let amount_borrowed = initial_loan - down_payment;
                
                let the_first_multiplier = amount_borrowed*(interest_rate/12);
                let the_second_multiplier_in_power = Math.pow((1+interest_rate/12),loan_term);
                

                let mounthly_payment = (the_first_multiplier*the_second_multiplier_in_power)/(the_second_multiplier_in_power-1);

                
            
                mounthly_payment =  mounthly_payment.toFixed(2);

                let calculate_table_data = toGetCalculationData(loan_term,initial_loan,down_payment,interest_rate,mounthly_payment)
                create_table(calculate_table_data,loan_term,mounthly_payment)
                
                
            })
            .catch(err=>
                {   
                    console.log('please, сorrect the initial data!')
                })
        }

    }

    


   
   function toEdit(e) {
        let entity = e.target.parentNode.parentNode.parentNode.parentNode.parentNode;
        let modal_form = modal.childNodes[1].childNodes[1];
        
        let bank_name_change_input = modal_form.childNodes[1].childNodes[3];
        let interest_rate_change_input =  modal_form.childNodes[3].childNodes[3];
        let maximum_loan_change_input = modal_form.childNodes[5].childNodes[3];
        let minimum_down_payment_change_input = modal_form.childNodes[7].childNodes[3];
        let loan_term_change_input = modal_form.childNodes[9].childNodes[3];
        let modal_elem_id =  modal_form.childNodes[11];

        let bank_name  = entity.children[0].innerText;
        let interest_rate = entity.children[1].innerText;
        let maximum_loan = entity.children[2].innerText;
        let minimum_down_payment = entity.children[3].innerText;
        let loan_term = entity.children[4].children[0].children[0].innerText;
        let id = entity.children[5].value;

        bank_name_change_input.value = bank_name; 
        interest_rate_change_input.value = interest_rate;
        maximum_loan_change_input.value = maximum_loan;
        minimum_down_payment_change_input.value = minimum_down_payment;
        loan_term_change_input.value = loan_term; 
        modal_elem_id.value= id;
        modal.style.display = "block";
    }
    

    if(span!=null)
    {
        span.onclick = function () {
       
            modal.style.display = "none";
         }
    }   
   
    if(span!=null)
    {
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }
}





