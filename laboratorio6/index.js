const express = require('express');
const pug = require('pug');

var app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));


let texto1 = 'Concebido como un entorno de ejecución de JavaScript orientado a eventos asíncronos, \
Node está diseñado para construir aplicaciones en red escalables. En la siguiente aplicación de \
ejemplo "hola mundo", se pueden manejar muchas conexiones concurrentes. Por cada conexión el callback \
será ejecutado, sin embargo si no hay trabajo que hacer Node estará durmiendo.';

let texto2 = 'Esto contrasta con el modelo de concurrencia más común hoy en día, donde se usan hilos del \
Sistema Operativo. Las operaciones de redes basadas en hilos son relativamente ineficientes y son muy difíciles \
de usar. Además, los usuarios de Node están libres de preocupaciones sobre el bloqueo del proceso, ya que no existe. \
Casi ninguna función en Node realiza I/O directamente, así que el proceso nunca se bloquea. Debido a que no hay \
bloqueo es muy razonable desarrollar sistemas escalables en Node.';

let encrypt = (text)=>{
	text = text.toUpperCase();
	text = text.replace(/A/g,4);
	text = text.replace(/E/g,3);
	text = text.replace(/I/g,1);
	text = text.replace(/O/g,0);
	text = text.replace(/U/g,5);
	return text;
};


app.get('/', (req, res) => {
  res.render('index.pug', {
    pageTitle: 'Programacion de aplicaciones en redes',
    title: 'Acerca de Node.js',
    text1: texto1,
    text2: texto2,
    currentYear: new Date().getFullYear()
  });
});

app.get('/encriptado', (req, res) => {
  res.render('encriptado.pug', {
    pageTitle: 'Programacion de aplicaciones en redes',
    title: 'Acerca de Node.js',
    text1: encrypt(texto1),
    text2: encrypt(texto2),
    currentYear: new Date().getFullYear()
  });
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});