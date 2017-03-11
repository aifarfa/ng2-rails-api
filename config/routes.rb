Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # root controller: 'static', action: '/'
  root controller: 'static', action: '/public/index.html'
  
  namespace :api do
    resources :products, only: [:index, :show, :create, :update]
  end
end
