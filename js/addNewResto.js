// class formNewResto sert a creer un modal qui contien un formaulaire pour push un nouveau tableau dans le la liste des resaurant a afficher

class formNewResto {
    constructor() {
        this.creatFormNewResto();

    }

    creatFormNewResto() {
        P7.newResto = {};

        this.verifModal();
        this.addModal();
        this.addForm();
        this.addFormGroup();
        this.addInput();
        this.addBtnRetour();
        this.addBtnformPushListResto();

    }


    addModal() {

        P7.newResto.modalContent = document.createElement("div");
        P7.newResto.modalContent.id = "modal-content";
        P7.newResto.modalContent.setAttribute("class", "modal-content");
        document.getElementById("map").appendChild(P7.newResto.modalContent);

        P7.newResto.modalBody = document.createElement("div");
        P7.newResto.modalBody.setAttribute("class", "modal-body");
        P7.newResto.modalContent.appendChild(P7.newResto.modalBody);
    }


    addForm() {

        P7.newResto.formInitNewResto = document.createElement("form");
        P7.newResto.modalBody.appendChild(P7.newResto.formInitNewResto);
    }


    addFormGroup() {

        P7.newResto.formGroup = document.createElement("div");
        P7.newResto.formGroup.setAttribute("class", "form-group");
        P7.newResto.formInitNewResto.appendChild(P7.newResto.formGroup);
    }

    addInput() {

        P7.newResto.lblTextName = document.createElement("label");
        P7.newResto.lblTextName.setAttribute("for", "labelTextName");
        P7.newResto.lblTextName.innerHTML = "Entrez le nom du restaurant a ajouter : ";
        P7.newResto.formGroup.appendChild(P7.newResto.lblTextName);

        P7.newResto.inputName = document.createElement("input");
        P7.newResto.inputName.id = "labelTextName";
        P7.newResto.inputName.setAttribute("class", "form-control");
        P7.newResto.inputName.setAttribute("rows", "3");
        P7.newResto.inputName.value = "...";
        P7.newResto.formGroup.appendChild(P7.newResto.inputName);
    }


    addBtnRetour() {

        P7.newResto.btnformRetour = document.createElement("button");
        P7.newResto.btnformRetour.id = "btnform";
        P7.newResto.btnformRetour.setAttribute("type", "button");
        P7.newResto.btnformRetour.setAttribute("class", "btn btn-outline-secondary");
        P7.newResto.btnformRetour.innerHTML = "Retour a la map";
        P7.newResto.formGroup.appendChild(P7.newResto.btnformRetour);

        P7.newResto.btnformRetour.addEventListener('click', function () {
            document.getElementById("map").removeChild(document.getElementById("modal-content"));
        });
    }
    addBtnformPushListResto() {

        P7.newResto.btnformCreate = document.createElement("button");
        P7.newResto.btnformCreate.id = "btnformCreate";
        P7.newResto.btnformCreate.setAttribute("type", "button");
        P7.newResto.btnformCreate.setAttribute("class", "btn btn-outline-secondary");
        P7.newResto.btnformCreate.innerHTML = "Ajoutez le restaurant";
        P7.newResto.formGroup.appendChild(P7.newResto.btnformCreate);

        P7.newResto.btnformCreate.addEventListener('click', function () {
            if (P7.newResto.inputName.value !== "...") {
                P7.ListResto.push({
                    "restaurantName": P7.newResto.inputName.value,
                    "address": P7.newAdress,
                    "lat": P7.newLat,
                    "long": P7.newLng,
                    "ratings": [
      ]
                })

                List.innerHTML = "";
                new ListRestoDom(P7.ListResto, List, "listJSON", P7.ListResto.numberResto);
                P7.MarkersListRestoJSON(P7.ListResto, List, "listJSON", P7.ListResto.numberResto);
                document.getElementById("map").removeChild(document.getElementById("modal-content"));

            } else {
                alert("Vous devez taper un nom de restaurant avant de valider");
            }

        });
    }


    verifModal() {

        if (document.getElementById("modal-content") != null) {
            document.getElementById("map").removeChild(document.getElementById("modal-content"));
        }
    }
}
