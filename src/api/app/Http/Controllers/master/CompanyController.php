<?php

namespace App\Http\Controllers\master;

use App\Http\Controllers\BaseController;
use App\models\master\Companie;
use Illuminate\Http\Request;

class CompanyController extends BaseController
{
    public function __construct()
    {
        $this->middleware('api')->except('index');
    }

    public function index()
    {
        $data = Companie::all();
        return $this->sendResponse($data, 'successfully.');
    }
}
