const {db} = require('./db');
const { Cheese } = require('./models');
const { Board } = require('./models');
const { User } = require('./models');

Board.belongsTo(User)
User.hasMany(Board)

Cheese.belongsToMany(Board, {through: 'cheese_board'});
Board.belongsToMany(Cheese, {through: 'cheese_board'});

  describe('Cheese, Board and User models', () => {

    beforeAll(async () => {
        await db.sync({ force: true });
    });

    test('can create a Cheese', async () => {
        const newC = await Cheese.create({
            title: 'stinky',
            description: 'it smells',
        })

        expect(newC.title).toEqual('stinky')
    });

    test('can create a Board', async () => {
        const newB = await Board.create({
            type: 'stinky board',
            description: 'it smells thrice as much',
            rating: 10
        })
        expect(newB.type).toEqual('stinky board')
    });

    test('can create a User', async () => {
        const newU = await User.create({
            name: 'Eamon Thal',
            email: 'mrcheese@cheese.com'
        })
        expect(newU.name).toEqual('Eamon Thal')
    });

    test('Users can have multiple boards', async () => {
        const newB1 = await Board.create({
            type: 'stinky board',
            description: 'it smells thrice as much',
            rating: 10
        })
        const newB2 = await Board.create({
            type: 'rubbery board',
            description: 'low quality budget cheese',
            rating: 0
        })
        const newU = await User.create({
            name: 'Eamon Thal',
            email: 'mrcheese@cheese.com'
        })
        await newU.addBoard(newB1)
        await newU.addBoard(newB2)
        let howMany = await newU.getBoards()
        expect(howMany.length).toEqual(2)
    });

    test('Boards can have multiple cheeses', async () => {
        const newC1 = await Cheese.create({
            title: 'stinky',
            description: 'it smells',
        })
        const newC2 = await Cheese.create({
            title: 'nice',
            description: 'just a nice cheese ok',
        })
        const newB = await Board.create({
            type: 'stinky board',
            description: 'it smells thrice as much',
            rating: 10
        })
        await newB.addCheese(newC1)
        await newB.addCheese(newC2)
        let howMany = await newB.getCheeses()
        expect(howMany.length).toEqual(2)
    });

    test('Can return all cheese that is on a board', async () => {


        const boards= await Board.findAll({include: Cheese})

        console.log(boards)

        const boardsWithCheeses = boards.filter((y) => {
            if (y.dataValues.cheeses.length > 0){
                return true
            }
        })

        const filtered = boardsWithCheeses.map((y) => {
            y.dataValues.Cheeses
        })

        expect(filtered.length).toEqual(1)

    });
        
})