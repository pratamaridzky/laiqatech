<?php
namespace App\Services;

use App\Models\master\Area;
use Exception;
use DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class AreaService
{
  public function viewData($param)
  {
    try {
      $search = $param['search'];
      $limit = $param['limit'];

      $rs = Area::withTrashed()
                    ->select('id','companie_id', 'name', 'description', 'created_at', 'deleted_at')
                    ->with(['companie:id,description'])
                    ->where('description', 'LIKE', "%{$search}%")
                    ->orWhere('name', 'LIKE', "%{$search}%")
                    ->orderBy('id', 'desc')
                    ->paginate($limit);
      
      return $rs;
    } catch (Exception $e) {
      Log::error("AreaService/viewData -> ".$e->getMessage().'; file -> '.$e->getFile().'; line -> '.$e->getLine());

      return false;
    }
  }
  
  public function create($data)
  {
    try {
      DB::beginTransaction();
      $rs = Area::create([
        'name'=> $data['name'],
        'companie_id'=> $data['companie_id'],
        'description'=>$data['description']
      ]);
      DB::commit();

      return true;
    } catch (Exception $e) {
      Log::error("AreaService/create -> ".$e->getMessage().'; file -> '.$e->getFile().'; line -> '.$e->getLine());
      DB::rollback();

      return false;
    }
  }

  public function update($data, $id)
  {
    try {
      DB::beginTransaction();
      $item = Area::findOrFail($id);
      $item->companie_id = $data['companie_id'];
      $item->name = $data['name'];
      $item->description = $data['description'];
      $rs = $item->save();

      DB::commit();

      return $rs;
    } catch (Exception $e) {
      Log::error("AreaService/update -> ".$e->getMessage().'; file -> '.$e->getFile().'; line -> '.$e->getLine());
      DB::rollback();

      return false;
    }
  }

  public function delete($data)
  {
    try {
      DB::beginTransaction();

      for ($i=0; $i < count($data); $i++) { 
        $id = $data[$i];
        $company = Area::withTrashed()->findOrFail($id);
        $rs = $company->forceDelete();
      }
      
      DB::commit();

      return $rs;
    } catch (Exception $e) {
      Log::error("AreaService/delete -> ".$e->getMessage().'; file -> '.$e->getFile().'; line -> '.$e->getLine());
      DB::rollback();

      return false;
    }
  }

  public function deactive($data)
  {
    try {
      DB::beginTransaction();

      for ($i=0; $i < count($data); $i++) { 
        $id = $data[$i];
        $company = Area::withTrashed()->findOrFail($id);
        // Log::channel('debug')->info($company);
        $rs = $company->delete();
      }
      
      DB::commit();

      return $rs;
    } catch (Exception $e) {
      Log::error("AreaService/delete -> ".$e->getMessage().'; file -> '.$e->getFile().'; line -> '.$e->getLine());
      DB::rollback();

      return false;
    }
  }

  public function restore($id)
  {
    try {
      DB::beginTransaction();
        $company = Area::withTrashed()->findOrFail($id)->restore();
      DB::commit();

      return true;
    } catch (Exception $e) {
      Log::error("AreaService/restore -> ".$e->getMessage().'; file -> '.$e->getFile().'; line -> '.$e->getLine());
      DB::rollback();

      return false;
    }
  }

  public function loadData($id)
  {
    try {
      $rs = Area::where('companie_id', $id)->get();
      
      return $rs;
    } catch (Exception $e) {
      Log::error("AreaService/viewData -> ".$e->getMessage().'; file -> '.$e->getFile().'; line -> '.$e->getLine());

      return false;
    }
  }
}