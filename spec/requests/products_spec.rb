require 'rails_helper'

RSpec.describe 'Products API', type: :request do
  # initialize test data
  let!(:products) { create_list(:product, 10) }
  let(:product_id) { products.first.id }

  describe 'GET /api/products' do
    # make HTTP get request before each example
    before { get '/api/products' }

    it 'returns products' do
      expect(json).not_to be_empty
      expect(json.size).to eq(10)
    end

    it 'returns status code 200' do
      expect(response).to have_http_status(200)
    end
  end

  describe 'GET /api/products/:id' do
    before { get "/api/products/#{product_id}" }

    context 'when the record exists' do
      it 'returns the product' do
        expect(json).not_to be_empty
        expect(json['id']).to eq(product_id)
      end

      it 'returns status code 200' do
        expect(response).to have_http_status(200)
      end
    end

    context 'when the record does not exist' do
      let(:product_id) { 100 }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'returns a not found message' do
        expect(response.body).to match(/Couldn't find Product/)
      end
    end
  end

  describe 'POST /api/products' do
    # valid payload
    let(:valid_attributes) { { name: 'Smart', sku: 'test-001', available: 0 } }

    context 'when the request is valid' do
      before { post '/api/products', params: valid_attributes }

      it 'creates a product' do
        expect(json['name']).to eq('Smart')
        expect(json['available']).to eq(0)
        expect(json['active']).to be_truthy
      end

      it 'save new record' do
        expect(Product.count).to eq(11)
      end

      it 'returns status code 201' do
        expect(response).to have_http_status(201)
      end
    end

    context 'when the request is invalid' do
      before { post '/api/products', params: { name: 'Foobar' } }

      it 'returns status code 422' do
        expect(response).to have_http_status(422)
      end

      it 'does not save invalid product' do
        expect(Product.count).to eq(10)
      end

      it 'returns a validation failure message' do
        expect(response.body).to match(/Validation failed/)
      end
    end
  end

  describe 'PUT /api/products/:id' do
    let(:valid_attributes) { { name: 'New Smart' } }

    context 'when the record exists' do
      before do
        @product = products.first
        put "/api/products/#{@product.id}", params: valid_attributes
      end

      it 'returns status code 204' do
        expect(response).to have_http_status(204)
        expect(response.body).to be_empty
      end

      it 'updates with valid_attributes' do
        @product.reload
        expect(@product['name']).to eq('New Smart')
      end
    end

    context 'when the record not exists' do
      before { put '/api/products/0', params: valid_attributes }

      it 'returns status code 404' do
        expect(response).to have_http_status(404)
      end

      it 'updates with valid_attributes' do
        expect(json['errors']).to match(/Couldn't find/)
      end
    end
  end
end
