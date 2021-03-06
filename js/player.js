var Player = (function () {

    function Player(name, number) {
        this.id = 'player' + number;
        this.haveTurn = false;
        this.currentBox = 1;
        this.waitingTurns = 0;
        this.number = number;
        this.name = name;
        this.printInBox();

    }


    Player.prototype.test = function () {
        console.log('=========================================');
        console.log('name: ' + this.name);
        console.log('number: ' + this.number);
        console.log('currentBox: ' + this.currentBox);
        console.log('waitingTurns: ' + this.waitingTurns);
        console.log('haveTurn: ' + this.haveTurn);
        console.log('=========================================');
    };
    Player.prototype.getNumber = function () {
        return this.number;
    }


    Player.prototype.jumpTo = function (newBox) {
        this.currentBox = newBox;

        return this.currentBox;
    };

    Player.prototype.decreaseIn = function (cells) {
        this.currentBox = this.currentBox - cells;
        return this.currentBox;
    };

    Player.prototype.increaseIn = function (cells) {
        this.currentBox = this.currentBox + cells;
        return this.currentBox;

    }

    Player.prototype.getCurrentBox = function () {
        return this.currentBox;
    };

    Player.prototype.setWaitingTurns = function (turns) {
        return this.waitingTurns = turns;
    };

    Player.prototype.repeatTurn = function () {
        this.haveTurn = true;
    }

    Player.prototype.throwDice = function (dice) {
        //TODO check the type of dice
        var diceResult;

        //throw dice
        diceResult = dice.throw();

        var toReturn = {
            'diceResult': diceResult,
            'currentBox': this.currentBox
        }
        return toReturn;
    }

    Player.prototype.getPlayerName = function(){
        return this.name;
    }

    Player.prototype.canPlay = function () {
        var canPlay = (this.waitingTurns === 0 ) ? true : false;
        return canPlay;
    };

    Player.prototype.setTurn = function () {
        this.haveTurn = true;
    };

    Player.prototype.doStillHaveTurn = function () {
        return this.haveTurn;
    };

    Player.prototype.update = function(_boxInfo, _response){

        var boxInfo = _boxInfo;
        //TODO proteger el caso en que func y funcArgs sean undefined
        if (_response) {
            func = boxInfo['success_function'];
            funcArgs = boxInfo['success_function_args'];

        } else {
            func = boxInfo['fail_function'];
            funcArgs = boxInfo['fail_function_args'];
        }

        if(boxInfo.lost_turn == true){
            this.haveTurn = false;
        }

        this[func](funcArgs);//currentPlayer[func](funcArgs);
        this.printInBox();

    };



    Player.prototype.printInBox = function(coordinate){
        var box = (typeof coordinate !== 'undefined') ? $('.box_' + coordinate) : $('.box_' + this.currentBox);
        var whenAvailableTemplate = function(template){
            if(typeof  template === 'string'){
                var tpl = $(template);

                tpl.css({
                    'background':'red',
                    'position': 'absolute',
                    'opacity': '0.3',
                    'top' : '0',
                    'left': '0',
                    'z-index': '9'
                });

                tpl.appendTo(box);
            }

        };

        var data = {
            id : this.id,
            name : this.name
        };

        $.getTemplate('tpl/player.html',data).done(whenAvailableTemplate);


    }


    //Return the object Player :)
    return Player;
})();
