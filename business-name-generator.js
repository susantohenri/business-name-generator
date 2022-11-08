jQuery(document).ready(function () {
    const filterBtn = jQuery('#filter_button')
    const filterModal = jQuery('.filter-modal')

    let search = ''
    let filters = {
        one_word: 1,
        two_words: 1,
        multiple_words: 1,
        prefix: 1,
        suffix: 1,
    }

    console.log(generateNames('hallo', filters))

    filterBtn.on('click', function () {
        filterModal.toggleClass('d-none')
    })

    // handle toggle like button
    jQuery('#business_name_generator .btn-like-outline').on('click', function () {
        jQuery(this).addClass('d-none')
        jQuery(this).parent().find('.btn-like-fill').removeClass('d-none')
    })

    jQuery('#business_name_generator .btn-like-fill').on('click', function () {
        jQuery(this).addClass('d-none')
        jQuery(this).parent().find('.btn-like-outline').removeClass('d-none')
    })

    jQuery('#business_name_generator #business_name_generator_form_home').on('submit', function (e) {
        e.preventDefault()
        let keyword = jQuery('#business_name_generator #business_name_generator_form_home #search_input_home').val()
        search = keyword

        jQuery('#business_name_generator #business_name_generator_form_home').parent().addClass('d-none')
        jQuery('#business_name_generator #business_name_generator_result').removeClass('d-none')
        jQuery('#business_name_generator #search_input').val(keyword)
        jQuery('#business_name_generator .search-keyword').text(keyword)
    })

    jQuery('#business_name_generator #business_name_generator_form').on('submit', function (e) {
        e.preventDefault()
        let keyword = jQuery('#business_name_generator #business_name_generator_form #search_input').val()
        search = keyword

        jQuery('#business_name_generator .search-keyword').text(keyword)
    })

    function generateNames(keyword, filters) {
        let dataNames = ["active", "auto", "app", "avi", "base", "co", "coin", "core", "clear", "wallet", "echo", "even", "ever", "fair", "go", "high", "hyper", "in", "inter", "good", "jump", "live", "make", "mass", "work", "matter", "home", "on", "one", "open", "over", "out", "buddy", "real", "peak", "pure", "money", "silver", "solid", "spark", "start", "true", "up", "vibe", "atlas", "base", "bay", "boost", "case", "center", "cast", "click", "dash", "deck", "dock", "dot", "drop", "engine", "flow", "glow", "grid", "gram", "graph", "hub", "focus", "kit", "lab", "level", "layer", "line", "logic", "load", "loop", "meet", "method", "mode", "mark", "ness", "now", "pass", "port", "post", "press", "push", "rise", "scape", "scale", "scan", "scout", "sense", "set", "shift", "ship", "side", "signal", "snap", "scope", "space", "span", "spark", "spot", "start", "storm", "stripe", "sync", "tap", "tilt", "ture", "type", "view", "verge", "vibe", "ware", "yard", "up"]
        let dataSuffix = ["ary", "able", "ance", "ible", "ice", "ite", "er", "eon", "ent", "ful", "gent", "tion", "sion"]
        let result = []

        return result
    }
})