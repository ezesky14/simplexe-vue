<template>
  <div>
    <div class="prog-container">
      <div class="prog-zmax">
        <div
          class="prog-line"
          v-for="(progs, progindex) in data"
          :key="progindex"
        >
          <!-- Control previous -->

          <div v-if="lineDisplayed === progindex" class="mobile-view-item">
            <div
              v-show="shouldShowPreviousControl"
              class="control control-previous"
              @click="previous()"
            >
              Previous
            </div>
          </div>

          <!-- Mobile-->
          <div class="mobile-view-item">
            <template v-if="lineDisplayed === progindex">
              <span v-if="progs[progindex] === 'zx1'" class="prog-label">
                {{ mainLabel }}
              </span>
            </template>
            <template v-if="lineDisplayed === progindex">
              <div
                class="prog-data-mobile"
                v-for="(subprog, subprogindex) in progs"
                :key="subprog"
              >
                <div v-show="!isHidden(subprogindex)">
                  <dynamic-input
                    v-bind:field-key="subprog"
                    v-bind:label="labels.list[subprogindex]"
                    v-bind:sign="labels.sign"
                    v-bind:row-index="progindex"
                    v-bind:column-index="subprogindex"
                    v-bind:validation-field="$v.programmeLineaire[subprog]"
                  />
                </div>
              </div>
            </template>
          </div>

          <!-- Control next -->
          <div v-if="lineDisplayed === progindex" class="mobile-view-item">
            <div
              v-show="shouldShowNextControl"
              class="control control-next"
              @click="next()"
            >
              Next
            </div>
          </div>

          <!-- Desktop-->

          <div class="prog-data-desktop">
            <span v-if="progs[progindex] === 'zx1'" class="prog-label">
              {{ mainLabel }}
            </span>
            <div v-for="(subprog, subprogindex) in progs" :key="subprog">
              <div v-show="!isHidden(subprogindex)">
                <dynamic-input
                  v-bind:field-key="subprog"
                  v-bind:label="labels.list[subprogindex]"
                  v-bind:sign="labels.sign"
                  v-bind:row-index="progindex"
                  v-bind:column-index="subprogindex"
                  v-bind:validation-field="$v.programmeLineaire[subprog]"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- <div class="controls">
          <div
            v-show="shouldShowPreviousControl"
            class="control control-previous"
            @click="previous()"
          >
            Previous
          </div>
          <div
            v-show="shouldShowNextControl"
            class="control control-next"
            @click="next()"
          >
            Next
          </div>
        </div> -->
      </div>

      <div class="submit">
        <button class="submit-button" @click="submit()">Calculer</button>
      </div>

      <!-- <pre>{{ $v }}</pre> -->
    </div>
  </div>
</template>

<script>
import { SimplexeType } from "@/core/enum/simplexe-type.enum";
import DynamicInput from "./DynamicInput.vue";
import { required } from "vuelidate/lib/validators";
import SimplexeUtils from "@/utils/simplexe-utils";
import { saveProgrammeLineaire } from "../services/programme-lineaire.service";
import { mapMutations } from "vuex";

export default {
  components: { DynamicInput },
  name: "maxi-form-dynamic",
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
      mainLabel: "ZMax =",
      data: [
        ["zx1", "zx2", "zx3"],
        ["e1x1", "e1x2", "e1x3", "e1b"],
        ["e2x1", "e2x2", "e2x3", "e2b"],
        ["e3x1", "e3x2", "e3x3", "e3b"],
      ],
      programmeLineaire: {
        e1x1: "",
        e1x2: "",
        e1x3: "",
        e1b: "",
        e2x1: "",
        e2x2: "",
        e2x3: "",
        e2b: "",
        e3x1: "",
        e3x2: "",
        e3x3: "",
        e3b: "",
        zx1: "",
        zx2: "",
        zx3: "",
      },
      validationForm: null,
      lineDisplayed: 0,
      shouldShowNextControl: true,
      shouldShowPreviousControl: false,
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
      }

      if (type === SimplexeType.MAXI_DEUX_VARIABLES) {
        list = ["x1 +", "x2"];
        sign = "<=";
      }

      if (type === SimplexeType.MINI_TROIS_VARIABLES) {
        list = ["y1 +", "y2 +", "y3"];
        sign = ">=";
      }

      if (type === SimplexeType.MINI_DEUX_VARIABLES) {
        list = ["y1 +", "y2"];
        sign = ">=";
      }

      return {
        list,
        sign,
      };
    },

    setLabel() {
      return [
        SimplexeType.MAXI_DEUX_VARIABLES,
        SimplexeType.MAXI_TROIS_VARIABLES,
      ].includes(this.typeSimplexe)
        ? "Zmax ="
        : "YMax =";
    },
    ...mapMutations([
      "setId",
      "setNombreTableau",
      "setTableaux",
      "setColonnesTableau",
      "setInterpretation",
    ]),
    next() {
      this.lineDisplayed++;
      this.shouldShowNextControl = this.lineDisplayed < 3;
      this.shouldShowPreviousControl = this.lineDisplayed > 0;
    },
    previous() {
      this.lineDisplayed--;
      this.shouldShowNextControl = this.lineDisplayed < 3;
      this.shouldShowPreviousControl = this.lineDisplayed > 0;
    },
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const simplexeUtils = new SimplexeUtils();
        const simplexeData = simplexeUtils.caluclateProg(
          this.programmeLineaire,
          this.typeSimplexe
        );

        if (process.env.VUE_APP_BACKEND_AVAILABLE === "false") {
          console.log("simplexeData", simplexeData);
          this.setId(simplexeData.programmeLineaire.id);
          this.setNombreTableau(simplexeData.programmeLineaire.nb_tableau);
          this.setTableaux(simplexeData);
          this.setColonnesTableau(simplexeData);
          this.setInterpretation(simplexeData);
          this.$router.push(`/result/${simplexeData.programmeLineaire.id}`);
        } else {
          saveProgrammeLineaire(simplexeData).then((response) => {
            if (response.status === 200) {
              this.setId(response.data.programmeLineaire.id);
              this.setTableaux(response.data);
              this.setColonnesTableau(response.data);
              this.setInterpretation(response.data);
              this.$router.push(
                `/result/${response.data.programmeLineaire.id}`
              );
            }
          });
        }
      }
    },
    isHidden(index) {
      return (
        [
          SimplexeType.MAXI_DEUX_VARIABLES,
          SimplexeType.MINI_DEUX_VARIABLES,
        ].includes(this.typeSimplexe) && index === 2
      );
    },
  },

  created() {
    this.mainLabel = this.setLabel();
    this.labels = this.getLabels(this.typeSimplexe);
  },
};
</script>

<style scoped>
@media only screen and (max-width: 800px) {
  .prog-line {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }
  .controls {
    display: flex;
  }

  .control {
    border: 2px solid rgb(0, 0, 0);
    padding: 10px;
    background-color: rgba(235, 225, 225, 0.199);
    text-align: center;
    border-radius: 5px;
  }

  .mobile-view-item {
    min-width: 70px;
  }

  .prog-data-mobile {
    display: block;
  }

  .prog-data-desktop {
    display: none;
  }

  .prog-label {
    min-height: 39px;
    display: block;
    text-align: center;
  }
}

@media only screen and (min-width: 801px) {
  .prog-line {
    display: flex;
    width: 100%;
  }
  .controls {
    display: none;
  }

  .control {
    display: none;
  }
  .prog-data-mobile {
    display: none;
  }

  .prog-data-desktop {
    display: inherit;
  }
  .prog-label {
    margin: 5px;
  }

  .mobile-view-item {
    display: none;
  }
}

.prog-container {
  border-radius: 10px;
  padding: 20px 0px;
  -webkit-box-shadow: 11px 5px 19px 0px rgba(196, 196, 196, 1);
  -moz-box-shadow: 11px 5px 19px 0px rgba(196, 196, 196, 1);
  box-shadow: 11px 5px 19px 20px rgba(196, 196, 196, 1);
  margin-top: 50px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.prog-zmax {
  padding: 10px 0px;
}

</style>
