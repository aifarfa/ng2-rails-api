Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root controller: 'static', action: '/'

  namespace :api do
    resources :products, only: [:index, :show, :create, :update]
  end

  get '*other', to: 'static#index'
end
