<div class="modal fade" tabindex="-1" role="dialog" data-backdrop="static">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header clearfix" v-if="config.title">
                <template v-if="config.title">
                    <div class="stage-title flag pull-left">
                        <span>
                            {{config.title}}
                        </span>
                    </div>
                    <div class="stage-title pull-right">
                        <span class="cabin-big-icon close" data-dismiss="modal" aria-label="Close"></span>
                    </div>
                </template>
            </div>
            <div class="modal-body" style="padding:0">
                <slot name="content"></slot>
            </div>
            <div class="modal-footer clearfix">
                <template v-if="config && config.btns && config.btns.length>0">
                    <div v-for="btnItem in config.btns" class="btn btn-primary" data-dismiss="modal" @click="btnItem.click">{{btnItem.text}}</div>
                </template>
                <template v-else>
                    <div class="btn btn-primary" data-dismiss="modal">确认</div>
                </template>
            </div>
        </div>
    </div>
</div>