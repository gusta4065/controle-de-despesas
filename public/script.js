const transactionsUl = document.querySelector('#transactions');
const balanceDisplay = document.querySelector('#balance');
const incomeDisplay = document.querySelector('#money-plus');
const expenseDisplay = document.querySelector('#money-minus');
const form = document.querySelector('#form');
const inputTransactionName = document.querySelector('#text');
const inputTransactionAmount = document.querySelector('#amount');

// criando algumas transaçoes
/*let dummyTransations = [
    {id: 1, name: "Bolo de Murango", amount: -20},
    {id: 2, name: "Salário", amount: 300},
    {id: 3, name: "Torta de frango", amount: -10},
    {id: 4, name: "Maconha", amount: 150},
    {id: 5, name: "Hamburger", amount: -15.40}
];*/

const localStorageTransactions = JSON.parse(localStorage
    .getItem('transactions'))
let transactions = localStorage
.getItem('transactions') !== null ? localStorageTransactions : [] 

const removeTransation = ID => {
    transactions = transactions.filter(transaction =>
         transaction.id !== ID)
    init();
};

// adcionando transações ao app
const addTransactionsintoDOM = transaction => {
    const operator = transaction.amount < 0 ? '-' : '+'; // ternario que retorna - ou + caso o saldo da operação seja positiva ou negativa.
    const CSSClass = transaction.amount < 0 ? 'minus' : 'plus'; // ternario que retorna minus ou plus caso o saldo da operação seja positiva ou negativa.
    const amountWhitoutOperator = Math.abs(transaction.amount); 
    const li = document.createElement('li'); // criando um elemento de lista no DOM
    li.classList.add(CSSClass); // adicionando uma classe para o css
    li.innerHTML = ` 
        ${transaction.name}
        <span>${operator} R$ ${amountWhitoutOperator}</span>
        <button class="delete-btn" onClick="removeTransation(${transaction.id})">x</button> 
        ` // preenche elemento de lista 
    
    transactionsUl.append(li)

}


const updateBalanceValues = () =>{
    // atualizar o valor do saldo
    const transactionsAmount = transactions
        .map(transaction => transaction.amount);
    const total = transactionsAmount
        .reduce((acc, transaction)=> acc + transaction , 0)
        .toFixed(2);
    balanceDisplay.textContent = `${total}`;
    // atualizar os ganhos
    const income = transactions.filter( transaction => transaction.amount < 0 )
                .map(transaction => transaction.amount)
                .reduce((acc, transaction)=> acc + transaction , 0)
                .toFixed(2);
    expenseDisplay.textContent = `R$ ${income}`;
    // atualizar gastos
    const expense = Math.abs(transactions
                .filter( transaction => transaction.amount > 0 )
                .map(transaction => transaction.amount)
                .reduce((acc, transaction)=> acc + transaction , 0)
                .toFixed(2));
    incomeDisplay.textContent = `- R$ ${expense}`
}   

const init = () => {
    transactionsUl.innerHTML = '';
    transactions.forEach(addTransactionsintoDOM);
    updateBalanceValues();
    
}

init();
const updatelocalStorage = () => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
};
const generateID = () => Math.round(Math.random()* 100);

form.addEventListener('submit', event =>{
    event.preventDefault();

    const TransactionName = inputTransactionName.value.trim();
    const transactionAmount = inputTransactionAmount.value.trim();

    if(TransactionName === ''|| transactionAmount === ''  ){
        alert('Preencha os dois campos, Por Favor');
        return;
    }
    
    const transaction = {
        id: generateID(),
        name:TransactionName,
        amount: Number(transactionAmount)
    }
    transactions.push(transaction);
    init();
    updatelocalStorage();

    inputTransactionName.value = '';
    inputTransactionAmount.value = '';

});

//document.getElementsByClassName("balance")
//transactions.filter(amnt => amnt.amount > 0)