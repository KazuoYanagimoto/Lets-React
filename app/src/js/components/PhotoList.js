/** @jsx React.DOM */

var React = require('react');
var PhotoFrame = require('./PhotoFrame');

var PhotoList = React.createClass({
	loadInstagram: function() {
		$.ajax({
			url: "https://api.instagram.com/v1/media/popular?access_token=3057628965.1677ed0.28fe52c52d3b4f22a30c7483063c7609",
			dataType: 'jsonp',
			complete: function() {
				// $('#tip').tooltip('show');
			},
			success: function(response) {
				this.setState({data: response.data});
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
	},

	getInitialState: function() {
		return {data: []};
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
				<PhotoFrame img={data.images.low_resolution.url}
					link={data.link} likes={data.likes.count}
					user={data.user.profile_picture}
					name={data.user.full_name} />
			)
		});

		return(
			<div className="wrapper">
				<div className="container-fluid">
					<div className="row">
						<div className="jumbotron text-center">
							<h1>Instagram Photo Viewer!</h1>
							<p>This is demo site to showcase React with Instagram  API.</p>
							<button className="btn btn-primary btn-lg" onClick={this.loadNewPhotos}>
								<span className="glyphicon glyphicon-camera" aria-hidden="true"></span>
								&nbsp;Load Popular Photos&nbsp;
								<span className="glyphicon glyphicon-camera" aria-hidden="true"></span>
					 		</button>
						</div>
					</div>
				</div>
				<div className="container">
					<div className="row">
						{photoList}
					</div>
				</div>
			</div>
			);
		}
});

module.exports = PhotoList;