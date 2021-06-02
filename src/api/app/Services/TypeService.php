<?php
namespace App\Services;

use App\models\master\Type;
use DB;
use Illuminate\Support\Facades\Log;
use Exception;

class TypeService{
  public function create($data)
  {
    try {
      DB::beginTransaction();
      $rs = Type::create([
        'description'=>$data['description'],
        'categorie_id'=>$data['categorie_id']
      ]);
      DB::commit();

      return $rs;
    } catch (Exception $e) {
      Log::error("TypeService/create -> ".$e->getMessage().'; file -> '.$e->getFile().'; line -> '.$e->getLine());
      DB::rollback();

      return false;
    }
  }

  public function update($data, $id)
  {
    try {
      DB::beginTransaction();
      $item = Type::findOrFail($id);
      $item->description = $data['description'];
      $rs = $item->save();

      DB::commit();

      return $rs;
    } catch (Exception $e) {
      Log::error("TypeService/update -> ".$e->getMessage().'; file -> '.$e->getFile().'; line -> '.$e->getLine());
      DB::rollback();

      return false;
    }
  }
}