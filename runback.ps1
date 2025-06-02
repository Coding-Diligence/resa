<#
.SYNOPSIS
Script pour gérer l'application Spring Boot et la base de données MySQL avec Docker

.DESCRIPTION
Ce script permet de :
- Démarrer/arrêter/redémarrer l'application
- Nettoyer et compiler le projet
- Gérer la base de données (démarrer/arrêter/redémarrer/afficher les logs)
#>
$env:JAVA_HOME = "C:\Program Files\Eclipse Adoptium\jdk-17.0.15.6-hotspot"
# Couleurs pour les messages
$Green = "Green"
$Red = "Red"
$Yellow = "Yellow"

# Fonction pour afficher les messages
function Print-Message {
    param([string]$message)
    Write-Host "[INFO] $message" -ForegroundColor $Green
}

function Print-Error {
    param([string]$message)
    Write-Host "[ERROR] $message" -ForegroundColor $Red
}

function Print-Warning {
    param([string]$message)
    Write-Host "[WARNING] $message" -ForegroundColor $Yellow
}

# Fonction pour installer Maven
function Install-Maven {
    Print-Message "Installation de Maven..."
    try {
        choco install maven -y
        Print-Message "Maven installé avec succès"
    } catch {
        Print-Error "Échec de l'installation de Maven"
        Print-Message "Vous pouvez l'installer manuellement depuis https://maven.apache.org/download.cgi"
        exit 1
    }
}

# Vérifier si Maven est installé
if (-not (Get-Command mvn -ErrorAction SilentlyContinue)) {
    Print-Warning "Maven n'est pas installé."
    $response = Read-Host "Voulez-vous l'installer maintenant ? (y/n)"
    if ($response -eq 'y') {
        # Vérifier si Chocolatey est installé
        if (-not (Get-Command choco -ErrorAction SilentlyContinue)) {
            Print-Message "Installation de Chocolatey (package manager pour Windows)..."
            Set-ExecutionPolicy Bypass -Scope Process -Force
            [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072
            iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
        }
        Install-Maven
    } else {
        Print-Error "Maven est requis pour exécuter l'application."
        exit 1
    }
}

# Vérifier si Java est installé
if (-not (Get-Command java -ErrorAction SilentlyContinue)) {
    Print-Error "Java n'est pas installé. Veuillez l'installer d'abord."
    exit 1
}

# Vérifier si Docker est installé
if (-not (Get-Command docker -ErrorAction SilentlyContinue)) {
    Print-Error "Docker n'est pas installé. Veuillez l'installer d'abord."
    exit 1
}

# Fonction pour démarrer l'application
function Start-App {
    Print-Message "Démarrage de l'application..."
    mvn spring-boot:run
}

# Fonction pour nettoyer et compiler
function Clean-Build {
    Print-Message "Nettoyage et compilation du projet..."
    mvn clean install
}

# Fonction pour arrêter l'application
function Stop-App {
    Print-Message "Arrêt de l'application..."
    Get-Process java | Where-Object { $_.CommandLine -like "*spring-boot:run*" } | Stop-Process -Force
}

# Fonction pour démarrer la base de données
function Start-Db {
    Print-Message "Démarrage de la base de données..."
    Set-Location database
    docker-compose up -d
    Set-Location ..
}

# Fonction pour arrêter la base de données
function Stop-Db {
    Print-Message "Arrêt de la base de données..."
    Set-Location database
    docker-compose down
    Set-Location ..
}

# Fonction pour redémarrer la base de données
function Restart-Db {
    Stop-Db
    Start-Sleep -Seconds 2
    Start-Db
}

# Fonction pour voir les logs de la base de données
function Show-DbLogs {
    Print-Message "Affichage des logs de la base de données..."
    Set-Location database
    docker-compose logs -f
    Set-Location ..
}

# Gestion des arguments
if ($args.Count -eq 0) {
    Write-Host "Usage: .\runback.ps1 {start|stop|restart|build|db:start|db:stop|db:restart|db:logs}"
    Write-Host "Commands:"
    Write-Host "  start       - Start the application and database"
    Write-Host "  stop        - Stop the application"
    Write-Host "  restart     - Restart the application"
    Write-Host "  build       - Clean and build the application"
    Write-Host "  db:start    - Start the database"
    Write-Host "  db:stop     - Stop the database"
    Write-Host "  db:restart  - Restart the database"
    Write-Host "  db:logs     - Show database logs"
    exit 1
}

switch ($args[0]) {
    "start" {
        Start-Db
        Start-App
    }
    "stop" {
        Stop-App
    }
    "restart" {
        Stop-App
        Start-Sleep -Seconds 2
        Start-App
    }
    "build" {
        Clean-Build
    }
    "db:start" {
        Start-Db
    }
    "db:stop" {
        Stop-Db
    }
    "db:restart" {
        Restart-Db
    }
    "db:logs" {
        Show-DbLogs
    }
    default {
        Write-Host "Option invalide: $($args[0])"
        Write-Host "Utilisation: .\runback.ps1 {start|stop|restart|build|db:start|db:stop|db:restart|db:logs}"
        exit 1
    }
}