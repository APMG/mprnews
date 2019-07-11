# frozen_string_literal: true

# config valid for current version and patch releases of Capistrano
lock '~> 3.11.0'

set :application, 'mprnews'
set :deploy_to, web_home_path
set :repo_url,
    (
      ENV['CI_REPOSITORY_URL'] ||
      'git@gitlab.mpr.org:sites/v2-mpr-news.git'
    )

set :user, 'mprnews'
# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

namespace :deploy do
  desc 'restart pm2'
  task :restart do
    on roles(:app) do
      within deploy_path do
        execute :pm2, 'startOrGracefulReload', 'ecosystem.json'
        execute :pm2, :save
      end
    end
  end

  after :finished, :restart
end

namespace :npm do
  desc 'Run npm install'
  task :install do
    on roles(:app) do
      within release_path do
        execute :npm, 'cache clean --force'
        execute :npm, :install
        execute :npm, :run, :build
      end
    end
  end
  after 'deploy:published', 'npm:install'
end
