describe('showMarkup plugin', function() {
    beforeEach(function() {
        var htmlContent = '<div id="main"></div>';
        $('body').append(htmlContent);
    });

    afterEach(function() {
        $('#main').remove();
    });

    describe('parent element with no child', function() {
        beforeEach(function() {
            var htmlContent = '<article id="parent">parent</article>';
            $('#main').append(htmlContent);
            $('#parent').showMarkup();
        });

        it('adds markup visually to html', function() {
            var codeObjs = $('code');
            expect(codeObjs.length).toBe(2);
            expect($(codeObjs[0]).html()).toBe('&lt;article&gt;');
            expect($(codeObjs[1]).html()).toBe('&lt;/article&gt;');
        });
    });

    describe('parent element with children', function() {
        beforeEach(function() {
            var parentHtmlContent = '<article id="parent">parent</article>';
            $('#main').append(parentHtmlContent);
            var childHtmlContent = '<section id="child">child</section>';
            $('#parent').append(childHtmlContent);
            $('#parent').showMarkup();
        });

        it('adds markup visually to html', function() {
            var codeObjs = $('code');
            expect(codeObjs.length).toBe(4);
            expect($(codeObjs[0]).html()).toBe('&lt;article&gt;');
            expect($(codeObjs[1]).html()).toBe('&lt;section&gt;');
            expect($(codeObjs[2]).html()).toBe('&lt;/section&gt;');
            expect($(codeObjs[3]).html()).toBe('&lt;/article&gt;');
        });
    });

});