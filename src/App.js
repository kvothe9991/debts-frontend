import './App.css';
import React, { useState } from 'react';
import { getDebts } from './services';

function App() {
    const debts = getDebts()
    const [form_opened, set_form_opened] = useState(false);

    // Return view to render.
    return (
        <div className='container'>
            <div className="wrap">
                <div className="title">Debts</div>
                <div className="wrap">
                    {debts.map(e => <Item debt={e}></Item>)}
                </div>
            </div>
            <div className="bottom">
                <span>TOTAL</span>
                <span>${debts.reduce((acc, debt) => debt.amount + acc, 0)}</span>
            </div>
            <button onClick={() => { set_form_opened(true) }}
                className="new-debt-button">
                <div className="add-icon" />
                Add
            </button>
            {form_opened ? <NewDebtForm /> : null}
        </div>
    )
}

function Item({ debt }) {
    let element_classname = 'element' + (debt.completed ? ' completed' : '');
    return (
        <div className={element_classname}>
            <div className='left'>
                <div className="ball"></div>
                <div>
                    <div>{debt.title}</div>
                    <div className='details'>{debt.from}</div>
                    <div className='details'>created: {debt.created}</div>
                </div>
            </div>
            <span>${debt.amount}</span>
        </div>
    )
}

function NewDebtForm() {
    const [name, set_name] = useState('');
    const [debtor, set_debtor] = useState('');
    const [amount, set_amount] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault()
        submit({
            'title': name,
            'from': debtor,
            'amount': amount
        })
    };

    return (
        <div>
            <form>
                <label>
                    Debt name:
                    <input type="text" value={name}
                        onChange={(e) => set_name(e.target.value)} />
                </label>
                <label>
                    Debtor:
                    <input type="text" value={debtor}
                        onChange={(e) => set_debtor(e.target.value)} />
                </label>
                <label>
                    Amount:
                    <input type="number" value={amount}
                        onChange={(e) => set_amount(e.target.value)} />
                </label>
                <button onClick={handleSubmit}>Create</button>
            </form>
        </div>
    )
}

function submit(data) {
    console.log(data);
}

export default App;
