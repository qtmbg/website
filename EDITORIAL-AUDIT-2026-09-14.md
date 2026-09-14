# Quantum Branding : audit éditorial du 14 septembre 2026

Périmètre : 38 pages EN/FR, deux brochures de cinq pages, sources éditoriales et générateurs. Comparaison avec le commit `76091a3`. Cette passe répond au texte fourni par le propriétaire le 14 septembre.

## Résultat

- Aucun tiret cadratin dans le corps des 38 pages, dans les PDF, dans le brief généré ou dans le texte des schémas. Les titres HTML et leurs équivalents sociaux gardent le séparateur demandé.
- Aucune variable de template non interpolée dans les 38 documents HTML ni les deux PDF. Le bug de confidentialité est corrigé dans les deux langues.
- Aucun montant, symbole monétaire, ancien nom produit, pseudo de plateforme ou placeholder publié.
- Aucune ville, aucun pays ni aucune région comme localisation de la pratique. Les deux noms propres The New York Times et Los Angeles Lakers, explicitement demandés, sont conservés.
- La seule construction négative de définition restante est le témoignage verbatim de Shelah J., également conservé en traduction française.
- Les pronoms collectifs restants désignent Nizzar et le client. Aucun ne présente Quantum Branding comme une équipe.
- Les mots « price/prix » subsistent pour expliquer la prise de contact et le retrait des prix du corps des emails Verne. Aucun tarif ni montant n’est publié.
- Les caractéristiques techniques et chiffres des études de cas proviennent du texte fourni. Aucun résultat chiffré supplémentaire n’a été ajouté.

## Corrections demandées

| Demande | Traitement |
| --- | --- |
| A1 | `src/pages.mjs:45` : l’adresse est concaténée dans les deux chaînes de confidentialité. Contrôle des 38 HTML et des textes PDF extraits. |
| A2–A3 | Notes simplifiées. Les trois noms confirmés remplacent les pseudos. Originaux anglais verbatim conservés. |
| A4 | Phrase du passage, paragraphe IA et les deux paragraphes Collapse remplacés. Hold mis à jour à sa source partagée. |
| A5–A6 | Toutes les branches B pointent vers /start ou /fr/start. Brief facultatif sous l’introduction. Bloc A/B supprimé de /start. |
| A7 | Engagement, Quantum Diagnosis, AI Opportunity Day, AI Working Session, dans cet ordre, avec leur résultat. Site et PDF. |
| A8 | BrandOS dans le texte de la pratique et sous Observe uniquement sur la méthode. |
| A9 | Trois témoignages actifs sur /work dans les deux langues. Le gabarit PDF existant reprend les deux premiers. |
| A10 | Années UNIDO / La Minute Creative, Audi / Driven by Art et Diptyk demandées au propriétaire, toujours absentes en attendant sa réponse. |
| A11 | Historique complet conservé sur /work. Sur /about, une ligne liée à /work. |
| A12 | Neuf références ajoutées sous les cas de l’accueil avec la phrase des dix-sept ans. |
| A13 | Le poster possédait déjà aria-hidden=true. Vérification de l’arbre accessible EN/FR : fragments décoratifs et symbole exclus. Aucun changement visuel nécessaire. |
| A14 | Les trois métadescriptions EN sont celles fournies. Versions FR correspondantes. Images de partage régénérées. |
| A15 | Cartographie ci-dessous. Aucun remplacement d’icône. |
| B–C | Cinq sections et une clôture distincte pour chaque cas EN/FR. Statut et contact direct. Ancien périmètre et lien Project documentation supprimés. |
| D | Descriptions de cartes synchronisées entre l’accueil, /work et les fiches. |

Les paragraphes fournis qui contenaient « rather than » ou « instead of » ont été reformulés affirmativement en conservant leur sens. L’essai « One page, many arguments » a aussi été resserré en EN/FR pour supprimer les définitions négatives.

## Inventaire des 38 fichiers publiés

Numéros de ligne du HTML généré. Le générateur conserve la majorité du corps sur une ligne. Une absence d’occurrence signifie que toutes les catégories du balayage sont à zéro dans le corps du fichier.

| Fichier | Ligne | Occurrence | Traitement |
| --- | ---: | --- | --- |
| `dist/index.html` | 62 | We | Conservé : le client et Nizzar ensemble. |
| `dist/index.html` | 62 | New York | Conservé : nom propre explicitement demandé dans la barre de références. |
| `dist/index.html` | 62 | Los Angeles | Conservé : nom propre explicitement demandé dans la barre de références. |
| `dist/practice.html` | 51 | We | Conservé : le client et Nizzar ensemble. |
| `dist/practice/method.html` | 51 | We | Conservé : le client et Nizzar ensemble. |
| `dist/work.html` | 51 | not a | Conservé : témoignage de Shelah J. cité mot pour mot (ou sa traduction FR). |
| `dist/work.html` | 51 | We | Conservé : le client et Nizzar ensemble. |
| `dist/work/selvaggi.html` | — | Aucune | Contrôlé |
| `dist/work/verne-jewels.html` | 51 | us | Conservé : le client et Nizzar ensemble. |
| `dist/thinking.html` | — | Aucune | Contrôlé |
| `dist/thinking/the-collapse.html` | — | Aucune | Contrôlé |
| `dist/thinking/the-brief-before-the-brief.html` | — | Aucune | Contrôlé |
| `dist/thinking/diagnosis-before-prescription.html` | — | Aucune | Contrôlé |
| `dist/thinking/what-automation-should-earn.html` | — | Aucune | Contrôlé |
| `dist/thinking/holding-a-decision.html` | — | Aucune | Contrôlé |
| `dist/thinking/one-page-many-arguments.html` | — | Aucune | Contrôlé |
| `dist/lab.html` | — | Aucune | Contrôlé |
| `dist/lab/signal-scan.html` | — | Aucune | Contrôlé |
| `dist/lab/the-brief-before-the-brief.html` | — | Aucune | Contrôlé |
| `dist/about.html` | 51 | We | Conservé : le client et Nizzar ensemble. |
| `dist/start.html` | 51 | we | Conservé : le client et Nizzar ensemble. |
| `dist/notes.html` | 51 | not a | Conservé : témoignage de Shelah J. cité mot pour mot (ou sa traduction FR). |
| `dist/fr.html` | 62 | Nous | Conservé : le client et Nizzar ensemble. |
| `dist/fr.html` | 62 | New York | Conservé : nom propre explicitement demandé dans la barre de références. |
| `dist/fr.html` | 62 | Los Angeles | Conservé : nom propre explicitement demandé dans la barre de références. |
| `dist/fr/practice.html` | 51 | Nous | Conservé : le client et Nizzar ensemble. |
| `dist/fr/practice/method.html` | 51 | Nous | Conservé : le client et Nizzar ensemble. |
| `dist/fr/work.html` | 51 | n’est pas | Conservé : témoignage de Shelah J. cité mot pour mot (ou sa traduction FR). |
| `dist/fr/work.html` | 51 | Nous | Conservé : le client et Nizzar ensemble. |
| `dist/fr/work/selvaggi.html` | — | Aucune | Contrôlé |
| `dist/fr/work/verne-jewels.html` | 51 | Nous | Conservé : le client et Nizzar ensemble. |
| `dist/fr/thinking.html` | — | Aucune | Contrôlé |
| `dist/fr/thinking/the-collapse.html` | 51 | nous | Conservé : le client et Nizzar ensemble. |
| `dist/fr/thinking/the-brief-before-the-brief.html` | — | Aucune | Contrôlé |
| `dist/fr/thinking/diagnosis-before-prescription.html` | — | Aucune | Contrôlé |
| `dist/fr/thinking/what-automation-should-earn.html` | — | Aucune | Contrôlé |
| `dist/fr/thinking/holding-a-decision.html` | — | Aucune | Contrôlé |
| `dist/fr/thinking/one-page-many-arguments.html` | — | Aucune | Contrôlé |
| `dist/fr/lab.html` | — | Aucune | Contrôlé |
| `dist/fr/lab/signal-scan.html` | — | Aucune | Contrôlé |
| `dist/fr/lab/the-brief-before-the-brief.html` | — | Aucune | Contrôlé |
| `dist/fr/about.html` | 51 | Nous | Conservé : le client et Nizzar ensemble. |
| `dist/fr/start.html` | — | Aucune | Contrôlé |
| `dist/fr/notes.html` | 51 | not a | Conservé : témoignage de Shelah J. cité mot pour mot (ou sa traduction FR). |

Les scripts JSON-LD et les attributs techniques sont exclus du comptage du texte de page. Les variables de template sont recherchées sur le HTML complet. Les occurrences légitimes de syntaxe JavaScript dans les sources ne sont pas des variables affichées aux visiteurs.

## Sources : occurrences avant et après

Les numéros « avant » se réfèrent au commit `76091a3`. Les numéros « après » se réfèrent aux fichiers de cette livraison. Les tableaux JavaScript ne sont pas traités comme des placeholders.

### src/pages.mjs

| État | Ligne | Catégorie | Occurrence | Note |
| --- | ---: | --- | --- | --- |
| Avant | 20 | tiret cadratin | — | Repérage de la version précédente. |
| Avant | 20 | tiret cadratin | — | Repérage de la version précédente. |
| Avant | 28 | tiret cadratin | — | Repérage de la version précédente. |
| Avant | 28 | tiret cadratin | — | Repérage de la version précédente. |
| Avant | 28 | tiret cadratin | — | Repérage de la version précédente. |
| Avant | 28 | tiret cadratin | — | Repérage de la version précédente. |
| Avant | 43 | tiret cadratin | — | Repérage de la version précédente. |
| Avant | 20 | formulation à examiner | not the | Repérage de la version précédente. |
| Avant | 28 | formulation à examiner | not the | Repérage de la version précédente. |
| Avant | 13 | pronom collectif | We | Repérage de la version précédente. |
| Avant | 13 | pronom collectif | Nous | Repérage de la version précédente. |
| Avant | 41 | pronom collectif | we | Repérage de la version précédente. |
| Avant | 41 | pronom collectif | we | Repérage de la version précédente. |
| Après | 14 | pronom collectif | We | Conservé : le client et Nizzar ensemble. |
| Après | 14 | pronom collectif | Nous | Conservé : le client et Nizzar ensemble. |
| Après | 43 | pronom collectif | we | Conservé : le client et Nizzar ensemble. |
| Après | 43 | pronom collectif | we | Conservé : le client et Nizzar ensemble. |
| Après | 22 | lieu ou nom géographique | New York | Conservé : nom propre explicitement demandé dans la barre de références. |
| Après | 22 | lieu ou nom géographique | Los Angeles | Conservé : nom propre explicitement demandé dans la barre de références. |

### src/shared.mjs

| État | Ligne | Catégorie | Occurrence | Note |
| --- | ---: | --- | --- | --- |
| Avant | 24 | tiret cadratin | — | Repérage de la version précédente. |
| Avant | 20 | formulation à examiner | not a | Repérage de la version précédente. |
| Avant | 20 | formulation à examiner | n’est pas | Repérage de la version précédente. |
| Avant | 36 | lieu ou nom géographique | African | Repérage de la version précédente. |
| Avant | 36 | lieu ou nom géographique | africain | Repérage de la version précédente. |
| Avant | 18 | pseudo ou plateforme | elvinpicardo | Repérage de la version précédente. |
| Avant | 19 | pseudo ou plateforme | tisasen | Repérage de la version précédente. |
| Avant | 20 | pseudo ou plateforme | shelahj | Repérage de la version précédente. |
| Après | 20 | formulation à examiner | not a | Conservé : témoignage de Shelah J. cité mot pour mot (ou sa traduction FR). |
| Après | 20 | formulation à examiner | n’est pas | Conservé : témoignage de Shelah J. cité mot pour mot (ou sa traduction FR). |

### src/articles.mjs

| État | Ligne | Catégorie | Occurrence | Note |
| --- | ---: | --- | --- | --- |
| Avant | 348 | tiret cadratin | — | Repérage de la version précédente. |
| Avant | 302 | formulation à examiner | instead of | Repérage de la version précédente. |
| Avant | 315 | formulation à examiner | rather than | Repérage de la version précédente. |
| Avant | 316 | formulation à examiner | not a | Repérage de la version précédente. |
| Avant | 318 | formulation à examiner | not a | Repérage de la version précédente. |
| Avant | 320 | formulation à examiner | rather than | Repérage de la version précédente. |
| Avant | 323 | formulation à examiner | rather than | Repérage de la version précédente. |
| Avant | 330 | formulation à examiner | au lieu de | Repérage de la version précédente. |
| Avant | 343 | formulation à examiner | plutôt que | Repérage de la version précédente. |
| Avant | 348 | formulation à examiner | plutôt que | Repérage de la version précédente. |
| Avant | 49 | pronom collectif | nous | Repérage de la version précédente. |
| Après | 49 | pronom collectif | nous | Conservé : le client et Nizzar ensemble. |

### src/cases.mjs

| État | Ligne | Catégorie | Occurrence | Note |
| --- | ---: | --- | --- | --- |
| Avant | — | — | Aucune occurrence | Contrôlé |
| Après | 158 | pronom collectif | us | Conservé : le client et Nizzar ensemble. |
| Après | 213 | pronom collectif | Nous | Conservé : le client et Nizzar ensemble. |

### scripts/build.mjs

| État | Ligne | Catégorie | Occurrence | Note |
| --- | ---: | --- | --- | --- |
| Avant | 161 | tiret cadratin | — | Repérage de la version précédente. |
| Avant | 162 | tiret cadratin | — | Repérage de la version précédente. |
| Avant | 186 | tiret cadratin | — | Repérage de la version précédente. |
| Avant | 193 | tiret cadratin | — | Repérage de la version précédente. |
| Avant | 246 | tiret cadratin | — | Repérage de la version précédente. |
| Avant | 247 | tiret cadratin | — | Repérage de la version précédente. |
| Avant | 254 | tiret cadratin | — | Repérage de la version précédente. |
| Après | 161 | tiret cadratin | — | Conservé : construction des titres, exception demandée. |
| Après | 162 | tiret cadratin | — | Conservé : construction des titres, exception demandée. |

### scripts/brochures.mjs

| État | Ligne | Catégorie | Occurrence | Note |
| --- | ---: | --- | --- | --- |
| Avant | 118 | tiret cadratin | — | Repérage de la version précédente. |
| Avant | 162 | pronom collectif | we | Repérage de la version précédente. |
| Avant | 163 | pronom collectif | we | Repérage de la version précédente. |
| Avant | 163 | pronom collectif | nous | Repérage de la version précédente. |
| Après | 162 | pronom collectif | we | Conservé : le client et Nizzar ensemble. |
| Après | 163 | pronom collectif | We | Conservé : le client et Nizzar ensemble. |
| Après | 163 | pronom collectif | Nous | Conservé : le client et Nizzar ensemble. |

### scripts/presentation.mjs

| État | Ligne | Catégorie | Occurrence | Note |
| --- | ---: | --- | --- | --- |
| Avant | — | — | Aucune occurrence | Contrôlé |
| Après | — | — | Aucune occurrence | Contrôlé |

### scripts/images.mjs

| État | Ligne | Catégorie | Occurrence | Note |
| --- | ---: | --- | --- | --- |
| Avant | — | — | Aucune occurrence | Contrôlé |
| Après | — | — | Aucune occurrence | Contrôlé |

### app.js

| État | Ligne | Catégorie | Occurrence | Note |
| --- | ---: | --- | --- | --- |
| Avant | 80 | tiret cadratin | — | Repérage de la version précédente. |
| Avant | 80 | tiret cadratin | — | Repérage de la version précédente. |
| Après | — | — | Aucune occurrence | Contrôlé |

Occurrences particulières corrigées : `src/pages.mjs:43` avant, deux expressions littérales `${contactEmail}` dans les textes EN/FR de confidentialité. `src/shared.mjs:18–20` avant, six attributions entre crochets, remplacées par les noms confirmés. Les expressions de template exécutables restent normalement présentes dans les générateurs.

## Les deux PDF

Textes extraits avec Poppler. Les lignes ci-dessous sont les lignes de la page PDF après extraction en mode mise en page. Contrôle visuel des dix pages et contrôle géométrique du gabarit : aucun débordement ni recouvrement du pied de page.

| Fichier | Page | Ligne extraite | Occurrence | Traitement |
| --- | ---: | ---: | --- | --- |
| `public/downloads/quantum-branding-brochure-en.pdf` | 5 | 33 | Scope and price are defined after we talk. | Le client et Nizzar. |
| `public/downloads/quantum-branding-brochure-en.pdf` | 5 | 34 | Tell me what needs to change. We will define the scope together. | Le client et Nizzar. |
| `public/downloads/quantum-branding-brochure-en.pdf` | 1–5 | — | Toutes les autres catégories : zéro | Cinq pages contrôlées. |
| `public/downloads/quantum-branding-brochure-fr.pdf` | 5 | 36 | Dites-moi ce qui doit changer. Nous définirons le périmètre ensemble. | Le client et Nizzar. |
| `public/downloads/quantum-branding-brochure-fr.pdf` | 1–5 | — | Toutes les autres catégories : zéro | Cinq pages contrôlées. |

## Cartographie des six illustrations

Tous les emplacements ont leur miroir français. Le cube quantum-box.svg est distinct des six fichiers demandés. Les fichiers et leurs affectations sont inchangés.

| Fichier | Emplacements EN et FR |
| --- | --- |
| `observe.svg` | `/` : Hero scene ; `/` : Observe ; `/practice` : Brand & Positioning ; `/practice` : Observe ; `/practice/method` : Observe ; `/lab` : Signal Scan |
| `mark.svg` | `/` : Hero scene ; `/practice` : Marketing & Sales ; `/lab` : BrandOS |
| `digital.svg` | `/` : Hero scene ; `/` : Hold ; `/practice` : Digital & Experience ; `/practice` : Hold ; `/practice/method` : Hold |
| `systems.svg` | `/` : Hero scene ; `/` : Build ; `/practice` : AI & Intelligent Systems ; `/practice` : Build ; `/practice/method` : Build |
| `learning.svg` | `/` : Hero scene ; `/practice` : AI Training & Adoption |
| `compass.svg` | `/` : Hero scene ; `/` : Collapse ; `/practice` : Business & Opportunity ; `/practice` : Collapse ; `/practice/method` : Collapse ; `/lab` : BrandOS |

Les collisions signalées sont bien présentes : observe = Observe / Brand & Positioning ; compass = Collapse / Business & Opportunity ; systems = Build / AI & Intelligent Systems ; digital = Hold / Digital & Experience. Observe et compass sont aussi employés dans le Lab. Mark et learning apparaissent dans le héros et dans leurs territoires respectifs ; mark illustre également BrandOS.

## Vérification et conservation du design

- 33 tests de contenu, navigation statique, métadonnées et régressions : passés.
- 52 chargements navigateur : passés, avec menus, EN/FR, téléchargements et brief.
- 168 mesures responsive : passées, sans débordement.
- 38 empreintes éditoriales enregistrées pour cette passe explicitement demandée ; 84 contrôles de largeurs limites, mouvement réduit et menu clavier : passés. L’ancienne référence reste archivée.
- Audit complémentaire : 38 pages à 390 et 1440 px, soit 76 contrôles, et arbre accessible du fondateur.
- `styles.css`, `assets/visual-restoration.css`, les illustrations, polices et `scripts/presentation.mjs` n’ont aucun changement depuis `76091a3`.
- Les règles CSS embarquées des brochures et images de partage sont inchangées. Les ajouts réutilisent les composants existants.

Les trois années historiques constituent le seul contenu demandé encore dépendant d’une réponse du propriétaire. Leur absence ne bloque pas les autres corrections ni le déploiement demandé.
