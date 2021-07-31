# Comment j'ai réalisé ce template :

- utilisation de firebase authentification de google
  - pour microsoft, passer par azur depuis compte perso, puis azure active directory,
  créer une nouvelle application et copier l'id, créer un secret à coller dans firebase
  - pour github
  aller sur le compte, settings, developper settings, puis OAuth Apps, créer l'application, créer ensuite le secret,
  puis copier l'id et le secret dans firebase
- pour firebase, utilisation du sdk js et de la library
- Les classes :
  - une classe display permet d'afficher toutes les informations à l'utilisateur en fonction des erreurs
  - une classe user contient les informations des utilisateurs ainsi que les méthodes qui lui sont liés
- dans angular.json, rajouter dans app -> architect -> build -> options :
  "allowedCommonJsDependencies": ["lodash"]
  - permet de supprimer les erreurs dûe au sdk


# A améliorer :

- faire un dossier contenant toutes les pages de login, pour les séparer du reste de l'application
- passer par la realtime database d'angular plutôt que par authentification si besoin de stocker plus d'informations
