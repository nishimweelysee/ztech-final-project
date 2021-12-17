import React from 'react';
import Appoitment from './Appoitment';
import NavBar from './NavBar';

function Admin(props) {
    return (
        <div>
            <NavBar/>
            <div>
                <Appoitment/>
            </div>
        </div>
    );
}

export default Admin;