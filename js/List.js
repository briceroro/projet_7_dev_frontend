// la class ListRestoDom sert a afficher la liste des restaurnat du fichier JSON et Places
// avec le nom, l'adresse, et la notation  du restaurant
// fonction pour lancer la class Modal


class ListRestoDom {

    constructor(whatListResto, where, typeList, numberListResto) {
        this.whatListResto = whatListResto;
        this.typeList = typeList;
        this.where = where;
        this.numberListResto = numberListResto;
        this.ListRestoDom();

    }

    ListRestoDom() {

        P7.initListDom = {};
        P7.initListDom.i = 0;

        for (let i = 0; i < this.whatListResto.length; i++) {

            P7.initListDom.i = i;

            this.initNumberAndAverage();

            if (P7.averageRating >= P7.noteMini || P7.averageRating == 0) {

                this.addDivContentResto();
                this.addRestoName();
                this.addGroupStarRating();
                this.addAdressResto();

                const self = this;

                document.getElementById(this.whatListResto[i].restaurantName).addEventListener('click', function () {
                    self.numberListResto = i;
                    new modal(self.whatListResto, self.where, self.typeList, self.numberListResto);
                });
            }
        }
    }


    initNumberAndAverage() {

        P7.numberRatings = this.whatListResto[P7.initListDom.i].ratings.length;
        let rating = 0;
        for (let j = 0; j < P7.numberRatings; j++) {
            rating = rating + this.whatListResto[P7.initListDom.i].ratings[j].stars;
            P7.averageRating = rating / P7.numberRatings;
            if (P7.numberRatings == 0) {
                P7.averageRating = 0;
            }
        }
    }


    addDivContentResto() {
        P7.initListDom.resto = document.createElement("div");
        P7.initListDom.resto.id = this.whatListResto[P7.initListDom.i].restaurantName;
        P7.initListDom.resto.setAttribute("class", this.typeList);
        this.where.appendChild(P7.initListDom.resto);
    }

    addRestoName() {
        P7.initListDom.restoName = document.createElement("h3");
        P7.initListDom.restoName.id = "restoName" + P7.initListDom.i;
        P7.initListDom.resto.appendChild(P7.initListDom.restoName);
        P7.initListDom.resto.innerHTML = this.whatListResto[P7.initListDom.i].restaurantName;
    }


    addGroupStarRating() {
        
        if (P7.numberRatings > 0) {
            P7.initListDom.initElem = P7.averageRating.toString();
            P7.initListDom.elem = P7.initListDom.initElem.split('.');

            if (P7.initListDom.elem[1]) {
                P7.initListDom.elem[1].substr(0, 1);
            }

            P7.initListDom.groupStarRatings = document.createElement("div");

            for (let j = 0; j < P7.initListDom.elem[0]; j++) {

                P7.initListDom.star = document.createElement("i");
                P7.initListDom.star.id = "listStar" + P7.initListDom.i + P7.initListDom.restoName.id;
                P7.initListDom.groupStarRatings.appendChild(P7.initListDom.star);
                P7.initListDom.star.setAttribute("class", "fas fa-star listStar");
            }



            if (P7.initListDom.elem[1] > 4) {
                P7.initListDom.star = document.createElement("i");
                P7.initListDom.star.id = "listStar" + P7.initListDom.i + P7.initListDom.restoName.id;
                P7.initListDom.groupStarRatings.appendChild(P7.initListDom.star);
                P7.initListDom.star.setAttribute("class", "fas fa-star-half listStar");
            }

            P7.initListDom.resto.appendChild(P7.initListDom.groupStarRatings);
        }

    }


    addAdressResto() {
        P7.initListDom.addressResto = document.createElement("p");
        P7.initListDom.addressResto.id = "adressResto" + P7.initListDom.i;
        P7.initListDom.resto.appendChild(P7.initListDom.addressResto);
        P7.initListDom.addressResto.innerHTML = this.whatListResto[P7.initListDom.i].address;
    }


}
