var homePage = {
    initialLoadScreen: $('<div></div>'),
    spinner: $('<div></div>'),
    headlineList: $('#beliefs').find('p'),
    moreInfos: $('.more-info'),
    mainInfoBox: $('#information-box'),
    closeMainBox: $('#close-information-box'),
    allClickers: $('#secondary-content').find('div'),
    clickerLinks: $('#secondary-content').find('a'),
    init: function(){
        this.headlineList.addClass('out-of-sight');
        this.headlineList.removeClass('border-bottom-thin');
        this.moreInfos.hide();
        $('body').append(this.initialLoadScreen);
        this.initialLoadScreen.addClass('initial-load-screen');
        this.initialLoadScreen.append(this.spinner);
        this.spinner.addClass('loading-spinner');
    },
    showMoreInfos: function(){
        this.moreInfos.first().fadeIn(2000, function(){
            $(this).next().fadeIn(1233, function(){
                $(this).next().fadeIn(1233);
            });
        });
    },
    showBeliefs: function(){
        this.headlineList.last().animate({
            top: '200px'
        }, 1700, 'easeOutCubic', function(){
            $(this).addClass('horizontal-borders-thin')
                .animate({
                    top: '0px'
                }, 1000, 'easeOutCubic', function(){
                    $(this).prev().animate({
                        top: '0px'
                    }, 900, 'easeOutBounce', function(){
                        $(this).addClass('border-top-thin')
                            .prev().animate({
                                top: '0px'
                            }, 1100, 'easeOutCubic')
                    })
                });
        });
    }
};

jQuery(document).ready(function() {
    homePage.init();
    homePage.initialLoadScreen.fadeOut(3000, function(){
        homePage.showBeliefs();
        homePage.showMoreInfos();
    });

    homePage.clickerLinks.attr('href','#main-content');

    homePage.allClickers.on('click', function(){
        homePage.allClickers.removeClass('active-box');
        $(this).addClass('active-box');
        var clickedButton = $(this).attr('data-info');
        homePage.mainInfoBox.removeClass('hidden').find('.more-infos').remove();
        homePage.headlineList.parent().addClass('mobile-hide');
        $.ajax('ajaxcalls/' + clickedButton + '.html',{
            success: function(response){
                homePage.mainInfoBox.append(response);
            },
            error: function(request, errorType, errorMessage){
                alert('Error: ' + errorType + ' with message: ' + errorMessage);
            },
        });
    });

    homePage.closeMainBox.on('click', function(){
        homePage.mainInfoBox.addClass('hidden');
        homePage.allClickers.removeClass('information-box-color');
        homePage.headlineList.parent().removeClass('mobile-hide');
    });

});