// document.getElementById('myButton').addEventListener('keyup', function (event){
//   if (event.keyCode === 13){
//     event.preventDefault();
//     document.getElementById("myButton").click();
//     }
// });
const conduitType = document.getElementById('conduitType');



// form.addEventListener('submit', function(event){
//   event.preventDefault(); // prevents the form from autosubmitting

//   getConduitConductorData();
// })


// Conduit Selections
conduitType.addEventListener("change", function(){
  getConduitData();
})


function getConduitData(){
    // const conduitType = document.querySelector('#conduitType').value;
  console.log("Conduit event listener")

    fetch('/tables', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        // conductorSelection: conductorSelection,
        conduitSelection: conduitType
      }),
    })
    .then(res => {
      if (res.ok) return res.json();
    })
    .then(data => {
      console.log(data);
    })
  }