import { faCalendarTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';
import BookService from '../service/BookService';
import NavBar from './NavBar';
import UpdateBookBox from './UpdateBookBox';

function Booking(props) {
    const { booking, getBookings, user } = useContext(UserContext);
    useEffect(() => {
        getBookings();
        console.log(Object.keys(booking))
    }, [])

    const getBgStatus = (status)=>{
        if(status==="Pending"){
            return "bg-yellow-500";
        }
        if(status==="Approved"){
            return "bg-green-500";
        }
        if(status==="Rejected"){
            return "bg-red-500";
        }
    }
    return (
        <div>
            <NavBar />
            <div className='flex md:w-3/4 w-full mx-auto flex-col justify-center mx-4'>
                {Object.keys(booking).map((appoitmentId, index) => {
                    let appoitment = booking[appoitmentId]
                    if(appoitment.email !== user.email)
                        return;

                    return <div key={index}>
                        <div className='flex md:flex-row flex-col justify-between gap-4 shadow-lg p-10 m-2'>
                            <div className='flex sm:flex-row flex-col text-center gap-4 '>
                                <span>{index + 1}</span>
                                <h1>{appoitment.date}</h1>
                                <p>{appoitment.note}</p>
                                <p className={`${getBgStatus(appoitment.status)} p-1 rounded text-white`}>{appoitment.status}</p>
                            </div>
                            <div className='flex gap-4'>
                                <UpdateBookBox appoitment={appoitment} bookId={appoitmentId} />
                                <button onClick={e=>{BookService.delete(appoitmentId);getBookings()}}><FontAwesomeIcon size='2x' className='text-red-500' icon={faCalendarTimes}/></button>
                            </div>
                        </div>

                    </div>
            })}
            </div>
        </div>
    )
}

export default Booking;