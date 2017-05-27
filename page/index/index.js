var util = require('/common/util/util.js');
var name = 'index.js';

require.async('widget/b.js');

$('#content')[0].innerText='3 的平方是 ：' + util.square(3);