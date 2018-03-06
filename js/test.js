model.filField(model.row, model.col, model.mines);
console.log(model.field);

/*
console.log(splitId("10-10"));
console.log(splitId("1-10"));
console.log(splitId("10-1"));
console.log(splitId("1-1"));
*/
/*
var msg = "<div class=\"row\"><div class=\"cell hidden-cell\" id=\"4-0\"><span class=\"text-7 text\" oncontextmenu=\"return false\"></span></div><div class=\"cell hidden-cell\" id=\"4-1\"><span class=\"text-7 text\" oncontextmenu=\"return false\"></span></div></div>"
var table = document.getElementById('field');
table.innerHTML += msg;
*/

view.displayField(model.field);