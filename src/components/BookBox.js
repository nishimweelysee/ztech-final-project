import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { UserContext } from '../context/UserContext'
import moment from 'moment';
import BookService from '../service/BookService';
export default function BookBox(props) {
    const { user,getBookings } = React.useContext(UserContext)
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const [book, setBook] = React.useState({
        date: moment(props.date).format("YYYY-MMM-DD"),
        name: user.name,
        note: '',
        email: user.email,
        status:"Pending"
    })
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook({ ...book, [name]: value })
    }

    const handleHandleSubmit = async () => {
        await BookService.create(book);
        getBookings();
        handleClose();
    }
    return (
        <div>
            <Button disabled={props.disabled} variant="none" className={`focus:outline-none`} onClick={handleClickOpen}>
                {props.day}
            </Button>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Your Booking appointment on " + book.date}
                </DialogTitle>
                <DialogContent>
                    <form className='flex flex-col gap-2'>
                        <div className='flex flex-col gap-1 border-b'>
                            <label className='text-gray-500'>Full Name</label>
                            <input name='name' onChange={handleChange} type={"text"} value={book.name} className='focus:outline-none p-2' placeholder='Type your name' />
                        </div>
                        <div className='flex flex-col gap-1 border-b'>
                            <label className='text-gray-500'>Notes</label>
                            <textarea name='note' onChange={handleChange} type={"text"} value={book.note} className='focus:outline-none p-2' placeholder='Type ...'  ></textarea>
                        </div>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Close
                    </Button>
                    <Button onClick={handleHandleSubmit} autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
