<?php
namespace App\Services;

use DB;
use App\models\master\Brand;
use Illuminate\Support\Facades\Log;
use Exception;

class BrandService{
  public function create($data)
  {
    try {
      DB::beginTransaction();
      $rs = Brand::create([
        'description'=>$data['description'],
        'categorie_id'=>$data['categorie_id']
      ]);
      DB::commit();

      return $rs;
    } catch (Exception $e) {
      Log::error("BrandService/create -> ".$e->getMessage().'; file -> '.$e->getFile().'; line -> '.$e->getLine());
      DB::rollback();

      return false;
    }
  }

  public function update($data, $id)
  {
    try {
      DB::beginTransaction();
      $item = Brand::findOrFail($id);
      $item->description = $data['description'];
      $rs = $item->save();

      DB::commit();

      return $rs;
    } catch (Exception $e) {
      Log::error("BrandService/update -> ".$e->getMessage().'; file -> '.$e->getFile().'; line -> '.$e->getLine());
      DB::rollback();

      return false;
    }
  }

  public function viewData($param)
  {
    try {
      $search = $param['search'];
      $limit = $param['limit'];
      
      $rs = Brand::with(['categorie:id,description'])
                      ->select('id','description', 'categorie_id', 'name', 'deleted_at')
                      ->where('description', 'LIKE', "%{$search}%")
                      ->paginate($limit);
      
      return $rs;
    } catch (Exception $e) {
      Log::error("CompanyService/viewData -> ".$e->getMessage().'; file -> '.$e->getFile().'; line -> '.$e->getLine());

      return false;
    }
  }
}