# Seek Challenge

Thanks for taking the time to review this code challenge. This repo contains one possible solution to the [challenge](docs/SEEK%20Software%20Engineer%20Code%20Challenge%20-%20Jan%2019.pdf).

## Requirements

This code challenge was created using **Node.js v14.16.1** and **npm v6.14.12**. The rest of the dependencies are installed via `npm`. I used the [node-typescript-boilerplate](https://github.com/jsynowiec/node-typescript-boilerplate) project to scaffold this solution.

## TL;DR

To get this challenge running you can do the following:

```bash
cd /path/to/where/you/want/to/download/this/to
git clone https://github.com/damienwhaley/challenge-seek.git
cd challenge-seek
npm install
npm run build
npm start
```

I've also included a test suite which provides tests for the most important parts of the challenge. I'm not going for 100% coverage. To run the tests you can do the following:

```bash
cd /path/to/where/you/want/to/download/this/to
git clone https://github.com/damienwhaley/challenge-seek.git
cd challenge-seek
npm install
npm test
```

If I've done a decent job then all the tests will pass.

## Design

I've tried to keep the design down to only what is required, but with the flexibility to be extended should that be required. I built this solution following TDD principles (check out the commit history).

As much as possible I have tried to keep the classes isolated and they should not have any knowledge of how the others work internally. I've attempted to encapsulate the functionality within each class and keep only the functionality which relates to the class in the class. I've not gone over the top with the definitions of classes, not abused inheritance, and where possible I've used the easiest to understand implementation in preference to a new and shiny option.

In this document you will see various words which are capitalised. These will be referencing the building blocks which are described below:

* **Checkout** - this value object which wraps the calculation operations. It represents a shopping cart and checkout process.
* **Pricing Rules** - this collection object which knows how to store PriceRule objects, and how to find which PriceRule is relevant for the Advertisment in the calculations in the Checkout. It also exists to satify the psuedo-code in the challenge document.
* **Price Rule** - this is the individual rule which describes the discount (or price rise) for a given Customer for a given Product.
* **Product Factory** - this factory creates Product objects. This simplifies the creation of the Product objects and contains the information about each type of product. This probably would not be needed if we were fetching the Product details from a database.
* **Product** - this is a value object which describes the different advertising products which are available for a Customer. I deliberately did not create a base Product object with more specific Product objects which inherit from the base Product object as this is overkill an does not add anything to the solution.
* **Customer** - this is not an object in the solution, but it is an important concept! This is the entity who is purchasing advertising products. I'm using the `customerName` member field to represent a Customer.
* **Advertisment** - this value object represents what the Customer has purchased (or is going to purchase).
* **Application** - this service runs the program using the pre-defined Price Rules, Customers, Products, Advertisments, with several different Checkout flows.

I've only used the [decimal.js](https://github.com/MikeMcl/decimal.js/) module as JavaScript (hence TypeScript) is infamously bad at floating point maths. Since we are dealing with money in this challenge I thought it was important to make sure the maths was correct.

## Assumptions

I made some assumptions with regards to the solution which influenced the code you see here. In no particular order these are:

1. The algorithm which determines the discount only allows for a single Price Rule per Product per Customer. If there are multiples, then it will use the last one which was added to the Pricing Rules collection. This is to simplify the calculations which happen to determine the price of the products. There's also a neat optimisation I used based on this assumption.
2. There is no database persistance in this solution. It was not asked for in the requirements, so I was not compelled to add it.
3. Each Checkout will only deal with Products from one Customer. The Customer is determined by the first Advertisment which is added to the Checkout (the Advertisment is related to a Product for a Customer). Any additional Advertisments which are added to the Checkout will be checked to ensure that the additional Advertisments are associated with the same Customer.
4. There is no configuration or dynamic loading of Products, Customers, or Price Rules. In the Application I've provided different scenarios which were presented in the challenge document. The tests also provide a different set of combinations to ensure that I have the confidence that what I've done is correct.

## Possible Extensions

I hope I've done enough to demonstrate the skills and approach you are looking for. If I chose to spend more time on this challenge I would have considered the following enhancements. In no particular order these are:

1. Add the ability to have more than one Price Rule per Product per Customer. This would mean that there would be multiple passes over the calculation for the Product and the system would then choose the "winning" price. Winning could mean the price which is highest (to favour Seek), or the lowest (to favour the Customer).
2. Add database persistance. In the real world the Products, Customers, and Price Rules would be drawn from a database of some form.
3. Make this a CLI type application which allows for dynamically adding Customers, Products, Price Rules, and to use these in different Checkout scenarios.
4. Change the structure to have Price Rules be attached to a Customer. I think this makes more sense as the Price Rules more closely align to a Customer. This means that the way that the Checkout object works will also change. I'd recommend attaching a Customer to a Checkout when the Checkout is instatiated.
5. Set the scope modifiers for the class members to be better. I've made the members which I want to control as private, but some of the others should be also private. It would have added more code for testing, and was not needed for the solution.
6. Add a percentage discount to the price rules to add flexibility and more readability.
7. I wasn't entirely happy with how I am using `productCode`. I think perhaps it could have passed a `product` object instead, but that might be too much overhead in terms of everything else which goes with the product object. Maybe if this was a database-backed solution then the way the objects are created or fetched will change the way that objects are created or passed.
