require 'bootstrap-sass'
require 'haml/filters/textile'

Awestruct::Extensions::Pipeline.new do
  # extensions
  # extension Awestruct::Extensions::Posts.new( '/news' ) 

  # helpers
  helper Awestruct::Extensions::GoogleAnalytics
end

