<#
.SYNOPSIS
Script pour gérer l'application Spring Boot avec WAMP comme serveur de base de données

.DESCRIPTION
Ce script permet de :
- Démarrer/arrêter/redémarrer l'application
- Nettoyer et compiler le projet
- Vérifier et gérer l'état de WAMP pour la base de données
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

# Fonction pour vérifier si WAMP est installé
function Test-WampInstalled {
    $wampPath = "C:\wamp64\wampmanager.exe"
    return (Test-Path $wampPath)
}

# Fonction pour vérifier si WAMP est en cours d'exécution
function Test-WampRunning {
    return (Get-Process -Name "wampmanager" -ErrorAction SilentlyContinue) -ne $null
}

# Fonction pour démarrer WAMP
function Start-Wamp {
    if (-not (Test-WampInstalled)) {
        Print-Error "WAMP n'est pas installé ou le chemin par défaut est incorrect."
        Print-Message "Veuillez installer WAMP depuis http://www.wampserver.com/"
        exit 1
    }
    
    if (-not (Test-WampRunning)) {
        Print-Message "Démarrage de WAMP..."
        Start-Process "C:\wamp64\wampmanager.exe"
        
        # Attendre que les services WAMP soient complètement démarrés
        $timeout = 60 # 60 secondes max d'attente
        $started = $false
        for ($i = 0; $i -lt $timeout; $i++) {
            try {
                $mysqlService = Get-Service -Name "wampmysqld64" -ErrorAction Stop
                if ($mysqlService.Status -eq "Running") {
                    $started = $true
                    break
                }
            } catch {
                # Le service n'est pas encore disponible
            }
            Start-Sleep -Seconds 1
        }
        
        if (-not $started) {
            Print-Warning "WAMP a pris trop de temps à démarrer. Vérifiez manuellement."
        } else {
            Print-Message "WAMP et MySQL sont maintenant démarrés"
        }
    } else {
        Print-Message "WAMP est déjà en cours d'exécution"
    }
}

# Fonction pour arrêter WAMP
function Stop-Wamp {
    if (Test-WampRunning) {
        Print-Message "Arrêt de WAMP..."
        Stop-Process -Name "wampmanager" -Force
        
        # Arrêt des services WAMP
        try {
            Stop-Service -Name "wampmysqld64" -Force -ErrorAction Stop
            Print-Message "Service MySQL arrêté"
        } catch {
            Print-Warning "Impossible d'arrêter le service MySQL: $_"
        }
    } else {
        Print-Message "WAMP n'est pas en cours d'exécution"
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

# Fonction pour démarrer l'application
function Start-App {
    Print-Message "Démarrage de l'application..."
    Set-Location back
    mvn spring-boot:run
}

# Fonction pour nettoyer et compiler
function Clean-Build {
    Print-Message "Nettoyage et compilation du projet..."
    Set-Location back
    mvn clean install
}

# Fonction pour arrêter l'application
function Stop-App {
    Print-Message "Arrêt de l'application..."
    Get-Process java | Where-Object { $_.CommandLine -like "*spring-boot:run*" } | Stop-Process -Force
}

# Gestion des arguments
if ($args.Count -eq 0) {
    Write-Host "Usage: .\runback.ps1 {start|stop|restart|build|db:start|db:stop|db:restart}"
    Write-Host "Commands:"
    Write-Host "  start       - Démarrer l'application et vérifier WAMP"
    Write-Host "  stop        - Arrêter l'application"
    Write-Host "  restart     - Redémarrer l'application"
    Write-Host "  build       - Nettoyer et compiler l'application"
    Write-Host "  db:start    - Démarrer WAMP et MySQL"
    Write-Host "  db:stop     - Arrêter WAMP et MySQL"
    Write-Host "  db:restart  - Redémarrer WAMP et MySQL"
    exit 1
}

switch ($args[0]) {
    "start" {
        # Vérifier et démarrer WAMP si nécessaire
        if (-not (Test-WampRunning)) {
            Print-Warning "WAMP n'est pas démarré, démarrage en cours..."
            Start-Wamp
        }
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
        Start-Wamp
    }
    "db:stop" {
        Stop-Wamp
    }
    "db:restart" {
        Stop-Wamp
        Start-Sleep -Seconds 5
        Start-Wamp
    }
    default {
        Write-Host "Option invalide: $($args[0])"
        Write-Host "Utilisation: .\runback.ps1 {start|stop|restart|build|db:start|db:stop|db:restart}"
        exit 1
    }
}