define('waresys/lib/vue_modal/vue_modal',function(require,exports,module){
    var tpl = require('waresys/lib/vue_modal/vue_modal.tpl');

    var component = {
        template:tpl,
        props:{
            config:{
                default:function(){
                    return {}
                },
                type:Object
            }  
        },
        methods:{
            show:function(){
                $(this.$el).modal('show')
            },
            hide:function(){
                $(this.$el).modal('hide')
            }
        },
        mounted:function(){
            var self = this;
            $(this.$el).on('shown.bs.modal',function(){
                self.$emit('modal_shown',{})
            });
            $(this.$el).on('hidden.bs.modal',function(){
                self.$emit('hidden',{})
            });
        }

    }

    return component;

});