require 'awestruct/handlers/base_handler'

module Awestruct
  module Extensions
    # Awestrcut extension creating html pages with redirect directives.
    # Configuration via _config/redirects.yml
    class RedirectCreator

      def execute(site)
        if !site.redirects.nil?
          site.redirects.each do |requested_url, target_url|
            redirect_page = Page.new(site, Handlers::RedirectCreationHandler.new( site, requested_url, target_url ))
            # make sure indexifier is ignoring redirect pages
            redirect_page.inhibit_indexifier = true
            site.pages << redirect_page
          end
        end
      end
    end
  end

  module Handlers
    class RedirectCreationHandler < BaseHandler
      include Awestruct::Extensions::GoogleAnalytics

      def initialize(site, requested_url, target_url)
        super( site )
        @requested_url = requested_url
        @target_url = target_url
        @creation_time = Time.new
      end

      def simple_name
        File.basename( @requested_url, ".*" )
      end

      def output_filename
        simple_name + output_extension
      end

      def output_extension
        '.html'
      end

      def output_path
        if( File.extname( @requested_url ).empty?)
          File.join( File.dirname(@requested_url), simple_name, "index.html" )
        else
          File.join( File.dirname(@requested_url), output_filename )
        end
      end

      def content_syntax
        :text
      end

      def input_mtime(page)
        @creation_time
      end

      def rendered_content(context, with_layouts=true)
        %{<!DOCTYPE HTML>
<html>
<head>
<title>Redirection</title>
<meta charset="UTF-8">
<meta http-equiv="refresh" content="3; url=#{@target_url}">
#{google_analytics_universal}
<style>
body { background: #444; color: #00c2ff; }
a { text-decoration: underline; }
a:link { color: #fff; }
a:visited { color: #fff; }
</style>
</head>

<body>
<pre>
______________    ______________
||xxxxxxxxxx/  __  \\xxxxxxxxxx||
||            //\\\\            ||
||  |XXXXXXXXX(  )XXXXXXXXX|  ||   ALERT:  AGENT REDIRECTION REQUESTED
||  |X        \\\\//        X|  ||   ===================================
||  |X\\.       ^^       ./X|  ||
||    \\XX\\.          ./XX/    ||   REQUESTED URL: #{@requested_url}
||      ^\\XX\\./xx\\./XX/^      ||   -----------------------------------
||         ^\\XXXXXX/^         ||
||            |XX|            ||   NEW LOCATION:
||           (XXXX)           ||
||            |XX|            ||   => <a href='#{@target_url}'>#{@target_url}</a>
||            |XX|            ||
||      _____ |XX|            ||
||      |XXX| |XX|            ||   PLEASE STAND BY...
||      |X____|XX|            ||
\\\\\\     |XXXXXXXX|           ///   STAND BY...
  \\\\\\   ^\\XXXXXXX|         ///
    \\\\\\   ^\\| |XX|       ///       STAND BY...
      \\\\\\     |XX|     ///
        \\\\\\    \\/    ///
          \\\\\\      ///
            \\\\\\__///
              \\\\//
</pre>
<script>
ga('send', 'event', 'redirect', 'ga', {
  'page': '#{@requested_url}',
  'hitCallback': function() {
    window.location.href = "#{@target_url}";
  }
});
</script>
</body>
</html>
}
      end
    end
  end
end
