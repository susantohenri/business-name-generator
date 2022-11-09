jQuery(document).ready(function () {
    const filterBtn = jQuery('#business_name_generator #filter_button')
    const filterModal = jQuery('#business_name_generator .filter-modal')

    let search = ''
    let filters = {
        one_word: 1,
        two_words: 1,
        multiple_words: 1,
        prefix: 1,
        suffix: 1
    }

    filterBtn.on('click', function () {
        filterModal.toggleClass('d-none')
    })

    jQuery('#business_name_generator #business_name_generator_form_home').on('submit', function (e) {
        e.preventDefault()
        let keyword = jQuery('#business_name_generator #business_name_generator_form_home #search_input_home').val()
        search = keyword

        businessNameGenerator_generateNames(search, filters)

        jQuery('#business_name_generator #business_name_generator_form_home').parent().addClass('d-none')
        jQuery('#business_name_generator #business_name_generator_result').removeClass('d-none')
        jQuery('#business_name_generator #search_input').val(keyword)
        jQuery('#business_name_generator .search-keyword').text(keyword)
    })

    jQuery('#business_name_generator #business_name_generator_form').on('submit', function (e) {
        e.preventDefault()
        let keyword = jQuery('#business_name_generator #business_name_generator_form #search_input').val()
        search = keyword

        filterModal.addClass('d-none')

        businessNameGenerator_generateNames(search, filters)

        jQuery('#business_name_generator .search-keyword').text(keyword)
    })

    jQuery('#business_name_generator .filter-modal .form-check').find('input[type="checkbox"]').on('click', function() {
        let name = jQuery(this).attr('name')
        
        if (jQuery(this).is(':checked')) {
            filters[name] = 1
        } else {
            filters[name] = 0
        }

        businessNameGenerator_generateNames(search, filters)
    })

    jQuery('#business_name_generator .filter-modal .length-value').html(jQuery('#business_name_generator .filter-modal #length').val())

    jQuery('#business_name_generator .filter-modal #length').on('input', function() {
        let value = parseInt(jQuery(this).val())
        jQuery('#business_name_generator .filter-modal .length-value').html(value == '15' ? '15+' : value)
        
        businessNameGenerator_generateNames(search, filters, value)
    })

    function businessNameGenerator_generateNames(keyword, filters, len = null) {
        let dataNames = ["active", "auto", "app", "avi", "base", "co", "coin", "core", "clear", "wallet", "echo", "even", "ever", "fair", "go", "high", "hyper", "in", "inter", "good", "jump", "live", "make", "mass", "work", "matter", "home", "on", "one", "open", "over", "out", "buddy", "real", "peak", "pure", "money", "silver", "solid", "spark", "start", "true", "up", "vibe", "atlas", "base", "bay", "boost", "case", "center", "cast", "click", "dash", "deck", "dock", "dot", "drop", "engine", "flow", "glow", "grid", "gram", "graph", "hub", "focus", "kit", "lab", "level", "layer", "line", "logic", "load", "loop", "meet", "method", "mode", "mark", "ness", "now", "pass", "port", "post", "press", "push", "rise", "scape", "scale", "scan", "scout", "sense", "set", "shift", "ship", "side", "signal", "snap", "scope", "space", "span", "spark", "spot", "start", "storm", "stripe", "sync", "tap", "tilt", "ture", "type", "view", "verge", "vibe", "ware", "yard", "up"]
        let dataSuffix = ["ary", "able", "ance", "ible", "ice", "ite", "er", "eon", "ent", "ful", "gent", "tion", "sion"]
        let result = []

        for (let i = 0; i < dataNames.length; i++) {
            if (filters.prefix == 1) {
                result.push(businessNameGenerator_toTitleCase(dataNames[i] + keyword))
                result.push(businessNameGenerator_toTitleCase(dataNames[i] + ' ' + keyword))
            }

            if (filters.suffix == 1) {
                result.push(businessNameGenerator_toTitleCase(keyword + dataNames[i]))
                result.push(businessNameGenerator_toTitleCase(keyword + ' ' + dataNames[i]))
            }

            result.push(businessNameGenerator_toTitleCase('The ' + keyword + ' ' + dataNames[i]))
            result.push(businessNameGenerator_toTitleCase('The ' + dataNames[i] + ' ' + keyword))
        }

        if (filters.suffix == 1 && filters.one_word == 1) {
            for (let i = 0; i < dataSuffix.length; i++) {
                let name = keyword + dataSuffix[i]
                result.push(businessNameGenerator_toTitleCase(name))
            }
        }

        let result_filtered = []
        let one_words = result.filter((v, i) => {
            return businessNameGenerator_WordCount(v) == 1
        })

        let two_words = result.filter((v, i) => {
            return businessNameGenerator_WordCount(v) == 2
        })

        let multiple_words = result.filter((v, i) => {
            return businessNameGenerator_WordCount(v) > 2
        })

        if (filters.one_word == 1) {
            result_filtered = result_filtered.concat(one_words)
        }

        if (filters.two_words == 1) {
            result_filtered = result_filtered.concat(two_words)
        }

        if (filters.multiple_words == 1) {
            result_filtered = result_filtered.concat(multiple_words)
        }
        
        if (len != null) {
            if (len == 15) {
                result_filtered = result_filtered.filter((v, i) => {
                    return v.length >= 15
                })
            } else {
                result_filtered = result_filtered.filter((v, i) => {
                    return v.length === len
                })
            }
        }

        // result_filtered divide into 4
        let result_filtered_divide = []
        let result_filtered_divide_length = Math.ceil(result_filtered.length / 4)
        for (let i = 0; i < result_filtered.length; i += result_filtered_divide_length) {
            result_filtered_divide.push(result_filtered.slice(i, i + result_filtered_divide_length))
        }

        if (result_filtered_divide.length > 0) {
            if (result_filtered_divide[0].length > 0) {
                jQuery('#business_name_generator #result_1 .result-item-wrapper').html(result_filtered_divide[0].map((item, i) => {
                    return `
                        <div class='result-item d-flex py-2 px-3 gap-2'>
                            <div class='btn-like-wrapper border-end'>
                                <button class='btn-like-outline'>
                                    <img src='https://ik.imagekit.io/radix/namify/icons/heart-outlined.svg'
                                        alt='love icon'>
                                </button>
                                <button class='btn-like-fill d-none'>
                                    <img src='https://ik.imagekit.io/radix/namify/icons/heart-filled.svg'
                                        alt='love icon'>
                                </button>
                            </div>
                            <a href='#' class='flex-grow-1 d-flex align-items-center justify-content-between'>
                                <p class='m-0'>${item}</p>
                                <img src='https://ik.imagekit.io/radix/namify/icons/suggestion-next-arrow.svg'
                                    alt='icon next'>
                            </a>
                        </div>
                    `
                }))
            }
    
            if (result_filtered_divide[1].length > 0) {
                jQuery('#business_name_generator #result_2 .result-item-wrapper').html(result_filtered_divide[1].map((item, i) => {
                    return `
                        <div class='result-item d-flex py-2 px-3 gap-2'>
                            <div class='btn-like-wrapper border-end'>
                                <button class='btn-like-outline'>
                                    <img src='https://ik.imagekit.io/radix/namify/icons/heart-outlined.svg'
                                        alt='love icon'>
                                </button>
                                <button class='btn-like-fill d-none'>
                                    <img src='https://ik.imagekit.io/radix/namify/icons/heart-filled.svg'
                                        alt='love icon'>
                                </button>
                            </div>
                            <a href='#' class='flex-grow-1 d-flex align-items-center justify-content-between'>
                                <p class='m-0'>${item}</p>
                                <img src='https://ik.imagekit.io/radix/namify/icons/suggestion-next-arrow.svg'
                                    alt='icon next'>
                            </a>
                        </div>
                    `
                }))
            }
    
            if (result_filtered_divide[2].length > 0) {
                jQuery('#business_name_generator #result_3 .result-item-wrapper').html(result_filtered_divide[2].map((item, i) => {
                    return `
                        <div class='result-item d-flex py-2 px-3 gap-2'>
                            <div class='btn-like-wrapper border-end'>
                                <button class='btn-like-outline'>
                                    <img src='https://ik.imagekit.io/radix/namify/icons/heart-outlined.svg'
                                        alt='love icon'>
                                </button>
                                <button class='btn-like-fill d-none'>
                                    <img src='https://ik.imagekit.io/radix/namify/icons/heart-filled.svg'
                                        alt='love icon'>
                                </button>
                            </div>
                            <a href='#' class='flex-grow-1 d-flex align-items-center justify-content-between'>
                                <p class='m-0'>${item}</p>
                                <img src='https://ik.imagekit.io/radix/namify/icons/suggestion-next-arrow.svg'
                                    alt='icon next'>
                            </a>
                        </div>
                    `
                }))
            }
    
            if (result_filtered_divide[3].length > 0) {
                jQuery('#business_name_generator #result_4 .result-item-wrapper').html(result_filtered_divide[3].map((item, i) => {
                    return `
                        <div class='result-item d-flex py-2 px-3 gap-2'>
                            <div class='btn-like-wrapper border-end'>
                                <button class='btn-like-outline'>
                                    <img src='https://ik.imagekit.io/radix/namify/icons/heart-outlined.svg'
                                        alt='love icon'>
                                </button>
                                <button class='btn-like-fill d-none'>
                                    <img src='https://ik.imagekit.io/radix/namify/icons/heart-filled.svg'
                                        alt='love icon'>
                                </button>
                            </div>
                            <a href='#' class='flex-grow-1 d-flex align-items-center justify-content-between'>
                                <p class='m-0'>${item}</p>
                                <img src='https://ik.imagekit.io/radix/namify/icons/suggestion-next-arrow.svg'
                                    alt='icon next'>
                            </a>
                        </div>
                    `
                }))
            }
        }

        // handle toggle like button
        jQuery('#business_name_generator .btn-like-outline').on('click', function () {
            jQuery(this).addClass('d-none')
            jQuery(this).parent().find('.btn-like-fill').removeClass('d-none')
        })

        jQuery('#business_name_generator .btn-like-fill').on('click', function () {
            jQuery(this).addClass('d-none')
            jQuery(this).parent().find('.btn-like-outline').removeClass('d-none')
        })
    }

    function businessNameGenerator_toTitleCase(str) {
        return str.replace(/\w\S*/g, function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }

    function businessNameGenerator_WordCount(str) {
        return str.split(" ").length;
    }

    function businessNameGenerator_letterCount(str) {
        return str.length;
    }
})