import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <aside className="sidebar col-3">
            <h2>Management</h2>

            <nav className="nav">
                <Link to={"/"} className="transaction">Transactions</Link>
                <Link to={"/income"} className="income">Income</Link>
                <Link to={"/expenses"} className="expenses">Expenses</Link>
            </nav>
        </aside>
    );
}

export default Nav;