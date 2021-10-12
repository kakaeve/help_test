let calcButton = document.getElementById("calc_button");
calcButton.addEventListener('click',function(){
    let supply = document.getElementById("supply").value;
    supply = supply.split(',').join("");
    supply = parseInt(supply);
    let up = 1000;
    let deposit = document.getElementById("deposit").value;
    let period = document.getElementById("period").value;
    let percent = document.getElementById("percent").value;
    let calc_value = (supply * ( 1 + (percent/100) * period / 12) - (deposit/100) * supply) / period;
    calc_value = Math.floor(calc_value/up)*up;
    calc_value = calc_value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");

    let span = document.getElementById("calc_value");
    span.textContent = calc_value;
}, false);

// let refreshButton = document.getElementById("refresh_button");
// refreshButton.addEventListener('click',function(event){
//     //document.getElementById('supply').value = '';

//     //document.getElementById('deposit').value = 0;
//     //document.getElementById('period').value = 12;
//     //document.getElementById('percent').value = 0;

//     //document.getElementById("calc_value").textContent = "";
//     location.reload();
//     //alert(event);
// }, false);

var refreshButton = document.getElementById("refresh_button");
refreshButton.addEventListener('click', function(event) {
    document.getElementById("supply").value = '';
    document.getElementById("deposit").value = 0;
    document.getElementById("period").value = 12;
    document.getElementById("percent").value = 0;
    
    var span = document.getElementById("calc_value");
    span.textContent = "";
    alert(event)
}, false);