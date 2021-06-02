<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BaseController extends Controller
{
    public function sendResponse($result, $message)
    {
        $response =[
            'title'   => 'Success',
            'data'    => $result,
            'message' => $message,
        ];
        return response()->json($response, 200);
    }

    public function sendError($error, $errorMessage = [], $code= 404)
    {
        $response = [
            'title' => "Failed",
            'message' => $error,
        ];

        if(!empty($errorMessage)){
            $response['data'] = $errorMessage;
        }
        return response()->json($response, $code);
    }

    public function sendResponseView($result, $message)
    {
        $data = $result->toArray();
        $response =[
            'success' => true,
            'message' => $message,
            'data' => $data['data'],
            'to'=>$data['to'],
            'total'=>$data['total']
        ];
        return response()->json($response, 200);
    }
}
