// Jasmine Unit Testing Suite
define(["App", "jquery", "backbone", "marionette", "models/Model", "collections/Collection", "jqueryui", "jquerymobile", "bootstrap", "backbone.validateAll", "jasminejquery"],

    function(App, $, Backbone, Marionette, Model, Collection ) {

        // Test suite that includes all of the Jasmine unit tests   
        describe("Marionette-Require-Boilerplate (MRB)", function() {

            // Backbone View Suite: contains all tests related to views
            describe("Desktop Marionette App instantiation", function() {
                //Initialize App in Desktop Mode (App is global var)
                App.start();
                it("App should start and have Regions", function() {
                    expect(App.mainRegion.el).toEqual("#main");
                    expect(App.headerRegion.el).toEqual("header");
                });

            }); // End of the View test suite

            describe("Marionette Views", function() {
                it("App Regions should contain views", function() {
                    //App.appRouter will be instantiated, and views will get created, but asynchronously.
                    //Wait for it...
                    waitsFor( function() {
                        return !!App.appRouter;
                    }, "App.appRouter should be created", 3000);

                    runs(function() {
                        expect(App.appRouter.options.controller).toBeDefined();
                        expect(App.headerRegion.currentView).toBeDefined();
                        expect(App.mainRegion.currentView).toBeDefined();
                        expect(App.headerRegion.currentView.$el).not.toBeEmpty();
                        expect(App.mainRegion.currentView.$el).not.toBeEmpty();
                    });
                });
            });
            // Backbone Model Suite: contains all tests related to models
            describe("Backbone models", function() {

                // Runs before every Model spec
                beforeEach(function() {
                    // Instantiates a new Model instance
                    this.model = new Model();

                    // We are spying on the _validate method to see if it gets called
                    spyOn(Model.prototype, "validate").andCallThrough();
                });

                it("should be in a valid state", function() {
                    expect(this.model.isValid()).toBe(true);
                });

                it("should call the validate method when setting a property", function() {
                    this.model.set({ example: "test" });
                    expect(Model.prototype.validate).toHaveBeenCalled();
                });

            }); // End of the Model test suite

        // Backbone Collection Suite: contains all tests related to collections
        describe("Backbone collections", function() {
            // Runs before every Collection spec
            beforeEach(function() {
                // Instantiates a new Collection instance
                this.collection = new Collection();
            });

            it("should contain the correct number of models", function() {
                expect(this.collection.length).toEqual(0);
            });

        }); // End of the Collection test suite
    }); // End of the BRB test suite

});