function hideAll(){
    document.getElementById("listPage").classList.add("hidden");
    document.getElementById("createPage").classList.add("hidden");
    document.getElementById("detailPage").classList.add("hidden");
}

function showCreate(){
    hideAll();
    document.getElementById("createPage").classList.remove("hidden");
}

function openCustomer(name,time,amount,date,desc,note){
    hideAll();
    document.getElementById("detailPage").classList.remove("hidden");

    document.getElementById("dname").innerText = name;
    document.getElementById("dtime").innerText = time;
    document.getElementById("damount").innerText = "Rs."+amount;
    document.getElementById("ddate").innerText = date;
    document.getElementById("ddesc").innerText = desc;
    document.getElementById("dnote").innerText = note;
}

function saveQuotation(){
    let name = cname.value;
    let amount = camount.value;
    let date = cdate.value;
    let desc = cdesc.value;
    let note = cnote.value;

    openCustomer(name,"Just now",amount,date,desc,note);
}

function goHome(){
    hideAll();
    document.getElementById("listPage").classList.remove("hidden");
}

function download(){
    alert("Quotation Downloaded");
}

function shareWhatsApp(){
    let msg = "Quotation for "+dname.innerText+
              " | Amount: "+damount.innerText+
              " | Valid till: "+ddate.innerText;
    window.open("https://wa.me/?text="+encodeURIComponent(msg));
}
