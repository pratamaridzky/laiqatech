<?php

namespace App\Http\Controllers\master;

use App\Http\Controllers\BaseController;
use App\Services\BrandService;
use Illuminate\Http\Request;

class BrandController extends BaseController
{
    protected $_service;

    public function __construct(
        BrandService $brandService
    )
    {
        $this->_service = $brandService;
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
}
