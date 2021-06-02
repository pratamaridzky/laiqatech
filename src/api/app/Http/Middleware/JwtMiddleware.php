<?php

namespace App\Http\Middleware;

use Closure;
use JWTAuth;
use Exception;
use Tymon\JWTAuth\Http\Middleware\BaseMiddleware;
 
class JwtMiddleware extends BaseMiddleware
{
    public function handle($request, Closure $next)
    {
        try {
            $user = JWTAuth::parseToken()->authenticate();
        } catch (Exception $e) {
            if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenInvalidException){
                return response()->json([
                    'data' => null,
                    'status' => false,
                    'err' => [
                        'message' => 'Token Invalid',
                        'code' => 1
                    ]
                ]);
            }else if ($e instanceof \Tymon\JWTAuth\Exceptions\TokenExpiredException){
                return response()->json([
                    'data' => null,
                    'status' => false,
                    'err' => [
                        'message' => 'Token Is Expired',
                        'code' => 1
                    ]
                    ], 401);
            }else{
                return response(401)->json([
                    'data' => null,
                    'status' => false,
                    'err' => [
                        'message' => 'Authorization Token not found',
                        'code' => 1
                    ]
                ]);
            }
        }
        return $next($request);
    }
}
