<select :data-placeholder="placeholder" :multiple="multiple">
  <option v-for="option in customOptions" v-bind:value="option.id">
      {{ option.label }}
  </option>
</select>