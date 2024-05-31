<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Ramsey\Uuid\Uuid;

class Attendance extends Model
{
    use HasUlids;
    use HasFactory;
    
    public $fillable = [
        'user_id', 'latitude', 'longitude',
    ];


    public function newUniqueId()
    {
        return (string) Uuid::uuid4();
    }

}
