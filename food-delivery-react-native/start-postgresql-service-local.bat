::Attention, it is script for my local machine, because I turned off automatic start of Postgres. So to avoid visiting services.msc and starting it manually after every PC turn on - I saved it to bat script
@echo off
REM Replace 'ServiceName' with the actual name of the service you want to start
net start "postgresql-x64-14"

REM Optional: Add a pause to see the output
pause
