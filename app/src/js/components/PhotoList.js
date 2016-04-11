/** @jsx React.DOM */

var React = require('react');
var PhotoFrame = require('./PhotoFrame');

var PhotoList = React.createClass({
	loadInstagram: function() {
		$.ajax({
			url: "https://api.instagram.com/v1/media/popular?access_token=3057628965.1677ed0.28fe52c52d3b4f22a30c7483063c7609",
			dataType: 'jsonp',
			complete: function() {
				$('.tips').tooltip();
			},
			success: function(response) {
				this.setState({data: response.data});
				// console.log(response.data[0])
			}.bind(this),
			error: function(xhr, status, err) {
				console.error(this.props.url, status, err.toString());
			}.bind(this)
		});
		$('.tips').tooltip('destroy');
	},

	getInitialState: function() {
		return {data: []};
	},

	componentDidMount: function() {
		this.loadInstagram();
	},

	componentDidUpdate: function() {
		// this.loadInstagram();
	},

	render : function() {
		var photoList = this.state.data.map(function(data){
			// console.log(data)
			if(data.type === 'image'){
				media = 'glyphicon glyphicon-picture'
			} else{
				media = 'glyphicon glyphicon-film'
			}
			return(
				<PhotoFrame img={data.images.low_resolution.url}
					link={data.link}
					likes={data.likes.count}
					user={data.user.profile_picture}
					name={data.user.full_name}
					type={media} />
			)
		});

		return(
			<div className="container">
				<div className="row">
					<div className="jumbotron text-center">
						<h1>Instagram Photo Viewer!</h1>
						<p>This is demo site to showcase React with Instagram  API.</p>
						<button className="btn btn-primary btn-lg" onClick={this.loadInstagram}>
							<span className="glyphicon glyphicon-camera" aria-hidden="true"></span>
							&nbsp; Load Popular Photos &nbsp;
							<span className="glyphicon glyphicon-camera" aria-hidden="true"></span>
				 		</button>
					</div>
				</div>
				<div className="row">
					{photoList}
				</div>
			</div>
			);
		}
});

module.exports = PhotoList;