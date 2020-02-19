function Manger() {

    // Déclaration des variables
    var tab_affichage = [], cellules_reference = [];

    // Ajout de la date si c'est une nouvelle ligne
    ajoutDate(true);

    // Décallage la cellule A1
    decallageCelluleA1();

    // init
    var f = new Manger_f();

    // Ajout du contenu à afficher
    tab_affichage.push('Bilan des repas : ' + f.getBilanRepas() + ' €');
    tab_affichage.push('Solde officiel : ' + f.getSoldeOfficiel() + ' €');
    tab_affichage.push('Solde sur comptes : ' + f.getSoldeReel() + ' €');
    tab_affichage.push('Solde Izly (café) : ' + f.getBudjetCafe() + ' €');
    tab_affichage.push('Total gagné : ' + f.getTotalGagne() + ' €');
    tab_affichage.push('Total reçu : ' + f.getTotalRecu() + ' €');
    tab_affichage.push('Total dépensé officiel : ' + f.getTotalDepenseOfficiel() + ' €');
    tab_affichage.push('Total réel dépensé pour manger : ' + f.getTotalReelDepensePourManger() + ' €');
    tab_affichage.push('Total dépensé réel : ' + f.getTotalDepenseReel() + ' €');
    tab_affichage.push('Nombre de repas : ' + f.getNbRepas());
    tab_affichage.push('Total sur Izly : ' + f.getTotalIzly() + ' €');
    tab_affichage.push('Total RU : ' + f.getTotalRU() + ' €');

    // Ajout de la cellule où afficher le contenu
    cellules_reference.push(new Cellule('B', 2));

    // Affichage du contenu dans les cellules
    for (var i = 0; i < cellules_reference.length; i++) {
        affichage(tab_affichage, cellules_reference[i], f.getBilanRepas());

    }

    // TEMPORAIRE : COPIE BD
    var cellule_bd, sql, id, date, m_officiel, m_comptes, m_izly, repas, officiel, lieu, commentaire, ru, montant, izly, signe;
    for (i = 1; i < taille_colonne; i++) {
        cellule_bd = new Cellule('D', i+1);
        id = taille_colonne - i - 1;
        date = f.getAnnee(i) + "-" + f.getNumMois(i) + "-" + f.getJour(i);
        repas = f.getDonnees(i).repas ? 1 : 0;
        officiel = f.getDonnees(i).officiel ? 1 : 0;
        ru = f.getDonnees(i).ru;
        signe = f.getDonnees(i).signe;
        montant = f.getDonnees(i).montant * signe;
        m_comptes = ru ? 0 : montant;
        izly = f.getDonnees(i).izly;
        m_izly = (ru | izly) ? montant : 0;
        m_izly *= izly ? -1 : 1;
        m_officiel = officiel ? -3.25 : 0;
        m_officiel = signe == 1 ? montant : m_officiel;
        lieu = repas ? f.getLieu(i).replace("'", "''") : '';
        commentaire = getCommentaire(i).replace("'", "''");
        sql = "INSERT INTO repas VALUES (" + id + ", '" + date + "', " + m_officiel + ", " + m_comptes + ", "+ m_izly;
        sql += ", " + repas + ", " + officiel + ", '" + lieu + "', '" + commentaire + "');";
        sheet.getRange(cellule_bd.toString()).setValue(sql);
    }

}
