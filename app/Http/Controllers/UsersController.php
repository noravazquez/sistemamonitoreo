<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\Models\Role;

class UsersController extends Controller
{
    public function __construct()
    {
        $this->middleware('can:users.index')->only('index');
        $this->middleware('can:users.edit')->only('edit');
        $this->middleware('can:users.update')->only('update');
        $this->middleware('can:users.destroy')->only('destroy');
    }

    public function index()
    {
        $users = User::with('roles')->get();
        return view('monitoreo.users.index', compact('users'));
    }

    public function edit(User $user)
    {
        $roles = Role::all();
        $role = $user->roles;
        return view('monitoreo.users.edit', compact('user', 'roles', 'role'));
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'role_id' => 'required'
        ],[
            'role_id.required' => 'Por favor seleccione un rol'
        ]);

        DB::table('model_has_roles')
            ->where('model_id', $user->id)
            ->update(['role_id' => $request->role_id]);

        return redirect()->route('users.index')->with('success', 'Rol cambiado');
    }

    public function destroy(User $user)
    {
        DB::table('model_has_roles')->where('model_id', $user->id)->delete();
        DB::table('topic_user')->where('user_id', $user->id)->delete();
        $user->delete();
        return redirect()->route("users.index")->with('success', 'El usuario fue borrado exitosamente.');
    }
}
