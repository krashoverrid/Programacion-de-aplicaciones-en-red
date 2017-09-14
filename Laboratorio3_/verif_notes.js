function check(student){
	var f=0;

	var key = student.map(function(o) {
		return Object.keys(o).reduce(function(array, key) {
        return array.concat([o[key]]);
	    }, []);
	});

	key=key[0];
	for(i=1; i<key.length; i++){
		h = key[i];
		if(Number.isNaN(parseInt(h))) f=1;
		//console.log(parseInt(h));
	}
	return f;
}

module.exports={
	check
};