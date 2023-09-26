class App{
    constructor(width,height){
        this.world = new World(width,height,20,20);
        this.lifeArray = create2DArray(this.world.getWorldDimensions()[0]/this.world.cellSize,this.world.getWorldDimensions()[1]/this.world.cellSize);
        this.lifeArrayBuffer = create2DArray(this.world.getWorldDimensions()[0]/this.world.cellSize,this.world.getWorldDimensions()[1]/this.world.cellSize);
        this.usebuffer = false;
        this.ticker = Date.now();
        this.tickLength = 60;
    }

    initialise(){
        this.world.initialise();
        this.generateRandomLife();
    }

    generateRandomLife(){
        //walk the life array and randomly decide if the cell is alive or not
        for(var  x = 0; x < this.world.getWorldDimensions()[0]/this.world.cellSize; x++){
            for(var y = 0; y < this.world.getWorldDimensions()[1]/this.world.cellSize; y++){
                if(Math.floor(Math.random()*100)<30){
                    //console.log(x + " " + y + " is alive");
                    this.lifeArray[x][y] = new Lifeform(x,y,[255,0,0]);
                };
            }
        }
    }

    update(){
        //Only update the simulation if the game has ticked. 
        if(this.tick()){
            //clear the buffer
            this.lifeArrayBuffer = null;
            this.lifeArrayBuffer = create2DArray(this.world.getWorldDimensions()[0]/this.world.cellSize,this.world.getWorldDimensions()[1]/this.world.cellSize);
            //walk the life array and test the cells
            for(var  x = 0; x < this.world.getWorldDimensions()[0]/this.world.cellSize; x++){
                for(var y = 0; y < this.world.getWorldDimensions()[1]/this.world.cellSize; y++){
                    this.testCell(x,y,this.lifeArray,this.lifeArrayBuffer);
                }
            }
            this.lifeArray = null;
            this.lifeArray = copyArray(this.lifeArrayBuffer);        
        }
    }

    draw(){
        //Draw the screen
        let wd = this.world.getWorldDimensions();
        fill(255,255,255);
        rect(0,0,width,height);
        this.world.draw();
        
        for(var  x = 0; x < this.world.getWorldDimensions()[0]/this.world.cellSize; x++){
            for(var y = 0; y < this.world.getWorldDimensions()[1]/this.world.cellSize; y++){
                if(this.lifeArray[x][y] != 0){
                    this.drawCell(x,y,[255,0,0]);
                }
            }
        }
    }
    drawCell(x,y,colour){
        fill(255,0,0);
        square(x*this.world.cellSize,y*this.world.cellSize,this.world.cellSize);
        fill(255,255,255);    
        text(this.lifeArray[x][y].n,x*this.world.cellSize,y*this.world.cellSize);
    }
    /**
     * Use to check if a tick has passed.
     * @returns 1 if game as ticked, 0 otherwise
     */
    tick(){
        if(Date.now() - this.ticker > this.tickLength){
            this.ticker = Date.now();
            return 1
        }
        return 0;
    }

    /**
     * 
     * @param {number} x 
     * @param {number} y 
     */

    /**
     * @param {number} x - x position of the cell
     * @param {number} y - y position of the cell
     * @param {Array} arr - array to test against
     * @param {Array} arr2 - array to write to
     */
    testCell(x,y, arr, arr2){
        let nstring = "";
        let n = 0; //Store our count of the cells neighbours in here
        //8 directions to test against
        //topleft
        if(x>0 && y > 0){        
            if(arr[x-1][y-1]!=0) {n++;
            nstring += "TL  ";}
        }
        //topmiddle
        if(y>0){
            if(arr[x][y-1]!=0) {n++;
            nstring += "TM  ";}

        }
        //topright
        if(x<(this.world.getWorldDimensions()[0]/this.world.cellSize)-1 && y > 0){
            if(arr[x+1][y-1]!=0){ n++;
            nstring += "TR  ";}

        }
        //middleleft
        if(x>0){
            if(arr[x-1][y]!=0){ n++;
            nstring += "ML  ";}

        }
        //middleright
        if(x<(this.world.getWorldDimensions()[0]/this.world.cellSize) -1){
            if(arr[x+1][y]!=0) {n++;
            nstring += "MR  ";}

        }
        //bottomleft
        if(x>0 && y < this.world.getWorldDimensions()[1]/this.world.cellSize-1){
            if(arr[x-1][y+1]!=0) {n++;
            nstring += "BL  ";}

        }
        //bottommiddle
        if(y < this.world.getWorldDimensions()[1]/this.world.cellSize-1){
            if(arr[x][y+1]!=0) {n++;
            nstring += "BM  ";}

        }
        //bottomright
        if(x>0 && x < this.world.getWorldDimensions()[0]/this.world.cellSize-1){
            if(arr[x+1][y+1]!=0){ n++;
            nstring += "BR  ";}

        }
           //not really required as default is dead
           // if(n < 2) arr2[x][y] = 0; //cell died due to underpopulation
           // if(n > 3) arr2[x][y] = 0; //cell died due to overpopulation

             if(n==3) arr2[x][y] = new Lifeform(x,y,[255,0,0],n); //cell survived / was born
             if(arr[x][y]!=0 && n == 2 ) arr2[x][y] = new Lifeform(x,y,[255,0,0],n + " " +nstring);
        return n;
    }
}