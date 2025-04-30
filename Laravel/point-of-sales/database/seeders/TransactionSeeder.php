<?php

namespace Database\Seeders;

use App\Models\Transaction;
use App\Models\TransactionDetail;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TransactionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Transaction::factory(12)->create();
        for ($i = 0; $i < 12; $i++) {
            $trans = Transaction::factory()->createOne();

            TransactionDetail::factory(fake()->numberBetween(1, 6))
                ->create([
                    'transaction_id' => $trans->user_id
                ]);
        }
    }
}
