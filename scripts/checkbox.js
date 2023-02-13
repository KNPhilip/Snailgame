//Disabling the snails if the depending on the checkbox on the index page
document.querySelector("#thirdCheckBox").onchange = function()
{
    document.querySelector("#thirdSnail").disabled = !this.checked;
    if (this.checked == true){
        document.querySelector("#fourthCheckBox").disabled = false;
    }
    else{
        document.querySelector("#fourthCheckBox").checked = false;
        document.querySelector("#fourthCheckBox").disabled = true;
        document.querySelector("#fourthSnail").disabled = true;
    }
};

document.querySelector("#fourthCheckBox").onchange = function()
{
    document.querySelector("#fourthSnail").disabled = !this.checked;
};