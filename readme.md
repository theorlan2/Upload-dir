# Upload directories  Js - PHP

Subir directorio de archivos con js y php.

-Para las peticiones utiliza <a href="https://github.com/mzabriskie/axios">axios</a>.

-Para recibir los archivos en php <a href="https://github.com/verot/class.upload.php">Class.upload</a>.


```

// -Archivo upload.php

// Recive la Direcion que recibira el directorio
$n = new UploaderDir("../uploads/device1");

/*  Recive la estrutura que recibira el directorio  
    False: Crea los subdiretorios contenidos en el directorio selecionado | True: Crea el directorio contenedor 
*/
    $n->crearDirs($_GET['estrutura'],false);

// Recive los archivos del directorio y su posicion en el directorio
 $n->uploadFile($_FILES['file'],$_POST['dir']);


```

Las opciones pueden ser:
```crearDirs(estructura,false)``` : Subir un directorio y subir solo el contenido y los Sub-directorios.\n

```crearDirs(estructura,true)``` : Subir un directorio y Crearlo en la  Carpeta asignada con su contenido.

El ejemplo actual esta por default con el directorio contenedor desactivado.

***Nota: El ejemplo no contiene validacion de archivos, debe configurar el php.ini del servidor para que acepte archivos mayores de 1MB por Request.