// takes a matrix of 1s and 0s and determines the largest region of 1s connected vertically, horizontally or diagonally
function parse(matrix) {

  var searched = {}
  var largest = 0

  for(var row = 0; row < matrix.length; ++row) {
    for(var col = 0; col < matrix[row].length; ++col) {
      if (!searched[row + ', ' + col]) {
        let count = searchAdjacent (matrix, row, col, searched)
        largest = (count > largest ? count : largest)
      }
    }
  }

  return largest
}

// takes row and column, returns a count of all filled adjacent cells, fills the 'searched' object as cells are searched
function searchAdjacent(matrix, row, col, searched) {
  if (row < 0 || row >= matrix.length || col < 0 || col > matrix[row].length || searched[row + ', ' + col] === true) {
    return 0
  }
  let count = 0
  if (matrix[row][col] === 1) {
    searched[row + ', ' + col] = true
    count = 1
    + searchAdjacent(matrix, row - 1, col - 1, searched)
    + searchAdjacent(matrix, row - 1, col, searched)
    + searchAdjacent(matrix, row - 1, col + 1, searched)
    + searchAdjacent(matrix, row, col + 1, searched)
    + searchAdjacent(matrix, row + 1, col + 1, searched)
    + searchAdjacent(matrix, row + 1, col, searched)
    + searchAdjacent(matrix, row + 1, col - 1, searched)
    + searchAdjacent(matrix, row, col - 1, searched)
  }
  return count
}

function printMatrix(matrix) {
  for(var row = 0; row < matrix.length; ++row) {
    console.log(matrix[row])
  }
}

function test(matrix, answer, num) {
  console.log(`// Test #${num} running...\n`)
  printMatrix(matrix)
  console.log(`\nExpected to return: ${answer}\n`)
  result = parse(matrix)
  console.log(`\nReturned: ${result}\n`)
  if (result === answer) {
    console.log('pass\n')
  } else console.log('fail\n')
}

function tests() {

  var matrix1 = [
    [0,1,0,0],
    [1,1,0,0],
    [0,0,0,0],
    [0,0,0,0]
  ]
  var answer1 = 3
  test(matrix1, answer1, 1)

  var matrix2 = [
    [0,1,0,0],
    [1,1,0,0],
    [0,0,1,0],
    [0,0,0,0]
  ]
  var answer2 = 4
  test(matrix2, answer2, 2)

  var matrix3 = [
    [0,1,0,0,1,1,1],
    [1,1,0,0,1,0,0],
    [0,0,1,0,0,1,1],
    [0,0,0,0,1,1,1]
  ]
  var answer3 = 9
  test(matrix3, answer3, 3)

  var matrix4 = [
    [1,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [1,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0],
    [0,0,1,0,1,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0],
    [0,1,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,0],
    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1]
  ]
  var answer4 = 9
  test(matrix4, answer4, 4)
}

tests()
