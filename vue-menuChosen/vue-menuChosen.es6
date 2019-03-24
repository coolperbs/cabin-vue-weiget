define('waresys/lib/vue-menuChosen/vue-menuChosen',(require, exports, module)=>{
    let tpl = require('waresys/lib/vue-menuChosen/vue-menuChosen.tpl');
    require('waresys/lib/vue-menuChosen/vue-menuChosen.css');
    // var isBlurBind = false;//失去焦点事件是否已经绑定
    let menu = {
        name:'itmes',
        template:$(tpl).find('.menu-tpl').text(),
        
        props:{
            option:{
                default:null,
                type:Object
            }
        },
        data(){
            return {
                childMenuConfig:null
            }
        },
        methods:{
            handleHover(data,isOver,e){
                // console.log(333,data,isOver,e);
                // debugger;
                if(isOver){
                    
                    if(data && data.children && data.children.length>0){
                        let pos;
                        if(e && e.currentTarget){
                            pos = {
                                y:e.currentTarget.offsetTop+'px',
                                x:e.currentTarget.clientWidth/1+1+'px'
                            }
                        }
                        this.childMenuConfig = {renderMenu:data.children,pos:pos};
                    }else{
                        this.childMenuConfig = null
                    }
                }else{
                    this.childMenuConfig = null;
                }
            },
            handleClick:function(data){
                this.$emit('itemselected',data);
            }
        }
    }
    let chosen = {
        template:$(tpl).find('.chosen-tpl').text(),
        props:{
            option:{
                default:null,
                type:Object
            }
        },
        data(){
            return {
                renderMenu :null,
                isOpen:false,
                value:null,
                defaultTxt:'请选择',
            };
        },
        mounted(){
            this.render();
            this.bind();
        },
        watch:{
            option(){
                this.render();
            }
        },
        methods:{
            render(){
                console.log(this.option);
                this.defaultTxt = this.option.defaultTxt;
                this.value = this.option.defaultValue||null;
                var menu = this.option.menu;
                this.renderMenu = this.doData(menu);
                
            },
            toggle(status){
                if(status === 'hide'){
                    this.isOpen = false;
                    return;
                }
                if(this.renderMenu && this.renderMenu.length>0){
                    this.isOpen = !this.isOpen;
                }
            },
            bind(){
                if(this.isBlurBind){
                    return;
                }
                $('body').on('click',(e)=>{
                    var target = $(e.target);
                    if($(this.$el).find(target).length<=0){
                        this.toggle('hide');

                    }
                });
                this.isBlurBind = true;
            },
            doData(menu,level){
                var renderMenu = [];
                if(!level){
                    level = 0;
                }
                // if(level/1===0){
                //     renderMenu.push({value:'-1',name:'请选择',id:-1});
                // }
                menu.forEach((vMenu,k)=>{
                    var childrenConfig;
                    var config = vMenu
                    config.id = `${level}-${k}`;
                    if(config.children && config.children.length>0){
                        childrenConfig = this.doData(config.children,level/1+1);
                        config.children = childrenConfig;
                    }
                    renderMenu.push(config);
                })
                return renderMenu;
            },
            itemselected(data){
                if(data.children){
                    return;
                }
                if(!this.value || this.value.id !== data.id){
                    this.$emit('change',data);
                }
                this.value = data;
                this.isOpen = false;
            },
            getValue(){
                return this.value;
            }
        },
        components:{
            menuItems:menu
        }
    }
    return chosen
});