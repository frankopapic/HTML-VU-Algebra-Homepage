const xhr = new XMLHttpRequest();
const url = "http://www.fulek.com/VUA/SUPIT/GetNastavniPlan";
xhr.open("GET", url);

var data = [];
var kolegiji = [];
var id = [];

xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
        data = JSON.parse(xhr.response);
        data.forEach(element => {
            kolegiji.push(element.label);
            id.push(element.value);
        });
    }
};

xhr.send();
console.log(kolegiji);
var kolegijObjekti = [];

$("#autocomplete-field").autocomplete({
    source: kolegiji,
    select: function (event, ui) {
        data.forEach(element => {
            if (element.label === ui.item.label) {
                let id = element.value;

                var xhr2 = new XMLHttpRequest();
                xhr2.open("GET", `http://www.fulek.com/VUA/SUPIT/GetKolegij/${id}`);
                xhr2.onreadystatechange = function () {
                    if (xhr2.readyState === XMLHttpRequest.DONE) {
                        xhr2.onload = function () {
                            kolegijObjekti.push(JSON.parse(xhr2.response));
                            let zadnjiKolegij = kolegijObjekti[kolegijObjekti.length - 1];
                            $("table tbody").append(
                                `<tr>
                                    <td>${zadnjiKolegij.kolegij}</th>
                                    <td>${zadnjiKolegij.ects}</th>
                                    <td>${zadnjiKolegij.sati}</th>
                                    <td>${zadnjiKolegij.predavanja}</th>
                                    <td>${zadnjiKolegij.vjezbe}</th>
                                    <td>${zadnjiKolegij.tip}</th>
                                    <td><button class="table-button"></button></th>
                                </tr>`
                            );
                        }
                    }

                }
                xhr2.send();
            }
        });
    },
    minlength: 2
});


