import React, { Fragment, useState } from 'react';
import Swal from 'sweetalert2';
import { withRouter } from 'react-router-dom';
import axiosClient from '../../config/axios';

function NewTransaction({ history }) {
    const [transaction, saveTransaction] = useState({
        concept: '',
        amount: 0,
        type: 'income'
    });

    const handleChange = e => {
        saveTransaction({
            ...transaction,
            [e.target.name] : e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        
        axiosClient.post('/', transaction)
            .then(res => {
                // Show success message
                Swal.fire(
                    'New transaction added',
                    '',
                    'success'
                )
                history.push('/');
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

        return !concept.length || !amount.length || !type.length;
    }

    return (
        <Fragment>
            <h2>New Transaction</h2>

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
                    />
                </div>

                <div className="field">
                    <label>Amount</label>
                    <input  type="number" 
                            placeholder="Transaction Amount" 
                            name="amount" 
                            onChange={ handleChange }
                    />
                </div>
                
                <div className="field">
                    <label>Type</label>
                    <input  type="radio" 
                            name="type" 
                            value="income" 
                            defaultChecked={true}
                            onChange={ handleChange }
                    />Income
                    <input  type="radio" 
                            name="type" 
                            value="expense" 
                            onChange={ handleChange }
                    />Expense
                </div>

                <div className="send">
                    <input  type="submit" 
                            className="btn btn-blue" 
                            value="Add Transaction" 
                            disabled={ formValidation() }
                />
                </div>

            </form>
        </Fragment>
    )
}

// higher order component
export default withRouter(NewTransaction);