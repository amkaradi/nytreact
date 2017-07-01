const React = require("react");
// Show log of recent searches.
var History = React.createClass({
  render: function() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title text-center">Search History</h3>
        </div>
        <div className="panel-body text-center">
          {/* Here we use a map function to loop through an array in JSX */}
          {this.props.history.map(function(search, i) {
            return (
              <p key={i}>{search.location} - {search.date}</p>
            );
          })}
        </div>
      </div>
    );
  }
});
// Export the component back for use in other files
module.exports = History;