class ApplicationController < ActionController::API
  rescue_from ActiveRecord::RecordInvalid, with: :reply_errors
  rescue_from ActiveRecord::RecordNotFound, with: :reply_notfound

  protected

  def reply_errors(exception)
    render json: { message: exception.message }, status: :unprocessable_entity
  end

  def reply_notfound(exception)
    render json: { message: exception.message }, status: :not_found
  end
end
