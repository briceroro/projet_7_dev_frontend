// class modalComment sert a rajouter un commentaire pour un restaurant via un formulaire
// fonction pour supprimer un modal existant lors de l'affichage du nouveau si besoin

class modalComment {
    constructor(whatListResto, where, typeList, numberListResto) {
        this.whatListResto = whatListResto;
        this.typeList = typeList;
        this.where = where;
        this.numberListResto = numberListResto;
        this.createModalComment();
    }

    createModalComment() {

        P7.modalComment = {};

        this.verifModalContent();
        this.addModalBody();
        this.addinitForm();
        this.addGroupStar();
        this.addFormGroupComment();
        this.addBtnFormComment();
        this.eventModalComment();

    }

    addModalBody() {
        P7.modalComment.modalContentComment = document.createElement("div");
        P7.modalComment.modalContentComment.id = "modalContentComment";
        P7.modalComment.modalContentComment.setAttribute("class", "modal-content");
        document.getElementById("modal-content").prepend(P7.modalComment.modalContentComment);

        P7.modalComment.modalBody = document.createElement("div");
        P7.modalComment.modalBody.setAttribute("class", "modal-body");
        P7.modalComment.modalContentComment.appendChild(P7.modalComment.modalBody);
    }
    
    
    addinitForm() {
        P7.modalComment.formInit = document.createElement("form");
        P7.modalComment.modalBody.appendChild(P7.modalComment.formInit);
    }

    addGroupStar() {
        P7.modalComment.formGroupStar = document.createElement("div");
        P7.modalComment.formGroupStar.setAttribute("class", "form-group");
        P7.modalComment.formInit.appendChild(P7.modalComment.formGroupStar);

        P7.modalComment.lbl = document.createElement("label");
        P7.modalComment.lbl.setAttribute("for", "selectStars");
        P7.modalComment.lbl.innerHTML = "Notez le restaurant de 1 a 5 étoiles : ";
        P7.modalComment.formGroupStar.appendChild(P7.modalComment.lbl);

        P7.modalComment.slt = document.createElement("select");
        P7.modalComment.slt.setAttribute("class", "form-control");
        P7.modalComment.slt.id = "selectStars";
        P7.modalComment.formGroupStar.appendChild(P7.modalComment.slt);

        for (let i = 1; i < 6; i++) {
            P7.modalComment.optn = document.createElement("option");
            P7.modalComment.optn.innerHTML = i;
            P7.modalComment.slt.appendChild(P7.modalComment.optn);
        }
    }
    
    addFormGroupComment() {
        P7.modalComment.formGroupComment = document.createElement("div");
        P7.modalComment.formGroupComment.setAttribute("class", "form-group");
        P7.modalComment.formInit.appendChild(P7.modalComment.formGroupComment);

        P7.modalComment.lblTextComment = document.createElement("label");
        P7.modalComment.lblTextComment.setAttribute("for", "labelTextComment");
        P7.modalComment.lblTextComment.innerHTML = "Ecrire votre commentaire ici ? : ";
        P7.modalComment.formGroupComment.appendChild(P7.modalComment.lblTextComment);

        P7.modalComment.textareaComment = document.createElement("textarea");
        P7.modalComment.textareaComment.id = "labelTextComment";
        P7.modalComment.textareaComment.setAttribute("class", "form-control");
        P7.modalComment.textareaComment.setAttribute("rows", "3");
        P7.modalComment.textareaComment.innerHTML = "...";

        P7.modalComment.formGroupComment.appendChild(P7.modalComment.textareaComment);
    }

    addBtnFormComment() {
        P7.modalComment.btnformComment = document.createElement("button");
        P7.modalComment.btnformComment.id = "btnformComment";
        P7.modalComment.btnformComment.setAttribute("type", "button");
        P7.modalComment.btnformComment.setAttribute("class", "btn btn-outline-secondary");
        P7.modalComment.btnformComment.innerHTML = "envoyez votre commentaire";
        P7.modalComment.formInit.appendChild(P7.modalComment.btnformComment);
    }

    verifModalContent() {

        if (document.getElementById("modalContentComment") != null) {

            document.getElementById("modal-content").removeChild(document.getElementById("modalContentComment"));
        }
    }
    
    eventModalComment() {
        
        const self = this;
        P7.modalComment.btnformComment.addEventListener('click', function () {

            P7.modalComment.choiceStarRating = parseInt(P7.modalComment.slt.options[P7.modalComment.slt.selectedIndex].value);
            P7.modalComment.textareaValue = document.getElementById('labelTextComment').value;

            self.whatListResto[self.numberListResto].ratings.push({
                "stars": P7.modalComment.choiceStarRating,
                "comment": P7.modalComment.textareaValue
            })

            self.where.innerHTML = "";
            new ListRestoDom(self.whatListResto, self.where, self.typeList, self.numberListResto);
            document.getElementById("modal-content").removeChild(document.getElementById("modalContentComment"));

        });
    }

}
