function EntreeSortie() {

    // Déclaration des variables
    var tab_affichage = [], cellules_reference = [];
    var _getTotalDu, _getBilanTotal;
    var i = 0;

    // Ajout de la date si c'est une nouvelle ligne
    ajoutDate(false);

    // Décallage la cellule A1
    decallageCelluleA1();

    // init
    var f = new EntreeSortie_f();

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

    // TEMPORAIRE : COPIE BD
    var cellule_bd, sql, id, date, montant, commentaire, remboursable, rembourse, blablacar;
    for (i = 1; i < taille_colonne; i++) {
        cellule_bd = new Cellule('J', i+1);
        id = taille_colonne - i - 1;
        date = f.getDonnees(i).annee + "-" + f.getNumMois(i) + "-" + f.getJour(i);
        montant = f.getDonnees(i).montant * f.getDonnees(i).signe;
        commentaire = getCommentaire(i).replace("'", "''");
        remboursable = f.getDonnees(i).remboursable ? 0 : 1;
        rembourse = f.getDonnees(i).rembourse ? 0 : 1;
        blablacar = f.getDonnees(i).blablacar ? 0 : 1;
        sql = "INSERT INTO comptes VALUES (" + id + ", '" + date + "', " + montant + ", '" + commentaire + "', " + remboursable + ", " + rembourse + ", " + blablacar + ");";
        sheet.getRange(cellule_bd.toString()).setValue(sql);
    }

}
