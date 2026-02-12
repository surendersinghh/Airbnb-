// let taxSwitch = document.getElementById("switchCheckDefault");
// taxSwitch.addEventListener("click", () => {
//     let taxInfo = document.getElementsByClassName("tax-info");
//     for(info of taxInfo) {
//         if(info.style.display != "inline") {
//             info.style.display = "inline";
//         } else {
//             info.style.display = "none";
//         }
       
//     }
// });

//-------- Dipesh Changed Code------
let taxSwitch = document.getElementById("switchCheckDefault");

if (taxSwitch) {
    taxSwitch.addEventListener("click", () => {
        let taxInfo = document.getElementsByClassName("tax-info");
        
        for (let info of taxInfo) {
            if (info.style.display !== "inline") {
                info.style.display = "inline";
            } else {
                info.style.display = "none";
            }
        }
    });
}
