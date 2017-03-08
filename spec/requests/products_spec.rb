require 'rails_helper'

RSpec.describe 'Products API', type: :request do
  # initialize test data
  let!(:products) { create_list(:product, 10) }
  let(:product_id) { products.first.id }

  describe 'GET /api/products' do
    # make HTTP get request before each example
    before { get '/api/products' }

    it 'returns products' do
      json = JSON.parse(response.body)
      expect(json).not_to be_empty
      expect(json.size).to eq(10)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end
end
