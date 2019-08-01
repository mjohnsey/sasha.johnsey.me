import facts from "/js/facts.js";

const relativeAgeId = "#realtiveAge";
const birthdateId = "#birthdate";

const setRelativeAge = age => {
  $(relativeAgeId).text(age);
};

const setBirthdate = birthdate => {
  $(birthdateId).text(`Born on ${birthdate.format("MMMM Do YYYY")}`);
};

const relativeAgeText = birthdate => {
  const today = moment().startOf('day');
  const weeks = today.diff(birthdate, "week");

  let age = `${birthdate.preciseDiff(today)} old`;
  if (weeks < 24) {
    age = `${age} (${weeks} weeks)`;
  }
  return age;
};

const birthdate = moment(facts.birthdate);
setBirthdate(birthdate);
setRelativeAge(relativeAgeText(birthdate));
