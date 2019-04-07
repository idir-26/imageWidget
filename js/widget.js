class imageWidget extends Widget {
	
	constructor(id, app) {
		super(id, imageModel, imageView, imageController, app);
	}
	
	setUp() {
		super.setUp();
		this.header = true;
		this.footer = true;
		this.sizeX = 1;
		this.sizeY = 1.25;
		this.radius = 15;
	}
	
	async ready() {
		super.ready();
		
	}
	
}

class imageModel extends WidgetModel {
	
	constructor() {
		super();
	}
	
	setUp() {
		super.setUp();
		
	}

}

class imageView extends WidgetView {
	
	constructor() {
		super();
	}
	
	setUp() {
		super.setUp();
		
	}

	draw() {
		super.draw();
		this.link = HH.create("a");
		SS.style(this.link, {"fontSize": "10px", "textDecoration": "none"});
		this.stage.appendChild(this.link);
		
		this.bloc = HH.create("input"); //creer un camp texte.	id = "champTexte" size = "39" type = "texte"
		this.bloc.setAttribute("id","champTexte");
		this.bloc.setAttribute("size","39");
		this.bloc.setAttribute("type","texte");
		this.stage.appendChild(this.bloc);
		
		
		this.footer.innerHTML = "recherche"; //pour demarer la recherche.
		SS.style(this.footer,{"userSelect": "none", "cursor":"pointer"});
		this.click = this.footer.addEventListener("click", event => this.mvc.controller.recherche());
		// Event.on(this.footer, "click", event =>this.mvc.controller.valider());
		this.stage.appendChild(this.footer);
		
		this.afficherImage= HH.create("img");
		this.stage.appendChild(this.afficherImage);
		
	}
	
	update(image) {
		this.afficherImage.innerHTML = image;
	}
	
}

class imageController extends WidgetController {
	
	constructor() {
		super();
	}
	
	setUp() {
		super.setUp();
		
	}
	
	async recherche() {
		this.mot = document.getElementById("champTexte").value //mettre le mot dans une variable
		this.lien = "https://www.google.com/search?q=" + this.mot + "&client=firefox-b-e&source=lnms&tbm=isch";
		console.log(this.lien);
		let result = await this.mvc.main.dom(this.lien); // load web page
		let domstr = _atob(result.response.dom); // decode result
		let parser = new DOMParser(); // init dom parser
		let dom = parser.parseFromString(domstr, "text/html"); // inject result
		let article = new xph().doc(dom).ctx(dom).craft('//*[@id="rg_s"]/div/a[1]/img').firstResult; // find interesting things
		this.mvc.view.update(article.getAttributes("src"));
		
	}
	
}
