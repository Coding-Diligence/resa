@echo off
setlocal enabledelayedexpansion

:: Couleurs pour les messages
set "GREEN=[92m"
set "RED=[91m"
set "YELLOW=[93m"
set "NC=[0m"

:: Contextes
set "CONTEXT_BACK=back"
set "CONTEXT_DATABASE=database"
set "CONTEXT_FRONT=front"
set "CONTEXT_APP_NAME=resa"

:: Fonction pour afficher les messages
:print_message
echo %GREEN%[INFO]%NC% %~1
goto :eof

:: Fonction pour afficher les erreurs
:print_error
echo %RED%[ERROR]%NC% %~1
goto :eof

:: Fonction pour afficher les avertissements
:print_warning
echo %YELLOW%[WARNING]%NC% %~1
goto :eof

:: Vérifier si Maven est installé
where mvn >nul 2>nul
if %ERRORLEVEL% neq 0 (
    call :print_warning "Maven n'est pas installé."
    set /p "INSTALL_MAVEN=Voulez-vous l'installer maintenant ? (y/n) "
    if /i "!INSTALL_MAVEN!"=="y" (
        call :print_message "Installation de Maven..."
        winget install Apache.Maven
    ) else (
        call :print_error "Maven est requis pour exécuter l'application."
        exit /b 1
    )
)

:: Vérifier si Java est installé
where java >nul 2>nul
if %ERRORLEVEL% neq 0 (
    call :print_error "Java n'est pas installé. Veuillez l'installer d'abord."
    exit /b 1
)

:: Vérifier si Docker est installé
where docker >nul 2>nul
if %ERRORLEVEL% neq 0 (
    call :print_error "Docker n'est pas installé. Veuillez l'installer d'abord."
    exit /b 1
)

:: Fonction pour démarrer l'application
:start_app
call :print_message "Démarrage de l'application %GREEN%%CONTEXT_APP_NAME%%NC%..."
cd %CONTEXT_BACK%
call mvn spring-boot:run
cd ..
goto :eof

:: Fonction pour nettoyer et compiler
:clean_build
call :print_message "Nettoyage et compilation du projet..."
cd %CONTEXT_BACK%
call mvn clean install
cd ..
goto :eof

:: Fonction pour arrêter l'application
:stop_app
call :print_message "Arrêt de l'application %GREEN%%CONTEXT_APP_NAME%%NC%..."
taskkill /F /IM java.exe /FI "WINDOWTITLE eq spring-boot:run"
goto :eof

:: Fonction pour démarrer la base de données
:start_db
call :print_message "Démarrage de la base de données..."
cd %CONTEXT_DATABASE%
docker-compose up -d
cd ..
goto :eof

:: Fonction pour arrêter la base de données
:stop_db
call :print_message "Arrêt de la base de données..."
cd %CONTEXT_DATABASE%
docker-compose down
cd ..
goto :eof

:: Fonction pour redémarrer la base de données
:restart_db
call :stop_db
timeout /t 2 /nobreak >nul
call :start_db
goto :eof

:: Fonction pour voir les logs de la base de données
:logs_db
call :print_message "Affichage des logs de la base de données..."
cd %CONTEXT_DATABASE%
docker-compose logs -f
cd ..
goto :eof

:: Fonction pour exécuter l'application complète
:run
call :print_message "Démarrage de l'environnement complet %GREEN%%CONTEXT_APP_NAME%%NC%..."
call :start_db
start /B cmd /c "call :start_app"
set "APP_PID=!ERRORLEVEL!"

:: Gérer le Ctrl+C
:loop
timeout /t 1 /nobreak >nul
tasklist | find "java.exe" >nul
if %ERRORLEVEL% equ 0 goto loop

call :print_message "Arrêt de l'environnement %GREEN%%CONTEXT_APP_NAME%%NC%..."
call :stop_app
call :stop_db
goto :eof

:: Gestion des arguments
if "%~1"=="" goto :usage

if "%~1"=="start" (
    call :start_app
) else if "%~1"=="stop" (
    call :stop_app
) else if "%~1"=="restart" (
    call :stop_app
    timeout /t 2 /nobreak >nul
    call :start_app
) else if "%~1"=="build" (
    call :clean_build
) else if "%~1"=="db:start" (
    call :start_db
) else if "%~1"=="db:stop" (
    call :stop_db
) else if "%~1"=="db:restart" (
    call :restart_db
) else if "%~1"=="db:logs" (
    call :logs_db
) else if "%~1"=="run" (
    call :run
) else (
    echo Invalid option: %~1
    goto :usage
)
goto :eof

:usage
echo Usage: %0 {start^|stop^|restart^|build^|db:start^|db:stop^|db:restart^|db:logs^|run}
echo Commands:
echo   start       - Start the application
echo   stop        - Stop the application
echo   restart     - Restart the application
echo   build       - Clean and build the application
echo   db:start    - Start the database
echo   db:stop     - Stop the database
echo   db:restart  - Restart the database
echo   db:logs     - Show database logs
echo   run         - Start database and application with Ctrl+C handling
exit /b 1 