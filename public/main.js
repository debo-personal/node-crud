(function( deboNS, $ ){
	function User() {

	}
	User.prototype = {};
	User.prototype.deleteUser = function( userName ) {
		console.log('delete operation triggered from client side');
		if( window.fetch ) {
			fetch('users', {
			    method: 'delete',
			    headers: {
			      'Content-Type': 'application/json'
			    },
			    body: JSON.stringify({
			      'name': userName
			    })
			}).then(function(data){
			    console.log(data);
			    window.location.reload();
			});
		}
		else {
			console.error('Fetch api is not supported by your browser');
		}
	};

	User.prototype.updateUser = function( userName ) {
		console.log('Update operation triggered from client side');
		if( window.fetch ) {
			fetch('users', {
			    method: 'put',
			    headers: {
			      'Content-Type': 'application/json'
			    },
			    body: JSON.stringify({
			      'name': userName
			    })
			}).then(function(data){
			    console.log(data);
			    window.location.reload();
			});
		}
		else {
			console.error('Fetch api is not supported by your browser');
		}
	};

	deboNS.user = new User();
	window.deboNS = deboNS;
	
})( window.deboNS || {}, jQuery);