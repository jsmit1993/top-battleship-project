class Ships{
    constructor(length, sunk) {
        this.length = length;
        this.hits = 0;
        this.sunk = sunk;
    }

    hit() {
        this.hits += 1;
    }

    isSunk(sunk) {
        if (this.hits >= this.length) {
            return sunk = true;
        } else {
            return sunk = false;
        }
        
    }

}

export {Ships}