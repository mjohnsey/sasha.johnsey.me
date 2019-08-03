import Weight from './model/weight.ts';

const facts = {};

facts.birthdate = '2019-05-01';

facts.weight = [];
facts.weight.push(new Weight('2019-07-12', 3.0));
facts.weight.push(new Weight('2019-08-03', 4.3));
export default facts;
