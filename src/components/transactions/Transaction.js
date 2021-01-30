import React from 'react';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import axiosClient from '../../config/axios';

function Transaction({ transactionInfo, apiQuery }) {
    const { id, concept, amount, createdAt, type } = transactionInfo;

    const handleClickDelete = id => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                axiosClient.delete(`/${id}`)
                    .then(res => {
                        Swal.fire(
                            'Deleted!',
                            res.data,
                            'success'
                        )
                        apiQuery();
                    })             
            }
          })
    }

    return (
        <li className="transaction">
            <div className="transaction-info">
                <p className="concept">Concept: { concept }</p>
                <p className="amount">Amount: { amount }</p>
                <p className="type">Type: { type }</p>
                <p>{ createdAt.slice(0,10) }</p>
            </div>
            <div className="actions">
                <Link to={`/edit-transaction/${id}`} className="btn btn-blue">
                    <i className="fas fa-pen-alt" />
                    Edit
                </Link>
                <button type="button" 
                        className="btn btn-red btn-delete"
                        onClick={ () => handleClickDelete(id) }
                >
                    <i className="fas fa-times" />
                    Delete
                </button>
            </div>
        </li>
    );
}

export default Transaction;