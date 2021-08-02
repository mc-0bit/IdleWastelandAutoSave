# IdleWastelandAutoSave
Node.js application for the game [Idle Wasteland](https://store.steampowered.com/app/1658620/Idle_Wasteland/) that makes automatic backups with the ability to automatically revert back to the lastest working save file if the save file of the game gets corrupted.

# How to use 
1. Download the most recent executable from the [releases](https://github.com/mc-0bit/IdleWastelandAutoSave/releases/latest).
2. (Optional) Download the Idle Wastland icon that is attached to a release.
3. Place the executable wherever you like.
4. (Optional) Create a shortcut to the executable and place that shortcut on your desktop.
5. (Optional) Replace the icon of the shortcut with the Idle Wastland one.
6. Start the app. You do not need to open the game before since the app will start Idle Wastland.
7. A config file will be created next to the executable.
8. By default the app will make a backup every 15 minutes into ```C:\\Users\\%USERNAME%\\Desktop\\IdleWastelandBackup```.
9. To configure this behavior edit the config file. 

# How to "compile" it yourself (requires nodejs to be installed)
1. Clone or download this repository
2. Run ```npm install```
3. Install [pkg](https://www.npmjs.com/package/pkg) globally 
4. Run ```pkg -t win .\app.js```

# Configuration
- savefilepath: ```holds the path to the save file```
- backupfolder: ```backups will be stored under this path```
- interval: ```interval in which a backup is created in minutes```
- autorestore: ```tries to automatically detect if a save is corrupted and restore it if that is the case when set to true```