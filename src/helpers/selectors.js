//gets appointments by day

const getApptsByDay = (state, day) => {
  const dayObj = state.days.find(x => x.name === day);
  if (!dayObj) {
    return [];
  }
  const appts = dayObj.appointments.map(id => state.appointments[id]);
  return appts;
};

//get Singular Interview

const getInt = (state, interview) => {
  if (!interview) {
    return null;
  }
  const intObj = {
    student: interview.student,
    interviewer: state.interviewers[interview.interviewer]
  };

  return intObj;
};


module.exports = { getApptsByDay, getInt };