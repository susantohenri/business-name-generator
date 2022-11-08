jQuery(document).ready(function() {
    const filterBtn = jQuery('#filter_button')
    const filterModal = jQuery('.filter-modal')
    
    filterBtn.on('click', function() {
        filterModal.toggleClass('d-none')
    })

    // handle toggle like button
    jQuery('#business_name_generator .btn-like-outline').on('click', function() {
        jQuery(this).addClass('d-none')
        jQuery(this).parent().find('.btn-like-fill').removeClass('d-none')
    })

    jQuery('#business_name_generator .btn-like-fill').on('click', function() {
        jQuery(this).addClass('d-none')
        jQuery(this).parent().find('.btn-like-outline').removeClass('d-none')
    })

    jQuery('#business_name_generator #business_name_generator_form_home').on('submit', function(e) {
        e.preventDefault()
        let keyword = jQuery('#business_name_generator #business_name_generator_form_home #search_input_home').val()
        
        jQuery('#business_name_generator #business_name_generator_form_home').parent().addClass('d-none')
        jQuery('#business_name_generator #business_name_generator_result').removeClass('d-none')
        jQuery('#business_name_generator #search_input').val(keyword)
        jQuery('#business_name_generator .search-keyword').text(keyword)
    })
})