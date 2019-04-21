//class modal sert a afficher un modal d'un restaurant sur la map

class modal {
    constructor(whatListResto, where, typeList, numberListResto) {
        this.whatListResto = whatListResto;
        this.typeList = typeList;
        this.where = where;
        this.numberListResto = numberListResto;
        this.createModal();
    }

    createModal() {

        P7.modal = {};

        this.verifModal();
        this.addModalContent()
        this.addModalTitle(P7.modal.modalBody);
        this.addModalComments(P7.modal.modalBody);
        this.addImgStreetview(P7.modal.modalBody);
        this.addCloseModal(P7.modal.modalBody, P7.modal.modalContent);
        this.addComments(P7.modal.modalBody);

    }

    verifModal() {

        if (document.getElementById("modal-content") != null) {
            document.getElementById("map").removeChild(document.getElementById("modal-content"));
        }
    }

    addModalContent() {
        
        P7.modal.modalContent = document.createElement("div");
        P7.modal.modalContent.id = "modal-content";
        P7.modal.modalContent.setAttribute("class", "modal-content");
        document.getElementById("map").appendChild(P7.modal.modalContent);

        P7.modal.modalBody = document.createElement("div");
        P7.modal.modalBody.setAttribute("class", "modal-body");
        P7.modal.modalContent.appendChild(P7.modal.modalBody);
    }

    addModalComments(modalBody) {
        
        P7.numberRatings = this.whatListResto[this.numberListResto].ratings.length;
        P7.modal.modalComments = document.createElement("div")
        P7.modal.modalComments.id = "restoComments" + this.NumberListResto;

        for (let j = 0; j < P7.numberRatings; j++) {
            P7.modal.ratingsStars = this.whatListResto[this.numberListResto].ratings[j].stars;
            P7.modal.starsComments = document.createElement("div");

            for (let K = 0; K < P7.modal.ratingsStars; K++) {

                P7.modal.starComment = document.createElement("i");
                P7.modal.starsComments.appendChild(P7.modal.starComment);
                P7.modal.starComment.setAttribute("class", "fas fa-star starComment");
               P7.modal. modalComments.appendChild(P7.modal.starsComments);
            }
            
            P7.modal.comment = document.createElement("p");
            P7.modal.comment.innerHTML = "'' " + this.whatListResto[this.numberListResto].ratings[j].comment + " ''";
            P7.modal.modalComments.appendChild(P7.modal.comment);
        }
        
        modalBody.appendChild(P7.modal.modalComments);
    }

    addModalTitle(modalBody) {
        
        const self = this;
        P7.modal.modalTitle = document.createElement("h3");
        P7.modal.modalTitle.innerHTML = self.whatListResto[self.numberListResto].restaurantName;
        P7.modal.modalTitle.setAttribute("class", "modal-title");
        modalBody.appendChild(P7.modal.modalTitle);
    }


    addImgStreetview(modalBody) {

        const self = this;
        P7.modal.imgStreetView = document.createElement("img");
        P7.modal.imgStreetView.src = P7.streetView(self.whatListResto[this.numberListResto].lat, self.whatListResto[this.numberListResto].long);
        modalBody.appendChild(P7.modal.imgStreetView);
    }


    addCloseModal(modalBody, modalContent) {

        P7.modal.closeModal = document.createElement("button");
        P7.modal.closeModal.id = "closeMdl";
        P7.modal.closeModal.setAttribute("type", "button");
        P7.modal.closeModal.setAttribute("class", "btn btn-outline-secondary");
        P7.modal.closeModal.innerHTML = "Retour";
        modalBody.appendChild(P7.modal.closeModal);
        
        P7.modal.closeModal.onclick = function () {
            modalContent.style.display = "none";
        }
    }

    addComments(modalBody) {
        
        self = this;
        P7.modal.addComment = document.createElement("button");
        P7.modal.addComment.id = "btnAddComment";
        P7.modal.addComment.setAttribute("type", "button");
        P7.modal.addComment.setAttribute("class", "btn btn-outline-secondary");
        P7.modal.addComment.innerHTML = "ajoutez un commentaire";
        modalBody.appendChild(P7.modal.addComment);
        
        P7.modal.addComment.onclick = function () {
            document.getElementById("modal-content").removeChild(modalBody);
            new modalComment(self.whatListResto, self.where, self.typeList, self.numberListResto);
        }
    }
}
