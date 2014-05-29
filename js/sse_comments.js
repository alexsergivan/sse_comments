(function ($) {
    var requestSent = false;

    Drupal.behaviors.sse_comments = {
        attach: function (context, settings) {

            if(!requestSent) {
               requestSent = true;
               var source = new EventSource(settings.basePath + 'check_new_comments/all');

                source.addEventListener('comment', function(e) {
                    data = JSON.parse(e.data);
                    if (data) {
                        $('.node_comments_wrap[nid=' + data.nid + ']').prepend(data.html);
                        Drupal.attachBehaviors($('.node_comments_wrap[nid=' + data.nid + ']'));
                        requestSent = false;
                    }
                }, false);
            }



        }
    };

})(jQuery);