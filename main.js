const request = require("request");

class Scene {
    constructor({ndi=""}) {
        this.ndi = ndi
    }
}

exports.Scene = Scene;

class Monitor {
    constructor({ip="localhost", port=80, url="/v1/configuration", version=1, isSecure=false}) {
        this.ip = ip;
        this.port = port;
        this.baseUrl = url;
        this.apiVersion = version;
        this.isSecure = isSecure;
    }

    send(payload) {
        request({
            method: "POST",
            uri: `${(this.isSecure ? "https":"http")}://${this.ip}:${this.port}${this.baseUrl}`,
            'headers': {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            body: JSON.stringify({version: this.apiVersion, ...payload})
        })
    }

    affectScene(scene) {
        this.send({"NDI_source": scene.ndi})
    }

    setAsPIP(scene) {
        this.send({"NDI_overlay": scene.ndi})
    }

    setPIP(state) {
        this.send({"decorations": {"picture_in_picture": state.toString()}})
    }
}

exports.Monitor = Monitor;

class Collection {
    constructor() {
        this.hosts = {};
        this.scenes = {}
    }

    addHost(name, settings) {
        this.hosts[name] = new Monitor(settings);
    }

    addDefinedHost(name, host) {
        this.hosts[name] = host;
    }

    deleteHost(name) {
        delete this.hosts[name];
    }

    addScene(name, settings) {
        this.scenes[name] = new Scene(settings);
    }

    addDefinedScene(name, scene) {
        this.scenes[name] = scene;
    }

    deleteScene(name) {
        delete this.scenes[name];
    }
}

exports.Collection = Collection;
