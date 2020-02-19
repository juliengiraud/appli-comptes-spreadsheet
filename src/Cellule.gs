class Cellule {
    /**
     * Cellule Spreadsheet
     * @constructor
     * @param {string} lettre - Lettre de la colonne de la cellule.
     * @param {int} nombre - Numéro de la ligne de la cellule.
     */
    constructor(lettre, nombre) {
        this.lettre = lettre;
        this.nombre = nombre;
    }

    getLettre() {
        return this.lettre;
    }

    setLettre(newLettre) {
        this.lettre = newLettre;
    }

    getNombre() {
        return this.nombre;
    }

    setNombre(newNombre) {
        this.nombre = newNombre;
    }

    toString(nb) {
        /**
         * Affiche les coordonnées de la cellule de la ligne n + k
         * n le numéro originel de la ligne de la cellule
         * k le numéro éventuellement passé en paramètre
         * @param {int} nb - Numéro éventuel à ajouter à la ligne de la cellule
         * @return {string} - Coordonnées de la cellule finale
         */
        var nombre = nb;
        if (typeof (nb) == 'undefined') nombre = 0;
        return this.lettre + (this.nombre + nombre);
    }

}
