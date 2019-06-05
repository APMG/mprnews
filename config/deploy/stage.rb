# frozen_string_literal: true

apm_servers 'webnode', 'stage', user: 'apmpodcasts', roles: %i[app web db]
apm_env 'stage'
set :branch, 'stage'
