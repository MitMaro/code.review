var React = require('react');

var CodeReview = React.createClass({
	displayName: 'CodeReview',
	render: function() {
		return (
			<div>
				<h1>Code . Review</h1>
				<p>Hello Code Review</p>
			</div>
		);
	}
});

React.render(<CodeReview/>, document.getElementById('entry'));
