// document.getElementById('myButton').addEventListener('keyup', function (event){
//   if (event.keyCode === 13){
//     event.preventDefault();
//     document.getElementById("myButton").click();
//     }
// });
var form = document.getElementById('form');

form.addEventListener('submit', function(event){
  event.preventDefault(); // prevents the form from autosubmitting

  const conductorArea = getConductorData().then(response => response);
  const conduitArea = getConduitData();

  console.log(conductorArea + " " + conduitArea)
})


function getConductorData(){
  const numCables = document.querySelector('#numCables').value;
  const wireSize = document.querySelector('#wireSize').value;
  const cuOrAl = document.querySelector('#cuOrAl').value;
  const voltInsShield = document.querySelector('#voltInsShield').value;
  const conductorSelection = voltInsShield + wireSize;

  console.log(numCables);
  console.log(wireSize);
  console.log(cuOrAl);
  console.log(conductorSelection);

  return fetch('/data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      numCables: numCables,
      cuOrAl: cuOrAl,
      conductorSelection: conductorSelection,
    }),
  })
  .then(res => {
    if (res.ok) return res.json();
  })
  .then(data => {
    console.log(data);
    console.log(`numCables is ${numCables}, areain is ${data.dims.areain}, total area is ${numCables * data.dims.areain}`);
    return numCables * data.dims.areain;
  })
  .catch(error => console.error(error));
}

function getConduitData(){
  const conduitType = document.querySelector('#conduitType').value;
  const conduitSize = document.querySelector('#conduitSize').value;
  const conduitSelection = conduitType + conduitSize;
  console.log(conduitSelection);

    fetch('/conduit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      conduitSelection: conduitSelection
    }),
  })
  .then(res => {
    if (res.ok) return res.json();
  })
  .then(data => {
    console.log(data);
    console.log(`conduit selection is ${conduitSelection}, areain is ${data.dims.areain}`);
    return data.dims.areain;
  })
  .catch(error => console.error(error));

}
