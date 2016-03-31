/** @jsx React.DOM */

var React = require('react');

var PhotoFrame = React.createClass({
	render: function() {
		var userImage = {
			position: 'absolute',
			top: '-15px',
			left: '-5px',
			width: '50px'
		};

		return (
			<div className="col-sm-6 col-md-4 col-lg-3 photo-frame">
				<img id="tip" data-toggle="tooltip" data-placement="top" title={this.props.name} className="img-responsive img-circle" src={this.props.user} style={userImage} />
				<a href={this.props.link} className="thumbnail" target="_blank">
					<img className="img-responsive" src={this.props.img} />
				</a>
			</div>
 		);
	}
});

module.exports = PhotoFrame;