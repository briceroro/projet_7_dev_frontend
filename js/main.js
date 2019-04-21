// creation de l'objet ou va etre stocker la totaltié du site (P7)
// class initMyApp sert a recuperer le fichier JSON ou sont stocker les restaunt de base
// sert egalment a lancer la class filtre et ListRestoDom

const P7 = {};


class initMyApp {
    constructor() {

        this.startInit();
        this.ListResto = this.ListResto.bind(this);
    }

    ListResto(reponse) {

        P7.ListResto = JSON.parse(reponse);    
        new Filtre();
        new ListRestoDom(P7.ListResto, List, "listJSON",P7.ListResto.numberResto);
    }

    startInit() {
        ajaxGet("JSON/ListRestos.json", this.ListResto);
    }
}
new initMyApp();


