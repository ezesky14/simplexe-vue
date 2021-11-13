<template>
  <div>
    <div class="prog-container">
      <div class="prog-zmax">
        <div class="prog-line">
          <span class="prog-label"> ZMax = </span>
          <div class="input-group">
            <input
              type="text"
              name="zx1"
              v-model.trim="programmeLineaire.zx1"
            />
            <span>{{ labels.list[0] }}</span>
          </div>
          <div class="input-group">
            <input
              type="text"
              name="zx2"
              v-model.trim="programmeLineaire.zx2"
            />
            <span>{{ labels.list[1] }}</span>
          </div>
          <div class="input-group" v-if="isActive">
            <input
              type="text"
              name="zx3"
              v-model.trim="programmeLineaire.zx3"
            />
            <span> {{ labels.list[2] }}</span>
          </div>
        </div>
      </div>

      <div class="prog-variables">
        <!-- Bloc1 -->
        <div class="prog-line">
          <div class="field">
            <div class="input-group">
              <input
                type="text"
                name="e1x1"
                v-model.trim="programmeLineaire.e1x1"
              />
              <span>{{ labels.list[0] }}</span>
            </div>

            <div class="error" v-if="!$v.programmeLineaire.e1x1.required">
              Field is required.
            </div>
          </div>
          <div class="field">
            <div class="input-group">
              <input
                type="text"
                name="e1x2"
                v-model.trim="programmeLineaire.e1x2"
              />
              <span>{{ labels.list[1] }}</span>
            </div>
            <div class="error" v-if="!$v.programmeLineaire.e1x2.required">
              Field is required.
            </div>
          </div>
          <div class="input-group" v-if="isActive">
            <input
              type="text"
              name="e1x3"
              v-model.trim="programmeLineaire.e1x3"
            />
            <span>{{ labels.list[2] }}</span>
          </div>

          <span class="prog-sign"> {{ labels.sign }} </span>

          <div class="default-input">
            <input
              type="text"
              name="be1"
              v-model.trim="programmeLineaire.be1"
            />
          </div>
        </div>
        <!-- Bloc2-->
        <div class="prog-line">
          <div class="input-group">
            <input
              type="text"
              name="e2x1"
              v-model.trim="programmeLineaire.e2x1"
            />
            <span>{{ labels.list[0] }}</span>
          </div>
          <div class="input-group">
            <input
              type="text"
              name="e2x2"
              v-model.trim="programmeLineaire.e2x2"
            />
            <span>{{ labels.list[1] }}</span>
          </div>
          <div class="input-group" v-if="isActive">
            <input
              type="text"
              name="e2x3"
              v-model.trim="programmeLineaire.e2x3"
            />
            <span>{{ labels.list[2] }}</span>
          </div>

          <span class="prog-sign"> {{ labels.sign }} </span>

          <div class="default-input">
            <input
              type="text"
              name="be2"
              v-model.trim="programmeLineaire.be2"
            />
          </div>
        </div>

        <!-- Bloc3 -->
        <div class="prog-line">
          <div class="input-group">
            <input
              type="text"
              name="e3x1"
              v-model.trim="programmeLineaire.e3x1"
            />
            <span>{{ labels.list[0] }}</span>
          </div>
          <div class="input-group">
            <input
              type="text"
              name="e3x2"
              v-model.trim="programmeLineaire.e3x2"
            />
            <span>{{ labels.list[1] }}</span>
          </div>
          <div class="input-group" v-if="isActive">
            <input
              type="text"
              name="e3x3"
              v-model.trim="programmeLineaire.e3x3"
            />
            <span>{{ labels.list[2] }}</span>
          </div>

          <span class="prog-sign"> {{ labels.sign }} </span>

          <div class="default-input">
            <input
              type="text"
              name="be3"
              v-model.trim="programmeLineaire.be3"
            />
          </div>
        </div>
      </div>

      <div class="submit">
        <button class="submit-button" @click="submit()">Calculer</button>
      </div>

      <pre>{{ $v }}</pre>
    </div>
  </div>
</template>

<script>
import { SimplexeType } from "@/core/enum/simplexe-type.enum";
import { required } from "vuelidate/lib/validators";
export default {
  name: "maxi-form",
  props: {
    typeSimplexe: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      sign: "<=",
      labels: {},
      isActive: true,
      programmeLineaire: {
        e1x1: null,
        e1x2: null,
        e1x3: null,
        e1b: null,
        e2x1: null,
        e2x2: null,
        e2x3: null,
        e2b: null,
        e3x1: null,
        e3x2: null,
        e3x3: null,
        e3b: null,
        zx1: null,
        zx2: null,
        zx3: null,
      },
    };
  },
  validations: {
    programmeLineaire: {
      e1x1: { required },
      e1x2: { required },
      e1x3: { required },
      e1b: { required },
      e2x1: { required },
      e2x2: { required },
      e2x3: { required },
      e2b: { required },
      e3x1: { required },
      e3x2: { required },
      e3x3: { required },
      e3b: { required },
      zx1: { required },
      zx2: { required },
      zx3: { required },
    },
  },
  methods: {
    getLabels(type) {
      let list, sign;
      if (type === SimplexeType.MAXI_TROIS_VARIABLES) {
        list = ["x1 +", "x2 +", "x3"];
        sign = "<=";
        this.isActive = true;
      }

      if (type === SimplexeType.MAXI_DEUX_VARIABLES) {
        list = ["x1 +", "x2"];
        sign = "<=";
        this.isActive = false;
      }

      if (type === SimplexeType.MINI_TROIS_VARIABLES) {
        list = ["y1 +", "y2 +", "y3"];
        sign = ">=";
        this.isActive = true;
      }

      if (type === SimplexeType.MINI_DEUX_VARIABLES) {
        list = ["y1 +", "y2"];
        sign = ">=";
        this.isActive = false;
      }

      return {
        list,
        sign,
      };
    }
  },

  created() {
    this.labels = this.getLabels(this.typeSimplexe);
  },
};
</script>

<style scoped>
.prog-container {
  padding: 20px 0px;
  -webkit-box-shadow: 11px 5px 19px 0px rgba(196, 196, 196, 1);
  -moz-box-shadow: 11px 5px 19px 0px rgba(196, 196, 196, 1);
  box-shadow: 11px 5px 19px 0px rgba(196, 196, 196, 1);
  margin-top: 50px;
  overflow-x: auto;
}
.prog-zmax {
  padding: 10px 0px;
}


.prog-line {
  display: flex;
  widows: 100%;
}
.input-group {
  display: flex;
  margin: 5px;
}

.input-group input[type="text"] {
  max-width: 80px;
  border-radius: 5px 0px 0px 5px;
  border: 1px solid;
}
.input-group span {
  border-radius: 0px 5px 5px 0px;
  background-color: rgba(100, 100, 100, 0.4);
  height: 25px;
  width: 60px;
  text-align: center;
  padding: 5px;
}

.prog-sign {
  margin: 5px;
}

.default-input input[type="text"] {
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

.field {
}
.error {
  color: red;
  font-size: 12px;
  font-weight: 100;
  margin: 5px;
}
.submit-button {
}
</style>
