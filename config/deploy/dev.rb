# frozen_string_literal: true

apm_servers 'webnode', 'dev', user: 'mprnews', roles: %i[app web db]
apm_env 'dev'
set :branch, 'master'
