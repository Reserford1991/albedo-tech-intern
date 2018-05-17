<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateMembersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('members', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->string('surname');
            $table->integer('birthdate');
            $table->text('report');
            $table->string('country');
            $table->string('phone');
            $table->string('mail');
            $table->string('company')->default(null);
            $table->string('position')->default(null);
            $table->text('about')->default(null);
            $table->string('photo')->default(null);
            $table->boolean('hidden')->default(false);
            $table->integer('created_at');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('members');
    }
}
