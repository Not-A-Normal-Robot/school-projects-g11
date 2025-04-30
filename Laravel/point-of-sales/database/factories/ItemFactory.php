<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Item>
 */
class ItemFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $userIds = Category::pluck('id')->toArray();
        return [
            'category_id' => $userIds ?
                fake()->randomElement($userIds) :
                Category::factory()->create()->id,
            'name' => fake()->word(),
            'price' => fake()->numberBetween(10000.0, 100000.0),
            'stock' => fake()->numberBetween(50, 500),
        ];
    }
}
