// class filtre sert a définir la notation minimal des restaurant a push dans la class ListRestoDom avec function pour lancer la class ListRestoDom en cas de changement de valeur de noteMini

class Filtre {

    constructor() {

        this.initfiltre();
    }

    initfiltre() {

        P7.noteMini = 0;
        P7.filtre = {};

        this.addFormGroup();
        this.addSelect();
        this.addBtnForm();

    }

    addFormGroup() {

        P7.filtre.formGroup = document.createElement("form");
        P7.filtre.formGroup.setAttribute("class", "form-group form-inline");
        filtreResto.appendChild(P7.filtre.formGroup);
    }

    addSelect() {

        P7.filtre.lbl = document.createElement("label");
        P7.filtre.lbl.setAttribute("for", "labelStars");
        P7.filtre.lbl.innerHTML = "Note minimal des restaurant à afficher ? : ";
        P7.filtre.formGroup.appendChild(P7.filtre.lbl);

        P7.filtre.slt = document.createElement("select");
        P7.filtre.slt.setAttribute("class", "form-control");
        P7.filtre.slt.id = "selectStars";
        P7.filtre.formGroup.appendChild(P7.filtre.slt);

        for (let i = 1; i < 6; i++) {
            P7.filtre.optn = document.createElement("option");
            P7.filtre.optn.innerHTML = i;
            P7.filtre.slt.appendChild(P7.filtre.optn);
        }
    }

    addBtnForm() {

        P7.filtre.btnform = document.createElement("button");
        P7.filtre.btnform.id = "btnformFiltre";
        P7.filtre.btnform.setAttribute("type", "button");
        P7.filtre.btnform.setAttribute("class", "btn btn-outline-secondary");
        P7.filtre.btnform.innerHTML = "rechercher";
        P7.filtre.formGroup.appendChild(P7.filtre.btnform);

        P7.filtre.btnform.addEventListener('click', function () {
            List.innerHTML = "";
            ListPlace.innerHTML = "";
            P7.noteMini = P7.filtre.slt.options[P7.filtre.slt.selectedIndex].value;
            new ListRestoDom(P7.ListResto, List, "listJSON");
            new ListRestoDom(P7.places.restoPlace, ListPlace, "ListMaps");
        });
    }

}
