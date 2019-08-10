# RecentWatched

## OverView
Add a list of recently viewed products on akizukidenshi.com.

## Development Environment
 * Launguage: JavaScript
 * Execution: Google Chrome(75.0.3770.142)

## Contents
 * script.js: main source
 * manifest.json: extesion manifest file
 * icon48.png: icon(48x48)
 
##Usage

### Installation
 1. Clone this repository.
 2. Access `chrome://extensions` on Google Chrome.
 3. Enable `Developer Mode`.
 4. Press `Install unpackaged extension` and select this folder to install it.

### On product page
On product page(`http://akizukidenshi.com/catalog/g/*/`), product code is added to localStorage(`list`).  

### On home page
On home page(`http://akizukidenshi.com/catalog/top.aspx`), the content of localStorage(`list`) is showed as "recent watched products"list.  
Click each cell and jump to corresponding product codes page.