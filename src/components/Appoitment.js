import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserContext';
import Switch from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import BookService from '../service/BookService';

const AntSwitch = styled(Switch)(({ theme }) => ({
    width: 28,
    height: 16,
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 15,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(9px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 2,
      '&.Mui-checked': {
        transform: 'translateX(12px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 12,
      height: 12,
      borderRadius: 6,
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor:
        theme.palette.mode === 'dark' ? 'rgba(255,255,255,.35)' : 'rgba(0,0,0,.25)',
      boxSizing: 'border-box',
    },
  }));

function Appoitment(props) {
    const { booking,getBookings } = useContext(UserContext);
    const [isSelected,setIsSelected] = useState(false)
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
    const handleChange = (e,appoitment,key)=>{
        if(appoitment.status==="Approved"){
            setIsSelected(false);
            appoitment.status="Rejected";
        } else if(appoitment.status==="Rejected"){
            setIsSelected(true);
            appoitment.status="Approved";
        }
        BookService.update(key,appoitment);
        getBookings()
    }
    return (
        <div>
            <div>
                <div>
                    <div class="p-5">
                        <div class='overflow-x-auto w-full'>
                            <table class='mx-auto max-w-4xl w-full whitespace-nowrap rounded bg-white divide-y divide-gray-300 overflow-hidden'>
                                <thead class="bg-gray-900">
                                    <tr class="text-white text-left">
                                        <th class="font-semibold text-sm uppercase px-6 py-4"> Name </th>
                                        <th class="font-semibold text-sm uppercase px-6 py-4"> Date </th>
                                        <th class="font-semibold text-sm uppercase px-6 py-4 text-center"> Note </th>
                                        <th class="font-semibold text-sm uppercase px-6 py-4 text-center"> Status </th>
                                        <th class="font-semibold text-sm uppercase px-6 py-4"> </th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-gray-200">
                                    {Object.keys(booking).map((appoitmentId, index) => {
                                        let appoitment = booking[appoitmentId];
                                        return <tr key={index}>
                                            <td class="px-6 py-4">
                                                <p> {appoitment.name} </p>
                                            </td>
                                            <td class="px-6 py-4">
                                                <p class=""> {appoitment.date} </p>
                                            </td>
                                            <td class="px-6 py-4 text-center">
                                                <p>{appoitment.note}</p>
                                            </td>
                                            <td class="px-6 py-4 text-center">
                                                <span class={`text-white text-sm w-1/3 pb-1  ${getBgStatus(appoitment.status)} font-semibold px-2 rounded-full`}> {appoitment.status} </span>
                                            </td>

                                            <td class="px-6 py-4 text-center">
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <Typography className='text-red-500'>Reject</Typography>
                                                <AntSwitch value={isSelected}  onChange={e=>handleChange(e,appoitment,appoitmentId)} defaultChecked inputProps={{ 'aria-label': 'ant design' }} />
                                                <Typography className='text-green-500'>Approve</Typography>
                                            </Stack>
                                             </td>
                                        </tr>

                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Appoitment;