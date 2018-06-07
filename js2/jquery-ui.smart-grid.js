$.widget( "lodestar.smartgrid", {
    options: {
        row_count: 0,
        row_selector : '.row',
        cellChange: function(event,data){
        },
        rowAddComplete: function(event,data){
        },
        rowRemoveComplete: function(event,data){
        },
        gridChange: function(event,data){
        }
    },
    _create: function() {
        this.element.addClass( "smart-grid" );
    },
    _setOption: function( key, value ) {
        this._super( key, value );
    },
    _setOptions: function( options ) {
        this._super( options );
    },
    pushRow: function(smart_grid_row,options){
        smart_grid_row.init(options);
        this.children_rows.push(smart_grid_row);
        this.options.row_count += 1;
        this._trigger('rowAddComplete',null,{smart_grid_row:smart_grid_row});
    },
    getCell: function(row_index,col_index){
        return this.children_rows[row_index].getCell(col_index);
    },
    getColumn: function(col_index){
        var cell_arr = [];
        $.each(this.children_rows,function(index,smart_row){
            cell_arr.push(smart_row.getCell(col_index));
        });
        return cell_arr;
    },
    getRow: function(row_index){
        return this.children_rows[row_index];
    },
    getAllRows: function(){
        return this.children_rows;
    },
    _triggerRowChange: function(){

    },
    _updateSmartRows: function(){
        $.each(this.children_rows,function(index,smart_row){
            smart_row.rowUpdate({row_index:index});
        });
    },
    removeRow: function(row_index){
        this.children_rows.splice(row_index,1);
        this.options.row_count -= 1;
        this._updateSmartRows();
        this._trigger('gridChange',null,{});
        this._trigger('rowRemoveComplete',null,{});
    },
    insertRow: function(row_index,row){
        var smart_grid_row = new this._smartGridRow($(row),this);
        var row_options = {data:$(row).data(),
        row_number:row_index};
        smart_grid_row.init(row_options);
        this.children_rows.splice(row_index,0,smart_grid_row);
        this.options.row_count += 1;
        this._updateSmartRows();
        this._trigger('rowAddComplete',null,{smart_grid_row:smart_grid_row});
        return smart_grid_row;
    },
    _init : function(){
        this.children_rows = [];
        var self = this;
        this.element.find('> '+this.options.row_selector).each(function(index,row){
            var smart_grid_row = new self._smartGridRow($(row),self);
            var row_options = {data:$(row).data(),
                row_number:index};
            self.pushRow(smart_grid_row,row_options);
        });
    },
    _destroy: function() {
        this.element.removeClass( "smart-grid" );
    },
    _smartGridRow: function($row_element,plugin){
        var element = $row_element;
        element.data('smartGridRow',this);
        var children_cells = [];
        var defaults = {
            row_number : 0,
            children_cell_selector : '[class^=col-]',
            cell_count : 0,
            rowObjectData : {},
            data:{},
            initComplete : function(){

            }
        };
        var settings = {};
        var _setOptions = function(options){
            settings = $.extend({},settings,options);
        };
        var _pushSmartCell = function($smart_grid_cell){

        };
        var _pushCell = function($cell,cell_options){
            var smart_grid_cell = new plugin._smartGridCell($cell,plugin);
            smart_grid_cell.init(cell_options);
            children_cells.push(smart_grid_cell);
            settings.cell_count += 1;
        };
        this.getCell = function(cell_index){
            return children_cells[cell_index];
        };
        this.getRowObjectData = function(){
            return settings.rowObjectData;
        };
         this.getRowIndex = function(){
            return settings.row_number;
        };
        this.getElement = function(){
            return element;
        };
        this.setOptions = function(options){
            _setOptions(options);
        };
        this.init = function(options,cell_options){
            settings = defaults;
            element.addClass('smart-grid-row');
            _setOptions(options);
            var cell_defaults = {};
            $(element).find('> '+settings.children_cell_selector).each(function(index,cell){
                var c_options = $.extend({},cell_defaults,cell_options);
                c_options.row_number = settings.row_number;
                c_options.col_number = index;
                _pushCell($(cell),c_options);
            });
            return this;
        };
        this.rowUpdate = function(data){
            settings.row_number = data.row_index;
            $.each(children_cells,function(index,smart_grid_cell){
                smart_grid_cell.calcCell();
                smart_grid_cell.setOptions({row_number:settings.row_number});
            });
        };
    },
    _smartGridCell: function($cell_element,plugin){
        var element = $cell_element;
        element.data('smartGridCell',this);
        var parent_smart_row = {};
        var defaults = {
            col_number : 0,
            row_number : 0,
            display_value: '0',
            value : '',
            type : 'string',
            cell_data_value_selector : 'baseText',
            processFormula: function(parent_smart_cell,plugin){
                
            },
            updateText: function(){
                $(element).text(settings.display_value).change();
            }
        };
        var settings = {};
        var _setOptions = function(options){
            if(!options.value && options.value !== 0 && element.data()[settings.cell_data_value_selector]){
                options.value = element.data()[settings.cell_data_value_selector];
                options.display_value = element.text();
            }
            settings = $.extend({},settings,options);
            typeCheck();
        };
         var typeCheck = function(){
            if(!isNaN(settings.value)){
                if(settings.type !== 'formula') settings.type = 'number';
                settings.value = parseFloat(settings.value);
            }
        };
        var standardFormulas = {
            sumColumn:function(parent_smart_cell,plugin){
                var cell_arr = plugin.getColumn(1);
                var cell_value = 0;
                $.each(cell_arr,function(index,smart_cell){
                    if(smart_cell !== undefined && smart_cell.getRowIndex() !== parent_smart_cell.getRowIndex()){
                        cell_value += smart_cell.getValue();
                    }
                });
                parent_smart_cell.setOptions({value:cell_value});
            }
        };        
        this.setOptions = function(options){
            _setOptions(options);
        };
        this.getValue = function(){
            return settings.value;
        };
         this.getElement = function(){
            return element;
        };
        this.getRowIndex = function(){
            return settings.row_number;
        };
        this.getColIndex = function(){
            return settings.col_number;
        };
        this.calcCell = function(){
            if(settings.type === 'formula'){
                settings.processFormula(this,plugin);
            }
            settings.display_value = settings.value;
            settings.updateText();
            plugin._trigger('cellChange',null,{new_value:settings.value});
        };
        this.init = function(options){
            settings = defaults;
            _setOptions(options);
            return this;
        };
    }
});
//@ sourceURL=jquery-ui.smart-grid.js