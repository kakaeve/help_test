
function inputNumberAutoComma(obj){
    
    //콤마( , )의 경우도 문자로 인식되기 때문에 콤마를 제거한다.
    let deleteComma = obj.value.replace(/\,/g,"");

    //콤마를 제외하고 문자가 입력되었는지를 확인한다.
    if(isFinite(deleteComma) == false){
        alert("문자는 입력하실 수 없습니다.");
        obj.value = "";
        return false;
    }

    //기존에 들어가있던 콤마( , )를 제거한 후의 입력값에 다시 콤마( , )를 삽입한다.
    obj.value = inputNumberWithComma(inputNumberRemoveComma(obj.value));
}

//천단위 이상의 숫자에 콤마를 삽입하는 함수
function inputNumberWithComma(str){
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g,"$1,");
}

//콤마가 들어간 값에 콤마를 제거하는 함수
function inputNumberRemoveComma(str){
    str = String(str);
    return str.replace(/[^\d]+/g,"");
}

