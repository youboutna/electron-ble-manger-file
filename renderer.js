// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

/*
Use object literal notation to create two objects
 */
const {app,shell, BrowserWindow,webContents,ipcRenderer,commandLine}=require('electron');

const fs = require('fs');
/**
 * We create an object from electron module. The shell object allows us to open the selected file
 */
function readFolder(path) {
    fs.readdir(path, (err, files) => {
        'use strict';
        if (err) throw  err;
        //Dynamically add <ol> tags to the div
        document.getElementById('listed-files').innerHTML = `<ol id="display-files"></ol>`;
        for (let file of files) {
            fs.stat(path + file, (err, stats) => {

                console.log(path+" path"+file)
                /**
                 *When you double click on a folder or file, we need to obtain the path and name so that we can use it to take action. The easiest way to obtain the path and name for each file and folder, is to store that information in the element itself, as an ID. this is possible since we cannot have two files with the same name in a folder. theID variable below is created by concatenating the path with file name and a / at the end. As indicated earlier, we must have the / at the end of the path.
                 *
                 */
                let theID = `${path}${file}/`;
                if (err) throw err;
                if (stats.isDirectory()) {
                    /**
                     * Add an ondblclick event to each item. With folders, call this same function (recursion) to read the contents of the folder. If its a file, call the openFile function to open the file with the default app.
                     *
                     */
                    document.getElementById('display-files').innerHTML += `<li id=${theID} ondblclick="readFolder(this.id)"><i class="fa fa-folder-open"></i> ${file}</li>`;
                }
                else {
                    document.getElementById('display-files').innerHTML += `<li id=${theID} ondblclick="openFile(this.id)"><i class="fa fa-file"></i> ${file}</li>`;
                }
            });
        }
    });
}
//open the file with the default application
function openFile(path) {
    console.log(path)
    if(path.isDirectory){
        array.forEach(element => {
            shell.openItem(path);
        });
    }
    shell.openItem(path);
}


//call fonction
// console.log(`${__dirname}/data/`)

 readFolder('./data/')


