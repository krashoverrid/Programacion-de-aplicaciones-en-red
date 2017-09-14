
function average(student, ind){
	var key = student.map(function(o) {
		return Object.keys(o).reduce(function(array, key) {
        return array.concat([o[key]]);
	    },[]);
	});
	key = key[0];
	var averag=0;
	for(i=1; i < key.length; i++){
		if(i!=ind) averag = averag + key[i];
	}
	averag=averag/3;
	return averag.toFixed(2);
}

module.exports={
	average
};