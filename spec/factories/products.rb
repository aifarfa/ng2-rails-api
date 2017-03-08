FactoryGirl.define do
  factory :product do
    name { Faker::Lorem.word }
    sku { Faker::Lorem.word }
    available { Faker::Number.between(0, 10000) }
    active true
  end
end
