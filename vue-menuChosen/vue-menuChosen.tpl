<div>
    <script class="chosen-tpl" type="text/html">
        <div class="menuchosen-wrapper" @blur="toggle('hide')">
            <div class="value-box" @click="toggle">
                <span v-if="value && value.selectName">{{ value.selectName }}</span>
                <span v-else-if="value && value.name">{{ value.name }}</span>
                <span v-else>{{ defaultTxt }}</span>
                <div class="dropbtn-wrapper" >
                    <b></b>
                </div>
            </div>
            <div style="position:relative">
                <menu-items v-if="isOpen" :option='{renderMenu:renderMenu}' @itemselected='itemselected'></menu-items>
            </div>
        </div>
    </script>

    <script class="menu-tpl" type="text/html">
        <div class="chosen-menu-wrapper" style="position:absolute" :style="{left:option.pos&&option.pos.x?option.pos.x:0 , top:option.pos&&option.pos.y?option.pos.y:0}">
            <template v-for="(item,index) in option.renderMenu">
                <div class="chosen-menu-item" @mouseover='handleHover(item,true,$event)' @mouselevel='handleHover(item,false,$event)' @click="handleClick(item)">
                    <span>{{item.name}}</span>
                    <b v-if="item.children && item.children.length>0"></b>
                </div>
            </template>
            <template v-if="childMenuConfig && childMenuConfig.renderMenu ">
                <itmes :option='childMenuConfig' @itemselected='handleClick'></itmes>
            </template>
        </div>
    </script>

</div>