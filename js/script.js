/* Dany Orlando Santos 

axios: https://github.com/mzabriskie/axios
*/


var files
    ,DirName
    ,cantidadFiles = 0
    ,CreateContDir = false; // Crear directorio contenedor en el servidor
window.onload = function(){

    document.getElementById("filepicker").addEventListener("change", function(event) {
        var output = document.getElementById("listing");
         files = event.target.files;
        var last_dir = '',pos_dir= 0;
        var Structure = [];
        cantidadFiles = files.length;

        for (var i=0; i<files.length; i++) {
            var item = document.createElement("li");
            path = files[i].webkitRelativePath;
            var num = path.split('/').length;
            var Dir = '';
            DirName = path.split('/')[0];                
            Dir = RecortarRuta(path);
            
            Structure.push(Dir);            
        };
        
        SendDirStructure(Structure);           
      }, false);

  }

// Envia la estructura del directorio al servidor
  function SendDirStructure(struct){
      
      var ObjectStruct = {
          'Dir':DirName,
          'SubDirs':struct
        }
        console.log(ObjectStruct);

  axios.get('php/upload.php',{
      params:{
          'structure':JSON.stringify(ObjectStruct)
      }
  })
      .then(function(){
        console.log('Directorio Enviado');

        var path = files[0].webkitRelativePath;
        
        var DirN = RecortarRuta(path,CreateContDir);
 SendFiles(DirN,files[0]);


    }).catch(function(){
        console.log('Error enviando el Directorio ');
      })
  }

var cont = 1;
  function SendFiles(dir,file){

 var data = new FormData();
 data.append('dir',dir);
 data.append('file',file);

 var config = {
    onUploadProgress: function(progressEvent) {
      var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
    }
  };
  axios.post('php/upload.php', data, config)
    .then(function (res) {
      console.log(res);
      var path = files[cont].webkitRelativePath;
      var DirN = RecortarRuta(path,CreateContDir);
    SendFiles(DirN,files[cont]);
    cont++;
    ProgresBar(cantidadFiles,cont);
    }).catch(function(){
    console.log('Error Enviando Archivo');    
    })

 }

  
function RecortarRuta(path,home) {
    /* 
    *var home = Boolean
    *return the name of the Father dir in the path 
    *Retorna el nombre del Directorio Padre en la ruta
    */
    var home = home || false;

    var num = path.split('/').length;        
    var DirN = '';
    if(home){
        if(path.split('/')[0] != ""){
            DirN += '/'+path.split('/')[0];
        }        
    }
    for(var e =1; e < num-1; e++) {
        if(path.split('/')[e] != ""){
            DirN += '/'+path.split('/')[e];
        }
    }
return DirN;
}


/* 
cant: Cantidad de Archivos en la carpeta
numSubido:Numero de archivos Subidos
*/
function ProgresBar(cant,numSubido){
    console.log("Archivos: "+cant+" - Subidos: "+numSubido);
    Prog = (numSubido * 100) / cant;
    document.querySelectorAll('.progress_bar div')[0].style.width = Prog+"%";
}