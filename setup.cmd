@ECHO OFF
:: This file can now be deleted!
:: It was used when setting up the package solution (using https://github.com/LottePitcher/opinionated-package-starter)

:: set up git
git init
git branch -M main
git remote add origin https://github.com/stevetemple/Umbraco.Community.Skrivlet.git

:: ensure latest Umbraco templates used
dotnet new install Umbraco.Templates --force

:: use the umbraco-extension dotnet template to add the package project
cd src
dotnet new umbraco-extension -n "Umbraco.Community.Skrivlet" --site-domain "https://localhost:44373" --include-example

:: replace package .csproj with the one from the template so has nuget info
cd Umbraco.Community.Skrivlet
del Umbraco.Community.Skrivlet.csproj
ren Umbraco.Community.Skrivlet_nuget.csproj Umbraco.Community.Skrivlet.csproj

:: add project to solution
cd..
dotnet sln add "Umbraco.Community.Skrivlet"

:: add reference to project from test site
dotnet add "Umbraco.Community.Skrivlet.TestSite/Umbraco.Community.Skrivlet.TestSite.csproj" reference "Umbraco.Community.Skrivlet/Umbraco.Community.Skrivlet.csproj"
