const express = require('express')
const path = require('path')
const {app, Tray, Menu, BrowserWindow} = require('electron')

let callWindow

const createCallWindow = () => {
    callWindow = new BrowserWindow({
        width: 300, 
        height: 500, 
        resizable: false, 
        center: true, 
        show: false
    })
}

const q = () => {
    let app = express()
    app.set('views', __dirname + '/views');
    app.set('view engine', 'pug')

    app.get('/', function (req, res) {
      res.render('index')
    })

    app.get('/call/:number', function (req, res) {
      let number = req.params.number
      res.render('call', {number: number})
    })

    app.get('/notify/:number', (req, res) => {
      console.log('/notify')
      
      let number = req.params.number
      callWindow.loadURL('http://localhost:3000/call/' + number)
      callWindow.show()

      //callWindow.webContents.openDevTools()

      res.send('ok')
    })
 
    app.listen(3000, function () {
      console.log('app listening on port 3000!')
    })
}

module.exports = {
    express: q, 
    createCallWindow: createCallWindow
}