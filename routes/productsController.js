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

module.exports = {
    get(_, res) {
        res.json({ products: products.items });
    },
    getById(req, res) {
        if (!req.params.id) {
            res.json({ error: 'Should receive an id' })
        }
        products.items.forEach(element => {
            if (req.params.id == element.id) {
                res.json({ success: element })
            }
        });
    },
    store(req, res) {

        if (req.body.description.length < 10) {
            res.json({ msg: 'descricao menor que 10' })
        } else if (req.body.price <= 0) {
            res.json({ msg: 'preco menor ou igual a zero' })
        } else {
            var lastArrayPosition = products.items.length - 1
            var newElement = {
                id: products.items[lastArrayPosition].id + 1,
                name: req.body.name,
                description: req.body.description,
                price: req.body.price
            }
            if (products.items.push(newElement)) {
                console.log(newElement)
                res.json({ msg: 'criado com sucesso' })
            }
        }
    }
};