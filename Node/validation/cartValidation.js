
// import { checkSchema} from 'express-validator';


// const validateCartId = checkSchema({
//     id: {
//         in: ['params'],
//         isInt: {
//             errorMessage: 'ID must be an integer'
//         },
//         toInt: true
//     },
//     limit: {
//         in: ['query'],
//         optional: true,
//         isInt: {
//             errorMessage: 'limit must be an integer'
//         },
//         toInt: true
//     }
// });

// const validateCreateCart = checkSchema({
//     id: {
//         in: ['body'],
//         optional: true, 
//         isInt: true,
//         toInt: true,
//         errorMessage: 'ID must be an integer'
//     },
//     name: {
//         in: ['body'],
//         notEmpty: true,
//         errorMessage: 'Name is required'
//     },
//     quantity: {
//         in: ['body'],
//         isInt: true,
//         toInt: true,
//         errorMessage: 'Quantity must be an integer'
//     },
//     price: {
//         in: ['body'],
//         isCurrency: true,
//         errorMessage: 'Price must be a valid currency format'
//     }
// });

// const validateUpdateCart = checkSchema({
//     id: {
//         in: ['body'],
//         isInt: true,
//         toInt: true,
//         errorMessage: 'ID must be an integer'
//     },
//     quantity: {
//         in: ['body'],
//         optional: true,
//         isInt: true,
//         toInt: true,
//         errorMessage: 'Quantity must be an integer'
//     },
//     price: {
//         in: ['body'],
//         optional: true,
//         isCurrency: true,
//         errorMessage: 'Price must be a valid currency format'
//     }
// });

// export { validateCreateCart, validateUpdateCart, validateCartId };
import { checkSchema } from 'express-validator';

const validateCartId = checkSchema({
  id: {
    in: ['params'],
    isMongoId: {
      errorMessage: 'ID must be a valid MongoDB ObjectId'
    },
    errorMessage: 'ID is required'
  }
});

const validateCreateCart = checkSchema({
  productId: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Product ID is required'
    },
    isString: {
      errorMessage: 'Product ID must be a string'
    }
  },
  name: {
    in: ['body'],
    notEmpty: {
      errorMessage: 'Name is required'
    },
    isString: {
      errorMessage: 'Name must be a string'
    }
  },
  quantity: {
    in: ['body'],
    isInt: {
      errorMessage: 'Quantity must be an integer'
    },
    toInt: true
  },
  price: {
    in: ['body'],
    isFloat: {
      options: { min: 0 },
      errorMessage: 'Price must be a valid number'
    },
    toFloat: true
  }
});

const validateUpdateCart = checkSchema({
  id: {
    in: ['params'],
    isMongoId: {
      errorMessage: 'ID must be a valid MongoDB ObjectId'
    },
    errorMessage: 'ID is required'
  },
  name: {
    in: ['body'],
    optional: true,
    isString: {
      errorMessage: 'Name must be a string'
    }
  },
  quantity: {
    in: ['body'],
    optional: true,
    isInt: {
      errorMessage: 'Quantity must be an integer'
    },
    toInt: true
  },
  price: {
    in: ['body'],
    optional: true,
    isFloat: {
      options: { min: 0 },
      errorMessage: 'Price must be a valid number'
    },
    toFloat: true
  }
});

export { validateCreateCart, validateUpdateCart, validateCartId };
