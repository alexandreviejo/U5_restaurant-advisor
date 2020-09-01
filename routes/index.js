const express = require('express');
const router = express.Router();

//Import controllers
const storeController = require('../controllers/storeController');


router.get('/', (req, res) => {

    //http://localhost:7777/?name=pepe&age=100
    //req.query provides QUERY PARAMETERS (e.g., from a FORM)
    console.log('query-param name:', req.query.name);
  
    const human = {name: req.query.name, age: '25', cool: true};

    res.json(human);
    //SOLO SE PUEDE ENVIAR UNA COSA CADA VEZ!
    //res.send(), res.json() son los más basicos para enviar
  });


router.get('/render/:dog', (req, res) => {
    //req.params nos da PARTES DE LA URL
    //En la carpeta /views (donde hemos dicho que estarian las vistas)
    //tenemos los ficheros .pug que son los templates
    //El template no es HTML, le indica al RENDER como debe generar el HTML.
    //como 2o parametro pasamos un objeto con información para usar en el .pug
    res.render('test', {
      name: 'Bob',
      dog:  req.params.dog
    });
  });


  //renderizamos un .pug que extiende (completa) el testLayout.pug
router.get('/extendinglayout/', (req, res) => {
  //le pasamos un objeto con el "title" de la página. Esta información se pone en
  //la estructura "LOCALS" de la RESPONSE. Otras variables
  //que necesita el layout las sacará de valores que podemos poner en el LOCALS
  //por defecto, se hace en el app.js, y que estaran en TODOS LOS OBJETOS RESPONSE que
  //HAGAMOS.

  menu = [
    { slug: '/stores', title: 'Stores',  },
    { slug: '/tags', title: 'Tags',  },
    { slug: '/top', title: 'Top',  },
    { slug: '/add', title: 'Add', },
  ];

  res.render('extendingLayout', {
    title: 'I love pizza',
    menu: menu
  });
});


//Router calls a Controller and its method to do the job
//objects req res are being passed to the controller
router.get('/index/', storeController.homePage);



module.exports = router;