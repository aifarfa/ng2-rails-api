require 'rails_helper'

RSpec.describe Product, type: :model do
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:sku) }

  describe 'default attributes' do
    before { @product = FactoryGirl.build(:product) }
    subject { @product }

    it { should be_valid }

    it 'has default avalable value' do
      expect(@product.available).to_not be_nil
    end
  end

end
