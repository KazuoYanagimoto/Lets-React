/** @jsx React.DOM */

var React = require('react');

var PhotoFrame = React.createClass({
	render: function() {
		var userImage = {
			position: 'absolute',
			top: '-15px',
			left: '-5px',
			width: '50px',
			border: '3px solid #fff'
		};

		var fullName = this.props.name;

		if(fullName === ""){
			fullName = "- wow -"
		}

		return (
			<div className="col-sm-6 col-md-4 col-lg-3 blur">
				<img data-toggle="tooltip" data-placement="top" title={fullName} className="img-responsive img-circle tips" src={this.props.user} style={userImage} />
				<a href={this.props.link} className="thumbnail" target="_blank">
					<img className="img-responsive" src={this.props.img} />
				</a>
			</div>
 		);
	}
});

module.exports = PhotoFrame;