function deleteNote(student){
	var key = student.map(function(o) {
		return Object.keys(o).reduce(function(array, key) {
        return array.concat([o[key]]);
	    },[]);
	});
	key = key[0];
	//console.log(key);
	var min = key[1], index;
	for(i=2; i<key.length; i++){
		if(min>key[i]) {
			min=key[i];
			index=i;
		}
	}
	return index;
}

module.exports={
	deleteNote
};