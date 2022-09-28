import './components.css'
import React, { useState } from 'react';


function DebtList({ debts }) {
    const toggleables = [NewDebtForm]
    const debtSum = debts.reduce((acc, curr) => curr.amount + acc, 0)

    return (
        <div className='container'>
            <div className='wrap'>
                <div className='title'>Debts</div>
                <div className='wrap'>
                    { debts.map(e => <DebtItem debt={e}></DebtItem>) }
                </div>
            </div>
            <div className='bottom'>
                <span>TOTAL</span>
                <span>${ debtSum }</span>
            </div>
            <ToggleableBottom bottomComponents={toggleables}/>
        </div>
    )
}

function DebtItem({ debt }) {
    const itemClass = 'element' + (debt.completed ? ' completed' : '');
    
    return (
        <div className={itemClass}>
            <div className='left'>
                <div className='ball'></div>
                <div>
                    <div>{debt.title}</div>
                    <div className='detail'>{debt.from}</div>
                    <div className='detail'>created: {debt.created}</div>
                </div>
            </div>
            <span>${debt.amount}</span>
        </div>
    )
}

function ToggleableBottom({ bottomComponents }) {
    const [show, set_show] = useState(false);
    const toggle = () => set_show(!show)

    return (
        <div>
            <button onClick={() => { toggle() }}
                className='new-debt-button'>
                <div className='add-icon' />
                {!show ? 'Show more' : 'Hide'}
            </button>
            { show ? bottomComponents.map((BComponent) => <BComponent />) : null }
        </div>
    )
}

function NewDebtForm() {
    const [name, set_name] = useState('');
    const [debtor, set_debtor] = useState('');
    const [amount, set_amount] = useState(0);

    function handleSubmit(e) {
        e.preventDefault()
        console.log({
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
                    <input type='text' value={name}
                        onChange={(e) => set_name(e.target.value)} />
                </label>
                <label>
                    Debtor:
                    <input type='text' value={debtor}
                        onChange={(e) => set_debtor(e.target.value)} />
                </label>
                <label>
                    Amount:
                    <input type='number' value={amount}
                        onChange={(e) => set_amount(e.target.value)} />
                </label>
                <button onClick={handleSubmit}>
                    Create
                </button>
            </form>
        </div>
    )
}

export default DebtList;