const lib = require("../main.js")

describe("empty", () => {
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
        })
    })

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
})
