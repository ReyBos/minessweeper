// Обработка левого щелчка мышью
document.getElementById('field').onclick = function(e) {
	var id = e.target.getAttribute('id');	
}

// Обработка правого щелчка мышью
document.getElementById('field').oncontextmenu = function(e) {
	var id = e.target.getAttribute('id');	
	view.mark(id, splitId(id));	
	console.log(model.userView);
	return false;
}

// Получаем массив с номером строки и столбца из ID элемента
function splitId(id) {
	var position = [];
	var row; // номер строки
	var countRow = 0;
	var col; // номер столбца
	var countCol = 0;
	// Находим из скольки символов состоит номер строки и столбца
	for (var i = 0; i < id.length; i++) {
		if (id.charAt(i) !== '-') {			
			countRow++;
		} else {
			break;
		}		
	}
	for (var j = id.length - 1; j > 0; j--) {
		if (id.charAt(j) !== '-') {			
			countCol++
		} else {
			break;
		}
	}
	position[0] = id.substring(0, countRow);
	position[1] = id.substring((id.length - countCol), id.length);
	return position;
}

// Объект отвечающий за графику
var view = {
	// отвечает за маркировку закрытой ячейки флагом
	mark: function(id, position) {
		if (model.userView[position[0]][position[1]] === -1) {
			// Если ячейка закрыта			
			model.userView[position[0]][position[1]] = 1;

			var cell = document.getElementById(id);
			cell.classList.add('mark-cell');
		} else if (model.userView[position[0]][position[1]] === 1) {
			// Если ячейка маркирована
			model.userView[position[0]][position[1]] = -1;
			var cell = document.getElementById(id);
			cell.classList.remove('mark-cell');
		}
	}
}

// Игровая логика и данные
var model = {
	row: 4, // Количество строк
	col: 8, // Количество столбцов
	mines: 10, // Количество мин на поле

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

	// Инициализируем массивы field и userView значениями -1. Заполняем игрове поле минами
	filField: function(row, col, mines) {
		for(var i = 0; i < row; i++) {	
			this.field[i] = [];	
			this.userView[i] = [];	
			for(var j = 0; j < col; j++) {
				this.field[i][j] = -1;	
				this.userView[i][j] = - 1;		
			}			
		}

		// Располагаем мины в случайном месте
		for (var i = 0; i < mines; i++) {
			var x = -1; 
			var y = -1; 
			do {
				x = Math.floor(Math.random() * row); // номер строки
				y = Math.floor(Math.random() * col); // номер столбца				
			} while (this.field[x][y] === 0); // Если в ячейке нет мины, помещаем ее туда
			this.field[x][y] = 0;
		}

		// Определяем количество мин вокруг каждой ячейки
		for (var i = 0; i < row; i++) {
			for (var j = 0; j < col; j++) {
				if (this.field[i][j] === 0) {
					continue; // если в ячейке мина, количество мин вокруг не определяем
				} else {
					var count = 0; // счетчик мин
					if (((i - 1 >= 0) && (i + 1 < row)) && ((j - 1 >= 0) && (j + 1 < col))) {
						// Считаем количество мин вокруг, если ячейка не находится на внешнем ряду или строке 
						for (var k = i - 1; k <= i + 1; k++){
							for (var n = j - 1; n <= j + 1; n++) {								
								if (this.field[k][n] === 0) count++;
							}
						}						
					} else if (i - 1 < 0) {	
						// Для первой строки
						if (j - 1 < 0) {
							// Для первой ячейки
							for (var k = i; k <= i + 1; k++) {
								for (var n = j; n <= j + 1; n++) {
									if (this.field[k][n] === 0) count++;
								}
							}							
						} else if (j + 1 === col) {
							// Для последней ячейки 
							for (var k = i; k <= i + 1; k++) {
								for (var n = j - 1; n <= j; n++) {
									if (this.field[k][n] === 0) count++;
								}
							}							
						} else {
							// Для остальных элементов первой строки
							for (var k = i; k <= i + 1; k++) {
								for (var n = j - 1; n <= j + 1; n++) {
									if (this.field[k][n] === 0) count++;
								}
							}							
						}
					} else if (i + 1 === row) {
						// Для последней строки
						if (j - 1 < 0) {
							// Для первой ячейки
							for (var k = i - 1; k <= i; k++) {
								for (var n = j; n <= j + 1; n++) {
									if (this.field[k][n] === 0) count++;
								}
							}
						} else if (j + 1 === col) {
							// Для последней ячейки 
							for (var k = i - 1; k <= i; k++){
								for (var n = j - 1; n <= j; n++) {
									if (this.field[k][n] === 0) count++;
								}
							}
						} else {
							// Для остальных элементов последней строки
							for (var k = i - 1; k <= i; k++) {
								for (var n = j - 1; n <= j + 1; n++) {
									if (this.field[k][n] === 0) count++;
								}
							}
						}
					} else if (j - 1 < 0) {
						// Для первого столбца (без 1й и последней ячейки)
						for (var k = i - 1; k <= i + 1; k++) {
							for (var n = j; n <= j + 1; n++) {
								if (this.field[k][n] === 0) count++;
							}
						}
					} else if (j + 1 === col) {
						// Для последнего столбца (без 1й и последней ячейки)
						for (var k = i - 1; k <= i + 1; k++) {
							for (var n = j - 1; n <= j; n++) {
								if (this.field[k][n] === 0) count++;
							}
						}
					}
					if (count !== 0) this.field[i][j] = count;
				}
			}
		}
	}
}
