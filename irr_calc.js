let calcButton = document.getElementById("calc_button");
calcButton.addEventListener('click', function () {
    let supply = document.getElementById("supply").value;
    supply = supply.split(',').join("");
    supply = parseInt(supply);
    let up = 1000;
    let deposit = document.getElementById("deposit").value;
    let period = document.getElementById("period").value;
    let percent = document.getElementById("percent").value;

    let payment_time = document.getElementById("left-toggle").classList.contains('active');//선불은 false 반대로면 true

    let calc_value = (supply * (1 + (percent / 100) * period / 12) - (deposit / 100) * supply) / period;

    let insurance = 0.12;
    let RV = supply * deposit / 100;
    let total = supply * (1 + ((percent) * (period / 12) / 100));
    let margin_revenue = total - supply;
    let monthly_rental_fee = (Math.round(((total - RV) / period) / 100) * 100);

    let ins_total = (Math.floor(supply * (1 + insurance / 100)) + (payment_time ? monthly_rental_fee : 0)*-1);
    let irr_total_in = 0;
    let calc_period = period - (payment_time?1:0);

    let irr_flows = new Array(calc_period+1);
    console.log(calc_period);
    for(let i = 0;i<calc_period;i++){
        if((i+1)%12==0&&(i+1)!=calc_period){
            irr_total_in += monthly_rental_fee - supply*insurance/100*insurance_free_percent;
            irr_flows[i] = monthly_rental_fee - supply*insurance/100*insurance_free_percent;
        }
        else{
            irr_total_in += monthly_rental_fee;
            irr_flows[i] = monthly_rental_fee;
        }
        console.log(irr_flows[i]);
    }
    irr_flows[calc_period] = RV;

    calc_value = Math.floor(calc_value / up) * up;
    calc_value = calc_value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");



    document.getElementsByClassName("irr_box").textContent = "0.1";
    //let irr_percent = document.getElementsByClassName("irr_box");
    //irr_percent.textContent = "IRR 예상 금액";
    console.log(document.getElementsByClassName("irr_box").textContent);
    let span = document.getElementById("calc_value");
    span.textContent = calc_value;

    let irr_span = document.getElementById("irr_value");
    irr_span.textContent = irrCalc(irr_total_in + RV, ins_total, irr_flows, calc_period+1) + "%";




}, false);

document.getElementById("refresh_button").addEventListener('click', function (event) {

    window.location.reload();
}, false);

document.getElementById("rental_schedule").addEventListener('click', () => {
    let supply = document.getElementById("supply").value;
    supply = supply.split(',').join("");
    supply = parseInt(supply);
    let deposit = document.getElementById("deposit").value;
    let period = document.getElementById("period").value;
    let percent = document.getElementById("percent").value;

    let child_window = window.open("table.html", "table");

    let payment_time = document.getElementById("left-toggle").classList.contains('active');

    if (percent == "")
        percent = 0;
    let data = supply.toString() + ' ' + deposit.toString() + ' ' + period.toString() + ' ' + percent.toString() + ' ' + payment_time;
    console.log(data);
    let push_data = document.createElement("input");
    push_data.setAttribute("id", "base-data");
    document.body.appendChild(push_data);
    document.getElementById('base-data').style.display = "none";
    document.getElementById('base-data').value = data;
    console.log("11");
    // console.log(document.getElementById("base-data").value);
    // child_window.document.getElementById("base-data").value = document.getElementById("base-data").value;
    // console.log(child_window.document.getElementById("base-data").value);

    //document.getElementById('base-data').remove();
}, false);


document.getElementById("left-toggle").addEventListener('click', () => {
    document.getElementById("left-toggle").className = "toggle-button left-toggle active";
    document.getElementById("right-toggle").className = "toggle-button right-toggle";
});
document.getElementById("right-toggle").addEventListener('click', () => {
    document.getElementById("right-toggle").className = "toggle-button right-toggle active";
    document.getElementById("left-toggle").className = "toggle-button left-toggle";
});


// document.getElementsByClassName("left-toggle").addEventListener('click',()=>{
//     document.getElementsByClassName("left-toggle").className += 'active';
// });

function irrCalc(total_in, total_out, income_per_month, period) {
    let result;
    let npv = 0;
    total_in = total_in * 1.0;
    total_out = total_out * 1.0;

    //let period = income_per_month.length;

    for (let i = 0; i < period + 1; i++) {
        income_per_month[i] *= 1.0;
        console.log(income_per_month[i]);
    }

    if (total_out == 0 || total_out > total_in) {
        result = 0;
    }
    else {
        let count = 0;
        console.log("123");

        for (result = 0; result < 100, count<100000; result = result + 0.000001, count++) {
            //result = 0.010286999999998894;
            npv = 0.0;
            for (let i = 0; i < period + 1; i++) {
                //console.log("i : " + i);
                //console.log("result : " + result);
                // console.log("1 + result : " + (1 + result));
                // console.log("irr_flows[i][1] : " + irr_flows[i][1]);
                // console.log("Math : " + Math.pow(1+result, irr_flows[i][1])*1.0);
                // console.log("irr_flows[i][0] : " + irr_flows[i][0]/Math.pow(1+result, irr_flows[i][1]));

                npv = npv + income_per_month[i] / Math.pow(1 + result, i + 1);

                //console.log("npv : " + npv);
            }
            //console.log("npv : " + npv);
            //console.log("result : " + result);
            if (npv <= total_out) {
                console.log(count);
                console.log("out");
                console.log(total_out);

                console.log("npv : " + npv);
                console.log("result : " + result);
                break;
            }

        }
    }
    //document.getElementsByClassName("irr_target").innerHTML = Math.round(result*100, 4) + "%%";
    result = (result * 100).toFixed(4) * 12;
    result = Math.round(result * 100) / 100;
    return result;
}