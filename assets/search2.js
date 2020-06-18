async function getAllRepresentatives(){

  var buildQueryURL = (level) => `https://www.googleapis.com/civicinfo/v2/representatives?address=233 Paulin Ave Calexico CA 92231&includeOffices=true&key=AIzaSyDYsucFLhfwF4iEpT9CrAD7rCFdUvrQ87E&levels=${level}`;

  const startDate = new Date();

  const promise = await Promise.all([
    // call countyReps  
    $.ajax({
      url: buildQueryURL('administrativeArea2'),
      method: "GET"
    }),
    // call localReps
    $.ajax({
      url: buildQueryURL('locality'),
      method: "GET"
    }),
    //call stateReps
    $.ajax({
      url: buildQueryURL('administrativeArea1'),
      method: "GET"
    })
  ])
  console.log('promise is: ', promise);
  console.log('inside the promise function the timer says: ', new Date() - startDate);

  return promise;
}


async function global(){
  const startDate = new Date();

  console.log('doing some stuff');
  console.log('user asks for rep data');
  const [countyReps, localReps, stateReps] = await getAllRepresentatives();
  console.log( 'we got this: ', countyReps, localReps, stateReps);
  console.log('in gloval function the timer says: ', new Date() - startDate);


}
global();