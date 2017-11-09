console.log("Iniciando mongodb ...");

const MongoClient = require('mongodb').MongoClient;

// Connection URL
var url = 'mongodb://localhost:27017/test';

function insertFacultad(nameDb, nameF, item){
	var mongodb = (nameDb, nameF, item)=>{
		return new Promise((resolve, reject)=>{
			MongoClient.connect(url, (err, db)=>{
				db.collection(nameDb).insertOne({
					facultad: nameF,
					profesores: item.profesores,
					alumnos: item.alumnos
				}, (err, res)=>{
					if(err){
						reject('Hubo un error');
					}
					
					resolve('Insertado con exito');
				});

				db.close();
			});
		});
	};

	return mongodb(nameDb, nameF, item).then((acepted)=>{
		return 'insertado con exito';
	},(error)=>{
		return 'Hubo error al insertar';
	});
};

function searchFacultad(nameDb, nameF){
	var search= JSON.stringify('{}');
	console.log('buscando ... '+nameDb + ' item ' + nameF);
	
	MongoClient.connect(url, function(err, db) {
		if(err) throw err;
		var al = db.collection(nameDb).find({facultad: nameF}).toArray((err, result) => {
			if(err) throw err;
			search = JSON.stringify(result);
			db.close();
		});
	});
	console.log('ddd '+ search);
};

function insertProfesor(nameDb, nameF, item){

};

function updateFacultad(nameDb, nameF, nameItem, item, itemUpdate){
	var mongodb = (nameDb, nameF, nameItem, item, itemUpdate)=>{
		return new Promise((resolve, reject)=>{
			MongoClient.connect(url, (err, db)=>{
				db.collection(nameDb).updateOne(
					{nameItem: item}, 
					{$set:{nameItem: itemUpdate}}
					,(err, res)=>{
						if(err){
							reject('Hubo un error');
						}
						resolve('Actualizado');
					});
				db.close();
			});
		});
	};

	return mongodb(nameDb, nameF, nameItem, item, itemUpdate).then((acepted)=>{
		return 'Actualizacion Exitosa';
	}, (error)=>{
		return 'Error al actualizar';
	});
};




module.exports={
	insertFacultad,
	searchFacultad,
};