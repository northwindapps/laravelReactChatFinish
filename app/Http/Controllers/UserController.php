<?php

namespace App\Http\Controllers;
use App\User;
use Illuminate\Http\Request;

class UserController extends Controller
{

	public function sideBar(Request $request, User $user) {
    $allusers = $user->pluck('username');

    //$users = $allusers->orderBy('username', 'desc')->get();

    return response()->json([
      'users' => $allusers,
    ]);
  }

	public function index(User $user) {
		return view('userProfile', compact('user'));
	}

	public function follow(Request $request, User $user) {
		if ($request->user()->canFollow($user)) {
			$request->user()->following()->attach($user->id);
		}
		return redirect()->back();

	}

	public function unfollow(Request $request, User $user) {
		if ($request->user()->canUnFollow($user)) {
			$request->user()->following()->detach($user->id);
		}
		return redirect()->back();
	}

}
