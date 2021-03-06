// Création d'une entrée-sortie
class Es {
    constructor(an, moi, si, mon, remboursa, rembourse, b) {
        this.annee = an;
        this.mois = moi;
        this.signe = si;
        this.montant = mon;
        this.remboursable = remboursa;
        this.rembourse = rembourse;
        this.blablacar = b;
    }
}

class EntreeSortie_f {

    constructor() {
        this.donnees = [];
        var i, annee, mois, signe, montant, remboursable, rembourse, blablacar;
        for (i = 0; i < taille_colonne; i++) {
            annee = lignes[i][3];
            mois = lignes[i][2];
            signe = this.getSigne(i);
            montant = getMontant(i);
            remboursable = this.isRemboursable(i);
            rembourse = this.isRembourse(i);
            blablacar = this.isBlaBlaCar(i);

            this.donnees.push(new Es(annee, mois, signe, montant, remboursable, rembourse, blablacar));
        }
    }

    getDonnees(i) {
        return this.donnees[i];
    }

    getAnnee(index) {
        /**
         * Retourne l'année de la cellule passée en paramètre
         */
        return lignes[index][3];
    }

    getJour(index) {
        /**
         * Retourne le jour de la cellule passée en paramètre
         */
        var jour = lignes[index][1];
        if (jour == "1er") jour = "1";
        if (jour.length == 1) jour = "0" + jour;
        return jour;
    }

    getNumMois(index) {
        /**
         * Retourne le mois de la cellule passée en paramètre
         */
        var nummois = (mois.indexOf(lignes[index][2]) + 1) + "";
        if (nummois.length == 1) nummois = "0" + nummois;
        return nummois;
    }

    afficherTousLesBilans() {
        /**
         * Description : Lance l'affichage de tous les bilans mensuels pour chaque année
         */
        var cellule_ref = new Cellule('D', 2);
        var annees = [];
        var i;

        this.remplirAnnees(annees); // Dans l'ordre déchronologique

        // Pour chaque année
        for (i = 0; i < annees.length; i++) {
            this.traitementAnnee(cellule_ref, annees[i]);
        }
    }

    afficherAnneeColonne(cell, annee) {
        /**
         * Description : Affiche l'année dont il est question en haut de la colonne
         */
        sheet.getRange(cell.toString()).setValue("Année " + annee);
        sheet.getRange(cell.toString()).setHorizontalAlignment('center');
        sheet.getRange(cell.toString()).setBackground(bleu);
        sheet.getRange(cell.toString()).setFontColor(blanc);
        sheet.getRange(cell.toString()).setFontSize(11);
        sheet.getRange(cell.toString()).setFontWeight('bold');
    }

    getBilanMois(annee, mois) {
        /**
         * Description : Retourne le montant du bilan mensuel correspondant
         */
        var total = 0, i = 0, tmp;
        for (i; i < taille_colonne; i++) {
            if (annee == this.donnees[i].annee && mois == this.donnees[i].mois) {
                tmp = this.donnees[i].montant;
                tmp *= this.donnees[i].signe;
                tmp *= this.donnees[i].rembourse;
                total += tmp;
            }
        }
        return total.toFixed(2);
    }

    getBilanPerso() {
        /**
         * Description : Retourne le bilan total actuel
         * en considérant que tout ce qui devait être remboursé l'a été
         */
        var total = 0, i = 0, tmp;
        for (i; i < taille_colonne; i++) {
            tmp = this.donnees[i].montant;
            tmp *= this.donnees[i].signe;
            tmp *= this.donnees[i].rembourse;
            tmp *= this.donnees[i].remboursable;
            total += tmp;
        }
        return total.toFixed(2);
    }

    getBilanPersoMois(annee, mois) {
        /**
         * Description : Retourne le montant du bilan mensuel correspondant
         * en considérant que tout ce qui devait être remboursé l'a été
         */
        var total = 0, i = 0, tmp;
        for (i; i < taille_colonne; i++) {
            if (annee == this.donnees[i].annee && mois == this.donnees[i].mois) {
                tmp = this.donnees[i].montant;
                tmp *= this.donnees[i].signe;
                tmp *= this.donnees[i].rembourse;
                tmp *= this.donnees[i].remboursable;
                total += tmp;
            }
        }
        return total.toFixed(2);
    }

    getBilanTotal() {
        /**
         * Description : Retourne le bilan total actuel
         */
        var total = 0, i = 0, tmp;
        for (i; i < taille_colonne; i++) {
            tmp = this.donnees[i].montant;
            tmp *= this.donnees[i].signe;
            tmp *= this.donnees[i].rembourse;
            total += tmp;
        }
        return total.toFixed(2);
    }

    getBilanTotalMois(annee, mois) {
        /**
         * Description : Retourne le montant du bilan total à la fin du mois
         */
        var total = 0, i = 0, tmp = 0;

        // On se rend à l'index du mois
        while (!(annee == this.donnees[i].annee && mois == this.donnees[i].mois)) {
            i++;
        }

        // Puis on fait notre traitement
        for (i; i < taille_colonne; i++) {
            tmp = this.donnees[i].montant;
            tmp *= this.donnees[i].signe;
            tmp *= this.donnees[i].rembourse;
            total += tmp;
        }
        return total.toFixed(2);
    }

    getBlablacarMois(annee, mois) {
        /**
         * Description : Retourne la somme des montants Blablacar du mois correspondant
         */
        var total = 0, i = 0;
        for (i; i < taille_colonne; i++) {
            if (annee == this.donnees[i].annee && mois == this.donnees[i].mois) {
              if (is(i, 'BlaBlaCar')) {
                    total += this.donnees[i].montant;
                }
            }
        }
        return total.toFixed(2);
    }

    getEntreeMois(annee, mois) {
        /**
         * Description : Retourne la somme des entrées du mois correspondant
         */
        var total = 0, i = 0;
        for (i; i < taille_colonne; i++) {
            if (annee == this.donnees[i].annee && mois == this.donnees[i].mois) {

                // Si c'est une entrée ou que c'est une sortie qui a été remboursée
                if (this.donnees[i].signe == 1 || this.donnees[i].rembourse == 0) {
                    total += this.donnees[i].montant;
                }
            }
        }
        return total.toFixed(2);
    }

    getNbRemboursement() {
        /**
         * Description : Retourne le nombre total de remboursements en attente
         */
        var total = parseInt(0), i = 0;
        for (i; i < taille_colonne; i++) {
            if (is(i, 'remboursable')) {
                total += 1;
            }
        }
        return total;
    }

    getNbRemboursementMois(annee, mois) {
        /**
         * Description : Retourne le nombre de remboursements en attente pour le mois correspondant
         */
        var total = parseInt(0), i = 0;
        for (i; i < taille_colonne; i++) {
            if (annee == this.donnees[i].annee && mois == this.donnees[i].mois) {
                if (is(i, 'remboursable')) {
                    total += 1;
                }
            }
        }
        return total;
    }

    getSigne(index) {
        /**
         * Description : Retourne 1 si le montant de la cellule correspondante est une entrée, -1 sinon
         */
        return (is(index, 'entrée') || is(index, 'Entrée')) ? 1 : -1;
    }

    getSortieMois(annee, mois) {
        /**
         * Description : Retourne la somme des sorties du mois correspondant
         */
        var total = 0, i = 0;
        for (i; i < taille_colonne; i++) {
            if (annee == this.donnees[i].annee && mois == this.donnees[i].mois) {
                // Si c'est une sortie
                if (this.donnees[i].signe == -1) {
                    total += this.donnees[i].montant;
                }
            }
        }
        return total.toFixed(2);
    }

    getTotalDu() {
        /**
         * Description : Retourne le montant total qu'on me doit
         */
        return (this.getBilanPerso() - this.getBilanTotal()).toFixed(2);
    }

    getTotalDuMois(annee, mois) {
        /**
         * Description : Retourne le montant qu'on me doit pour le mois correspondant
         */
        return (this.getBilanPersoMois(annee, mois) - this.getBilanMois(annee, mois)).toFixed(2);
    }

    getTotalEntree() {
        /**
         * Description : Retourne la somme de toutes les entrées
         */
        var total = 0, i = 0;
        for (i; i < taille_colonne; i++) {

            // Si c'est une entrée ou que c'est une sortie qui a été remboursée
            if (this.donnees[i].signe == 1 || this.donnees[i].rembourse == 0) {
                total += this.donnees[i].montant;
            }
        }
        return total.toFixed(2);
    }

    getTotalSortie() {
        /**
         * Description : Retourne la somme de toutes les sorties
         */
        var total = 0, i = 0;
        for (i; i < taille_colonne; i++) {

            // Si c'est une sortie
            if (this.donnees[i].signe == -1) {
                total += this.donnees[i].montant;
            }
        }
        return total.toFixed(2);
    }

    isRemboursable(index) {
        return (is(index, 'remboursable')) ? 0 : 1;
    }

    isRembourse(index) {
        return (is(index, 'remboursé')) ? 0 : 1;
    }

    isBlaBlaCar(index) {
        return (is(index, 'BlaBlaCar')) ? 0 : 1;
    }

    remplirAnnees(annees) {
        /**
         * Description : Liste les années des dates de la colonne A
         * et les ajoute au tableau passé en paramètre dans le même ordre
         */
        var anneeActuelle, i;
        for (i = 1; i < taille_colonne; i++) {
            if (i == 1 || this.donnees[i].annee && anneeActuelle != this.donnees[i].annee) {
                anneeActuelle = this.donnees[i].annee;
                annees.push(anneeActuelle);
            }
        }
    }

    remplirMois(annee, mois) {
        /**
         * Description : Liste les mois des dates de la colonne A
         * et les ajoute au tableau passé en paramètre dans le même ordre
         */
        var moisActuel;
        var i = 1;
        clear(mois);
        for (i; i < taille_colonne; i++) {
            if (this.donnees[i].annee == annee && (i == 1 || moisActuel != this.donnees[i].mois)) {
                moisActuel = this.donnees[i].mois;
                mois.push(moisActuel);
            }
        }
    }

    traitementAnnee(cellule_ref, annee) {
        /**
         * Description : Lance l'affichage de tous les bilans mensuels pour l'année passée en paramètre
         */
        var mois = [];
        var i = 0;

        // Afficher l'année en haut de la colonne
        this.afficherAnneeColonne(cellule_ref, annee);

        // Mise à jour de la cellule de référence
        cellule_ref.setNombre(cellule_ref.getNombre() + 1)

        this.remplirMois(annee, mois); // Dans l'ordre déchronologique

        // Pour chaque mois
        for (i; i < mois.length; i++) {
            this.traitementMois(cellule_ref, annee, mois[i]);
        }

        // Redimentionnement de la colonne à gauche de l'année
        sheet.setColumnWidth(alphabet.indexOf(cellule_ref.getLettre()), 25);

        // Mise à jour de la cellule de référence
        cellule_ref.setNombre(2);
        cellule_ref.setLettre(alphabet[(alphabet.indexOf(cellule_ref.getLettre()) + 2) % 26]);
    }

    traitementMois(cellule_ref, annee, mois) {
        /**
         * Description : Lance l'affichage du bilan mensuel pour le mois passée en paramètre
         */

        // Déclaration des variables
        var tab_affichage = [], tab_bilan_total = [];
        var tmp, _getTotalDuMois, _getBilanMois, _getBlablacarMois, _getBilanTotalMois;

        // Récupération des valeurs utilisées plusieurs fois
        _getBilanMois = this.getBilanMois(annee, mois);
        _getTotalDuMois = this.getTotalDuMois(annee, mois);
        _getBlablacarMois = this.getBlablacarMois(annee, mois);
        _getBilanTotalMois = this.getBilanTotalMois(annee, mois);

        // Ajout du contenu à afficher...

        // Ajout du nom du mois
        tmp = "Bilan ";
        tmp += mois == "avril" || mois == "août" || mois == "octobre" ? "d'" : "de ";
        tmp += mois + " : "
        tab_affichage.push(tmp + _getBilanMois + ' €');

        // En cas de remboursement(s) en attente(s)
        if (_getTotalDuMois != 0) {
            tab_affichage.push("Bilan perso du mois : " + this.getBilanPersoMois(annee, mois) + ' €');
        }

        tab_affichage.push("Entrées du mois : " + this.getEntreeMois(annee, mois) + ' €');
        tab_affichage.push("Sorties du mois : " + this.getSortieMois(annee, mois) + ' €');

        // En cas de Blablacar
        if (_getBlablacarMois != 0) {
            tab_affichage.push("BlaBlaCar : " + _getBlablacarMois + ' €');
        }

        // En cas de remboursement(s) en attente(s)
        if (_getTotalDuMois != 0) {
            tab_affichage.push("Ce mois on me doit : " + _getTotalDuMois + ' €');
            tab_affichage.push("Remboursements en attente : " + this.getNbRemboursementMois(annee, mois));
        }

        tab_bilan_total.push("Bilan total : " + _getBilanTotalMois + ' €');

        // Mise à jour de la cellule de référence
        cellule_ref.setNombre(cellule_ref.getNombre() + 1)

        // Affichage du bilan mensuel
        affichage(tab_affichage, cellule_ref, _getBilanMois);

        // Mise à jour de la cellule de référence
        cellule_ref.setNombre(cellule_ref.getNombre() + tab_affichage.length)

        // Affichage du bilan total
        affichage(tab_bilan_total, cellule_ref, _getBilanTotalMois);

        // Mise à jour de la cellule de référence
        cellule_ref.setNombre(cellule_ref.getNombre() + 1);
    }

}
