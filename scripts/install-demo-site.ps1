# Demo Site Setup Script
# Creates a local Umbraco site referencing this repo's Umbraco.Community.SkrivLet project, installs
# uSync, and imports a Home doctype/content seed (with a SkrivLet property as its main content editor)
# so the package can be exercised without building any of that by hand.

param(
    [switch]$SkipTemplateInstall,
    [switch]$Force
)

$ErrorActionPreference = "Stop"

# Determine repository root (parent of scripts folder)
$ScriptDir = $PSScriptRoot
$RepoRoot = (Resolve-Path (Split-Path -Parent $ScriptDir)).Path

# Change to repository root to ensure consistent behavior
Push-Location $RepoRoot

Write-Host "=== Umbraco.Community.SkrivLet Demo Site Setup ===" -ForegroundColor Cyan
Write-Host "Working directory: $RepoRoot" -ForegroundColor Gray
Write-Host ""

# Read the Umbraco template version straight out of the library's csproj so this stays in
# lockstep with whatever Umbraco major this package currently targets. The package reference
# is a version range (e.g. "[17.4.2, 19.0.0)"), so we take the lower bound as the template version.
$csprojPath = Join-Path $RepoRoot "src\Umbraco.Community.Skrivlet\Umbraco.Community.Skrivlet.csproj"
if (-not (Test-Path $csprojPath)) {
    Write-Host "ERROR: Could not find $csprojPath" -ForegroundColor Red
    exit 1
}
$csprojContent = Get-Content $csprojPath -Raw
if ($csprojContent -match 'Umbraco\.Cms\.Web\.Website"\s+Version="\[?([^,\]"]+)') {
    $TemplateVersion = $matches[1]
} else {
    Write-Host "ERROR: Could not find the Umbraco.Cms.Web.Website version in $csprojPath" -ForegroundColor Red
    exit 1
}
$VersionMajor = [int]($TemplateVersion -split '\.')[0]
$IsTemplatePrerelease = $TemplateVersion -match '-'
Write-Host "Target Umbraco.Cms template version: $TemplateVersion (v$VersionMajor)" -ForegroundColor Gray
Write-Host ""

$DemoDir = "demo"
$DemoSiteName = "Umbraco.Community.Skrivlet.DemoSite"
$DemoSiteDir = "$DemoDir\$DemoSiteName"
$SolutionName = "Umbraco.Community.Skrivlet.local"
$LibraryProject = "src\Umbraco.Community.Skrivlet\Umbraco.Community.Skrivlet.csproj"
$USyncSeedDir = "scripts\uSync-seed"
# uSync's on-disk folder format stayed at "v9" all the way through its Umbraco 8-13 releases -
# it only started aligning the folder name with the Umbraco CMS major version from v14 onwards.
# So for Umbraco 14+ demo sites (this one targets v17+), uSync expects uSync/v<major>, not uSync/v9.
if ($VersionMajor -ge 14) {
    $USyncVersionFolder = "v$VersionMajor"
} else {
    $USyncVersionFolder = "v9"
}

# Check if demo already exists
if ((Test-Path $DemoDir) -and -not $Force) {
    Write-Host "Demo folder '$DemoDir' already exists. Use -Force to recreate." -ForegroundColor Yellow
    Write-Host "Or open the existing $SolutionName.slnx" -ForegroundColor Yellow
    Pop-Location
    return
}

# Clean up existing demo if Force
if ($Force -and (Test-Path $DemoDir)) {
    Write-Host "Removing existing demo folder '$DemoDir'..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force $DemoDir
}

if ($Force -and (Test-Path "$SolutionName.slnx")) {
    Remove-Item -Force "$SolutionName.slnx"
}

# Step 1: Install Umbraco templates
if (-not $SkipTemplateInstall) {
    Write-Host "Installing Umbraco templates ($TemplateVersion)..." -ForegroundColor Green

    # Uninstall any existing version to avoid conflicts
    Write-Host "Removing any existing Umbraco.Templates installations..." -ForegroundColor Gray
    $installedTemplates = dotnet new uninstall 2>&1 | Out-String
    if ($installedTemplates -match "Umbraco\.Templates") {
        try {
            dotnet new uninstall Umbraco.Templates 2>&1 | Out-Null
        } catch {
            # Ignore errors during uninstall
        }
    }

    if ($IsTemplatePrerelease) {
        # Prerelease templates require the umbracoprereleases MyGet feed to be configured.
        # If not yet configured: dotnet nuget add source https://www.myget.org/F/umbracoprereleases/api/v3/index.json --name UmbracoPreReleases
        Write-Host "NOTE: Prerelease template ($TemplateVersion) requires the umbracoprereleases MyGet source." -ForegroundColor Yellow
    }
    dotnet new install "Umbraco.Templates::$TemplateVersion" --force
}

# Step 2: Create the Umbraco demo site
Write-Host "Creating demo folder '$DemoDir'..." -ForegroundColor Green
New-Item -ItemType Directory -Path $DemoDir -Force | Out-Null

Write-Host "Creating Umbraco demo site..." -ForegroundColor Green
Push-Location $DemoDir
dotnet new umbraco --force -n $DemoSiteName --friendly-name "Administrator" --email "admin@example.com" --password "password1234" --development-database-type SQLite
Pop-Location

$demoProject = "$DemoSiteDir\$DemoSiteName.csproj"

# Step 3: Add project reference to Umbraco.Community.SkrivLet
Write-Host "Adding project reference to Umbraco.Community.SkrivLet..." -ForegroundColor Green
dotnet add $demoProject reference $LibraryProject

# Step 4: Install uSync so the demo content below can be imported/re-exported as disk files
Write-Host "Installing uSync..." -ForegroundColor Green
$USyncVersion = $null
try {
    $USyncVersions = (Invoke-RestMethod -Uri "https://api.nuget.org/v3-flatcontainer/usync/index.json" -TimeoutSec 10).versions
    $USyncVersion = $USyncVersions | Where-Object { $_ -match "^$VersionMajor\." -and $_ -notmatch '-' } | Select-Object -Last 1
} catch {
    Write-Host "NOTE: Could not query nuget.org for the latest uSync version ($($_.Exception.Message))." -ForegroundColor Yellow
}
if ($USyncVersion) {
    dotnet add $demoProject package uSync --version $USyncVersion
} else {
    Write-Host "Falling back to a floating version range for uSync." -ForegroundColor Yellow
    dotnet add $demoProject package uSync --version "$VersionMajor.*"
}

# Step 5: Copy the demo View and CSS (a "home" content template that renders the
# SkrivLet-powered "content" property via the RenderSkrivLet extension).
Write-Host "Copying demo templates and CSS..." -ForegroundColor Green
$demoTemplatesDir = "scripts\demo-templates"
New-Item -ItemType Directory -Path "$DemoSiteDir\Views" -Force | Out-Null
Copy-Item -Path "$demoTemplatesDir\Views\*" -Destination "$DemoSiteDir\Views" -Recurse -Force
New-Item -ItemType Directory -Path "$DemoSiteDir\wwwroot\css" -Force | Out-Null
Copy-Item -Path "$demoTemplatesDir\wwwroot\css\*" -Destination "$DemoSiteDir\wwwroot\css" -Recurse -Force

# Step 6: Copy the checked-in uSync seed content (the Home doctype/template + demo homepage)
# into the site, and ask uSync to import it on startup so the demo site boots with content
# already in place.
Write-Host "Copying uSync seed content..." -ForegroundColor Green
$seedSource = Join-Path $USyncSeedDir $USyncVersionFolder
if (Test-Path $seedSource) {
    $seedTarget = "$DemoSiteDir\uSync\$USyncVersionFolder"
    New-Item -ItemType Directory -Path $seedTarget -Force | Out-Null
    Copy-Item -Path "$seedSource\*" -Destination $seedTarget -Recurse -Force
} else {
    Write-Host "NOTE: No uSync seed folder found at $seedSource for $USyncVersionFolder - skipping content seed." -ForegroundColor Yellow
}

Write-Host "Enabling uSync import at startup..." -ForegroundColor Green
$devSettingsPath = "$DemoSiteDir\appsettings.Development.json"
$devSettings = Get-Content $devSettingsPath -Raw | ConvertFrom-Json
$uSyncSettings = [PSCustomObject]@{
    Settings = [PSCustomObject]@{
        ImportAtStartup = "All"
    }
}
$devSettings | Add-Member -NotePropertyName "uSync" -NotePropertyValue $uSyncSettings -Force
$devSettings | ConvertTo-Json -Depth 10 | Out-File -FilePath $devSettingsPath -Encoding utf8 -Force

# Step 7: Create unified solution
Write-Host "Creating unified solution..." -ForegroundColor Green
dotnet new sln -n $SolutionName --force
dotnet sln "$SolutionName.slnx" add $LibraryProject --solution-folder "Library"
dotnet sln "$SolutionName.slnx" add $demoProject --solution-folder "Demo"

Write-Host ""
Write-Host "=== Setup Complete! ===" -ForegroundColor Green
Write-Host ""
Write-Host "Solution: $SolutionName.slnx" -ForegroundColor Cyan
Write-Host "Demo site: $DemoSiteDir" -ForegroundColor Cyan
Write-Host ""
Write-Host "Credentials:" -ForegroundColor Yellow
Write-Host "  Email: admin@example.com"
Write-Host "  Password: password1234"
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "  1. Open $SolutionName.slnx in your IDE, build, and run the $DemoSiteName project."
Write-Host "  2. uSync is set to import at startup, but if the doctype/content don't appear,"
Write-Host "     log into /umbraco and run the import manually from the uSync dashboard."
Write-Host "  3. The homepage's 'Content' property uses the SkrivLet editor - open it in the"
Write-Host "     backoffice to see it in action, or view / to see the front-end render."
Write-Host ""

# Restore original directory
Pop-Location
