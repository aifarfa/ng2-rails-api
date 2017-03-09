class Api::ProductsController < ApplicationController
  def index
    products = Product.all
    render json: products, status: :ok
  end

  def show
    product = Product.find(params[:id])
    render json: product, status: :ok
  end

  def create
    product = Product.create!(product_params)
    render json: product, status: :created
  end

  def update
    product = Product.find(params[:id])
    product.update(product_params)
  end

  protected

  def product_params
    params.permit(:name, :sku, :available, :active)
  end
end
