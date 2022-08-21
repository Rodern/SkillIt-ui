class Route {
    constructor(name, path, handler) {
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
        for (let i = 0; i < this.routes.length; i++) {
            let paramNames = [];
            let regexPath = this.routes[i].path.replace(/([:*])(\w+)/g, (full, colon, name) => {
                paramNames.push(name);
                return '([^\/+])';
            }) + '(?:\/|$)';

            let routeMatch = route.match(new RegExp(regexPath));
            if (routeMatch !== null) {
                let params = routeMatch.slice(1, routeMatch.length).reduce((params, value, index) => {
                    if (params === null) { params = {} }
                    params[paramNames[index]] = value;
                    return params;
                }, null);

                if (params === null) {
                    this.routes[i].handler();
                } else {
                    this.routes[i].handler(params);
                }
                this.location(route)
            }
        }
    }

    location(route) {
        if (this.mode === 'history') {
            window.history.pushState(null, null, this.root + route);
        } else {
            route = route.replace(/^\//, '').replace(/\/$/, '');
            window.location.href = window.location.href.replace(/#(.*)$/, '') + '#' + route;
        }
    }
}

const _ROUTER = new Router();
_ROUTER.mode = 'hash';
_ROUTER.root = window.location.origin;
/* 
_ROUTER.add({ name: 'Dashboard', path: '/dashboard', handler: () => Loader() });
_ROUTER.add({ name: 'Welcome', path: '/welcome', handler: () => loadWelcome() }); */
