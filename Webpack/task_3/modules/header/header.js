const $ = require('jquery');
require('./header.css')

$('header').prepend('<div id="logo"></div>');
$('header').prepend('<h1>Holberton Dashboard</h1>')
console.log('Init header')