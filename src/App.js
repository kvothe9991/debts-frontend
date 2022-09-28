import React from 'react';
import { getDebts } from './services';
import DebtList from './components'


export default function App() {
    const debts = getDebts()
    return <DebtList debts={debts} />
}