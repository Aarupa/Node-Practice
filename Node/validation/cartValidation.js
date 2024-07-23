import { checkSchema} from 'express-validator';


const validateCartId = checkSchema({
    id: {
        in: ['params'],
        isInt: {
            errorMessage: 'ID must be an integer'
        },
        toInt: true
    },
    limit: {
        in: ['query'],
        optional: true,
        isInt: {
            errorMessage: 'limit must be an integer'
        },
        toInt: true
    }
});

const validateCreateCart = checkSchema({
    id: {
        in: ['body'],
        optional: true, 
        isInt: true,
        toInt: true,
        errorMessage: 'ID must be an integer'
    },
    name: {
        in: ['body'],
        notEmpty: true,
        errorMessage: 'Name is required'
    },
    quantity: {
        in: ['body'],
        isInt: true,
        toInt: true,
        errorMessage: 'Quantity must be an integer'
    },
    price: {
        in: ['body'],
        isCurrency: true,
        errorMessage: 'Price must be a valid currency format'
    }
});

const validateUpdateCart = checkSchema({
    id: {
        in: ['body'],
        isInt: true,
        toInt: true,
        errorMessage: 'ID must be an integer'
    },
    quantity: {
        in: ['body'],
        optional: true,
        isInt: true,
        toInt: true,
        errorMessage: 'Quantity must be an integer'
    },
    price: {
        in: ['body'],
        optional: true,
        isCurrency: true,
        errorMessage: 'Price must be a valid currency format'
    }
});

export { validateCreateCart, validateUpdateCart, validateCartId };
