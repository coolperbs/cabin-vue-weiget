<div class="cabin-date-range">
    <input type="text" class="form-control icondate pdpicker-target" readonly
    v-bind:value="value"
    v-on:change="$emit('input', $event.target.value)"
    v-on:input="$emit('input', $event.target.value)"/>
</div>