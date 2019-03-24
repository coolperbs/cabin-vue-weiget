define('waresys/lib/vue-pdpicker/vue-pdpicker',function(require, exports, module){
    var tpl = require('waresys/lib/vue-pdpicker/vue-pdpicker.tpl');
    var module = {
        template:tpl,
        props:{
            option:{
                type:Object,
                default:function(){
                    return {
                        type:'datetime'
                    }
                }
            },
            value:''
        },
        data:function(){
            return {
                param:{}
            }

        },
        mounted:function(){
            this.render();
        },
        methods:{
            render:function(){
                var param = {}
                if(this.option.type==='datetime'){
                    param = {
                        startView:2,
                        maxView:3,
                        minView:2,
                        format:'YYYY-MM-DD',
                    }
    
                }else if(this.option.type==='date'){
                    param = {
                        startView:3,
                        maxView:3,
                        minView:3,
                        format:'YYYY-MM-DD',
                    }
    
                }else if(this.option.type=== 'time'){
                    param = {
                        startView:4,
                        maxView:4,
                        minView:4,
                        format:'HH:mm:ss',
                    }
                }
                param = $.extend(true,param,this.option.param);
                var self = this;
                $(this.$el).find('input').PdDatePicker(param)
                .on('change', function (evt,data) {
                    // debugger;
                    // console.log(data)
                    self.$emit('input',data.format(param.format));
                });
            },
            getValue:function(){
                var val = $(this.$el).find('input').val()
                // console.log(val)
                return val;
            }
        }
    };

    return module;
})