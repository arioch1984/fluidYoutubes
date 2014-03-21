//Fluid youtube embeds
//Adapt all video in page with width/height of given div/element
jQuery.fn.fluidYoutubes = function() {

    // Find all YouTube videos
    var $allVideos = jQuery("iframe[src^='//www.youtube.com']"),

    // The element that is fluid width
        $fluidEl = this;

    // Figure out and save aspect ratio for each video
    $allVideos.each(function() {

        console.log(jQuery(this).height+' - '+jQuery(this).width);

        jQuery(this)
            .data('aspectRatio', this.height / this.width)

            // and remove the hard coded width/height
            .removeAttr('height')
            .removeAttr('width');

    });

    // When the window is resized
    // (You'll probably want to debounce this)
    jQuery(window).resize(function() {

        var newWidth = $fluidEl.width();
        console.log(newWidth);

        // Resize all videos according to their own aspect ratio
        $allVideos.each(function() {

            console.log(jQuery(this).height+' - '+jQuery(this).width);

            var $el = jQuery(this);
            $el
                .width(newWidth)
                .height(newWidth * $el.data('aspectRatio'));

        });

        // Kick off one resize to fix all videos on page load
    }).resize();

    return this;
};