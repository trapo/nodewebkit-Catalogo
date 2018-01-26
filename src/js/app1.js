
var indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

var dataBase = null;



function startDB() {

    dataBase = indexedDB.open('catalogo');

    dataBase.onupgradeneeded = function (e) {
        var active = dataBase.result;

       var object = active.createObjectStore("precios");
        object.createIndex('by_referencia', 'Referencia', { unique: false });
        object.createIndex('by_Articulo', 'Articulo', { unique: true });
        object.createIndex('by_Precio', 'Precio', { unique: true });
    };

    dataBase.onsuccess = function (e) {
      //  alert('Database loaded');
        loadAll();
    };
    dataBase.onerror = function (e) {
        alert('Error loading database');
    };
}

function add() {

    var active = dataBase.result;
    var data = active.transaction(["precios"], "readwrite");
    var object = data.objectStore("precios");
    
   // alert(document.querySelector("#dni").value);
    var request = object.put({
        dni: document.querySelector("#Referencia").value,
        name: document.querySelector("#Articulo").value,
        surname: document.querySelector("#Precio").value
    });

    request.onerror = function (e) {
        alert(request.error.name + '\n\n' + request.error.message);
    };

    data.oncomplete = function (e) {
        document.querySelector('#Referencia').value = '';
        document.querySelector('#Articulo').value = '';
        document.querySelector('#Precio').value = '';
     //   alert('Object successfully added');
        loadAll();
    };
}

function loadAll() {
    var active = dataBase.result;
    var data = active.transaction(["precios"], "readonly");
    var object = data.objectStore("precios");

    var elements = [];

    object.openCursor().onsuccess = function (e) {

        var result = e.target.result;

        if (result === null) {
            return;
        }

        elements.push(result.value);
        result.continue();

    };

    data.oncomplete = function () {

        /*var outerHTML = '';

        for (var key in elements) {

            outerHTML += '\n\
            <tr>\n\
                <td>' + elements[key].Referencia + '</td>\n\
                <td>' + elements[key].Articulo + '</td>\n\
                <td>' + elements[key].Precio + '</td>\n\
                <td>\n\
                    <button type="button" onclick="load(' + elements[key].id + ')">Details</button>\n\
                </td>\n\
            </tr>';

        }

        elements = [];
        document.querySelector("#elementsList").innerHTML = outerHTML;*/
        var dataObject = []
        for (i = 0; i < elements.length; i++) {
            
            var obj = {}
            elements[i].Referencia ? obj.Referencia = elements[i].Referencia:"";
            elements[i].Articulo ? obj.Articulo = elements[i].Articulo:"";
            elements[i].Precio ? obj.Precio = elements[i].Precio:"";
            if(i == 3612) 
                alert("LLEGO")
            //dataObject.push(Object.assign(obj, elements[i]));
            dataObject.push(obj);
          }
          
        $(document).ready(function() {
            $('#example').DataTable( {
                "aaData": dataObject,
                 "columns": [
                    { title: "Referencia", data: 'Referencia' },
                    { title: "Articulo", data: 'Articulo' },
                    { title: "Precio", data: 'Precio' },
                    
                    
                ]
            } );
        } );
    };

}
