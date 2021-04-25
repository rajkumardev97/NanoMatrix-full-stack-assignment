 
const createHistory = require("history").createBrowserHistory
export default createHistory();

/*

I had a similar issue when migrating over to React-Router v4 so I'll try to explain my solution below.

Please do not consider this answer as the right way to solve the problem, I imagine there's a good chance something better will arise as React Router v4 becomes more mature and leaves beta (It may even already exist and I just didn't discover it).

For context, I had this problem because I occasionally use Redux-Saga to programmatically change the history object (say when a user successfully authenticates).

In the React Router docs, take a look at the <Router> component and you can see you have the ability to pass your own history object via a prop. This is the essence of the solution - we supply the history object to React-Router from a global module.

Steps:
Install the history npm module - yarn add history or npm install history --save
create a file called history.js in your App.js level folder (this was my preference)

// src/history.js

import createHistory from 'history/createBrowserHistory';
export default createHistory();`
Add this history object to your Router component like so

// src/App.js

import history from '../your/path/to/history.js;'
<Router history={history}>
// Route tags here
</Router>
Adjust the URL just like before by importing your global history object:

import history from '../your/path/to/history.js;'
history.push('new/path/here/');
Everything should stay synced up now, and you also have access to a way of setting the history object programmatically and not via a component/container.
*/