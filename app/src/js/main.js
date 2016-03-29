/** @jsx React.DOM */

var React = require('react');

var Title = React.createClass({
	render: function() {
		return (
			<div className="title">
	 			<h1>{this.props.text}</h1>
	 		</div>
 		);
	}
});

var SubTitle = React.createClass({
	render: function() {
		return (
			<div className="sub-title">
	 			<h2><small>{this.props.text}</small></h2>
	 		</div>	
			);
	}
});

var PhotoFrames = React.createClass({
	render: function() {
		var userImage = {
			position: 'absolute',
			top: '-15px',
			left: '-5px',
			width: '50px'
		};

		return (
			<div className="col-sm-6 col-md-4 col-lg-3 photo-frame">
				<img className="img-responsive img-circle" src={this.props.user} style={userImage} />
				<a href={this.props.link} className="thumbnail" target="_blank">
					<img className="img-responsive" src={this.props.img} />
				</a>
			</div>
 		);
	}
});

var PhotoList = React.createClass({
	loadInstagram: function() {
		$.ajax({
			url: "https://api.instagram.com/v1/media/popular?access_token=3057628965.1677ed0.28fe52c52d3b4f22a30c7483063c7609",
			dataType: 'jsonp',
			success: function(response) {
				this.setState({data: response.data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},

	getInitialState: function() {
		return ({data: []});
	},

	componentDidMount: function() {
		this.loadInstagram();
	},

	loadNewPhotos: function() {
		var loadInstagram = this.loadInstagram();
		$('.photo-frame').fadeOut(500, function(){
			loadInstagram;
		}).fadeIn(1500);
	},

	render : function() {
		var photoList = this.state.data.map(function(data){
			return(
				<PhotoFrames img={data.images.low_resolution.url} link={data.link} likes={data.likes.count} user={data.user.profile_picture} />
			)
		});

		return(
			<div className="container">
				<div className="row">
					<div className="jumbotron text-center col-md-12">
						<Title text="Instagram Photo Viewer" />
						<SubTitle text="This is demo site to showcase React with Instagram  API." />
						<div className="button-group">
							<button className="btn btn-primary btn-lg" onClick={this.loadNewPhotos}>
								<span className="glyphicon glyphicon-camera" aria-hidden="true"></span>
								&nbsp;Load Popular Photos&nbsp;
								<span className="glyphicon glyphicon-camera" aria-hidden="true"></span>
					 		</button>
						</div>
					</div>
				</div>
				<div className="row">
					{photoList}
				</div>
			</div>
			);
		}
});

React.renderComponent(
	<PhotoList />,
	document.getElementById('app'),
	function(){
		console.log('Hello, Instagram!');
	}
);