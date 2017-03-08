$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "tufts_spotlight_blocks/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "tufts_spotlight_blocks"
  s.version     = TuftsSpotlightBlocks::VERSION
  s.authors     = ["Travis Lilleberg"]
  s.email       = ["travis.lilleberg@tufts.edu"]
  s.homepage    = "https://github.com/TuftsUniversity/tufts_spotlight_blocks.git"
  s.summary     = "Sir Trevor Blocks and CSS for Tufts Spotlight."
  s.description = "Sir Trevor Blocks and CSS for Tufts Spotlight."
  s.license     = "MIT"

  s.files = Dir["{app,config,db,lib}/**/*", "MIT-LICENSE", "Rakefile", "README.md"]

  s.add_dependency "rails", "~> 4.2"

  s.add_development_dependency 'rspec-rails'
  s.add_development_dependency 'capybara'
  s.add_development_dependency 'factory_girl_rails'

  s.add_development_dependency 'sir_trevor_rails'

  s.test_files = Dir["spec/**/*"]
end
