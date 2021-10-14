let calcButton = document.getElementById("calc_button");
calcButton.addEventListener('click',function(){
    let supply = document.getElementById("supply").value;
    supply = supply.split(',').join("");
    supply = parseInt(supply);
    let up = 1000;
    let deposit = document.getElementById("deposit").value;
    let period = document.getElementById("period").value;
    let percent = document.getElementById("percent").value;

    let payment_time = document.getElementById("left-toggle").classList.contains('active');//선불은 false 반대로면 true
    
    let calc_value = (supply * ( 1 + (percent/100) * period / 12) - (deposit/100) * supply) / period;

    
    calc_value = Math.floor(calc_value/up)*up;
    calc_value = calc_value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");



    document.getElementsByClassName("irr_box").textContent = "0.1";
    //let irr_percent = document.getElementsByClassName("irr_box");
    //irr_percent.textContent = "IRR 예상 금액";
    console.log(document.getElementsByClassName("irr_box").textContent);
    let span = document.getElementById("calc_value");
    span.textContent = calc_value;

    let irrVal = 0.0;




}, false);

document.getElementById("refresh_button").addEventListener('click', function(event) {

    window.location.reload();
}, false);

document.getElementById("rental_schedule").addEventListener('click',()=>{
    let supply = document.getElementById("supply").value;
    supply = supply.split(',').join("");
    supply = parseInt(supply);
    let deposit = document.getElementById("deposit").value;
    let period = document.getElementById("period").value;
    let percent = document.getElementById("percent").value;

    let child_window = window.open("table.html","table");
 
    let payment_time = document.getElementById("left-toggle").classList.contains('active');

    if(percent == "")
        percent = 0;
    let data = supply.toString() + ' ' + deposit.toString()+ ' ' + period.toString() + ' ' + percent.toString() + ' ' + payment_time;
    console.log(data);
    let push_data = document.createElement("input");
    push_data.setAttribute("id","base-data");
    document.body.appendChild(push_data);
    document.getElementById('base-data').style.display = "none";
    document.getElementById('base-data').value = data;
    console.log("11");
    // console.log(document.getElementById("base-data").value);
    // child_window.document.getElementById("base-data").value = document.getElementById("base-data").value;
    // console.log(child_window.document.getElementById("base-data").value);
    
    //document.getElementById('base-data').remove();
},false);


document.getElementById("left-toggle").addEventListener('click',()=>{
    document.getElementById("left-toggle").className = "toggle-button left-toggle active";
    document.getElementById("right-toggle").className = "toggle-button right-toggle";
});
document.getElementById("right-toggle").addEventListener('click',()=>{
    document.getElementById("right-toggle").className = "toggle-button right-toggle active";
    document.getElementById("left-toggle").className = "toggle-button left-toggle";
});


// document.getElementsByClassName("left-toggle").addEventListener('click',()=>{
//     document.getElementsByClassName("left-toggle").className += 'active';
// });