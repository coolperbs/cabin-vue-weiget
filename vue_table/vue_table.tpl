<div class="vue-table-warpper">
    <template >
        <div class="table-responsive" v-if="tableData && tableData.list && tableData.list.length>0 && config && config.fields">
                <!--注:没标题没按钮组表格没上下边线 有标题加table-top-bordered有分页加table-bottom-bordered-->
                <!--表格-->
                <table class="cabinTable table   " :class="[classNames]">
                    <thead>
                    <slot name="headerInsert"></slot>
                    <tr>
                        <!--渲染表头st-->
                        <template v-for="item in config.fields">
                            <template v-if="item.title">
                                <th :class="item.className" :style="{width:item.width||''}" @click="fieldTitleClick({fieldItem:item,e:$event})">{{item.title}}</th>
                            </template>
                            <template v-if="item.titleRender">
                                <th :class="item.className" :style="{width:item.width||''}" @click="fieldTitleClick({fieldItem:item,e:$event})" v-html="item.titleRender({fieldItem:item})"></th>
                            </template>
                        </template>
                        <!--渲染表头ed-->
                    </tr>
                    </thead>
                    <tbody>
                        <!--渲染列st-->
                        <template v-for="(dataItem,dataIndex) in tableData.list">
                            <tr :class="{curRow:curRow && curRow/1===dataIndex/1}">
                                <template v-for="(fieldItem,fieldIndex) in config.fields">
                                    <td :class="[fieldItem.className, curCol && curCol/1===fieldIndex/1?'curCol':'']" @click="changeActive({rowIndex:dataIndex,colIndex:fieldIndex});fieldClick({fieldItem:fieldItem,e:$event,dataItem:dataItem})">
                                        <div>
                                            <template v-if="fieldItem.name">
                                                {{dataItem[fieldItem.name]}}
                                            </template>
                                            <template v-if="fieldItem.render">
                                                <div v-html="fieldItem.render(dataItem,fieldItem)"></div>
                                            </template>
                                        </div>
                                    </td>
                                </template>
                            </tr>
                            <slot name="rowInsert" :item='dataItem'></slot>
                        </template>
                        <!--渲染列ed-->
                    </tbody>
                </table>
                <!--表格 end-->
            </div>
            <div v-else>
                <div v-if="config && config.emptyRender" v-html="config.emptyRender()"></div>
                <div v-else class="empty-table"><div class="text">没有找到相关数据或内容</div></div>
            </div>
            <!--左右滑动表格 end-->
            <!--分页-->
            <div id="page"></div>
    </template>
</div>