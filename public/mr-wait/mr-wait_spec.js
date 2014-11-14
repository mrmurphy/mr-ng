ddescribe('mr-wait', function() {
    var $compile, $rootScope, $q

    beforeEach(module('mr.ng'))

    beforeEach(inject(function(_$compile_, _$rootScope_, _$q_) {
        $compile = _$compile_
        $rootScope = _$rootScope_
        $q = _$q_
    }))

    it("should render content when pending", function() {
        var dfd = $q.defer()
        $rootScope.fooFn = function() {
            return dfd.promise
        }
        var elem = $compile("<mr-wait on='pending' " +
            "exp='fooFn()'>load</mr-box>")($rootScope)
        $rootScope.$digest()
        expect(elem.html()).toContain("load")
        dfd.resolve()
        $rootScope.$digest()
        expect(elem.html()).not.toContain("load")
    });

    it("should render content when resolved", function() {
        var dfd = $q.defer()
        $rootScope.fooFn = function() {
            return dfd.promise
        }
        var elem = $compile("<mr-wait on='resolved' " +
            "exp='fooFn()'>res</mr-box>")($rootScope)
        $rootScope.$digest()
        expect(elem.html()).not.toContain("res")
        dfd.resolve()
        $rootScope.$digest()
        expect(elem.html()).toContain("res")
    });

    it("should render content when rejected", function() {
        var dfd = $q.defer()
        $rootScope.fooFn = function() {
            return dfd.promise
        }
        var elem = $compile("<mr-wait on='rejected' " +
            "exp='fooFn()'>rej</mr-box>")($rootScope)
        $rootScope.$digest()
        expect(elem.html()).not.toContain("rej")
        dfd.reject()
        $rootScope.$digest()
        expect(elem.html()).toContain("rej")
    });
});
