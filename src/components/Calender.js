import React, { useContext } from "react";
import { daysInMonth, firstDayOfMonth, months } from "./Date";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft ,faChevronRight} from "@fortawesome/free-solid-svg-icons";
import BookBox from "./BookBox";
import BookService from "../service/BookService";
import { UserContext } from "../context/UserContext";


class Calendar extends React.Component {
  constructor(props) {
    super(props);

    const now = new Date();
    this.state = {
      month: now.getMonth(),
      now: now,
      displayMonthSelector: false,
      books:[]
    };
  }

  setMonth = newMonth => {
    this.setState(prevState => {
      const newNow = new Date(prevState.now);
      newNow.setMonth(newMonth);
      return {
        month: newMonth,
        now: newNow
      };
    });
  };
  monthHandler = () => {
    this.setState(prevState => ({ displayMonthSelector: true }));
  };

  selectMonthHandler = month => {
    this.setState(
      prevState => ({ displayMonthSelector: false }),
      () => this.setMonth(month)
    );
  };

  render() {
    const days = daysInMonth(this.state.month);
    return (
      <div className="relative rounded shadow-xl p-4 grid grid-cols-7 bg-white">
        <Header
          month={this.state.month}
          year={this.state.now.getFullYear()}
          setMonth={this.setMonth}
          monthHandler={this.monthHandler}
        />
        <WeekDays />
        <DaysOfMonth
          days={days}
          month={this.state.month}
          now={this.state.now} 
          year={this.state.now.getFullYear()}
          monthText={months[this.state.month]}
        />
        {this.state.displayMonthSelector && (
          <MonthSelector
            month={this.state.month}
            selectMonthHandler={this.selectMonthHandler}
          />
        )}
      </div>
    );
  }
}

export default Calendar;

const MonthSelector=(props)=>{

    return (
      <div className="h-full w-full absolute bg-white rounded-2xl grid grid-cols-3">
        {months.map((month, i) => {
          return (
            <span
              key={month}
              onClick={() => props.selectMonthHandler(i)}
              className={`grid justify-center items-center cursor-pointer  hover:bg-clip-content hover:bg-blue-200 ${
                i === props.month ? "bg-clip-content bg-blue-500 text-white" : ""
              }`}
            >
              {month}
            </span>
          );
        })}
      </div>
    );
}

const  Header =(props)=> {
  const decreaseMonth = () => {
    props.setMonth(Math.abs((props.month + 12 - 1) % 12));
  };

  const increaseMonth = () => {
    props.setMonth(Math.abs((props.month + 1) % 12));
  };

    return (
      <div className="flex items-center justify-between my-2 mx-4 col-span-ful">
        <div className="flex-grow text-2xl">
          <span className="mr-10 cursor-pointer" onClick={props.monthHandler}>
            {months[props.month]}
          </span>
          <span className="cursor-pointer">{props.year}</span>
        </div>
        <div className="flex">
          <span className="cursor-pointer inline-block  py-2 px-3  rounded hover:bg-blue-300 " onClick={decreaseMonth}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </span>
          <span className="cursor-pointer inline-block  py-2 px-3  rounded hover:bg-blue-300" onClick={increaseMonth}>
            <FontAwesomeIcon icon={faChevronRight} />
          </span>
        </div>
      </div>
    );
}

const WeekDays =(props)=>{
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
      <div className="bg-white rounded grid mx-0 mt-2 mb-px col-span-full grid-cols-7">
        {weekdays.map(weekday => {
          return (
            <span key={weekday} className="grid items-center justify-center h-8">
              {weekday}
            </span>
          );
        })}
      </div>
    );
}

const  DaysOfMonth =(props)=>{
    const days = Array.from({ length: props.days }, (k, v) => v + 1);
    const dayToBeginTheMonthFrom = firstDayOfMonth(props.month);
    const currentDate = props.now.getDate();
    const style = { gridColumnStart: dayToBeginTheMonthFrom + 1 };
    const {booking}= useContext(UserContext);

    const getBackground = (day)=>{
      if(Object.values(booking).some((book)=>new Date(book.date).getDate()===day && new Date(book.date).getMonth()===months.indexOf(props.monthText))){
        return {class:"bg-red-700",disabled:true}
      }else{
        return {class:"bg-green-700",disabled:false}
      }
    }

    return days.map((day, i) => {
      return (
        <span
          key={i}
          className={`day ${getBackground(day).class} bg-clip-content bg-white rounded cursor-pointer grid items-center justify-center h-12 p-px ${i === 0 ? "first-day" : ""}
            ${day === currentDate ? "today bg-clip-content  text-white" : ""}
            ${
              (i + dayToBeginTheMonthFrom) % 7 === 0 ||
              (i + dayToBeginTheMonthFrom) % 7 === 6
                ? " bg-clip-content text-white"
                : ""
            }
            `}
          style={i === 0 ? style : {}}
        >
          <BookBox day={day} disabled={getBackground(day).disabled} date={new Date(props.year+'-'+props.monthText+'-'+day)}/>
        </span>
      );
    });
}
