require 'compass'
require 'bootstrap-sass'
require 'redirect_creator'
require 'haml/filters/textile'

Awestruct::Extensions::Pipeline.new do
  # extensions
  extension Awestruct::Extensions::RedirectCreator.new

  # helpers
  helper Awestruct::Extensions::GoogleAnalytics
end

