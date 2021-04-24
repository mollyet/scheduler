# Interview Scheduler

Interview Scheduler is an application made with React for [Lighthouse Labs Web Development Bootcamp](https://www.lighthouselabs.ca/). Its pretty neat. 

# Screenshots
!["Monday view/ homepage of app"](https://github.com/mollyet/scheduler/blob/master/docs/monday-with-selected.png?raw=true)
The homepage. Looks like the first appointment is for Testerella von Test. 

!["New appointment dialogue"](https://github.com/mollyet/scheduler/blob/master/docs/add-new-appt.png?raw=true)
Jimmy Adds a new appointment.

!["Friday/ full schedule view"](https://github.com/mollyet/scheduler/blob/master/docs/full-sched.png?raw=true)
A busy day. 

## Setup

- Install dependencies with `npm install`.
- Navigate to [scheduler-api](https://github.com/mollyet/scheduler-api) for the scheduler-api, and follow the instructions to run it for filler data to populate the schedule. 
- Run app with `npm start` in scheduler directory 
- Navigate to `http://localhost:8000/` in your favourite browser
- Have fun! Book an interview by clicking the little "+" icon

## Running Tests
There are several automated tests created as part of this project. While these would not normally be deployed with production level code, I have chosen to include them for reference. 
- Jest
  - Run Jest Test framework with `npm test`
- Storybook Visual Testbed
  - Run with `npm run storybook` and follow instructions given in the terminal.
- Cypress
  - Run with `npm run cypress`

