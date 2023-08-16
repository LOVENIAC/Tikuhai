import Vue from 'vue'
import ElementUI from 'element-ui';

Vue.component('el-input', {
  extends: ElementUI.Input,
  created() {
    this.$on('change', (value) => {
      this.$emit('input', value.trim())
    })
  }
})
