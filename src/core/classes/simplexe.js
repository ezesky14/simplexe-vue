import TableauV2 from "./tableauV2";
import Interpretation from "./interpretation";
import ColonneTableau from "./colonne-tableau";
import SimplexeLogger from "./simplexe-logger";
import { SimplexeType } from "../enum/simplexe-type.enum";
import { cloneDeep } from "lodash";

export default class SimplexeV2 {
  programeLineaire;
  tableauList;
  LOG_ENABLE = true;
  interpretation;
  simplexeLogger = new SimplexeLogger();

  /* * - Les fonctions a creer
       Les fonctions serviront à alleger le code , eviter les repetitions et permmettrons une bonne transparence de l'algorithme
       Pour cela nous creerons plusieurs fonctions telles que :
         - recupLignePivot(): Recupere les elements du tableau ou se trouve le pivot et les insere dans un tableau
         - calculerLigne() :Applique la formule du pivot de GAUSS L'=L  - k * Lp / P  tels que P = Pivot  , L p= Ligne pivot
         - determinerPivot() : Cette fonction determinera la variable entrante VE , la variable sortante VS et le pivot puis affectera la ligne pivot au tableau prevu à cet effet .
         - ApliquerReglePivot() : fera les calculs pour appliquer les regles de pivotage pour le tableau suivant .
         - verifierTableau() : Verifiera que le tableau Z contient seulement que des valeurs negatives ou nuls
         - InterpreterSolutionOptimale() : Interpretera la solution optimale si seulement si les coefficients des variables hors base sont negatives ou nuls.
       */

  constructor(programeLineaire) {
    if (programeLineaire) {
      this.programeLineaire = programeLineaire;
      this.initFirstTable(programeLineaire, 0);
    }
  }

  getProgrameLineaire() {
    return this.programeLineaire;
  }

  setProgrameLineaire(programeLineaire) {
    this.programeLineaire = programeLineaire;
  }

  getTableauList() {
    return this.tableauList;
  }

  setTableauList(tableauList) {
    this.tableauList = tableauList;
  }

  getInterpretation() {
    return this.interpretation;
  }

  setInterpretation(interpretation) {
    this.interpretation = interpretation;
  }

  initFirstTable(programeLineaire, tableauIndex) {
    this.tableauList = [];
    const firstTb = new TableauV2(programeLineaire, tableauIndex);
    this.tableauList.push(firstTb);
    if (this.LOG_ENABLE) {
      this.simplexeLogger.logTable(firstTb, "1er tableau sans R");
    }
  }

  max(cols) {
    let maxCol = new ColonneTableau();
    let max = 0;
    let i = 0;
    for (const colonne of cols) {
      if (colonne.getValue() > max) {
        max = colonne.getValue();
        colonne.setLignePosition(i);
        maxCol = colonne;
      }
      i++;
    }
    return maxCol;
  }

  min(cols) {
    let minCol = new ColonneTableau(this.programeLineaire.getRoundNumber());

    let min = 0;
    for (let i = 0; i < cols.length; i++) {
      const colonne = cols[i];
      if (colonne.getValue() > 0) {
        if (min == 0) {
          min = colonne.getValue();
          colonne.setLignePosition(i);
          minCol = colonne;
        } else {
          if (colonne.getValue() < min) {
            min = colonne.getValue();
            colonne.setLignePosition(i);
            minCol = colonne;
          }
        }
      }
    }

    console.log("[min] min ", min + "");
    return minCol;
  }

  calculerR(tb, colVEntrante) {
    /*On calcule pour e1, e2 et e3

         */
    let i = this.programeLineaire.getColumnsNumberPerLine() - 1;
    for (let a = 0; a < 3; a++) {
      if (colVEntrante.getValue() == 0) {
        tb.getCol(a, i).setValue(0);
      } else {
        const bb = tb.getCol(a, colVEntrante.getVhbPosition()).getValue();
        const f = tb.getCol(a, i - 1).getValue() / bb;
        tb.getCol(a, i).setValue(f);
      }
    }
    return tb;
  }

  getVsortante(tb, rIndice) {
    const colQueriesMap = {
      0: rIndice,
      1: rIndice,
      2: rIndice,
    };

    const colonnes = tb.getColonnes(colQueriesMap);
    return this.min(colonnes);
  }

  determinerPivot(tb) {
    //recherche de la variable entrante
    // float max = max(tb_Z[0], tb_Z[1], tb_Z[2], tb_Z[3], tb_Z[4], tb_Z[5]);
    const cols = tb.getColonnes();
    const colV_entrant = this.max(tb.getLine("Z"));
    tb.setColvEntrante(colV_entrant);
    tb.setPositionVEntrante(colV_entrant.getPositionValue());
    tb.setMax(colV_entrant.getValue());
    //On calcule pour e1,e2 et e3 et on met a jour les valeurs des colonnes dans le tableau

    tb = this.calculerR(tb, colV_entrant);
    tb.setColonnes(cols);

    if (this.LOG_ENABLE) {
      this.simplexeLogger.logTable(
        tb,
        "tableau " + this.tableauList.length + " actualiser"
      );
    }

    //RECHERCHE DE LA VALEURE SORTANTE ET DU PIVOT PUIS REMPLISSAGE DU TABLEAU ligne pivot
    const rIndice = this.programeLineaire.getColumnsNumberPerLine() - 1;
    const colVSortante = this.getVsortante(tb, rIndice);
    tb.setColvSortante(colVSortante);
    tb.setMin(colVSortante.getValue());
    const vdbIndice = colVSortante.getVdbValue();
    tb.setPositionVSortante("r" + vdbIndice);

    tb.setPositionPivot(vdbIndice + colV_entrant.getVhbValue());
    tb.setPivot(tb.getValue(vdbIndice, colV_entrant.getVhbPosition()));
    tb.setPivotColonnes(tb.getLine(vdbIndice));
    tb.setColPivot(
      tb.getCol(colVSortante.getVdbPosition(), colV_entrant.getVhbPosition())
    );

    return tb;
  }

  calculateNextTableLine(actualTb, tableauIndex) {
    const pivot = actualTb.getPivot();
    const lignePivot = actualTb.getLignePivotValues();
    const indiceVEntranteVhbPos = actualTb.getColvEntrante().getVhbPosition();
    const pivotVdbPos = actualTb.getColvSortante().getVdbValue();

    //Le nombre de colonnes peut varier 7 ou 8
    const colNumberPerLine = this.programeLineaire.getColumnsNumberPerLine();

    const nextTb = new TableauV2(this.programeLineaire, tableauIndex);
    const tb_e1prim = nextTb.getLine("e1");
    const tb_e2prim = nextTb.getLine("e2");
    const tb_e3prim = nextTb.getLine("e3");
    const tb_Zprim = nextTb.getLine("Z");

    const tb_e1 = actualTb.getLineValues("e1");
    const tb_e2 = actualTb.getLineValues("e2");
    const tb_e3 = actualTb.getLineValues("e3");
    const tb_Z = actualTb.getLineValues("Z");

    for (let i = 0; i < colNumberPerLine - 1; i++) {
      tb_Zprim[i].setValue(
        tb_Z[i] - (tb_Z[indiceVEntranteVhbPos] * lignePivot[i]) / pivot
      );

      if (pivotVdbPos === "e1") {
        tb_e1prim[i].setValue(lignePivot[i] / pivot);
      } else {
        tb_e1prim[i].setValue(
          tb_e1[i] - (tb_e1[indiceVEntranteVhbPos] * lignePivot[i]) / pivot
        );
      }

      if (pivotVdbPos === "e2") {
        tb_e2prim[i].setValue(lignePivot[i] / pivot);
      } else {
        tb_e2prim[i].setValue(
          tb_e2[i] - (tb_e2[indiceVEntranteVhbPos] * lignePivot[i]) / pivot
        );
      }

      if (pivotVdbPos === "e3") {
        tb_e3prim[i].setValue(lignePivot[i] / pivot);
      } else {
        tb_e3prim[i].setValue(
          tb_e3[i] - (tb_e3[indiceVEntranteVhbPos] * lignePivot[i]) / pivot
        );
      }
    }

    nextTb.setLine(tb_e1prim, "e1");
    nextTb.setLine(tb_e2prim, "e2");
    nextTb.setLine(tb_e3prim, "e3");
    nextTb.setLine(tb_Zprim, "Z");

    // On retourne le prochain tableau
    if (this.LOG_ENABLE) {
      this.simplexeLogger.logTable(nextTb, "prochain tableau sans R");
    }
    return nextTb;
  }

  genererProchainTableau(tb, tableauIndex) {
    return cloneDeep(this.calculateNextTableLine(tb, tableauIndex));
  }

  genTables() {
    // On defini le premier tableau
    let currentTb = this.tableauList[0];

    // On initialise les variables
    let isLast = false;
    let i = 0;
    while (!isLast) {
      currentTb = this.determinerPivot(currentTb, i);

      //On met a jour le tableau dans la liste
      this.tableauList[i] = currentTb;

      //On genere le prochain tableau
      currentTb = this.genererProchainTableau(currentTb, i + 1);

      let previousTb = this.tableauList[i];
      currentTb = this.applyReglePivot(
        cloneDeep(currentTb),
        cloneDeep(previousTb)
      );

      currentTb.verifyTable();
      isLast = currentTb.isLast;
      this.tableauList.push(currentTb);
      i++;
    }
    this.programeLineaire.setNbTableau(this.tableauList.length);

    this.interpretation = this.interpreteSolu();
    return this.tableauList;
  }

  applyReglePivot(actualTb, previousTb) {
    /* Vdb : e1=> 0 , e2=> 1, e3 =>2
        Vhb : (x1=> 0 , x2=> 1 , '.' => 2 , 3 et 4)  ou  (x1=> 0 , x2=> 1 , x3=> 2 ,'.' => 3 , 4 et 5)
        */
    actualTb.setVdbLabels([...previousTb.getVdbLabels()]);
    actualTb.setVhbLabels([...previousTb.getVhbLabels()]);

    let actualVhbLabels = actualTb.getVhbLabels();
    let actualVdbLabels = actualTb.getVdbLabels();

    const colPivot = previousTb.getColPivot();
    const colPerLine = actualTb.getNumberTotalcolPerLine();

    const vhbPosition = colPivot.getVhbPosition();
    const vdbPosition = colPivot.getVdbPosition();

    if (previousTb.isPValue(colPivot.getVhbValue())) {
      let indexP = vhbPosition - 3;
      if (colPerLine == 7) {
        indexP = vhbPosition - 2;
      }

      const tmp2 = actualVhbLabels[vhbPosition];
      actualVhbLabels[vhbPosition] = actualVhbLabels[indexP];
      actualVhbLabels[indexP] = tmp2;

      const tmp1 = actualVdbLabels[vdbPosition];
      actualVdbLabels[vdbPosition] = actualVhbLabels[indexP];
      actualVhbLabels[indexP] = tmp1;
    } else {
      const tmp1 = actualVdbLabels[vdbPosition];
      actualVdbLabels[vdbPosition] = actualVhbLabels[vhbPosition];
      actualVhbLabels[vhbPosition] = tmp1;

      let indexP = vdbPosition + 3;
      if (colPerLine == 7) {
        indexP = vdbPosition + 2;
      }
      const tmp2 = actualVhbLabels[indexP];
      actualVhbLabels[indexP] = actualVhbLabels[vhbPosition];
      actualVhbLabels[vhbPosition] = tmp2;
    }

    actualTb.setVdbLabels(actualVdbLabels);
    actualTb.setVhbLabels(actualVhbLabels);
    console.log(actualTb);
    return cloneDeep(actualTb);
  }

  interpreteSolu() {
    const simplexeType = this.programeLineaire.getType();
    const lastTb = this.tableauList[this.tableauList.length - 1];
    const interpretation = new Interpretation();
    /*
             1 - On recherche dans les labels les valeurs x1 , x2 et x3
                    1.1 Dans Vdb si non trouver on recherche dans vhb
                    1.2 Si trouver dans vdb alors
                        1.2.1 On recupere l'index qui represente la ligne,
                              on recherche la valeur B a cette ligne .
                              Cette valeur est liee a la variable d activite recherchee plus haut

                         Si trouver dans vhb alors
                           1.2.1 On recupere l'index qui represente la ligne,
                              on recherche la valeur Z a cette ligne (Zx1 ou Zx2 ou Zx3).
                              Cette valeur est liee a la variable d activite recherchee plus haut

             */

    const lastVhbLabels = [...lastTb.getVhbLabels()];
    const lastVdbLabels = [...lastTb.getVdbLabels()];
    let variableActivite;
    if (simplexeType == SimplexeType.MAXI_DEUX_VARIABLES) {
      variableActivite = ["x1", "x2", "e1", "e2", "e3"];
    } else {
      variableActivite = ["x1", "x2", "x3", "e1", "e2", "e3"];
    }

    for (const v of variableActivite) {
      let position;
      let found = false;
      let index = 0;
      for (const vdbLabel of lastVdbLabels) {
        if (vdbLabel === v) {
          found = true;
          position = index;
          const colonneTableau = lastTb.getCol(
            position,
            lastTb.getNumberTotalcolPerLine() - 2
          );
          interpretation.setValue(colonneTableau, v, false);

          console.log(v + " found", colonneTableau.getValue() + "");
        }
        index++;
      }

      //Si pas trouver dans vdbLabels on va dans vhbLabels
      if (!found) {
        index = 0;
        for (const vhbLabel of lastVhbLabels) {
          if (vhbLabel == v) {
            /* 1- Verifier si cette variable d activite est e1, e2 ou e3
                               2- Si oui verifier si la valeur liee a la variable d'activite trouvee a travers la colonne
                                  est inferieur a 0
                               3- Si inferieur alors cette variable d activite est egale a 0 */

            position = index;
            const colonneTableau = lastTb.getCol(3, position);
            interpretation.setValue(colonneTableau, v, true);

            if (colonneTableau.getValue() > 0) {
              console.log(v + " found", colonneTableau.getValue() + "");
            } else {
              console.log(v + " found", "0");
            }
          }
          index++;
        }
      }
    }
    interpretation.setZMAX(lastTb.getValue("Z", 6) * -1 + "");
    return interpretation;
  }
}
