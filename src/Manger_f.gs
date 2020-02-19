// Création d'une transaction
class Repas {
    constructor(i, m, o, re, ru, s) {
        this.izly = i;
        this.montant = m;
        this.officiel = o; // #ru
        this.repas = re; // est-ce un repas
        this.ru = ru; // j'ai mangé au vrai ru
        this.signe = s; // 1 s'il s'agit d'une entrée d'argent, -1 sinon
    }
}

class Manger_f {

    constructor() {
        this.donnees = [];
        var i, izly, montant, officiel, repas, ru, signe;
        for (i = 0; i < taille_colonne; i++) {
            izly = is(i, 'izly');
            montant = getMontant(i);
            officiel = is(i, '#ru');
            repas = is(i, 'en') || is(i, 'au') || is(i, 'à');
            ru = is(i, 'ru') || is(i, 'l\'Astrée');
            signe = is(i, 'manger') ? 1 : -1;

            this.donnees.push(new Repas(izly, montant, officiel, repas, ru, signe));
        }
    }

    getDonnees(i) {
        return this.donnees[i];
    }

    getAnnee(index) {
        /**
         * Retourne l'année de la cellule passée en paramètre
         */
        return lignes[index][4];
    }

    getJour(index) {
        /**
         * Retourne le jour de la cellule passée en paramètre
         */
        var jour = lignes[index][2];
        if (jour == "1er") jour = "1";
        if (jour.length == 1) jour = "0" + jour;
        return jour;
    }

    getNumMois(index) {
        /**
         * Retourne le mois de la cellule passée en paramètre
         */
        var nummois = (mois.indexOf(lignes[index][3]) + 1) + "";
        if (nummois.length == 1) nummois = "0" + nummois;
        return nummois;
    }

    getLieu(index) {
        /**
         * Retourne le lieu à partir d'un index
         * @param {index} cell - Index d'une cellule
         * @return {string} lieu - Lieu
         */
        for (var i = 0; i < lignes[index].length; i++)
            if (lignes[index][i] == 'en' || lignes[index][i] == 'au' || lignes[index][i] == 'à')
                return lignes[index][i+1];
    }

    getBilanRepas() {
        /**
         * Description : Retourne un montant positif ou négatif
         * S'il est positif il s'agit de ce que je peux dépenser librement
         * S'il est négatif il s'agit de ce que je dois économiser prochainement
         */
        return (this.getSoldeReel() - this.getSoldeOfficiel()).toFixed(2);
    }

    getBudjetCafe() {
        /**
         * Description : Retourne le montant utilisé dans les distributeurs
         */
        return (this.getTotalIzly() - this.getTotalRU()).toFixed(2);
    }

    getNbRepas() {
        /**
         * Description : Retourne le nombre de repas compabilisés
         */
        var total = parseInt(0), i = 0;
        for (i; i < taille_colonne; i++) {
            if (this.donnees[i].repas) {
                total += 1;
            }
        }
        return total;
    }

    getSoldeOfficiel() {
        /**
         * Description : Retourne le montant que je suis censé posséder
         */
        var total = 0, i = 0;
        for (i; i < taille_colonne; i++) {
            if (this.donnees[i].officiel) {
                total += -3.25;
            }
            else if (this.donnees[i].signe > 0) {
                total += this.donnees[i].montant;
            }
        }
        return total.toFixed(2);
    }

    getSoldeReel() {
        /**
         * Description : Retourne le montant qu'il me reste
         */
        var total = 0, i = 0;
        for (i; i < taille_colonne; i++) {
            total += this.donnees[i].ru ? 0 : this.donnees[i].montant * this.donnees[i].signe;
        }
        return total.toFixed(2);
    }

    getTotalDepenseOfficiel() {
        /**
         * Description : Retourne le montant total que je suis censé avoir dépensé pour manger à l'université
         */
        var total = 0, i = 0;
        for (i; i < taille_colonne; i++) {
            if (this.donnees[i].officiel) {
                total += 3.25;
            }
        }
        return total.toFixed(2);
    }

    getTotalDepenseReel() {
        /**
         * Description : Retourne le montant total que j'ai réellement dépensé
         */
        var total = 0, i = 0;
        for (i; i < taille_colonne; i++) {
            if (this.donnees[i].signe < 0) {
                total += this.donnees[i].montant;
            }
        }
        return total.toFixed(2);
    }

    getTotalGagne() {
        /**
         * Description : Retourne le montant total que j'ai gagné sur les repas
         */
        return (this.getTotalDepenseOfficiel() - this.getTotalReelDepensePourManger()).toFixed(2);
    }

    getTotalIzly() {
        /**
         * Description : Retourne le montant total que j'ai mis sur mon compte Izly
         */
        var total = 0, i = 0;
        for (i; i < taille_colonne; i++) {
            if (this.donnees[i].izly) {
                total += this.donnees[i].montant;
            }
        }
        return total.toFixed(2);
    }

    getTotalRecu() {
        /**
         * Description : Retourne le montant total que j'ai reçu pour manger
         */
        var total = 0, i = 0;
        for (i; i < taille_colonne; i++) {
            if (this.donnees[i].signe > 0) {
                total += this.donnees[i].montant;
            }
        }
        return total.toFixed(2);
    }

    getTotalReelDepensePourManger() {
        /**
         * Description : Retourne le montant total que j'ai réellement dépensé pour manger à l'université
         */
        var total = 0, i = 0;
        for (i; i < taille_colonne; i++) {
            if (this.donnees[i].officiel) {
                total += this.donnees[i].montant;
            }
        }
        return total.toFixed(2);
    }

    getTotalRU() {
        /**
         * Description : Retourne le montant total que j'ai réellement dépensé pour manger au RU
         */
        var total = 0, i = 0;
        for (i; i < taille_colonne; i++) {
            if (this.donnees[i].ru) {
                total += this.donnees[i].montant;
            }
        }
        return total.toFixed(2);
    }
}
