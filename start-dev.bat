@echo off
echo Starting development environment...

start "" /B /WAIT cmd /c "npm run dev"
start "" /B /WAIT cmd /c "node --import tsx server/index.ts"

echo Development environment started. Press any key to exit...
pause > nul
