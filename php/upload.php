<?php
require('class.upload.php');

class UploaderDir {

  public $PathUpload;

function __construct($path = '../uploads') {
 $this->PathUpload = $path;
}
    
    public function crearDirs($Structure,$contenedor) {

        $directiorios =json_decode($Structure,true);
        if($contenedor == true){ 
         $dir = opendir($this->PathUpload);
          if(!mkdir($this->PathUpload."/".$directiorios['Dir'], 0777,true)){
            echo json_encode(['error'=>'Error Creando el Directorio  Padre:'.$directiorios['Dir']]);
          }
          $FatherPath = $this->PathUpload."/".$directiorios['Dir']; 
          closedir($dir);           
        }else{
          $FatherPath = $this->PathUpload."/";
          echo "eaea";
        }
        
        $dir2 = $directiorios['SubDirs'];
        foreach ($dir2 as $key => $SubDir) {
        $estructura = $FatherPath.$SubDir;

        echo $estructura."<br/>";

        if($estructura == ''){}else{
          $dir = opendir($this->PathUpload);
          if(!mkdir($estructura, 0777,true)){
            echo json_encode(['error'=>'Error Creando el Directorio:'.$SubDir]);
          }
         closedir($dir);                     
        }
      }           
 }

public function Show($json)
  {
      $Strutura =json_decode($json,true);
      
      header("Content-type:application/json");
      print_r($Strutura);      
  }

  public function uploadFile($f,$dir) {
    $file = new Upload($f); 
    if ($file->uploaded) {
       // save uploaded  no changes
       $file->Process($this->PathUpload.$dir);
       if ($file->processed) {
         echo json_encode(['messenge'=>'','susses'=>true]);
        } else {
          echo json_encode(['messenge'=>'Error Subiendo el Archivo','error'=>$file->error]);
       }
  }
 } 
}
//
$n = new UploaderDir("../uploads/device1");
if(isset($_GET['structure'])) {
    $n->crearDirs($_GET['structure'],false);
}
 if(isset($_FILES['file'])) {
 $n->uploadFile($_FILES['file'],$_POST['dir']);
}
?>