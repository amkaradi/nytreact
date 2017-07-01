const axios = require('axios');
const React = require('react');

// MAKE THE CONNECTIONS WITH THE NESTED ITEMS
// Here we include all of the sub-components
const Form = require('./children/form');
const Results = require('./children/results');
const Saved = require('./children/Saved');

// HELPER FUNCTIONS 
// Helper for making AJAX requests to our API	
const helpers = require('./utils/helpers.js');

// MAIN CONTROLER  
// Creating the Main component
var Main = React.createClass({

    // STATEMENT FOR NUMBER OF CLICKS 
    // Here we set a generic state associated with the number of clicks
    // Note how we added in this history state variable
    getInitialState: function() {
        return {
        	searchTerm: "",
        	history: [],
            topic: "",
            startYear: "",
            endYear: "",
            results: [],
            savedArticles: []
        }
    },

// CHILDERN UPDAT THE PARTENT WITH SEARCH TERMS VIA A FUNCTION 
setTerm: function(tpc, stYr, endYr) {
    this.setState({
        topic: tpc,
        startYear: stYr,
        endYear: endYr
    })
},
saveArticle: function(title, date, url) {
    helpers.postArticle(title, date, url);
    this.getArticle();
},
deleteArticle: function(article) {
    console.log(article);
    axios.delete('/api/saved/' + article._id)
        .then(function(response) {
            this.setState({
                savedArticles: response.data
            });
            return response;
        }.bind(this));

    this.getArticle();
},
getArticle: function() {
    axios.get('/api/saved')
        .then(function(response) {
            this.setState({
                savedArticles: response.data
            });
        }.bind(this));
},

// If the component updates we'll run this code
componentDidUpdate: function(prevProps, prevState) {

    if (prevState.topic != this.state.topic) {
        console.log("UPDATED");

        helpers.runQuery(this.state.topic, this.state.startYear, this.state.endYear)
            .then(function(data) {
                console.log(data);
                if (data != this.state.results) {
                    this.setState({
                        results: data
                    })
                }
            }.bind(this))
    }
},

componentDidMount: function() {
    axios.get('/api/saved')
        .then(function(response) {
            this.setState({
                savedArticles: response.data
            });
        }.bind(this));
},

// Here we render the function
render: function() {
    return (
        <div className="container">
        	<div className="row">
		        <div className="jumbotron"
			         style={
			            { 
			            	'backgroundImage': 
			            	'url(./assets/images/newspaper.jpg)', 
			            	'backgroundRepeat': 'no-repeat', 
			            	'backgroundPosition': 'center', 
			            	'backgroundSize': '100% 100%', 
			            	'backgroundAttachment': 'fixed' 
			            } 
			          }>

			        <h2 className="text-center"
				        style={
				            { 
				            	'color': 'white', 
				            	'textShadow': '3px 3px 10px black', 
				            	'fontSize': '54px' 
				            } 
				        }>
				        New York Times Article Search and Save
				     </h2>

		            <p className="text-center" 
				       style={
				            { 
				            	'color': 'white', 
				            	'textShadow': '3px 3px 10px black', 
				            	'fontSize': '24px' 
				            } 
				       }> 
		            Search for and save articles of interest! 
		            </p> 
	         	</div> 
	        </div> 
	        
	        <div className="row">
	        	<Form setTerm = { this.setTerm } />
        	</div>

	        <div className = "row" >
	        	<Results results={ this.state.results }
				        saveArticle={ this.saveArticle } />
	        </div>

	        <div className = "row" >
		        {/*<Saved savedArticles={ this.state.savedArticles }
		        deleteArticle={ this.deleteArticle } />*/}
	        </div> 
	    </div>
    )
} 
});
module.exports = Main;