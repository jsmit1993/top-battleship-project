import { Ships } from "./ships";

class Gameboard{
    constructor(location = {}, ship) {
        this.location = location;
        this.ship = ship;
    }

    receiveAttack(location) {}
}