define('waresys/lib/vue_table/vue_table',function(require,exports,module){
  var tpl = require('waresys/lib/vue_table/vue_table.tpl');
  require('waresys/lib/vue_table/vue_table.css');

  var component = {
      template:tpl,
      props:{
          config:{
            type:Object,
            default:null
            // default:{
            //   fields: config.fields//[{title,name,width}]
            // }
          }
      },
      data:function(){
        return this.getInitData()
      },
      methods:{
          /**
           * 渲染逻辑
           */
          render:function(){
            var self = this;
            var config = this.config;
            if(config && config.getData && typeof config.getData === 'function'){
              config.getData(this.pageInfo,function(res){
                self.initialed = true;//是否已经执行过渲染
                self.update(res);
              })
              this.addExtClass();
            }else{
              self.initialed = true;//是否已经执行过渲染
              self.tableData = {
                list : []
              };
            }
            
          },
          /** 
           * 表格点击
           */
          fieldClick:function(param){
            var fieldItem = param.fieldItem;
            var dataItem = param.dataItem;
            var e = param.e;
            // console.log(fieldItem,dataItem);
            var self = this;
            if(fieldItem.click && typeof fieldItem.click == 'function'){
              fieldItem.click({
                tableData:this.tableData.list,
                row:dataItem,
                colDef:fieldItem,
                instance:self,
                e:e
              })
            }

          },
          changeActive:function(otherParam){
            this.curCol = otherParam.colIndex;
            this.curRow = otherParam.rowIndex;
          },
          fieldTitleClick:function(param){
            var fieldItem = param.fieldItem;
            var self = this;
            if(fieldItem.titleClick && typeof fieldItem.titleClick == 'function'){
              fieldItem.titleClick({
                tableData:this.tableData.list,
                colDef:fieldItem,
                instance:self,
                e:param.e
              })
            }
          },
          addExtClass:function(){
            var config = this.config;
            var className="";
            if(config.nonBorder){
              className+=' non-border'
            }else{
              className+=' table-top-bordered table-bottom-bordered'
            }
            if(!config.nonHover){
              className+=' table-hove'
            }
            this.classNames = className;
          },
           /**
           * 页面切换
           */
          changePage:function(param){
            this.pageInfo.pageNo = param.currentPage;
            this.pageInfo.pageSize = param.pageSize;
            this.render();
          },
          /**
           * 更新页面数据
           */
          update:function(res){
              /**
               * res.data:显示的数据
               * res.hasMore:是否还有下一页
               * res.pageNo:当前页码
               * res.pageSize://每页大小,
               * res.totalCount//总条数
               */
              var self = this;
              self.tableData = {
                list : res.data,
                
              };
              self.pageInfo = $.extend({},self.pageInfo,{
                hasMore : res.hasMore,
                pageNo : res.pageNo,
                pageSize : res.pageSize,
                totalCount:res.totalCount
              });
              setTimeout(function(){
                if(res.pageSize && res.totalCount){
                  $(self.$el).find('#page').NextPage({
                      pageSize: res.pageSize, //每页大小,
                      currentPage: res.pageNo, //当前页
                      totalCount: res.totalCount, //总条数
    
    
                      pageRange: 9, //间隔多少个
                      select: [10, 30, 50], //下拉选项
                      showTotal:true,//显示总条数 boolean
                      position: "right", //位置 left right center 默认right
                      callback: function (data) {
                        
                          self.changePage(data);
                      }
                  });
                }
              },1)
          },
          getInitData:function(){
            return {
              pageInfo:{
                pageNo:1,
                hasMore:true,
              },
              tableData:null,
              classNames:'',
              initialed:false,
              curRow:null,
              curCol:null
            }
          },
          refresh:function(){
            var initData = this.getInitData()
            for(var k in initData){
              this[k] = initData[k];
            }
          }
      },
      watch:{
        'config':function(newVal,oldVal){
          // console.log(newVal,oldVal);
          this.refresh();
          this.render();
        }
      },
      mounted:function(){
          this.refresh();
          this.render();
        // {'table-hover':!config.nonHover,'non-border':config.nonBorder,'table-top-bordered':!config.nonBorder, 'table-bottom-bordered'}
        // debugger;
      }

  }

  return component;

});