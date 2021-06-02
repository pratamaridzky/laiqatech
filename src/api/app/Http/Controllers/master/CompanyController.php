<?php

namespace App\Http\Controllers\master;

use App\Http\Controllers\BaseController;
use App\Services\CompanyService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CompanyController extends BaseController
{
    protected $_service;
    public function __construct(CompanyService $companyService)
    {
        $this->_service = $companyService;
    }

    public function viewData(Request $param)
    {
        $result = $this->_service->viewData($param->all());
        if ($result) {
            // return response()->json($result, 200);
            return $this->sendResponseView($result, 'Successfully.');
        }
        else {
            return $this->sendError('Failed.', $result, 400);;
        }
    }

    public function create(Request $request)
    {
        $result = $this->_service->create($request->all());
        if ($result) {
            return $this->sendResponse($result, 'Success create company');
        }

        return $this->sendError('Failed create company', $result, 400);
    }

    public function update(Request $request, $id)
    {
        $result = $this->_service->update($request->all(), $id);

        if ($result) {
            return $this->sendResponse($result, 'Success update company');
        }

        return $this->sendError('Failed update company', $result, 400);
    }

    public function delete(Request $request)
    {

        if ($request['type'] == 'permanent') {
            $result = $this->_service->delete($request['data']);            
        }else {
            $result = $this->_service->deactive($request['data']);     
        }

        if ($result) {
            return $this->sendResponse($result, 'Success delete company');
        }

        return $this->sendError('Failed delete company', $result, 400);
    }

    public function restore($id)
    {
        $result = $this->_service->restore($id);

        if ($result) {
            return $this->sendResponse($result, 'Success restore company');
        }

        return $this->sendError('Failed restore company', $result, 400);
    }

    public function loadData()
    {
        $result = $this->_service->loadData();
        if ($result) {
            return response()->json($result, 200);
        }
        else {
            return $this->sendError('Failed.', $result, 400);;
        }
    }
}