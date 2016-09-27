(function( deboNS, $ ){
	function User() {

	}
	User.prototype = {};
	User.prototype.deleteUser = function( userName ) {
		console.log('delete operation triggered from client side');
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

	deboNS.user = new User();
	window.deboNS = deboNS;
	
})( window.deboNS || {}, jQuery);