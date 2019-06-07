import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Loading } from 'apm-titan';
import { Link } from 'apm-titan';
import { format, startOfWeek, endOfWeek, eachDay } from 'date-fns';
import axios from 'axios';
// import { getTime } from 'date-fns/get_time';
// http://scheduler.publicradio.org/api/v1/shows/252
// http://scheduler.publicradio.org/api/v1/services/1/schedule/?datetime=2019-06-06T02:00:00-05:00
// http://scheduler.publicradio.org/api/v1/services/3/schedule/?datetime=2019-06-07
// http://scheduler.publicradio.org/api/v1/services/3/schedule/?range
// .as-console-wrapper{min-height:100%}
class Schedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: {},
      days: ['Sun', 'Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat']
    };
  }

  getDate() {
    var today = new Date();
    var date =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();
    return date;
  }

  componentDidMount() {
    var todaysDate = this.getDate();

    this.fetchSchedule(todaysDate);

    // const start = startOfWeek(date);
    // const end = endOfWeek(date);
    // console.log('firstday', format(start, 'YYYY-MM-DD'));
    // console.log('lastday', end);
    // let each = eachDay(format(start, 'YYYY-MM-DD'), format(end, 'YYYY-MM-DD'));
    // console.log(each);
    // // console.log('eachday:🕯', eachDay(start, end));
  }
  componentWillReceiveProps() {
    this.getSlugProps();
  }
  getSlugProps() {
    let date = this.getDate();

    const start = startOfWeek(date);
    const end = endOfWeek(date);
    let dateFromProps = eachDay(
      format(start, 'YYYY-MM-DD'),
      format(end, 'YYYY-MM-DD')
    );

    {
      // console.log(dateFromProps[0]);
    }

    let returnDate = this.props['*'];
    let newReturnDate = dateFromProps.indexOf(returnDate) > -1;
    console.log('dasddads', newReturnDate);
    if (newReturnDate === this.props['*']) return;
    this.setState({
      newDates: newReturnDate
    });
    console.log('loggin State', this.state?.newDates);

    //   this.state?.timesToDate.forEach((i) => {
    //     return i.getDate();
    //   })
    // );

    // .indexOf(this.props['*']));
    // if(this.props['*'])
    // this.fetchSchedule(returnDate);
  }

  fetchSchedule(dayOfTheWeek) {
    let serviceId = 3;

    return axios
      .get(
        `http://scheduler.publicradio.org/api/v1/services/${serviceId}/schedule/?datetime=${dayOfTheWeek}`
      )
      .then((res) => {
        this.setState({
          response: res.data
        });
      })
      .catch((err) => console.log(err)); // eslint-disable-line
  }
  render() {
    console.log(this.state);
    // console.log(this.props);
    const { schedule } = this.state.response;
    // const { data } = this.props;
    // if (data.loading) return <Loading />;
    // if (data.error) return <div>Error</div>;

    // console.log('this.state.response:', this.state);
    return schedule ? (
      <>
        {console.log(schedule)}
        {console.log('this.props', this.props)}
        {/* {schedule[0].se_id} */}
        {this.state.days.map((day, i) => {
          return (
            <div key={i}>
              <Link key={day} to={`/schedule/${day}`}>
                {day}
              </Link>
            </div>
          );
        })}

        <Link key={'tuesday'} to={`/schedule/${this.props['*']}`}>
          {this.props['*']}
        </Link>

        {schedule.map((program, i) => {
          return (
            <div key={i}>
              {format(program.start_dtim, 'h:mm A')}

              {program.shows.map((show) => {
                return (
                  <div key={show.id}>
                    <a key={show.id} href={show.link}>
                      {show.name}
                    </a>
                  </div>
                );
              })}

              {program?.people.map((person) => {
                return (
                  <div key={person.id}>
                    {person.name}
                    {person.link}
                  </div>
                );
              })}
            </div>
          );
        })}
      </>
    ) : (
      <>Loading....</>
    );
  }
}

Schedule.propTypes = {
  '*': PropTypes.string,
  response: PropTypes.object,
  data: PropTypes.object
};

export default Schedule;
