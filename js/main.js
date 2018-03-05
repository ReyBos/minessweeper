// Обработка левого щелчка мышью
document.getElementById('field').onclick = function(e) {
	var id = e.target.getAttribute('id');	
}

// Обработка правого щелчка мышью
document.getElementById('field').oncontextmenu = function(e) {
	var id = e.target.getAttribute('id');		
	return false;
}

// Игровая логика и данные
var model = {
	row: 5, // Количество строк
	col: 5, // Количество столбцов
	mines: 13, // Количество мин на поле
	/* 
		Массив field содержит игровое поле.
		0 - в ячейке мина
		1-:-8 - количество мин вокруг ячейки
		-1 - в ячейке пусто и вокруг нет мин
	*/
	field: [],
	/*
		В массиве userView хранится то, как поле видит игрок
		-1 - ячейка закрыта
		0  - ячейка открыта
		1  - на ячейке установлен флаг 
	*/
	userView: [],
	// Метод filArray заполняет массивы field и userView значениями -1
	filArray: function(row, col) { 
		for(var i = 0; i < row; i++) {	
			this.field[i] = [];	
			this.userView[i] = [];	
			for(var j = 0; j < col; j++) {
				this.field[i][j] = -1;	
				this.userView[i][j] = - 1;		
			}			
		}
	},
	// Заполняем игрове поле 
	filField: function (array, mines) {
		// Располагаем мины в случайном месте
		for (var i = 0; i < mines; i++) {
			var x = -1; 
			var y = -1; 
			do {
				x = Math.floor(Math.random() * array.length); // номер строки
				y = Math.floor(Math.random() * array[0].length); // номер столбца				
			} while (array[x][y] === 0); // Если в ячейке нет мины, помещаем ее туда
			array[x][y] = 0;
		}
		// Определяем количество мин вокруг каждой ячейки
		for (var i = 0; i < array.length; i++) {
			for (var j = 0; j < array[0].length; j++) {
				if (array[i][j] === 0) {
					continue; // если в ячейке мина, количество мин вокруг не определяем
				} else {
					var count = 0; // счетчик мин
					if (((i - 1 >= 0) && (i + 1 < array.length)) && ((j - 1 >= 0) && (j + 1 < array[0].length))) {
						// Считаем количество мин вокруг, если ячейка не находится на внешнем ряду или строке 
						for (var k = i - 1; k <= i + 1; k++){
							for (var n = j - 1; n <= j + 1; n++) {								
								if (array[k][n] === 0) count++;
							}
						}						
					} else if (i - 1 < 0) {	
						// Для первой строки
						if (j - 1 < 0) {
							// Для первой ячейки
							for (var k = i; k <= i + 1; k++) {
								for (var n = j; n <= j + 1; n++) {
									if (array[k][n] === 0) count++;
								}
							}							
						} else if (j + 1 === array[0].length) {
							// Для последней ячейки 
							for (var k = i; k <= i + 1; k++) {
								for (var n = j - 1; n <= j; n++) {
									if (array[k][n] === 0) count++;
								}
							}							
						} else {
							// Для остальных элементов первой строки
							for (var k = i; k <= i + 1; k++) {
								for (var n = j - 1; n <= j + 1; n++) {
									if (array[k][n] === 0) count++;
								}
							}							
						}
					} else if (i + 1 === array.length) {
						// Для последней строки
						if (j - 1 < 0) {
							// Для первой ячейки
							for (var k = i - 1; k <= i; k++) {
								for (var n = j; n <= j + 1; n++) {
									if (array[k][n] === 0) count++;
								}
							}
						} else if (j + 1 === array[0].length) {
							// Для последней ячейки 
							for (var k = i - 1; k <= i; k++){
								for (var n = j - 1; n <= j; n++) {
									if (array[k][n] === 0) count++;
								}
							}
						} else {
							// Для остальных элементов последней строки
							for (var k = i - 1; k <= i; k++) {
								for (var n = j - 1; n <= j + 1; n++) {
									if (array[k][n] === 0) count++;
								}
							}
						}
					} else if (j - 1 < 0) {
						// Для первого столбца (без 1й и последней ячейки)
						for (var k = i - 1; k <= i + 1; k++) {
							for (var n = j; n <= j + 1; n++) {
								if (array[k][n] === 0) count++;
							}
						}
					} else if (j + 1 === array[0].length) {
						// Для последнего столбца (без 1й и последней ячейки)
						for (var k = i - 1; k <= i + 1; k++) {
							for (var n = j - 1; n <= j; n++) {
								if (array[k][n] === 0) count++;
							}
						}
					}
					if (count !== 0) array[i][j] = count;
				}
			}
		}
	}
}
