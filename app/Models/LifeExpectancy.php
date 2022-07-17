<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LifeExpectancy extends Model
{
    use HasFactory;

    protected $fillable = ['country_name', 'country_code', 'year', 'life_expectancy'];
}
