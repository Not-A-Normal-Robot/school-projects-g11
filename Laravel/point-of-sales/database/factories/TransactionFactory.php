<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $userIds = User::pluck('id')->toArray();
        return [
            'user_id' => $userIds ?
                fake()->randomElement($userIds) :
                User::factory()->create()->id,
            'date' => fake()->dateTimeBetween('-1 month'),
            'total' => fake()->numberBetween(200000.0, 500000.0),
            'pay_total' => fake()->numberBetween(200000.0, 500000.0),
        ];
    }
}
