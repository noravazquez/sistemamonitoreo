<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $role1 = Role::create(['name'=>'Administrador']);
        $role2 = Role::create(['name'=>'Normal']);
        $role3 = Role::create(['name'=>'Invitado']);

        Permission::create(['name'=>'home'])->syncRoles([$role1, $role2, $role3]);
        Permission::create(['name'=>'grafica'])->syncRoles([$role1, $role2]);
        Permission::create(['name'=>'selectTopics'])->syncRoles([$role1, $role2]);
        Permission::create(['name'=>'selectConfigurations'])->syncRoles([$role1, $role2]);
        Permission::create(['name'=>'configurationMqtt'])->syncRoles([$role1, $role2]);
        Permission::create(['name'=>'topics.index'])->syncRoles([$role1, $role2]);
        Permission::create(['name'=>'topics.create'])->syncRoles([$role1, $role2]);
        Permission::create(['name'=>'topics.store'])->syncRoles([$role1, $role2]);
        Permission::create(['name'=>'topics.edit'])->syncRoles([$role1, $role2]);
        Permission::create(['name'=>'topics.update'])->syncRoles([$role1, $role2]);
        Permission::create(['name'=>'topics.destroy'])->syncRoles([$role1, $role2]);
        Permission::create(['name'=>'configurations.index'])->assignRole($role1);
        Permission::create(['name'=>'configurations.create'])->assignRole($role1);
        Permission::create(['name'=>'configurations.store'])->assignRole($role1);
        Permission::create(['name'=>'configurations.edit'])->assignRole($role1);
        Permission::create(['name'=>'configurations.update'])->assignRole($role1);
        Permission::create(['name'=>'configurations.destroy'])->assignRole($role1);
        Permission::create(['name'=>'users.index'])->assignRole($role1);
        Permission::create(['name'=>'users.edit'])->assignRole($role1);
        Permission::create(['name'=>'users.update'])->assignRole($role1);
        Permission::create(['name'=>'users.destroy'])->assignRole($role1);
        Permission::create(['name'=>'exportdata'])->syncRoles([$role1, $role2]);
        Permission::create(['name'=>'datatopic'])->syncRoles([$role1, $role2]);
        Permission::create(['name'=>'save'])->syncRoles([$role1, $role2]);
        Permission::create(['name'=>'topic'])->syncRoles([$role1, $role2]);
        Permission::create(['name'=>'addUsers'])->syncRoles([$role1, $role2]);
        Permission::create(['name'=>'selectUsers'])->syncRoles([$role1, $role2]);
        Permission::create(['name'=>'saveUsers'])->syncRoles([$role1, $role2]);
        Permission::create(['name'=>'deleteUsers'])->syncRoles([$role1, $role2]);
        Permission::create(['name'=>'filterData'])->syncRoles([$role1, $role2]);
    }
}
