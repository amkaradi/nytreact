const React = require("react");
const Form = React.createClass({
    getInitialState: function() {
        return { term: "" };
    },
    handleChange: function(event) {
        this.setState({ term: event.target.value });
    },
    // Submit
    handleSubmit: function(event) {
        event.preventDefault();
        // Connect to parent 
        this.props.setTerm(this.state.term);
        this.setState({ term: "" });
    },
    render: function() {
        return ( 
          <div className = "panel panel-default">
            <div className = "panel-heading">
              <h3 className = "panel-title text-center" > Query </h3> 
            </div>
            <div className = "panel-body text-center">
              <form onSubmit = { this.handleSubmit }>
                <div className = "form-group" >
                  <h4 className = "" >
                    <strong > Location </strong> 
                  </h4> 
                  {} 
                  <br/>
                  <input value={ this.state.term }
                    type="text"
                    className="form-control text-center"
                    id="term"
                    onChange={ this.handleChange }
                    required />
                  <br/>
                  <button className = "btn btn-primary" type = "submit" >
                    Submit 
                  </button>
                </div>
              </form>
            </div> 
          </div>
        );
    }
});
module.exports = Form;
