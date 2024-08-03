<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
// use Ramsey\Uuid\Uuid;

class Attendance extends Model
{
    // use HasUlids;
    use HasFactory;

    protected $casts = [
        'created_at' => 'datetime:Y-m-d H:i:s'
    ];

    public $fillable = [
        'user_id', 'latitude', 'longitude', 'address', 'description', 'status', 'id'
    ];


    // public function newUniqueId()
    // {
    //     return (string) Uuid::uuid4();
    // }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
