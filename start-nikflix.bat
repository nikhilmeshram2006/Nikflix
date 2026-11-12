@echo off
title Nikflix Local Server
cd /d "%~dp0"
echo Starting Nikflix on http://localhost:8080/ ...
start "" "http://localhost:8080/"
python -m http.server 8080

