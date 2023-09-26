class World{
    constructor(width,height,cellSize,margin){
        this.worldGrid, this.worldGridBuffer =  {};
        this.width = width;
        this.height = height;
        this.rows = 0;
        this.cols = 0;
        this.cellSize = cellSize;
        this.margin = margin;
        this.worldWidth = 0;
        this.worldHeight = 0;
    }

    initialise(){
        console.log("Initialising world");
        let wd = this.getWorldDimensions();
        console.log(wd);
        this.worldWidth = wd[0];
        this.worldHeight = wd[1];
    }

    getWorldDimensions(){
        return [this.worldWidth, this.worldHeight]
    }

    draw(){
        stroke(0);
        for (var i = 0; i < (this.worldWidth/this.cellSize); i++){
            line(i*this.cellSize,0,i*this.cellSize,this.worldHeight);
         }
      
         for (i = 0; i < this.worldHeight/this.cellSize; i++){
            line(0,i*this.cellSize,this.worldWidth,i*this.cellSize);
         }
    }

        /**
     * Get the world dimensions to the nearest cell size.
     * Store them in worth width and world height
     * @returns {Array} world dimensions in 2d array
     */
    getWorldDimensions(){
        let h = floor((this.height-this.margin) / this.cellSize) * this.cellSize;
        let w = floor((this.width-this.margin) / this.cellSize) * this.cellSize;
        return [w, h];
    }       
}