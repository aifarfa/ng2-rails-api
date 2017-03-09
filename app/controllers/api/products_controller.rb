class Api::ProductsController < ApplicationController
  def index
    products = Product.all
    render json: products, status: :ok
  end

  def show
    product = Product.find(params[:id])
    render json: product, status: :ok
  rescue ActiveRecord::RecordNotFound => e
    render json: { errors: e.message }, status: :not_found
  end

  def create
    product = Product.create!(product_params)
    render json: product, status: :created
  rescue ActiveRecord::RecordInvalid => e
    render json: { errors: e.message }, status: :unprocessable_entity
  end

  protected

  def product_params
    params.permit(:name, :sku, :available)
  end
end
