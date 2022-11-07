jQuery(document).ready(function() {
    const filterBtn = jQuery('#filter_button')
    const filterModal = jQuery('.filter-modal')
    
    filterBtn.on('click', function() {
        filterModal.toggleClass('d-none')
    })
})