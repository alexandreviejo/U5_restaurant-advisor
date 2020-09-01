
//exports -> global variable -> everything within can be imported
exports.homePage = (req, res) => {
   // console.log('venimos de myMiddleware:', req.name);

    //El FLASH MESSAGE se lo pasamos al REQ. En la primera pasada
    //por aqui no van a salir, no estan en el RES, estan en el REQ.
    //si el user hace un REQ después de mostrar la web "index.pug, 
    // los flashes estaran dentro de ese REQ y saldran en la web que se haya
    //solicitado.
    req.flash('error', `hola <strong>que</strong> tal`);
    req.flash('info', `hola`);
    req.flash('warning', `hola`);
    req.flash('success', `hola`);

    res.render('extendingLayout'); //finalmente, hacemos el RESPONSE.
};

