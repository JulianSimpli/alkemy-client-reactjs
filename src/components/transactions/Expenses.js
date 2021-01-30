import React, { useEffect, useState, Fragment } from 'react';
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

    useEffect(() => {
        apiQuery();
    }, []); 

    return (
        <Fragment>
            <h2>Expenses</h2>
            <ul className="transactions-list">
                {transactions.filter(elem => elem.type === 'expense').map(elem => (
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