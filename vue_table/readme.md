# 表格

## 使用


### 参数


dom引用方式：使用config属性传入参数

```
<ctable :config="tableConfig" ref="ctable"></ctabe>
```

#### config 参数详解

getData:获取数据的方法，在表格初始化，翻页时会调用;
```

getData:function(param,callback){
    callback && callback({
        data:res.data.wareList,
        hasMore:false
    })
},


//参数说明st
param:{
    pageNo:0//当前页码
    pageSize:10//每页数量
}
callback({
    data://渲染数据数据
    pageNo//该数据的页码（不传则没有分页器）
    pageSize//该页最大数量（不传则没有分页器）
    totalCount://总页数（不传则没有分页器）
})
//参数说明ed

```


fields:列定义


```
fields:[
    {
        title:'',
        titleRender:funciton(){},
        titleClick:function(){},
        name:'',
        render:function(){},
        className:'',
        click:function(){},

    },
    {title:'一级分类',name:'category1Name',className:''},
    ....
]


//参数说明st
title:表头
titleRender:表头渲染函数(优先于title)，返回dom字符串eg. return “<div>title</div>”
titleClick({表头点击回调（可用于开发点击表头排序等功能）
    tableData: [],//表格的数据
    colDef: {},//点击列的定义
    instance: {},//表格的vue实例，可用于调用组建内部方法和获取内部状态(尽量少用)
    e: {}//js事件对象，包含点击节点
})
name:该列获取数据的字段名,
render:渲染该列的方法(优先于name),
className:自定义在td上的class，可用于自定义样式等
click（{
    tableData: this.tableData.list,//表格的数据
    colDef: fieldItem,//点击列的定义
    row: dataItem,//点击行的数据
    instance: self,//表格的vue实例，可用于调用组建内部方法和获取内部状态(尽量少用)
    e: e//js事件对象，包含点击节点
}）
//参数说明ed
```


#### slot(插槽) 参数详解

```
 <template slot="rowInsert" slot-scope="slotProps">
    <tr>
        <td colspan="7" style="padding:0 ;border-top:none;">
            <transition name="open">
                <replace :data="slotProps.item"  v-show="slotProps.item.show"></replace>
            </transition>
        </td>
    </tr>
</template>

//说明：
slotName:rowInsert
参数名称：item
参数内容：行数据
插入位置：每个tr后边（可用于做客展开的表格）
```








