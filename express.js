const express = require('express')
const notifier = require('node-notifier')
const path = require('path')

const q = () => {
    let app = express()
    app.set('view engine', 'pug')

    app.get('/', function (req, res) {
      res.render('index');
    });

    app.get('/notify', (req, res) => {
      console.log('/notify');
      
      notifier.on('click', () => {
        console.log(' on  click');
      })
      
      // String
      notifier.notify({
        title: 'My awesome title',
        message: 'Hello from node, Mr. User!',
        icon: path.join(__dirname, 'icon.jpg'), // Absolute path (doesn't work on balloons) 
        sound: true,
        timeout: 1,
        click: () => {
            console.log('clicked')
        }
      });

      res.send('ok');
    })
 
    app.listen(3000, function () {
      console.log('app listening on port 3000!');
    });

}

module.exports = q;