Rails.application.routes.draw do
  root to: 'home#index'
  resources :home, only: :index
  resources :attendance, only: :index
  resources :talent_management_applicants, only: :index
end
