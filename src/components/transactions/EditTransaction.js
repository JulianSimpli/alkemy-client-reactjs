import React, { Fragment, useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';
import axiosClient from '../../config/axios';

function EditTransaction(props) {
    const { id } = props.match.params;

    const [transaction, transactionData] = useState({
        concept: '',
        amount: 0,
        type: 'income'
    });

    const apiQuery = async () => {
        const queryTransaction = await axiosClient.get(`/${id}`);

        transactionData(queryTransaction.data);
    }

    useEffect(() => {
        apiQuery();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const handleChange = e => {
        transactionData({
            ...transaction,
            [e.target.name] : e.target.value
        });
    };
    
    const handleSubmit = e => {
        e.preventDefault();

        axiosClient.put(`/${transaction.id}`, transaction)
            .then(res => {
                // Show success message
                Swal.fire(
                    'Transaction updated successfully',
                    '',
                    'success'
                )
                props.history.push('/');
            })
            .catch(err => {
                // Show error message
                Swal.fire(
                    'Error',
                    err.message,
                    'error'
            )});
    }

    const formValidation = () => {
        const { concept, amount, type } = transaction;

        return !concept.length || !amount.toString().length || !type.length;
    }

    return (
        <Fragment>
            <h2>Edit Transaction</h2>

            <form
                onSubmit={ handleSubmit }
            >
                <legend>Complete all fields</legend>

                <div className="field">
                    <label>Concept</label>
                    <input  type="text" 
                            placeholder="Transaction Concept" 
                            name="concept"
                            onChange={ handleChange } 
                            value={transaction.concept}
                    />
                </div>

                <div className="field">
                    <label>Amount</label>
                    <input  type="number" 
                            placeholder="Transaction Amount" 
                            name="amount" 
                            onChange={ handleChange }
                            value={transaction.amount}
                    />
                </div>
                
                <div className="field">
                    <label>Type</label>
                    <input  type="radio" 
                            name="type" 
                            value="income" 
                            checked={transaction.type === 'income'}
                            onChange={ handleChange }
                    />Income
                    <input  type="radio" 
                            name="type" 
                            value="expense" 
                            checked={transaction.type === 'expense'}
                            onChange={ handleChange }
                    />Expense
                </div>

                <div className="send">
                    <input  type="submit" 
                            className="btn btn-blue" 
                            value="Save Transaction" 
                            disabled={ formValidation() }
                />
                </div>

            </form>
        </Fragment>
    )
}

// higher order component
export default withRouter(EditTransaction);