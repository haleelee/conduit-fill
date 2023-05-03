// document.getElementById('myButton').addEventListener('keyup', function (event){
//   if (event.keyCode === 13){
//     event.preventDefault();
//     document.getElementById("myButton").click();
//     }
// });
var form = document.getElementById('form');
let conductorFormCounter = 1;



form.addEventListener('submit', function(event){
  event.preventDefault(); // prevents the form from autosubmitting

  getConduitConductorData();
})



function getConduitConductorData(){
  const numCables = document.querySelector('#numCables').value;
  const wireSize = document.querySelector('#wireSize').value;
  // const cuOrAl = document.querySelector('#cuOrAl').value;
  const voltInsShield = document.querySelector('#voltInsShield').value;
  const conductorSelection = voltInsShield + wireSize;

  const conduitType = document.querySelector('#conduitType').value;
  const conduitSize = document.querySelector('#conduitSize').value;
  const conduitSelection = conduitType + conduitSize;
  console.log(conduitSelection);

  console.log(numCables);
  console.log(wireSize);
  // console.log(cuOrAl);
  console.log(conductorSelection);
  console.log(conduitSelection);

  fetch('/data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      numCables: numCables,
      // cuOrAl: cuOrAl,
      conductorSelection: conductorSelection,
      conduitSelection: conduitSelection
    }),
  })
  .then(res => {
    if (res.ok) return res.json();
  })
  .then(data => {
    // console.log(data[0]); this is conductor
    // console.log(data[1]); this is conduit
    let totalConductorArea = (numCables * data[0].dims.areain).toFixed(3);
    let conduitArea = data[1].dims.areain;
    let percent;

    console.log("Conductor Area of " + data[0].name + " is " + totalConductorArea);

    if(numCables == 1) percent = 0.53;
    else if(numCables == 2) percent = 0.31;
    else percent = 0.40;

    console.log("Nominal Conduit Area is " + data[1].dims.areain + ". " + "Effective Conduit Area of " + data[1].name + " is " + (conduitArea * percent).toFixed(3) + ". Percent is " + percent.toFixed(2));

    if(conduitArea * percent > totalConductorArea){
      document.getElementById('resultConduitFill').innerHTML = "Conduit is good!";
      document.getElementById("resultConduitFill").classList.remove('resultRed');
      document.getElementById("fillValue").classList.remove('resultRed');
      document.getElementById("resultConduitFill").classList.add("resultGreen");
      document.getElementById("fillValue").classList.add("resultGreen");
    }
    else{
      document.getElementById('resultConduitFill').innerHTML = "Conduit is too full!";
      document.getElementById("resultConduitFill").classList.remove('resultGreen');
      document.getElementById("fillValue").classList.remove('resultGreen');
      document.getElementById("resultConduitFill").classList.add("resultRed");
      document.getElementById("fillValue").classList.add("resultRed");
    };

    document.getElementById('conduitNominalAreaIn').innerHTML = parseFloat((data[1].dims.areain)).toFixed(3);
    document.getElementById('conduitEffectiveAreaIn').innerHTML = parseFloat(conduitArea * percent).toFixed(3);
    document.getElementById('conductorSingleArea').innerHTML = parseFloat((data[0].dims.areain)).toFixed(3);
    document.getElementById('conductorTotalArea').innerHTML = parseFloat((data[0].dims.areain) * numCables).toFixed(3);
    document.getElementById('fillValue').innerHTML = "Conduit is filled to percentage " + parseFloat((data[0].dims.areain * numCables / conduitArea * 100).toFixed(2)).toString() + "%.";
    document.getElementById('percent').innerHTML = "Fill percentage must not exceed " + ((100 * percent)).toString() + "%.";
  })
  .catch(error => console.error(error));
}


// Conduit Selections
conduitType.addEventListener("change", function(){
  conduitSize.innerHTML = "";

  //Add new options based on selected value in 'conduitType' select
  var optionDis = document.createElement("option");
  optionDis.text = "Select Conduit Size";
  optionDis.disabled = true; 
  optionDis.selected = true;

  var option0d375 = document.createElement("option");
  option0d375.text = "3/8\"";
  option0d375.value = "0.375";

  var option0d5 = document.createElement("option");
  option0d5.text = "1/2\"";
  option0d5.value = "0.5";

  var option0d75 = document.createElement("option");
  option0d75.text = "3/4\"";
  option0d75.value = "0.75";

  var option1 = document.createElement("option");
  option1.text = "1\"";
  option1.value = "1";

  var option1d25 = document.createElement("option");
  option1d25.text = "1-1/4\"";
  option1d25.value = "1.25";

  var option1d5 = document.createElement("option");
  option1d5.text = "1-1/2\"";
  option1d5.value = "1.5";

  var option1d75 = document.createElement("option");
  option1d75.text = "1-3/4\"";
  option1d75.value = "1.75";

  var option2 = document.createElement("option");
  option2.text = "2\"";
  option2.value = "2";

  var option2d5 = document.createElement("option");
  option2d5.text = "2-1/2\"";
  option2d5.value = "2.5";

  var option3 = document.createElement("option");
  option3.text = "3\"";
  option3.value = "3";

  var option3d5 = document.createElement("option");
  option3d5.text = "3-1/2\"";
  option3d5.value = "3.5";

  var option4 = document.createElement("option");
  option4.text = "4\"";
  option4.value = "4";

  var option5 = document.createElement("option");
  option5.text = "5\"";
  option5.value = "5";

  var option6 = document.createElement("option");
  option6.text = "6\"";
  option6.value = "6";

  var option8 = document.createElement("option");
  option8.text = "8\"";
  option8.value = "8";


  if(conduitType.value === "emt"){
    conduitSize.add(optionDis);
    conduitSize.add(option0d5);
    conduitSize.add(option0d75);
    conduitSize.add(option1);
    conduitSize.add(option1d25);
    conduitSize.add(option1d5);
    conduitSize.add(option2);
    conduitSize.add(option2d5);
    conduitSize.add(option3);
    conduitSize.add(option3d5);
    conduitSize.add(option4);
  }
  else if(conduitType.value === "ent"){
    conduitSize.add(optionDis);
    conduitSize.add(option0d5);
    conduitSize.add(option0d75);
    conduitSize.add(option1);
    conduitSize.add(option1d25);
    conduitSize.add(option1d5);
    conduitSize.add(option2);
  }
  else if(conduitType.value === "fmc"){
    conduitSize.add(optionDis);
    conduitSize.add(option0d375);
    conduitSize.add(option0d5);
    conduitSize.add(option0d75);
    conduitSize.add(option1);
    conduitSize.add(option1d25);
    conduitSize.add(option1d5);
    conduitSize.add(option2);
    conduitSize.add(option3);
    conduitSize.add(option3d5);
    conduitSize.add(option4);
  }
  else if(conduitType.value === "imc"){
    conduitSize.add(optionDis);
    conduitSize.add(option0d5);
    conduitSize.add(option0d75);
    conduitSize.add(option1);
    conduitSize.add(option1d25);
    conduitSize.add(option1d5);
    conduitSize.add(option2);
    conduitSize.add(option2d5);
    conduitSize.add(option3);
    conduitSize.add(option3d5);
    conduitSize.add(option4);
  }
  else if(conduitType.value === "lfncb"){
    conduitSize.add(optionDis);
    conduitSize.add(option0d375);
    conduitSize.add(option0d5);
    conduitSize.add(option0d75);
    conduitSize.add(option1);
    conduitSize.add(option1d25);
    conduitSize.add(option1d5);
    conduitSize.add(option2);
  }
  else if(conduitType.value === "lfnca"){
    conduitSize.add(optionDis);
    conduitSize.add(option0d375);
    conduitSize.add(option0d5);
    conduitSize.add(option0d75);
    conduitSize.add(option1);
    conduitSize.add(option1d25);
    conduitSize.add(option1d5);
    conduitSize.add(option2);
  }
  else if(conduitType.value === "lfmc"){
    conduitSize.add(optionDis);
    conduitSize.add(option0d375);
    conduitSize.add(option0d5);
    conduitSize.add(option0d75);
    conduitSize.add(option1);
    conduitSize.add(option1d25);
    conduitSize.add(option1d5);
    conduitSize.add(option2);
    conduitSize.add(option2d5);
    conduitSize.add(option3);
    conduitSize.add(option3d5);
    conduitSize.add(option4);
  }
  else if(conduitType.value === "rmc" || conduitType.value === "pvcsch80" || conduitType.value === "pvcsch40"){
    conduitSize.add(optionDis);
    conduitSize.add(option0d5);
    conduitSize.add(option0d75);
    conduitSize.add(option1);
    conduitSize.add(option1d25);
    conduitSize.add(option1d5);
    conduitSize.add(option2);
    conduitSize.add(option2d5);
    conduitSize.add(option3);
    conduitSize.add(option3d5);
    conduitSize.add(option4);
    conduitSize.add(option5);
    conduitSize.add(option6);
  }
  else if(conduitType.value === "pvctypea"){
    conduitSize.add(optionDis);
    conduitSize.add(option0d5);
    conduitSize.add(option0d75);
    conduitSize.add(option1);
    conduitSize.add(option1d25);
    conduitSize.add(option1d5);
    conduitSize.add(option2);
    conduitSize.add(option2d5);
    conduitSize.add(option3);
    conduitSize.add(option3d5);
    conduitSize.add(option4);
  }
  else if(conduitType.value === "pvctypeb"){
    conduitSize.add(optionDis);
    conduitSize.add(option2);
    conduitSize.add(option3);
    conduitSize.add(option3d5);
    conduitSize.add(option4);
    conduitSize.add(option5);
    conduitSize.add(option6);
  }
})

// Conductor Selections
voltInsShield.addEventListener("change", function(){
  wireSize.innerHTML = "";

  //Add new options based on selected value in 'voltInsShield' select
  var optionDis = document.createElement("option");
  optionDis.text = "Select Conductor Size";
  optionDis.disabled = true; 
  optionDis.selected = true;

  var option14str = document.createElement("option");
  option14str.text = "14 Str";
  option14str.value = "#14";

  var option12str = document.createElement("option");
  option12str.text = "12 Str";
  option12str.value = "#12";

  var option10str = document.createElement("option");
  option10str.text = "10 Str";
  option10str.value = "#10";

  var option8str = document.createElement("option");
  option8str.text = "8 Str";
  option8str.value = "#8";

  var option6str = document.createElement("option");
  option6str.text = "6 Str";
  option6str.value = "#6";

  var option4str = document.createElement("option");
  option4str.text = "4 Str";
  option4str.value = "#4";

  var option3str = document.createElement("option");
  option3str.text = "3 Str";
  option3str.value = "#3";

  var option2str = document.createElement("option");
  option2str.text = "2 Str";
  option2str.value = "#2";

  var option1str = document.createElement("option");
  option1str.text = "1 Str";
  option1str.value = "#1";

  var option1s0 = document.createElement("option");
  option1s0.text = "1\/0";
  option1s0.value = "1/0";

  var option2s0 = document.createElement("option");
  option2s0.text = "2\/0";
  option2s0.value = "2/0";

  var option3s0 = document.createElement("option");
  option3s0.text = "3\/0";
  option3s0.value = "3/0";

  var option4s0 = document.createElement("option");
  option4s0.text = "4\/0";
  option4s0.value = "4/0";

  var option250 = document.createElement("option");
  option250.text = "250 KCMIL";
  option250.value = "250";

  var option250 = document.createElement("option");
  option250.text = "250 KCMIL";
  option250.value = "250";

  var option250 = document.createElement("option");
  option250.text = "250 KCMIL";
  option250.value = "250";

  var option300 = document.createElement("option");
  option300.text = "300 KCMIL";
  option300.value = "300";

  var option350 = document.createElement("option");
  option350.text = "350 KCMIL";
  option350.value = "350";

  var option400 = document.createElement("option");
  option400.text = "400 KCMIL";
  option400.value = "400";

  var option500 = document.createElement("option");
  option500.text = "500 KCMIL";
  option500.value = "500";

  var option600 = document.createElement("option");
  option600.text = "600 KCMIL";
  option600.value = "600";

  var option700 = document.createElement("option");
  option700.text = "700 KCMIL";
  option700.value = "700";

  var option750 = document.createElement("option");
  option750.text = "750 KCMIL";
  option750.value = "750";

  var option800 = document.createElement("option");
  option800.text = "800 KCMIL";
  option800.value = "800";

  var option900 = document.createElement("option");
  option900.text = "900 KCMIL";
  option900.value = "900";

  var option1000 = document.createElement("option");
  option1000.text = "1000 KCMIL";
  option1000.value = "1000";

  var option1250 = document.createElement("option");
  option1250.text = "1250 KCMIL";
  option1250.value = "1250";

  var option1500 = document.createElement("option");
  option1500.text = "1500 KCMIL";
  option1500.value = "1500";

  var option1750 = document.createElement("option");
  option1750.text = "1750 KCMIL";
  option1750.value = "1750";

  var option2000 = document.createElement("option");
  option2000.text = "2000 KCMIL";
  option2000.value = "2000";

  if(voltInsShield.value === "cuthhn" || voltInsShield.value === "cuthwn2"){
    wireSize.add(optionDis);
    wireSize.add(option14str);
    wireSize.add(option12str);
    wireSize.add(option10str);
    wireSize.add(option8str);
    wireSize.add(option6str);
    wireSize.add(option4str);
    wireSize.add(option3str);
    wireSize.add(option2str);
    wireSize.add(option1str);
    wireSize.add(option1s0);
    wireSize.add(option2s0);
    wireSize.add(option3s0);
    wireSize.add(option4s0);
    wireSize.add(option250);
    wireSize.add(option300);
    wireSize.add(option350);
    wireSize.add(option400);
    wireSize.add(option500);
    wireSize.add(option600);
    wireSize.add(option700);
    wireSize.add(option750);
    wireSize.add(option800);
    wireSize.add(option900);
    wireSize.add(option1000);
  }
  else if(voltInsShield.value === "cuxhhw" || voltInsShield.value === "cuxhhw2"){
    wireSize.add(optionDis);
    wireSize.add(option14str);
    wireSize.add(option12str);
    wireSize.add(option10str);
    wireSize.add(option8str);
    wireSize.add(option6str);
    wireSize.add(option4str);
    wireSize.add(option3str);
    wireSize.add(option2str);
    wireSize.add(option1str);
    wireSize.add(option1s0);
    wireSize.add(option2s0);
    wireSize.add(option3s0);
    wireSize.add(option4s0);
    wireSize.add(option250);
    wireSize.add(option300);
    wireSize.add(option350);
    wireSize.add(option400);
    wireSize.add(option500);
    wireSize.add(option600);
    wireSize.add(option700);
    wireSize.add(option750);
    wireSize.add(option800);
    wireSize.add(option900);
    wireSize.add(option1000);
  }
  else if(voltInsShield.value === "curhhuse"){
    wireSize.add(optionDis);
    wireSize.add(option14str);
    wireSize.add(option12str);
    wireSize.add(option10str);
    wireSize.add(option8str);
    wireSize.add(option6str);
    wireSize.add(option4str);
    wireSize.add(option3str);
    wireSize.add(option2str);
    wireSize.add(option1str);
    wireSize.add(option1s0);
    wireSize.add(option2s0);
    wireSize.add(option3s0);
    wireSize.add(option4s0);
    wireSize.add(option250);
    wireSize.add(option300);
    wireSize.add(option350);
    wireSize.add(option400);
    wireSize.add(option500);
    wireSize.add(option600);
    wireSize.add(option700);
    wireSize.add(option750);
    wireSize.add(option800);
    wireSize.add(option900);
    wireSize.add(option1000);
  }
  else if(voltInsShield.value === "althhn" || voltInsShield.value === "alxhhw"){
    wireSize.add(optionDis);
    wireSize.add(option8str);
    wireSize.add(option6str);
    wireSize.add(option4str);
    wireSize.add(option3str);
    wireSize.add(option2str);
    wireSize.add(option1str);
    wireSize.add(option1s0);
    wireSize.add(option2s0);
    wireSize.add(option3s0);
    wireSize.add(option4s0);
    wireSize.add(option250);
    wireSize.add(option300);
    wireSize.add(option350);
    wireSize.add(option400);
    wireSize.add(option500);
    wireSize.add(option600);
    wireSize.add(option700);
    wireSize.add(option750);
    wireSize.add(option900);
    wireSize.add(option1000);
  }
  else if(voltInsShield.value === "alrhhuse"){
    wireSize.add(optionDis);
    wireSize.add(option6str);
    wireSize.add(option4str);
    wireSize.add(option3str);
    wireSize.add(option2str);
    wireSize.add(option1str);
    wireSize.add(option1s0);
    wireSize.add(option2s0);
    wireSize.add(option3s0);
    wireSize.add(option4s0);
    wireSize.add(option250);
    wireSize.add(option300);
    wireSize.add(option350);
    wireSize.add(option400);
    wireSize.add(option500);
    wireSize.add(option600);
    wireSize.add(option700);
    wireSize.add(option750);
    wireSize.add(option900);
    wireSize.add(option1000);
  }
  else if(voltInsShield.value === "cu2d4kvxlp" || voltInsShield.value === "al8kvmv105"){
    wireSize.add(optionDis);
    wireSize.add(option6str);
    wireSize.add(option4str);
    wireSize.add(option2str);
    wireSize.add(option1str);
    wireSize.add(option1s0);
    wireSize.add(option2s0);
    wireSize.add(option3s0);
    wireSize.add(option4s0);
    wireSize.add(option250);
    wireSize.add(option350);
    wireSize.add(option500);
    wireSize.add(option750);
    wireSize.add(option1000);
  }
  else if(voltInsShield.value === "cu2d4kveprlszh" || voltInsShield.value === "cu2d4kveprpvc" || voltInsShield.value === "al5kvmv105100p"){
    wireSize.add(optionDis);
    wireSize.add(option2str);
    wireSize.add(option1str);
    wireSize.add(option1s0);
    wireSize.add(option2s0);
    wireSize.add(option3s0);
    wireSize.add(option4s0);
    wireSize.add(option250);
    wireSize.add(option350);
    wireSize.add(option500);
    wireSize.add(option750);
    wireSize.add(option1000);
  }
  else if(voltInsShield.value === "al5kvmv105133p" || voltInsShield.value === "al15kvmv105100p"){
    wireSize.add(optionDis);
    wireSize.add(option2str);
    wireSize.add(option1str);
    wireSize.add(option1s0);
    wireSize.add(option2s0);
    wireSize.add(option3s0);
    wireSize.add(option4s0);
    wireSize.add(option250);
    wireSize.add(option350);
    wireSize.add(option500);
    wireSize.add(option600);
    wireSize.add(option750);
    wireSize.add(option1000);
  }
})

function duplicateFormDiv() {
  conductorFormCounter++;
  const formDiv = document.querySelector('#divToCopy'); // select the form div to duplicate
  const clone = formDiv.cloneNode(true); // create a deep copy of the form div

  // append the clone to the parent element of the form div
  formDiv.append(clone);
  console.log("Duplicate Form executed")
}

function getConduitData(){
    const conduitType = document.querySelector('#conduitType').value;
    fetch('/data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        // conductorSelection: conductorSelection,
        conduitSelection: conduitSelection
      }),
    })
    .then(res => {
      if (res.ok) return res.json();
    })
    .then(data => {
      console.log(data);
    })
  }