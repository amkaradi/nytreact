const React = require('react');
const Main = require('../components/Main');
const Saved = require('../components/Saved');
const Search = require('../components/Search.js');
const Router = require('react-router');
const Route = Router.Route;
const IndexRoute = Router.IndexRoute;
//export routes
module.exports = (<Route path="/"
    component = {Main} > {} <Route path="/search"
    component = {Search}
    <Route path = "/saved"
    component = {Saved}/> {} <IndexRoute component={Search}/></Route>
);
