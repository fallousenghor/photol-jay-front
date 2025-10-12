# TODO: Intégration Authentification Frontend

- [x] Mettre à jour app.config.ts pour ajouter provideHttpClient
- [x] Créer models/user.interface.ts avec interfaces User, RegisterRequest, LoginRequest, LoginResponse
- [x] Créer services/auth.service.ts avec méthodes register et login, gestion du token
- [x] Modifier signup.component.html : changer "Nom complet" en "Nom d'utilisateur"
- [x] Mettre à jour signup.component.ts : ajouter ReactiveFormsModule, FormGroup, logique d'inscription
- [x] Mettre à jour login.component.ts : ajouter ReactiveFormsModule, FormGroup, logique de connexion
- [x] Tester l'intégration : lancer backend et frontend, tester inscription et connexion
