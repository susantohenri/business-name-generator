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
})