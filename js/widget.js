class imageWidget extends Widget {
	
	constructor(id, app) {
		super(id, imageModel, imageView, imageController, app);
	}
	
	setUp() {
		super.setUp();
		this.header = true;
		this.footer = false;
		this.sizeX = 1;
		this.sizeY = 1.25;
		this.radius = 15;
	}
	
	async ready() {
		super.ready();
		
		this.controller.load();
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
		
		
		this.footer.innerHTML = "valider"; //pour demarer la recherche.
		ss.style(this.footer,{"userSelect": "none", "cursor":"pointer"});
		this.click = this.footer.addEventListener("click", event => this.mvc.controller.valider());
		this.stage.appendChild(this.footer);
		
	
		
		
	}
	
	update(title, link) {
		this.link.innerHTML = title;
		HH.attr(this.link, {"href": "https://www.google.com/search?q=mot&client=firefox-b-e&source=lnms&tbm=isch"});
	}
	
}

class imageController extends WidgetController {
	
	constructor() {
		super();
	}
	
	setUp() {
		super.setUp();
		
	}
	
	async load() {
		tihs.mot = document.getElementById("champTexte").value //mettre le mot dans une variable
		
		let result = await this.mvc.main.dom("https://www.google.com/search?q=mot&client=firefox-b-e&source=lnms&tbm=isch"); // load web page
		let domstr = _atob(result.response.dom); // decode result
		let parser = new DOMParser(); // init dom parser
		let dom = parser.parseFromString(domstr, "text/html"); // inject result
		let article = new xph().doc(dom).ctx(dom).craft('//*[@id="en-continu"]/div/ul/li[1]/a').firstResult; // find interesting things
		this.mvc.view.update(article.textContent, article.getAttribute("href"));
	}
	
}
