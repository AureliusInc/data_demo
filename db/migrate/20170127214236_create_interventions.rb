class CreateInterventions < ActiveRecord::Migration[5.0]
  def change
    create_table :interventions do |t|
      t.string :concern
      t.string :sub_concern
      t.string :where
      t.string :when
      t.string :frequency
      t.date :follow_up
      t.string :name
      t.text :goal
      t.boolean :occured
      t.boolean :working
      t.boolean :complete

      t.timestamps
    end
  end
end
