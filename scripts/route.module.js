class Route {
    constructor(name, path, handler){
        this.name = name;
        this.path = path;
        this.handler = handler;
    }
    
    get name() {
        return this.name;
    }
    set name(name) {
        this.name = name;
    }

    get path() {
        this.path;
    }
    set path(path) {
        this.path = path;
    }

    get handler() {
        this.handler;
    }
    set handler(handler) {
        this.handler = handler;
    }
}

class Router {
    constructor() {
        this.mode = 'history';
        this.routes = [];
        this.root = '/';
    }

    add(route) {
        this.routes.push(route);
        return this
    }

    navigate(route) {
        route = route ? route : '';
        this.match(route);
    }

    match(route) {
        let matched = false
        this.routes.forEach(iroute => {
            if(iroute.path == route) {
                iroute.handler();
                this.location(route)
                matched = true
                return
            }
        });
        /* for (let i = 0; i < this.routes.length; i++) {
            let paramNames = [];
            let regexPath = this.routes[i].path.replace(/([:*])(\w+)/g, (full, colon, name) => {
                paramNames.push(name);
                return '([^\/+])';
            }) + '(?:\/|$)';
            
            let routeMatch = route.match(new RegExp(regexPath));
            if (routeMatch !== null) {
                let params = routeMatch.slice(1, routeMatch.length).reduce((params, value, index) => {
                    if (params === null) {params = {}}
                    params[paramNames[index]] = value;
                    return params;
                }, null);

                if (params === null) {
                    this.routes[i].handler();
                } else {
                    this.routes[i].handler(params);
                }
                document.querySelector('title').innerText = `${AppName} | ${this.routes[i].name}`
                this.location(route)
                return
            }
            
        } */
        if(route == '/' || route == '') return
        if(matched == true) return
        loader.addClass('hidden')
        popUpBox('error', 'Invalid: Route not found!', 'acceptInvalid', 'none', () =>{
            if(_RouteChanged == true){
                history.back()
            } else {
                _ROUTER.navigate('/home')
            }
            clearPopUpBox();
        })
    }
    
    location(route) {
        if (this.mode === 'history') {
            window.history.pushState(null, null, this.root + location.pathname + route.substring(1));
        } else {
            route = route.replace(/^\//, '').replace(/\/$/, '');
            //window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + route;
            window.history.pushState(null, null, window.location.href.replace(/#(.*)$/, '') + '#' + route);
        }          
    }
}

const _ROUTER = new Router();
_ROUTER.mode = 'hash';
_ROUTER.root = window.location.origin;

_RouteChanged = false

_ROUTER.add({ name: 'Dashboard', path: '/dashboard', handler: () => loadDashbaord() });
_ROUTER.add({ name: 'Home', path: '/home', handler: () => loadLandingPage() });
_ROUTER.add({ name: 'About', path: '/about', handler: () => loadAbout() });
_ROUTER.add({ name: 'Catalogs', path: '/catalogs', handler: () => loadCatalog() });
