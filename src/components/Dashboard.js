import React from 'react';
import Calendar from './Calender';
import NavBar from './NavBar';

function Dashboard(props) {
    return (
        <div>
            <div>
                <NavBar />
            </div>
            <div className="p-10">
                <Calendar />
            </div>

        </div>
    );
}

export default Dashboard;