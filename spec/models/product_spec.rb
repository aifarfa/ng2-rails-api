require 'rails_helper'

RSpec.describe Product, type: :model do
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:sku) }

  describe 'default attributes' do
    before do
      @product = Product.create(name: 'Foo', sku: 'Bar')
    end

    subject { @product }

    it { should be_valid }

    it 'has set default active' do
      expect(@product.active).to be_truthy
    end

    it 'has set default available: 0' do
      expect(@product.available).to eq(0)
    end
  end
end
