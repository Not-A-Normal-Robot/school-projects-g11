<?php

namespace Database\Factories;

use App\Models\Item;
use App\Models\Transaction;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\TransactionDetail>
 */
class TransactionDetailFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $transIds = Transaction::pluck('id')->toArray();
        $items = Item::all()->toArray();
        /**
         * @var Item
         */
        $item = count($items) > 0 ?
            fake()->randomElement($items) :
            Item::factory()->createOne();
        $qty = fake()->numberBetween(0, min($item->stock, 100));
        return [
            'transaction_id' => $transIds ?
                fake()->randomElement($transIds) :
                Transaction::factory()->create()->id,
            'item_id' => $item->id,
            'qty' => $qty,
            'subtotal' => $qty * $item->price,
        ];
    }
}
