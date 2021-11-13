import ProgrammeLineaire from "./../core/classes/programme-lineaire";
import SimplexeV2 from "./../core/classes/simplexe";

export default class SimplexeUtils {

  caluclateProg(programmeLineaire, typeSimplexe) {
    const _programmeLineaire = new ProgrammeLineaire(typeSimplexe, 2);
    const { e1x1, e1x2, e1x3, e1b } = programmeLineaire;
    _programmeLineaire.setEquation1(e1x1, e1x2, e1x3, e1b);

    const { e2x1, e2x2, e2x3, e2b } = programmeLineaire;
    _programmeLineaire.setEquation2(e2x1, e2x2, e2x3, e2b);

    const { e3x1, e3x2, e3x3, e3b } = programmeLineaire;
    _programmeLineaire.setEquation3(e3x1, e3x2, e3x3, e3b);

    const { zx1, zx2, zx3 } = programmeLineaire;
    _programmeLineaire.setzEquation(zx1, zx2, zx3);

    const simplexeV2 = new SimplexeV2(_programmeLineaire);
    const tableauList = simplexeV2.genTables();
    _programmeLineaire.setNbTableau(tableauList.length);
    programmeLineaire.id = _programmeLineaire.id;
    return this.parseProgrammeLineaireData(programmeLineaire, simplexeV2);
  }

  parseProgrammeLineaireData(programmeLineaire, simplexeObj) {
    return {
      programmeLineaire: {
        ...programmeLineaire,
        type_simplexe: simplexeObj.programeLineaire.type,
        nb_tableau: simplexeObj.tableauList.length,
      },
      tableaux: this.parseTableauxData(simplexeObj),
      colonnesTableaux: this.parseAllColonneTableaux(simplexeObj),
      interpretation: simplexeObj.interpretation,
    };
  }

  parseTableauxData(simplexeObj) {
    let tableaux = [];
    simplexeObj.tableauList.forEach((tableau) => {
      const colonnes = tableau.colonnes;
      let tableauObj = this.parseColonnesTableMapData(colonnes);

      tableauObj = {
        ...tableauObj,
        pivot: tableau.positionPivot,
        v_entrante: tableau.positionVEntrante,
        v_sortante: tableau.positionVSortante,
        max: tableau.max,
        min: tableau.min,
        isLast: `${tableau.isLast}`,
        vdbLabels: tableau.vhbLabels.join(","),
        vhbLabels: tableau.vdbLabels.join(","),
      };
      tableaux.push(tableauObj);
    });

    return tableaux;
  }

  parseColonnesTableMapData(colonnes) {
    const obj = {};
    colonnes.forEach((colonne) => {
      obj[`${colonne.positionValue.toLowerCase()}`] = colonne.getValue();
    });

    return obj;
  }

  parseColonnesTableValue(colonnes) {
    return colonnes.map((colonne) => {
      return colonne.getValue();
    });
  }

  parseAllColonneTableaux(simplexeObj) {
    let tableaux = [];
    simplexeObj.tableauList.forEach((tableauObj) => {
      const colonnes = tableauObj.colonnes;
      tableaux = [...tableaux, ...colonnes];
    });

    return tableaux;
  }
}
