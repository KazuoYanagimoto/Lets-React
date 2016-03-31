/** @jsx React.DOM */

var React = require('react');
var PhotoList = require('./components/PhotoList');

React.renderComponent(
	<PhotoList />,
	document.getElementById('app'),
	function(){
		console.log('Hello, Instagram!');
	}
);