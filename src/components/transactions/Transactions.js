import React, { useEffect, useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import axiosClient from '../../config/axios';

import Transaction from './Transaction';

function Transactions() {
    const [transactions, saveTransactions] = useState([]);

    const apiQuery = async () => {
        try {
            const transactionQuery = await axiosClient.get('/');

            saveTransactions(transactionQuery.data);
        } catch (err) {
            console.log(err.message || 'Some error occurred while retrieving transactions.');
        }
    };

    function balanceCalculate() {
        let income = transactions.filter(elem => elem.type === 'income').map(elem => elem.amount).reduce((a, b) => a + b, 0);
        let expenses = transactions.filter(elem => elem.type === 'expense').map(elem => elem.amount).reduce((a, b) => a + b, 0);

        return income - expenses;
    }

    useEffect(() => {
        apiQuery();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <Fragment>
            <h2>Transactions</h2>
            <h1>Current Balance: {balanceCalculate()}</h1>
            <hr />
            <Link to={"/new-transaction"} className="btn btn-grey new-transaction">
                <i className="fas fa-plus-circle"></i>
                New Transaction
            </Link>
            <ul className="transactions-list">
                {transactions.slice(0,10).map(elem => (
                    <Transaction
                        key={elem.id}
                        transactionInfo={elem}
                        apiQuery={apiQuery}
                    />
                ))}
            </ul>
        </Fragment>
    )
}

export default Transactions;