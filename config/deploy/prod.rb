# frozen_string_literal: true

apm_servers 'webnode', 'prod', user: 'apmpodcasts', roles: %i[app web db]
apm_env 'prod'
set :branch, 'prod'
