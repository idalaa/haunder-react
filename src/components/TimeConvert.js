import React from 'react';
import PropTypes from 'prop-types';

import Moment from 'react-moment';
import moment from 'moment';
import 'moment/locale/en-gb';
import 'moment-timezone';


const TimeConvert = (time) => {
  // eslint-disable-next-line
  moment.tz.add('Europe/Helsinki|HMT EET EEST|-1D.N -20 -30|0121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121212121|-1WuND.N OULD.N 1dA0 1xGq0 1cM0 1cM0 1cM0 1cN0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1cM0 1fA0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00 11A0 1qM0 WM0 1qM0 WM0 1qM0 WM0 1qM0 11A0 1o00 11A0 1o00|12e5');

  // Time functions
  const laskeEro = (time) =>{
    const date1 =new Date();
    console.log('1', date1);
    const date2 = new Date(time);
    console.log('2', date2);

    return Math.abs(date1 - time) / /* 3.6e6 */ 3600000;
  };
  return (
    <>
      {
  (laskeEro(time) >= 24) ? (
    console.log('TIME DD.MM.YYYY', time),
    <Moment tz='Europe/Helsinki' format='DD.MM.YYYY'>{time}</Moment>
  ) : (
    console.log('TIME FROM NOW', time),
    <Moment tz='Europe/Helsinki' fromNow>{time}</Moment>
  )
      /* british backup time
   console.log("aika", file.time_added),

   moment(file.time_added).calendar() */
      }
    </>
  );
};

TimeConvert.propTypes = {
  time: PropTypes.any,
};

export default TimeConvert;
