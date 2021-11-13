<template>
  <div
    class="field"
    v-bind:class="{ 'left-margin': rowIndex > 0 && columnIndex === 0 }"
  >
    <div class="input-group">
      <span v-if="!label" class="prog-sign"> {{ sign }} </span>
      <input
        type="number"
        v-bind:class="{
          'border-to-right': !label,
          'border-to-left': label,
          'has-error': validationField.$error,
        }"
        v-model.number="validationField.$model"
        @change="onChange($event.target.value)"
        name="e1x1"
      />
      <span class="addon" v-if="label">{{ label }}</span>
    </div>

    <div
      class="error"
      v-bind:class="{
        'left-margin': rowIndex > 0 && !label,
      }"
      v-if="validationField.$error && !validationField.required"
    >
      Field is required.
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  name: "dynamic-input",
  props: {
    fieldKey: {
      required: true,
      type: String,
    },
    label: {
      required: false,
      type: String,
    },
    sign: {
      type: String,
    },
    rowIndex: {
      type: Number,
    },
    columnIndex: {
      type: Number,
    },
    validationField: {},
  },
  methods: {
    ...mapMutations(["setValue", "getValue"]),
    onChange(value) {
      this.setValue({ fieldKey: this.fieldKey, value });
    },
  },
};
</script>

<style>
:root {
  --base-left-margin: 50px;
  --error-color: red;
}

@media only screen and (max-width: 400px) {

}


@media only screen and (min-width: 801px) {
  .field.left-margin {
    margin-left: calc(var(--base-left-margin) + 6px);
  }

  .error.left-margin {
    margin-left: var(--base-left-margin);
  }
}
.prog-sign {
  margin: 5px 15px;
}
.input-group {
  display: flex;
  margin: 5px;
}

.input-group input[type="number"] {
  max-width: 80px;
  border: 1px solid;
}

.border-to-left {
  border-radius: 5px 0px 0px 5px;
}

.border-to-right {
  border-radius: 0px 5px 5px 0px;
}

.input-group span.addon {
  border-radius: 0px 5px 5px 0px;
  background-color: rgba(100, 100, 100, 0.4);
  height: 25px;
  width: 60px;
  text-align: center;
  padding: 5px;
}

.default-input input[type="number"] {
  display: flex;
  margin: 5px;
  max-width: 80px;
  border: 1px solid;
}

.prog-variables {
  margin-left: 55px;
}

.submit {
  text-align: center;
  margin: 20px;
}

.error {
  color: var(--error-color);
  font-size: 12px;
  font-weight: 100;
  margin: 5px;
}

.has-error {
  border-color: var(--error-color) !important;
}

.input-group input[type="number"]:focus {
  outline: blue solid 1px;
}

.input-group input[type="number"].has-error:focus {
  outline: red solid 1px;
}
</style>
