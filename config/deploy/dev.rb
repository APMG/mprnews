# frozen_string_literal: true

server 'webnode', user: 'mprnews', roles: %i[app web db]
apm_env 'dev'
set :branch, 'master'
