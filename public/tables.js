// document.getElementById('myButton').addEventListener('keyup', function (event){
//   if (event.keyCode === 13){
//     event.preventDefault();
//     document.getElementById("myButton").click();
//     }
// });
const conduitSelectTag = document.getElementById('conduitType');



// form.addEventListener('submit', function(event){
//   event.preventDefault(); // prevents the form from autosubmitting

//   getConduitConductorData();
// })


// Conduit Selections
conduitSelectTag.addEventListener("change", function(){
  getConduitData();
})


function getConduitData(){
  const conduitType = document.querySelector('#conduitType').value;
  console.log("Conduit event listener");
  console.log(conduitType);

  fetch('/tablespost', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      conduitSelection: conduitType
    }),
  })
  .then(res => {
    if (res.ok) return res.json();
  })
  .then(data => {
    console.log(data);
    listConduitData(data);
  })
  }

  function listConduitData(array) {
    let tableRef = document.getElementById('conduit-table')
    
    //loop thru each row skipping first one, looping thru remaining row (skipping the header) -- keeps deleting rows until there is only one left
    for (let i = 1; i < tableRef.rows.length;){ 
      tableRef.deleteRow(i);
    }

    // Array iterator
    for(let i = 0; i < array.length; i++) {
      // console.log(i);
      let keys = Object.keys(array[i]);
      // console.log("values for object at index", i, ":");
      for (let j = 0; j < keys.length; j++) {
        let key = keys[j];
        let value = array[i][key];
        console.log(key, ":", value);
      }
      console.log(array[i].size)
      let newRow = tableRef.insertRow(-1) // this adds a row  to the end of table
      let newSizeCell = newRow.insertCell(0) // this is for the Type row
      let newDiaInCell = newRow.insertCell(1) // this is for the Diameter Inch row
      let newDiaMmCell = newRow.insertCell(2)
      let newAreaInCell = newRow.insertCell(3)
      let newAreaMmCell = newRow.insertCell(4)
      let newSizeText = document.createTextNode(
        array[i].size // this is the property under Type that we are trying to grab
      )
      let newDiaInText = document.createTextNode(array[i].dims.diain);
      let newDiaMmText = document.createTextNode(array[i].dims.diamm);
      let newAreaInText = document.createTextNode(array[i].dims.areain);
      let newAreaMmText = document.createTextNode(array[i].dims.areamm);
      
      // let newVText = document.createTextNode(vegStatus)
      newSizeCell.appendChild(newSizeText) // this puts the text into the cell
      newDiaInCell.appendChild(newDiaInText) // this puts the text into the cell
      newDiaMmCell.appendChild(newDiaMmText) // this puts the text into the cell
      newAreaInCell.appendChild(newAreaInText) // this puts the text into the cell
      newAreaMmCell.appendChild(newAreaMmText) // this puts the text into the cell

      // if (vegStatus === 'no') {
      //   //turn item red
      //   newVCell.classList.add('non-veg-item')

      // } else if (vegStatus === 'unknown' || vegStatus === 'maybe'){
      //   //turn item yellow
      //   newVCell.classList.add('unknown-maybe-item')
      // }
      
      // //Vegan checker
      // let veganStatus = !(this.ingredients[key].vegan) ? 'unknown' : this.ingredients[key].vegan;

      // let newVeganText = document.createTextNode(veganStatus);
      // newVeganCell.appendChild(newVeganText);

      // if (veganStatus === 'no') {
      //   //turn item red
      //   newVeganCell.classList.add('non-veg-item')

      // } else if (veganStatus === 'unknown' || veganStatus === 'maybe'){
      //   //turn item yellow
      //   newVeganCell.classList.add('unknown-maybe-item')
      // }
    }
  };;
