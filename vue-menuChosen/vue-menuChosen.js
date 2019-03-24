"use strict";

define('waresys/lib/vue-menuChosen/vue-menuChosen', function (require, exports, module) {
  var tpl = require('waresys/lib/vue-menuChosen/vue-menuChosen.tpl');

  require('waresys/lib/vue-menuChosen/vue-menuChosen.css'); // var isBlurBind = false;//失去焦点事件是否已经绑定


  var menu = {
    name: 'itmes',
    template: $(tpl).find('.menu-tpl').text(),
    props: {
      option: {
        default: null,
        type: Object
      }
    },
    data: function data() {
      return {
        childMenuConfig: null
      };
    },
    methods: {
      handleHover: function handleHover(data, isOver, e) {
        // console.log(333,data,isOver,e);
        // debugger;
        if (isOver) {
          if (data && data.children && data.children.length > 0) {
            var pos;

            if (e && e.currentTarget) {
              pos = {
                y: e.currentTarget.offsetTop + 'px',
                x: e.currentTarget.clientWidth / 1 + 1 + 'px'
              };
            }

            this.childMenuConfig = {
              renderMenu: data.children,
              pos: pos
            };
          } else {
            this.childMenuConfig = null;
          }
        } else {
          this.childMenuConfig = null;
        }
      },
      handleClick: function handleClick(data) {
        this.$emit('itemselected', data);
      }
    }
  };
  var chosen = {
    template: $(tpl).find('.chosen-tpl').text(),
    props: {
      option: {
        default: null,
        type: Object
      }
    },
    data: function data() {
      return {
        renderMenu: null,
        isOpen: false,
        value: null,
        defaultTxt: '请选择'
      };
    },
    mounted: function mounted() {
      this.render();
      this.bind();
    },
    watch: {
      option: function option() {
        this.render();
      }
    },
    methods: {
      render: function render() {
        console.log(this.option);
        this.defaultTxt = this.option.defaultTxt;
        this.value = this.option.defaultValue || null;
        var menu = this.option.menu;
        this.renderMenu = this.doData(menu);
      },
      toggle: function toggle(status) {
        if (status === 'hide') {
          this.isOpen = false;
          return;
        }

        if (this.renderMenu && this.renderMenu.length > 0) {
          this.isOpen = !this.isOpen;
        }
      },
      bind: function bind() {
        var _this = this;

        if (this.isBlurBind) {
          return;
        }

        $('body').on('click', function (e) {
          var target = $(e.target);

          if ($(_this.$el).find(target).length <= 0) {
            _this.toggle('hide');
          }
        });
        this.isBlurBind = true;
      },
      doData: function doData(menu, level) {
        var _this2 = this;

        var renderMenu = [];

        if (!level) {
          level = 0;
        } // if(level/1===0){
        //     renderMenu.push({value:'-1',name:'请选择',id:-1});
        // }


        menu.forEach(function (vMenu, k) {
          var childrenConfig;
          var config = vMenu;
          config.id = "".concat(level, "-").concat(k);

          if (config.children && config.children.length > 0) {
            childrenConfig = _this2.doData(config.children, level / 1 + 1);
            config.children = childrenConfig;
          }

          renderMenu.push(config);
        });
        return renderMenu;
      },
      itemselected: function itemselected(data) {
        if (data.children) {
          return;
        }

        if (!this.value || this.value.id !== data.id) {
          this.$emit('change', data);
        }

        this.value = data;
        this.isOpen = false;
      },
      getValue: function getValue() {
        return this.value;
      }
    },
    components: {
      menuItems: menu
    }
  };
  return chosen;
});
