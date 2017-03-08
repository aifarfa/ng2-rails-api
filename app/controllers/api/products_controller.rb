class Api::ProductsController < ApplicationController

  def index
    products = Product.all
    render json: products, status: :ok
  end

  def show
    begin
      product = Product.find(params[:id])
      render json: product, status: :ok
    rescue ActiveRecord::RecordNotFound => e
      render json: { message: e.message }, status: :not_found 
    end
  end
end
