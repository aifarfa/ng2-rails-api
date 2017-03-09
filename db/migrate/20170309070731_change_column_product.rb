class ChangeColumnProduct < ActiveRecord::Migration[5.0]
  def up
    change_column_default(:products, :active, true)
    change_column_null(:products, :active, true)
  end

  def down
    change_column_null(:products, :active, false, true)
  end
end
