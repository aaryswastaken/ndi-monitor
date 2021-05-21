const lib = require("../main.js")

describe("empty", () => {
    describe("Scene", () => {
        let emptyScene = new lib.Scene({});

        it("Children are empty", () => {
            expect(emptyScene.ndi).toBeDefined();
            expect(emptyScene.ndi).toStrictEqual("");
        });
    });

    describe("Monitor", () => {
        let emptyMonitor = new lib.Monitor({});

        it("Existing values", () => {
            expect(emptyMonitor.ip).toBeDefined();
            expect(emptyMonitor.port).toBeDefined();
            expect(emptyMonitor.baseUrl).toBeDefined();
            expect(emptyMonitor.apiVersion).toBeDefined();
            expect(emptyMonitor.isSecure).toBeDefined();
        });

        it("Default Values", () => {
            expect(emptyMonitor.ip).toStrictEqual("localhost");
            expect(emptyMonitor.port).toStrictEqual(80);
            expect(emptyMonitor.baseUrl).toStrictEqual("/v1/configuration");
            expect(emptyMonitor.apiVersion).toStrictEqual(1);
            expect(emptyMonitor.isSecure).toStrictEqual(false);
        });

        it("Has methods", () => {
            expect(emptyMonitor.affectScene).toBeDefined();
            expect(emptyMonitor.setAsPIP).toBeDefined();
            expect(emptyMonitor.setPIP).toBeDefined();

            expect(emptyMonitor.send).toBeDefined();
        });
    });

    describe("Collection", () => {
        let emptyCollection = new lib.Collection();

        it("Children are empty", () => {
            expect(emptyCollection.hosts).toBeDefined();
            expect(emptyCollection.hosts).toBeInstanceOf(Object);
            expect(emptyCollection.hosts).toStrictEqual({});

            expect(emptyCollection.scenes).toBeDefined();
            expect(emptyCollection.scenes).toBeInstanceOf(Object);
            expect(emptyCollection.scenes).toStrictEqual({});
        });
    });
});


describe("Definitions", () => {
    let sceneSettings = {"ndi": "foo"};

    let monitorSettings = {
        "ip": "dummyIP",
        "port": 8080,
        "url": "/foo/bar",
        "version": -1,
        "isSecure": true
    };

    let dummyScene = new lib.Scene(sceneSettings);
    let dummyMonitor = new lib.Monitor(monitorSettings);
    let dummyCollection = new lib.Collection();

    it("Scene", () => {
        expect(dummyScene.ndi).toStrictEqual("foo");
    });

    it("Monitor", () => {
        expect(dummyMonitor.ip).toStrictEqual("dummyIP");
        expect(dummyMonitor.port).toStrictEqual(8080);
        expect(dummyMonitor.baseUrl).toStrictEqual("/foo/bar");
        expect(dummyMonitor.apiVersion).toStrictEqual(-1);
        expect(dummyMonitor.isSecure).toStrictEqual(true);
    });

    describe("Collection", () => {
        it("host", () => {
            expect(dummyCollection.hosts).toStrictEqual({});

            dummyCollection.addHost("foo", monitorSettings);

            let testFoo = () => {
                expect(Object.entries(dummyCollection.hosts)).toHaveLength(1);
                expect(Object.keys(dummyCollection.hosts)).toContain("foo");


                expect(dummyCollection.hosts.foo).toBeDefined();
                expect(dummyCollection.hosts.foo.ip).toStrictEqual("dummyIP");
                expect(dummyCollection.hosts.foo.port).toStrictEqual(8080);
                expect(dummyCollection.hosts.foo.baseUrl).toStrictEqual("/foo/bar");
                expect(dummyCollection.hosts.foo.apiVersion).toStrictEqual(-1);
                expect(dummyCollection.hosts.foo.isSecure).toStrictEqual(true);
            }

            testFoo();

            dummyCollection.deleteHost("foo");

            expect(Object.entries(dummyCollection.hosts)).toHaveLength(0);
            expect(Object.keys(dummyCollection.hosts)).not.toContain("foo");

            dummyCollection.addDefinedHost("foo", dummyMonitor);

            testFoo();
        });

        it("scene", () => {
            expect(dummyCollection.scenes).toStrictEqual({});

            dummyCollection.addScene("foo", sceneSettings);

            let testFoo = () => {
                expect(Object.entries(dummyCollection.scenes)).toHaveLength(1);
                expect(Object.keys(dummyCollection.scenes)).toContain("foo");

                expect(dummyCollection.scenes.foo.ndi).toStrictEqual("foo");
            }

            testFoo();

            dummyCollection.deleteScene("foo");

            expect(Object.entries(dummyCollection.scenes)).toHaveLength(0);
            expect(Object.keys(dummyCollection.scenes)).not.toContain("foo");

            dummyCollection.addDefinedScene("foo", dummyScene);

            testFoo();
        });
    });
});
