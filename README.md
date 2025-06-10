# 🚢 Projet de Réservation de Ferry

### 👥 Collaborateurs

👤 Kilian POUSSARD

👤 Yasmina BRAVO

👤 Marc LOULEMBO

👤 Lilyan CHAUVEAU

👤 César MOREAU

# ⚙️ Commandes Backend
**📁 A la racine du dossier :**

🪟 Windows
```bash
./runback.ps1 start        # 🚀 Démarre l'application Spring Boot + BDD
./runback.ps1 stop         # 🛑 Arrête l'application
./runback.ps1 restart      # 🔄 Redémarre l'application
./runback.ps1 build        # 🧱 Nettoie et compile le projet
```
🔧 Si un problème empêche l'exécution des scripts PowerShell :
```bash
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```
🐧 Linux / MacOS
```bash
./runback start            # 🚀 Démarre l'application Spring Boot
./runback stop             # 🛑 Arrête l'application
./runback restart          # 🔄 Redémarre l'application
./runback build            # 🧱 Nettoie et compile le projet
./runback run              # 🧱 lance le projet complet (bdd + java)
```
## 🗄️ Commandes Base de Données
**📁 Depuis le dossier /database/ :**

🪟 Windows
```bash
./runback.ps1 db:start     # 🟢 Démarre MySQL & phpMyAdmin
./runback.ps1 db:stop      # 🔴 Arrête la base de données
./runback.ps1 db:restart   # ♻️ Redémarre la base de données
```
🐧 Linux / MacOS
```bash
./runback db:start         # 🟢 Démarre MySQL & phpMyAdmin
./runback db:stop          # 🔴 Arrête la base de données
./runback db:restart       # ♻️ Redémarre la base de données
./runback db:logs          # 📜 Affiche les logs de la BDD
```

## 📚 Documentation de l'API

Une fois le backend démarré, vous pouvez accéder à la documentation interactive de l'API via Swagger :

[🔗 http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)




# ⚙️ Commandes Frontend
**📁 Depuis le dossier /front/resa/ :**
```bash
npm install        # 📦 Installe les dépendances
npm run dev        # 🚀 Lance le serveur de développement Vite
```


## ✅ Prérequis

☕ Java

📦 Maven

🐘 Wamp (pour le serveur MySQL et phpMyAdmin)
