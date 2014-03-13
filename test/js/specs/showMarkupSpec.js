describe('showMarkup plugin', function() {
    const ARTICLE_OPEN_TAG = '&lt;article&gt;', ARTICLE_CLOSE_TAG = '&lt;/article&gt;';
    const SECTION_OPEN_TAG = '&lt;section&gt;', SECTION_CLOSE_TAG = '&lt;/section&gt;';
    const MAIN_SELECTOR = '#main', PARENT_SELECTOR = '#parent';
    const CODE_SELECTOR = 'code';

    beforeEach(function() {
        var htmlContent = '<div id="main"></div>';
        $('body').append(htmlContent);
    });

    afterEach(function() {
        $(MAIN_SELECTOR).remove();
    });

    describe('used on parent element with no child', function() {
        beforeEach(function() {
            addSingleElement();
            $(PARENT_SELECTOR).showMarkup();
        });

        it('adds markup visually to html', function() {
            verifySingleElement();
        });
    });

    describe('used on parent element with children', function() {
        beforeEach(function() {
            addSingleElement();
            var childHtmlContent = '<section id="child">child</section>';
            $(PARENT_SELECTOR).append(childHtmlContent);
            $(PARENT_SELECTOR).showMarkup();
        });

        it('adds markup visually to html', function() {
            var codeElements = $(CODE_SELECTOR);
            expect(codeElements.length).toBe(4);
            expect($(codeElements[0]).html()).toBe(ARTICLE_OPEN_TAG);
            expect($(codeElements[1]).html()).toBe(SECTION_OPEN_TAG);
            expect($(codeElements[2]).html()).toBe(SECTION_CLOSE_TAG);
            expect($(codeElements[3]).html()).toBe(ARTICLE_CLOSE_TAG);
        });
    });

    describe('has options', function() {
        beforeEach(function() {
            addSingleElement();
        });

        describe('initShow', function() {
            it('is default to true', function() {
                $(PARENT_SELECTOR).showMarkup();
                verifySingleElement();
            });

            it('displays markup on initialization when set to true', function() {
                $(PARENT_SELECTOR).showMarkup({'initShow':true});
                verifySingleElement();
            });
        });

        describe('buttonShow', function() {
            beforeEach(function() {
                addSingleElement();
                $(MAIN_SELECTOR).append('<button id="showMarkup" type="button"></button>');
            });

            it('when option defined button shows markup when clicked', function() {

                $(PARENT_SELECTOR).showMarkup({
                    'buttonShow':'#showMarkup'
                });
                $(MAIN_SELECTOR).find('code').remove();

                var codeElements = $(CODE_SELECTOR);
                expect(codeElements.length).toBe(0);

                $('#showMarkup').click();
                verifySingleElement();
            });

            it('initShow does not display markup on initialization when set to false AND buttonShow defined', function() {
                $(PARENT_SELECTOR).showMarkup({
                    'initShow':false,
                    'buttonShow':'#showMarkup'
                });
                var codeElements = $(CODE_SELECTOR);
                expect(codeElements.length).toBe(0);
            });

            it('initShow does not display markup on initialization when set to false UNLESS buttonShow undefined', function() {
                $(PARENT_SELECTOR).showMarkup({'initShow':false});
                verifySingleElement();
            });
        });

        describe('buttonHide', function() {
            beforeEach(function() {
                addSingleElement();
                $(MAIN_SELECTOR).append('<button id="hideMarkup" type="button"></button>');
            });

            it('when option defined button hides markup when clicked', function() {

                $(PARENT_SELECTOR).showMarkup({
                    'buttonHide':'#hideMarkup'
                });
                verifySingleElement();
                $('#hideMarkup').click();
                var codeElements = $(CODE_SELECTOR);
                expect(codeElements.length).toBe(0);
            });

        });
    });

    function addSingleElement() {
        var htmlContent = '<article id="parent">parent</article>';
        $(MAIN_SELECTOR).append(htmlContent);
    }

    function verifySingleElement() {
        var codeElements = $(CODE_SELECTOR);
        expect(codeElements.length).toBe(2);
        expect($(codeElements[0]).html()).toBe(ARTICLE_OPEN_TAG);
        expect($(codeElements[1]).html()).toBe(ARTICLE_CLOSE_TAG);
    }
});