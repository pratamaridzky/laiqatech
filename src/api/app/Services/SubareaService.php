<?php
namespace App\Services;

use App\models\master\SubArea;
use Exception;
use DB;
use Illuminate\Support\Facades\Log;

class SubareaService{
  public function viewData($param)
  {
    try {
      $search = $param['search'];
      $limit = $param['limit'];
      
      $rs = SubArea::select('id', 'description', 'area_id', 'description', 'address', 'phone1', 'phone2', 'email', 'deleted_at', 'created_at')
                    ->withTrashed()
                    ->with(['area' => function($query){
                      $query->with(['companie']);
                    }])
                    ->where([ ['description',"like", "%{$search}%"] ])
                    ->paginate($limit);

      return $rs;
    } catch (Exception $e) {
      Log::error("SubareaService/viewData -> ".$e->getMessage().'; file -> '.$e->getFile().'; line -> '.$e->getLine());

      return false;
    }
  }

  public function create($data)
  {
    try {
      DB::beginTransaction();
      $rs = SubArea::create([
        'description'=>$data['description'],
        'area_id'=>$data['area_id'], 
        'address'=>$data['address'], 
        'phone1'=>$data['phone1'], 
        'phone2'=>$data['phone2'], 
        'email'=>$data['email']
      ]);
      DB::commit();

      return $rs;
    } catch (Exception $e) {
      Log::error("SubareaService/create -> ".$e->getMessage().'; file -> '.$e->getFile().'; line -> '.$e->getLine());
      DB::rollback();

      return false;
    }
  }

  public function update($data, $id)
  {
    try {
      DB::beginTransaction();
      $query = SubArea::findOrFail($id);   

      $query->description = $data['description']??$query->description;
      $query->area_id = $data['area_id']??$query->area_id;
      $query->address = $data['address']??$query->address;
      $query->phone1 = $data['phone1']??$query->phone1;
      $query->phone2 = $data['phone2']??$query->phone2;
      $query->email = $data['email']??$query->email;
      $query->save();
      $rs = SubArea::findOrFail($id); 

      DB::commit();

      return $rs;
    } catch (Exception $e) {
      Log::error("SubareaService/update -> ".$e->getMessage().'; file -> '.$e->getFile().'; line -> '.$e->getLine());
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
        $company = SubArea::withTrashed()->findOrFail($id);
        $rs = $company->forceDelete();
      }
      
      DB::commit();

      return $rs;
    } catch (Exception $e) {
      Log::error("SubAreaService/delete -> ".$e->getMessage().'; file -> '.$e->getFile().'; line -> '.$e->getLine());
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
        $company = SubArea::withTrashed()->findOrFail($id);
        // Log::channel('debug')->info($company);
        $rs = $company->delete();
      }
      
      DB::commit();

      return $rs;
    } catch (Exception $e) {
      Log::error("SubAreaService/delete -> ".$e->getMessage().'; file -> '.$e->getFile().'; line -> '.$e->getLine());
      DB::rollback();

      return false;
    }
  }

  public function restore($id)
  {
    try {
      DB::beginTransaction();
        $rs = SubArea::withTrashed()->findOrFail($id)->restore();
      DB::commit();

      return true;
    } catch (Exception $e) {
      Log::error("SubAreaService/restore -> ".$e->getMessage().'; file -> '.$e->getFile().'; line -> '.$e->getLine());
      DB::rollback();

      return false;
    }
  }

  public function loadData()
  {
    try {
      $rs = SubArea::all();
      
      return $rs;
    } catch (Exception $e) {
      Log::error("CompanyService/viewData -> ".$e->getMessage().'; file -> '.$e->getFile().'; line -> '.$e->getLine());

      return false;
    }
  }
}