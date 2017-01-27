Rails.application.routes.draw do
  resources :interventions
  root to: 'home#index'
  resources :home, only: :index
  resources :attendance, only: :index
  resources :talent_management_applicants, only: :index
end
