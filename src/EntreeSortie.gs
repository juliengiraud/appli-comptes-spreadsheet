function EntreeSortie() {

    // Déclaration des variables
    var tab_affichage = [], cellules_reference = [];
    var _getTotalDu, _getBilanTotal;
    var f = new EntreeSortie_f();
    var i = 0;

    // Ajout de la date si c'est une nouvelle ligne
    ajoutDate(false);

    // Décallage la cellule A1
    decallageCelluleA1();

    // init
    f.constructor();

    // Récupération des valeurs utilisées plusieurs fois
    _getTotalDu = f.getTotalDu();
    _getBilanTotal = f.getBilanTotal();

    // Ajout du contenu à afficher
    if (_getTotalDu != 0) {
        tab_affichage.push('Bilan total : ' + _getBilanTotal + ' €');
    }
    tab_affichage.push('Bilan perso : ' + f.getBilanPerso() + ' €');
    tab_affichage.push('Total des entrées : ' + f.getTotalEntree() + ' €');
    tab_affichage.push('Total des sorties : ' + f.getTotalSortie() + ' €');
    if (_getTotalDu != 0) {
        tab_affichage.push('Total qu\'on me doit : ' + _getTotalDu + ' €');
        tab_affichage.push('Remboursements en attente : ' + f.getNbRemboursement());
    }

    // Ajout des cellule où afficher le contenu
    for (i; i < taille_colonne - tab_affichage.length; i += tab_affichage.length + 15) {
        cellules_reference.push(new Cellule('B', 2 + i));
    }

    // Affichage des bilans finaux
    for (i = 0; i < cellules_reference.length; i++) {
        affichage(tab_affichage, cellules_reference[i], _getBilanTotal);
    }

    // Affichage des bilans mensuels
    f.afficherTousLesBilans();

}
