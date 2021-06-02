<?php

namespace App\Http\Controllers\master;

use App\Http\Controllers\BaseController;
use App\Services\SubareaService;
use Illuminate\Http\Request;

class SubareaController extends BaseController
{
    protected $_service;

    public function __construct(
        SubareaService $subareaService
    )
    {
        $this->_service = $subareaService;
    }

    public function viewData(Request $param)
    {
        $result = $this->_service->viewData($param->all());
        return $this->sendResponseView($result, 'Successfully.');
    }

    public function create(Request $request)
    {
        $result = $this->_service->create($request->all());

        if ($result) {
            return $this->sendResponse($result, 'Success create sub area');
        }

        return $this->sendError('Failed create sub area', $result, 400);
    }

    public function update(Request $request, $id)
    {
        $result = $this->_service->update($request->all(), $id);

        if ($result) {
            return $this->sendResponse($result, 'Success update sub area');
        }

        return $this->sendError('Failed update sub area', $result, 400);
    }

    public function delete(Request $request)
    {
        if ($request['type'] == 'permanent') {
            $result = $this->_service->delete($request['data']);            
        }else {
            $result = $this->_service->deactive($request['data']);     
        }

        if ($result) {
            return $this->sendResponse($result, 'Success delete sub area');
        }

        return $this->sendError('Failed delete sub area', $result, 400);
    }

    public function restore($id)
    {
        $result = $this->_service->restore($id);

        if ($result) {
            return $this->sendResponse($result, 'Success restore sub area');
        }

        return $this->sendError('Failed restore sub area', $result, 400);
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
