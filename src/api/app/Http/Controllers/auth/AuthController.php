<?php

namespace App\Http\Controllers\auth;

use App\Http\Controllers\BaseController;
use App\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthController extends BaseController
{
    public function login(Request $request)
    {
        try {
            $credentials = $request->only('username', 'password');

            $customPayload = User::select('name', 'group')
                ->where('username', $credentials['username'])
                ->first()
            ;

            if (!$token = JWTAuth::attempt($credentials)) {
                throw new Exception('invalid_credentials');
            }

            $token = JWTAuth::claims(['data' => $customPayload])->attempt($credentials);
            $data['token'] = $token;

            return $this->sendResponse($data, 'Login successfully.');
        } catch (Exception $e) {
            $message = $e->getMessage();
            $code = 401;
        } catch (JWTException $e) {
            $message = 'Could not create token';
            $code = 500;
        }

        return $this->sendError('Login failed', $message, $code);
    }

    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);

        if ($validator->fails()) {
            return $this->sendError('Validation Error.', $validator->errors(), 400);
        }

        $user = User::create([
            'name' => $request->get('name'),
            'username' => $request->get('username'),
            'group' => 1,
            'password' => Hash::make($request->get('password')),
        ]);

        $data['user'] = $user;
        $data['token'] = JWTAuth::fromUser($user);

        return $this->sendResponse($data, 'User register successfully.');
    }

    public function refresh()
    {
        try {
            $data['token'] = auth()->refresh();
            $result = $this->sendResponse($data, 'Refresh token successfully.');
        } catch (Exception $e) {
            $result = $this->sendError('Refresh token failed', $e->getMessage(), 400);
        } catch (JWTException $e) {
            $result = $this->sendError('Refresh token failed', $e->getMessage(), 500);
        }

        return $result;
    }

    public function getAuthenticatedUser()
    {
        try {
            if (!$user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }
        } catch (TokenExpiredException $e) {
            return response()->json(['token_expired'], $e->getStatusCode());
        } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['token_invalid'], $e->getStatusCode());
        } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['token_absent'], $e->getStatusCode());
        }

        return response()->json(compact('user'));
    }

    public function logout()
    {
        try {
            auth()->logout();
            $result = $this->sendResponse('', 'Logged out successfully.');
        } catch (Exception $e) {
            $result = $this->sendError('Logged out failed', $e->getMessage(), 400);
        } catch (JWTException $e) {
            $result = $this->sendError('Logged out failed', $e->getMessage(), 500);
        }

        return $result;
    }
}
