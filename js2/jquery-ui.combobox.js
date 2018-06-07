$.widget( "lodestar.combobox", {
      _create: function() {
        this.is_select = false;

        this.wrapper = $( "<span>" )
          .addClass( "lodestar-combobox" );
        if(this.element.is('select')){
          this.wrapper.insertAfter( this.element );
          this.element.hide();
          this.is_select = true;
        }
        else{
          this.default_text = this.element.text();
          this.element.text("");
          this.wrapper.appendTo(this.element);
        }
        
        this._createAutocomplete();
        this._createShowAllButton();
      },
      options:{
        custom_input : true,
        source : {},
        changeComplete:function(event,ui){

        }
      }, 
      _createAutocomplete: function() {
        var value = "";
        if(this.is_select){
          var selected = this.element.children( ":selected" );
          value = selected.val() ? selected.text() : "";
        }
        else{
          value = this.default_text;
        }
 
        this.input = $( "<input>" )
          .appendTo( this.wrapper )
          .val( value )
          .attr( "title", "" )
          .addClass( "lodestar-combobox-input ui-widget ui-widget-content ui-state-default ui-corner-left" )
          .autocomplete({
            delay: 0,
            minLength: 0,
            source: $.proxy( this, "_source" ),
          })
          .tooltip({
            classes: {
              "ui-tooltip": "ui-state-highlight"
            }
          });
        if(this.is_select){
          this._on( this.input, {
            autocompleteselect: function( event, ui ) {
              ui.item.option.selected = true;
              this._trigger( "select", event, {
                item: ui.item.option
              });
            },
            autocompletechange: "_autoCompleteChange"
          });
         }
        else{
          this._on( this.input, {
            autocompleteselect: function( event, ui ) {
              this._trigger( "select", event, {
                item: ui.item.option
              });
            },
            autocompletechange: "_autoCompleteChange"
          });
        }
      },

      _createShowAllButton: function() {
        var input = this.input,
          wasOpen = false;
 
        $( "<a>" )
          .attr( "tabIndex", -1 )
          .attr( "title", "Show All Items" )
          .appendTo( this.wrapper )
          .button({
            icons: {
              primary: "ui-icon-triangle-1-s"
            },
            text: false
          })
          .removeClass( "ui-corner-all" )
          .addClass( "lodestar-combobox-toggle ui-corner-right" )
          .on( "mousedown", function() {
            wasOpen = input.autocomplete( "widget" ).is( ":visible" );
          })
          .on( "click", function() {
            input.trigger( "focus" );
 
            // Close if already visible
            if ( wasOpen ) {
              return;
            }
 
            // Pass empty string as value to search for, displaying all results
            input.autocomplete( "search", "" );
          });
      },
 
      _source: function( request, response ) {
        var matching_options = this.is_select?this.element.children( "option" ):this.options.source;
        var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
        var self = this;
        response( $.map(matching_options,function(name,value) {
          var text = self.is_select?$( this ).text():name;
          var val = self.is_select?$( this ).text():value;
          if ( text && val && ( !request.term || matcher.test(text) ) ){
            var return_obj = {label: text,
              value: val
            };
            if(self.is_select) return_obj.option = this;
            return return_obj;
          } 
        }));
      },
      _autoCompleteChange: function(event, ui){
        this._removeIfInvalid(event,ui);
        this._trigger('changeComplete',event,ui);
      },
      _removeIfInvalid: function( event, ui ) {
        // Selected an item, nothing to do
        if ( ui.item ) {
          return;
        }
 
        // Search for a match (case-insensitive)
        var value = this.input.val(),
          valueLowerCase = value.toLowerCase(),
          valid = false;
        this.element.children( "option" ).each(function() {
          if ( $( this ).text().toLowerCase() === valueLowerCase ) {
            this.selected = valid = true;
            return false;
          }
        });
 
        // Found a match, nothing to do
        if ( valid || this.options.custom_input) {
          return;
        }
 
        // Remove invalid value
        this.input
          .val( "" )
          .attr( "title", value + " didn't match any item" )
          .tooltip( "open" );
        this.element.val( "" );
        this._delay(function() {
          this.input.tooltip( "close" ).attr( "title", "" );
        }, 2500 );
        this.input.autocomplete( "instance" ).term = "";
      },
 
      _destroy: function() {
        if(!this.is_select) this.element.text(this.input.val());
        this.wrapper.remove();
        this.element.show();
      }
    });

//@ sourceURL=jquery-ui.combobox.js