//gets appointments by day

const getApptsByDay = (state, day) => {
  console.log("hello!");
  const dayObj = state.days.find(x => x.name === day);
  if (!dayObj) {
    return [];
   }
  const appts = dayObj.appointments.map(id => state.appointments[id]);
  return appts;
};



module.exports = { getApptsByDay };