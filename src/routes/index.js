const { Router } = require('express');
const stripe = require('stripe')('sk_test_51M2m6uDLYESPPfVdOnkAwHTKUQXQaGTHLD1NTheUWm92t2cKtNe8sbvUBvzkB509VbfIT8rBWzcwnFsgptY8q1qZ00rDhC8gPB');

const router = Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.post('/checkout', async (req, res) => {
    console.log(req.body);
    const customer = await stripe.customers.create({
        email: req.body.stripeEmail,
        source: req.body.stripeToken
    });

    const charge = await stripe.charges.create({
        amount: 3000,
        currency: 'usd',
        customer: customer.id,
        description: 'Software Product'
    });

    console.log(charge.id);

    res.render('download');
});

module.exports = router;