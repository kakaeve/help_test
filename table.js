function add_comma(text) {
    let flag = true;
    if (text < 0) {
        flag = false;
        text = -text;
    }
    text = parseInt(text);
    let result = "";
    let count = 0;
    while (text >= 10) {
        result = (text % 10).toString() + result;
        text = Math.floor(text / 10);
        count++;
        if (count % 3 == 0)
            result = "," + result;
    }
    result = (text % 10).toString() + result;
    if (!flag) {
        result = "-" + result;
    }
    return result;
}


let data = opener.document.getElementById("base-data").value
let base_data = data.split(' ');
console.log(base_data);

let supply = parseInt(base_data[0]);
let deposit = parseInt(base_data[1]);
let period = parseInt(base_data[2]);
let percent = parseFloat(base_data[3]);
let payment_time = base_data[4] == "true" ? true : false;

let insurance = 0.12;
let RV = supply * deposit / 100;
let total = supply * (1 + ((percent) * (period / 12) / 100));
let margin_revenue = total - supply;
let monthly_rental_fee = (Math.round(((total - RV) / period) / 100) * 100);

let main_div = document.createElement('div');
console.log(main_div);
main_div.id = "main-div";
main_div.classList.add("inline-grid");
document.body.appendChild(main_div);

let small_table = document.createElement('table');
let small_thead = document.createElement('thead');
let small_tbody = document.createElement('tbody');

small_table.id = "small-table";
small_table.classList.add("small-table");


small_table.appendChild(small_thead);
small_table.appendChild(small_tbody);

document.getElementById("main-div").appendChild(small_table);



let small_row_length = 4;

let small_row = new Array(small_row_length);
let small_row_left = new Array(small_row_length);
let small_row_right = new Array(small_row_length);
let left_value = new Array('취득가액', '월 렌탈료', 'RV', 'RV율');
let right_value = new Array(supply, monthly_rental_fee, RV, RV / supply * 100);
console.log(monthly_rental_fee);
console.log(small_row.length);

for (let i = 0; i < small_row_length; i++) {
    small_row[i] = document.createElement('tr');
    small_row_left[i] = document.createElement('td');
    small_row_left[i].innerHTML = left_value[i];
    console.log(small_row_left[i].innerHTML);
    small_row_right[i] = document.createElement('td');
    small_row_right[i].innerHTML = add_comma(right_value[i]);
    console.log(add_comma(right_value[i]));
    small_row[i].appendChild(small_row_left[i]);
    small_row[i].appendChild(small_row_right[i]);
    if (i == 0)
        small_thead.appendChild(small_row[i]);
    else
        small_tbody.appendChild(small_row[i]);

}

let excel_row_length = period + 6;

let excel_table = document.createElement('table');
let excel_thrad = document.createElement('thead');
let excel_tbody = document.createElement('tbody');

excel_table.id = "excel-table";
excel_table.classList.add("excel-table");



let excel_row = new Array(excel_row_length);
let excel_row_data = new Array(excel_row_length);
for (let i = 0; i < excel_row_data.length; i++) {
    excel_row_data[i] = new Array(6);
}
excel_row[0] = document.createElement('tr');
excel_row_data[0][0] = document.createElement('th');
excel_row_data[0][1] = document.createElement('th');
excel_row_data[0][2] = document.createElement('th');
excel_row_data[0][3] = document.createElement('th');
excel_row_data[0][4] = document.createElement('th');
excel_row_data[0][5] = document.createElement('th');
excel_row_data[0][0].innerHTML = "";
excel_row_data[0][1].innerHTML = "지급일정";
excel_row_data[0][2].innerHTML = "";
excel_row_data[0][3].innerHTML = "보험포함";
excel_row_data[0][4].innerHTML = "";
excel_row_data[0][5].innerHTML = "보험제외";
excel_row[0].appendChild(excel_row_data[0][0]);
excel_row[0].appendChild(excel_row_data[0][1]);
excel_row[0].appendChild(excel_row_data[0][2]);
excel_row[0].appendChild(excel_row_data[0][3]);
excel_row[0].appendChild(excel_row_data[0][4]);
excel_row[0].appendChild(excel_row_data[0][5]);
for(let i=0;i<excel_row_data[0].length;i++)
    excel_row_data[0][i].classList.add("text-content");

excel_thrad.appendChild(excel_row[0]);

excel_row[1] = document.createElement('tr');
excel_row_data[1][1] = document.createElement('td');
excel_row_data[1][0] = document.createElement('td');
excel_row_data[1][2] = document.createElement('td');
excel_row_data[1][3] = document.createElement('td');
excel_row_data[1][4] = document.createElement('td');
excel_row_data[1][5] = document.createElement('td');
excel_row_data[1][0].innerHTML = "";
excel_row_data[1][1].innerHTML = "";
excel_row_data[1][2].innerHTML = "";
excel_row_data[1][3].innerHTML = add_comma((Math.floor(supply * (1 + insurance / 100)) + (payment_time ? 0 : monthly_rental_fee)) * -1);
excel_row_data[1][4].innerHTML = "";
excel_row_data[1][5].innerHTML = add_comma(-1 * supply);
excel_row[1].appendChild(excel_row_data[1][0]);
excel_row[1].appendChild(excel_row_data[1][1]);
excel_row[1].appendChild(excel_row_data[1][2]);
excel_row[1].appendChild(excel_row_data[1][3]);
excel_row[1].appendChild(excel_row_data[1][4]);
excel_row[1].appendChild(excel_row_data[1][5]);

excel_tbody.appendChild(excel_row[1]);

for (let i = 2; i < excel_row_length - 4; i++) {
    excel_row[i] = document.createElement('tr');
    for (let j = 0; j < excel_row_data[i].length; j++) {

        excel_row_data[i][j] = document.createElement('td');
        switch (j) {
            case 0:
                excel_row_data[i][j].innerHTML = i - 1;
                break;
            case 1:
                excel_row_data[i][j].innerHTML = add_comma(monthly_rental_fee);
                break;
            case 2:
                excel_row_data[i][j].innerHTML = i - 1;
                break;
            case 3:
                excel_row_data[i][j].innerHTML = add_comma(monthly_rental_fee);
                break;
            case 4:
                excel_row_data[i][j].innerHTML = i - 1;
                break;
            case 5:
                excel_row_data[i][j].innerHTML = add_comma(monthly_rental_fee);
                break;
        }
        excel_row_data[i][j].classList.add("number-content");
        excel_row[i].appendChild(excel_row_data[i][j]);
    }
    excel_tbody.appendChild(excel_row[i]);
}


excel_row[excel_row_length-4] = document.createElement('tr');
excel_row_data[excel_row_length-4][1] = document.createElement('td');
excel_row_data[excel_row_length-4][0] = document.createElement('td');
excel_row_data[excel_row_length-4][2] = document.createElement('td');
excel_row_data[excel_row_length-4][3] = document.createElement('td');
excel_row_data[excel_row_length-4][4] = document.createElement('td');
excel_row_data[excel_row_length-4][5] = document.createElement('td');
excel_row_data[excel_row_length-4][0].innerHTML = "";
excel_row_data[excel_row_length-4][1].innerHTML = "";
excel_row_data[excel_row_length-4][2].innerHTML = "RV";
excel_row_data[excel_row_length-4][3].innerHTML = add_comma(RV);
excel_row_data[excel_row_length-4][5].innerHTML = "";

excel_row_data[excel_row_length-4][3].classList.add("number-content");

excel_row[excel_row_length-4].appendChild(excel_row_data[excel_row_length-4][0]);
excel_row[excel_row_length-4].appendChild(excel_row_data[excel_row_length-4][1]);
excel_row[excel_row_length-4].appendChild(excel_row_data[excel_row_length-4][2]);
excel_row[excel_row_length-4].appendChild(excel_row_data[excel_row_length-4][3]);
excel_row[excel_row_length-4].appendChild(excel_row_data[excel_row_length-4][4]);
excel_row[excel_row_length-4].appendChild(excel_row_data[excel_row_length-4][5]);



excel_tbody.appendChild(excel_row[excel_row_length-4]);



excel_row[excel_row_length-3] = document.createElement('tr');
excel_row_data[excel_row_length-3][0] = document.createElement('td');
excel_row_data[excel_row_length-3][1] = document.createElement('td');
excel_row_data[excel_row_length-3][2] = document.createElement('td');
excel_row_data[excel_row_length-3][3] = document.createElement('td');
excel_row_data[excel_row_length-3][4] = document.createElement('td');
excel_row_data[excel_row_length-3][5] = document.createElement('td');
excel_row_data[excel_row_length-3][0].innerHTML = "회사준비금";
excel_row_data[excel_row_length-3][1].innerHTML = add_comma(monthly_rental_fee*period);
excel_row_data[excel_row_length-3][2].innerHTML = "IRR";
excel_row_data[excel_row_length-3][3].innerHTML = "";
excel_row_data[excel_row_length-3][4].innerHTML = "회사준비금";
excel_row_data[excel_row_length-3][5].innerHTML = add_comma(monthly_rental_fee*period);

excel_row_data[excel_row_length-3][1].classList.add("number-content");
excel_row_data[excel_row_length-3][3].classList.add("number-content");
excel_row_data[excel_row_length-3][5].classList.add("number-content");

excel_row[excel_row_length-3].appendChild(excel_row_data[excel_row_length-3][0]);
excel_row[excel_row_length-3].appendChild(excel_row_data[excel_row_length-3][1]);
excel_row[excel_row_length-3].appendChild(excel_row_data[excel_row_length-3][2]);
excel_row[excel_row_length-3].appendChild(excel_row_data[excel_row_length-3][3]);
excel_row[excel_row_length-3].appendChild(excel_row_data[excel_row_length-3][4]);
excel_row[excel_row_length-3].appendChild(excel_row_data[excel_row_length-3][5]);

excel_tbody.appendChild(excel_row[excel_row_length-3]);

excel_row[excel_row_length-2] = document.createElement('tr');
excel_row_data[excel_row_length-2][0] = document.createElement('td');
excel_row_data[excel_row_length-2][1] = document.createElement('td');
excel_row_data[excel_row_length-2][2] = document.createElement('td');
excel_row_data[excel_row_length-2][3] = document.createElement('td');
excel_row_data[excel_row_length-2][4] = document.createElement('td');
excel_row_data[excel_row_length-2][5] = document.createElement('td');
excel_row_data[excel_row_length-2][0].innerHTML = "총수입비율";
excel_row_data[excel_row_length-2][1].innerHTML = (monthly_rental_fee*period/supply).toString() + "%";
excel_row_data[excel_row_length-2][2].innerHTML = "";
excel_row_data[excel_row_length-2][3].innerHTML = "";
excel_row_data[excel_row_length-2][4].innerHTML = "총수입비율";
excel_row_data[excel_row_length-2][5].innerHTML = (monthly_rental_fee*period/supply).toString() + "%";

excel_row_data[excel_row_length-2][1].classList.add("number-content");
excel_row_data[excel_row_length-2][3].classList.add("number-content");
excel_row_data[excel_row_length-2][5].classList.add("number-content");

excel_row[excel_row_length-2].appendChild(excel_row_data[excel_row_length-2][0]);
excel_row[excel_row_length-2].appendChild(excel_row_data[excel_row_length-2][1]);
excel_row[excel_row_length-2].appendChild(excel_row_data[excel_row_length-2][2]);
excel_row[excel_row_length-2].appendChild(excel_row_data[excel_row_length-2][3]);
excel_row[excel_row_length-2].appendChild(excel_row_data[excel_row_length-2][4]);
excel_row[excel_row_length-2].appendChild(excel_row_data[excel_row_length-2][5]);

excel_tbody.appendChild(excel_row[excel_row_length-2]);

excel_row[excel_row_length-1] = document.createElement('tr');
excel_row_data[excel_row_length-1][0] = document.createElement('td');
excel_row_data[excel_row_length-1][1] = document.createElement('td');
excel_row_data[excel_row_length-1][2] = document.createElement('td');
excel_row_data[excel_row_length-1][3] = document.createElement('td');
excel_row_data[excel_row_length-1][4] = document.createElement('td');
excel_row_data[excel_row_length-1][5] = document.createElement('td');
excel_row_data[excel_row_length-1][0].innerHTML = "월간회수율";
excel_row_data[excel_row_length-1][1].innerHTML = (monthly_rental_fee/supply).toString() + "%";
excel_row_data[excel_row_length-1][2].innerHTML = "Ins";
excel_row_data[excel_row_length-1][3].innerHTML = insurance;
excel_row_data[excel_row_length-1][4].innerHTML = "월간회수율";
excel_row_data[excel_row_length-1][5].innerHTML = (monthly_rental_fee/supply).toString() + "%";

excel_row_data[excel_row_length-1][1].classList.add("number-content");
excel_row_data[excel_row_length-1][3].classList.add("number-content");
excel_row_data[excel_row_length-1][5].classList.add("number-content");

excel_row[excel_row_length-1].appendChild(excel_row_data[excel_row_length-1][0]);
excel_row[excel_row_length-1].appendChild(excel_row_data[excel_row_length-1][1]);
excel_row[excel_row_length-1].appendChild(excel_row_data[excel_row_length-1][2]);
excel_row[excel_row_length-1].appendChild(excel_row_data[excel_row_length-1][3]);
excel_row[excel_row_length-1].appendChild(excel_row_data[excel_row_length-1][4]);
excel_row[excel_row_length-1].appendChild(excel_row_data[excel_row_length-1][5]);

excel_tbody.appendChild(excel_row[excel_row_length-1]);

excel_table.appendChild(excel_thrad);
excel_table.appendChild(excel_tbody);

document.getElementById("main-div").appendChild(excel_table);

