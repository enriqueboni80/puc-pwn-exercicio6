const expect = require('chai').expect;

const {get, getById, store } = require('../../routes/productsController');

let req = {
    body: {},
    params: {},
};

const res = {
    jsonCalledWith: {},
    json(arg) {
        this.jsonCalledWith = arg
    }
}

let products = {
    items: [{
            id: 1,
            name: 'Product 1',
            description: 'Product1 description',
            price: 19.00
        },
        {
            id: 2,
            name: 'Product 2',
            description: 'Product2 description',
            price: 30.00
        }
    ]
}

describe('Products Route', function() {
    describe('get() function', function() {
        it('should return object with title ', function() {
            get(req, res);
            expect(res.jsonCalledWith).to.be.eql({ products: products.items });
        });

        it('should receive return by id ', function() {
            const getReq = req;
            getReq.params = {
                id: 1
            };
            getById(getReq, res);
            expect(res.jsonCalledWith).to.be.have.key('success')
        });
    })

    describe('post() function', function() {
        it('should return created with sucess of post', function() {
            req.body = {
                name: 'galo',
                description: 'galo galo galo galo',
                price: 13.00
            }
            store(req, res);
            expect(res.jsonCalledWith).to.be.eql({ msg: 'criado com sucesso' });
        });

        it('should return descricao menor que 10 caracteres', function() {
            req.body = {
                name: 'galo',
                description: '123456789',
                price: 13.00
            }
            store(req, res);
            expect(res.jsonCalledWith).to.be.eql({ msg: 'descricao menor que 10' });
        });

        it('should return preco menor ou igual a zero', function() {
            req.body = {
                name: 'galo',
                description: '12345678910',
                price: 0
            }
            store(req, res);
            expect(res.jsonCalledWith).to.be.eql({ msg: 'preco menor ou igual a zero' });
        });
    })
});