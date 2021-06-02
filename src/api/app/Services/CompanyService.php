<?php
namespace App\Services;

use App\models\master\Companie;
use Exception;
use DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class CompanyService
{
  public function viewData($param)
  {
    try {
      $search = $param['search'];
      $limit = $param['limit'];

      $rs = Companie::select('id','description', 'code', 'deleted_at', 'created_at')
                      ->withTrashed()
                      ->where('description', 'LIKE', "%{$search}%")
                      ->orWhere('code', 'LIKE', "%{$search}%")
                      ->orderBy('id', 'desc')
                      ->paginate($limit);
      
      return $rs;
    } catch (Exception $e) {
      Log::error("CompanyService/viewData -> ".$e->getMessage().'; file -> '.$e->getFile().'; line -> '.$e->getLine());

      return false;
    }
  }
  
  public function create($data)
  {
    try {
      DB::beginTransaction();
      $rs = Companie::create([
        'code'=> Str::upper($data['code']),
        'description'=>$data['description']
      ]);
      DB::commit();

      return true;
    } catch (Exception $e) {
      Log::error("CompanyService/create -> ".$e->getMessage().'; file -> '.$e->getFile().'; line -> '.$e->getLine());
      DB::rollback();

      return false;
    }
  }

  public function update($data, $id)
  {
    try {
      DB::beginTransaction();
      $company = Companie::findOrFail($id);
      $company->description = $data['description'];
      $rs = $company->save();

      DB::commit();

      return $rs;
    } catch (Exception $e) {
      Log::error("CompanyService/update -> ".$e->getMessage().'; file -> '.$e->getFile().'; line -> '.$e->getLine());
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
        $company = Companie::withTrashed()->findOrFail($id);
        $rs = $company->forceDelete();
      }
      
      DB::commit();

      return $rs;
    } catch (Exception $e) {
      Log::error("CompanyService/delete -> ".$e->getMessage().'; file -> '.$e->getFile().'; line -> '.$e->getLine());
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
        $company = Companie::withTrashed()->findOrFail($id);
        // Log::channel('debug')->info($company);
        $rs = $company->delete();
      }
      
      DB::commit();

      return $rs;
    } catch (Exception $e) {
      Log::error("CompanyService/delete -> ".$e->getMessage().'; file -> '.$e->getFile().'; line -> '.$e->getLine());
      DB::rollback();

      return false;
    }
  }

  public function restore($id)
  {
    try {
      DB::beginTransaction();
        $rs = Companie::withTrashed()->findOrFail($id)->restore();
      DB::commit();

      return true;
    } catch (Exception $e) {
      Log::error("CompanyService/restore -> ".$e->getMessage().'; file -> '.$e->getFile().'; line -> '.$e->getLine());
      DB::rollback();

      return false;
    }
  }

  public function loadData()
  {
    try {
      $rs = Companie::all();
      
      return $rs;
    } catch (Exception $e) {
      Log::error("CompanyService/viewData -> ".$e->getMessage().'; file -> '.$e->getFile().'; line -> '.$e->getLine());

      return false;
    }
  }

}