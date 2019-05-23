colours = {
    "epp": "#0087DC",
    "ecr": "#0281aa",
    "enf": "black",
    "efa": "#8dc63f",
    "sd": "#DC241f",
    "efdd": "#12B6CF",
    "adle": "#FAA61A",
    "gue": "#b22222",
    "ni": "#DDDDDD",
    "new": "white"
}

members = []
parties = []

$.ajax({
    url: "data/results.csv",
    async: false,
    success: function(data) {
        results = $.csv.toArrays(data);
        parties = results[0].slice(1)
        parties.pop()
        for (i = 1; i < results.length; i++) {
            members.push(results[i][0])

        }
    }
})

/*
Pan Bounding Range
*/
beforePan = function(oldPan, newPan) {
    gutterWidth = 200;
    gutterHeight = 500;

    sizes = this.getSizes()
    leftLimit = -((sizes.viewBox.x + sizes.viewBox.width) * sizes.realZoom) + gutterWidth;
    rightLimit = sizes.width - gutterWidth - (sizes.viewBox.x * sizes.realZoom);
    topLimit = -((sizes.viewBox.y + sizes.viewBox.height) * sizes.realZoom) + gutterHeight;
    bottomLimit = sizes.height - gutterHeight - (sizes.viewBox.y * sizes.realZoom);

    customPan = {}
    customPan.x = Math.max(leftLimit, Math.min(rightLimit, newPan.x))
    customPan.y = Math.max(topLimit, Math.min(bottomLimit, newPan.y))

    return customPan
}

$('.map')[0].addEventListener('load', function() {
    $(document).click(function() {
        console.log('test')
    });
    map = svgPanZoom('.map', {
        minZoom: 0.9,
        maxZoom: 3,
        beforePan: beforePan
    });
    map.zoom(0.9)
});

$('.map')[0].addEventListener('load', function() {
    svg = $('.map').getSVG();

    //A Refers to the memberstate
    for (a = 0; a < members.length; a++) {
        member = []
        data = results[a + 1]
        for (i = 1; i < data.length; i++) {
            count = data[i]
            if (count) {
                for (c = 0; c < count; c++) {
                    member.push(parties[i - 1])
                }
            }
        }
        console.log(members[a], member)
        meps = $(svg.find('#' + members[a])).find('path');
        for (i = 0; i < meps.length; i++) {
            element = $(meps[i]);
            number = Math.floor(Math.random() * meps.length);
            element.css('fill', colours[member[number]])
            member.slice(number + 1)
        };
    }
});