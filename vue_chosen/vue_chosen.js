
	define('waresys/lib/vue_chosen/vue_chosen',function(require,exports,module){
		// var tpl = require('waresys/lib/vue_select/vue_select.tpl');
		var module = {
				template:'<select :data-placeholder="placeholder" :multiple="multiple"><option v-for="option in customOptions" v-bind:value="option.id">{{ option.label }}</option></select>',
				props: {
						value: {
								type: [String, Number, Array, Object],
								default: null
						},
						options: {
								type: [Array, Object],
								default: function(){
									return []
								}
						},
						multiple: {
								type: Boolean,
								default: false
						},
						placeholder: {
								type: String,
								default: 'Select'
						},
						searchable: {
								type: Boolean,
								default: true
						},
						searchableMin: {
								type: Number,
								default: 1
						},
						allowEmpty: {
								type: Boolean,
								default: true
						},
						searchContains:{
							type: Boolean,
								default: true
						},
						width:{
							type:String,
							default:'100%'
						}
				},
				computed: {
						customOptions:function() {
								var vm = this,
										options = this.options;
								// Object.keys(this.options).forEach(function(key) {
								// 	debugger;
								// 		options.push({
								// 				'id': key,
								// 				'label': vm.options[key]
								// 		});
								// });
								
								return this.allowEmpty ? [{id: null, label: ''}].concat(options) : options;
						},
						localValue:function() {
								this.$nextTick(function() {
										$(this.$el).val(this.value).trigger("chosen:updated");
								});
								return this.value;
						}
				},
				watch: {
						localValue:function() {
						},
						customOptions:function() {
								this.$nextTick(function() {
										$(this.$el).val(this.value).trigger("chosen:updated");
								});
						}
				},
				methods:{
					initEvt:function(){
						var component = this;
						$(this.$el).chosen('destroy').unbind('change');
						var nextChosen = $(this.$el).nextAll();
						if (nextChosen.length > 0) {
							nextChosen.each(function () {
								var $this = $(this);
								if ($this.hasClass('chosen-container')) {
									$this.remove();
								}
							})
						}
						$(this.$el).chosen({
								width: this.width,
								disable_search_threshold: this.searchable ? this.searchableMin : 100000,
								search_contains:this.searchContains,
								no_results_text:'未找到结果'
						}).change(function($event) {
								component.$emit('input', $($event.target).val());
								//input 返回的数据比较少，不建议使用，请使用change st
								var selVal = $($event.target).val();
								var selObj = null;
								if(component.options && component.options.length>0){
									var selObj = component.options.filter(function(v,k){
										if(v.id !== null && v.id!==undefined){
											return v.id.toString() === selVal.toString();
										}
									})
								}
								component.$emit('change', selObj[0]);
								//input 返回的数据比较少，不建议使用，请使用change ed
						});
					},
					getValue:function(){
						return $(this.$el).val();
					},
					getValueObj:function(){
						var component = this;
						var selVal = $(this.$el).val();
						var selObj;
						if(component.options && component.options.length>0){
							selObj = component.options.filter(function(v,k){
								return v.id.toString() === selVal.toString();
							});
						}
						return selObj[0];
					}

				},
				mounted:function() {
					this.initEvt();
				}
		}

		return module

	});
	