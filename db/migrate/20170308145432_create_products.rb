class CreateProducts < ActiveRecord::Migration[5.0]
  def change
    create_table :products do |t|
      t.string :name
      t.string :sku
      t.integer :available
      t.boolean :active

      t.timestamps
    end
  end
end
