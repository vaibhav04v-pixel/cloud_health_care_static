@echo off
echo Starting CloudCare Hospital Website...
echo.
echo Choose your preferred method:
echo 1. Python HTTP Server (Port 8000)
echo 2. Node.js HTTP Server (Port 8000)
echo 3. Open directly in browser
echo.
set /p choice="Enter your choice (1-3): "

if "%choice%"=="1" (
    echo Starting Python server...
    python -m http.server 8000
) else if "%choice%"=="2" (
    echo Starting Node.js server...
    npx http-server -p 8000
) else if "%choice%"=="3" (
    echo Opening website in browser...
    start index.html
) else (
    echo Invalid choice. Opening in browser...
    start index.html
)

echo.
echo Website should be running now!
echo If using server, visit: http://localhost:8000
pause


