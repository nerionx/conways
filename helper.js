/**
 * Helper function to create a 2d array and initialise it with zeros
 * @param {*} rows 
 * @param {*} cols 
 * @returns 
 */
function create2DArray(rows,cols){
    var arr = [];
    for(var i = 0; i < rows; i++){
       arr[i] = [];
       for(var j = 0; j < cols; j++){
          arr[i][j] = 0;
       }
    }
    return arr;
 }

 /**
 * Creates a copy of an array using JSON.encode to avoid walking the array
 * @param {*} sourceArray 
 * @returns 
 */
function copyArray(sourceArray){
   return JSON.parse(JSON.stringify(sourceArray));
}
