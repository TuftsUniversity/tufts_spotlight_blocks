//= require spotlight/blocks/resources_block

SirTrevor.Blocks.FeaturedPages = (function(){

  return Spotlight.Block.Resources.extend({
    type: "featured_pages",

    icon_name: "pages",

    autocomplete_url: function() { return $(this.inner).closest('form[data-autocomplete-exhibit-feature-pages-path]').data('autocomplete-exhibit-feature-pages-path').replace("%25QUERY", "%QUERY"); },
    autocomplete_template: function() { return '<div class="autocomplete-item{{#unless published}} blacklight-private{{/unless}}">{{log "Look at me"}}{{log thumbnail_image_url}}{{#if thumbnail_image_url}}<div class="document-thumbnail thumbnail"><img src="{{thumbnail_image_url}}" /></div>{{/if}}<span class="autocomplete-title">{{title}}</span><br/><small>&nbsp;&nbsp;{{description}}</small></div>' },
    bloodhoundOptions: function() {
      return {
        prefetch: {
          url: this.autocomplete_url(),
          ttl: 0
        }
      };
    },


    /****** Tufts Customizations ******/

    sidebarBox: false, // The checkbox for whether sidebar shows or not.
    limit: 0, // How many feature pages can show?
    full: false, // Full on feature panels?
    acInput: false, // The autocomplete input element.
    acShowing: true, // Is the autocomplete showing?

    /**
     * Gets the limit, based on the sidebar.
     */
    setLimit: function() {
      if(this.sidebarBox === false) {
        this.sidebarBox = $('#home_page_display_sidebar');
      }

      this.limit = $(this.sidebarBox).is(':checked') ? 3 : 5;
    },

    /**
     * Hide or show the autocomplete input.
     */
    toggleAutocomplete: function() {
      if(this.full && this.acShowing) {
        this.acInput.hide();
        this.acShowing = false;
      } else if(!this.full && !this.acShowing) {
        this.acInput.show();
        this.acShowing = true;
      }
    },

    /**
     * Rechecks if block is full and hides/shows autocomplete.
     * Optionally resets limit too.
     *
     * @param {boolean} resetLimit
     *  Whether or not to reset the limit.
     */
    resetAc: function(resetLimit = false) {
      if(resetLimit) {
        this.setLimit();
      }
      this.full = ($('li.dd-item', this.inner).length >= this.limit);
      this.toggleAutocomplete();
    },

    /**
     * Overwrites Spotlight.Blocks.Resource::onBlockRender.
     * Shows/Hides the autocomplete box based on sidebar and number of panels.
     */
    onBlockRender: function() {
      SpotlightNestable.init($('[data-behavior="nestable"]', this.inner));
      $('[data-input-select-target]', this.inner).selectRelatedInput();

      this.acInput = $('span.twitter-typeahead', this.inner);
      this.resetAc(true);

      // If sidebar selection changes, reset autocomplete.
      $(this.sidebarBox).on("change", function() {
        this.resetAc(true);
      }.bind(this));
    },

    /**
     * Overwrites Spotlight.Blocks.Resource::afterPanelRender.
     * Shows/Hides the autocomplete box based on sidebar and number of panels.
     */
    afterPanelRender: function(data, panel) {
      // Don't run during page load. Wait until block is fully rendered.
      if(this.acInput) {
        // Code was firing before panel html was actually in the DOM.
        window.setTimeout(this.resetAc.bind(this), 100);
      }
    },

    /**
     * Overwrites Spotlight.Blocks.Resource::afterPanelDelete.
     */
    afterPanelDelete: function() {
      this.resetAc();
    },


  }); // End extend Spotlight.Block.Resources.
})();
