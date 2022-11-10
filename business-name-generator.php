<?php

/**
 * Shipping Policy Generator
 *
 * @package     BusinessNameGenerator
 * @author      Henri Susanto
 * @copyright   2022 Henri Susanto
 * @license     GPL-2.0-or-later
 *
 * @wordpress-plugin
 * Plugin Name: Business Name Generator
 * Plugin URI:  https://github.com/susantohenri
 * Description: Wordpress plugin for generating business name
 * Version:     1.0.0
 * Author:      Henri Susanto
 * Author URI:  https://github.com/susantohenri
 * Text Domain: BusinessNameGenerator
 * License:     GPL v2 or later
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 */

add_shortcode('business-name-generator', function ($atts) {
    $atts = shortcode_atts(['url' => ''], $atts);

    wp_register_script('jquery', 'https://code.jquery.com/jquery-3.6.1.js');
    wp_enqueue_script('jquery');

    wp_register_script('bootstrap', 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/js/bootstrap.bundle.min.js');
    wp_enqueue_script('bootstrap');

    wp_register_style('bootstrap', 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.0/dist/css/bootstrap.min.css');
    wp_enqueue_style('bootstrap');

    wp_register_style('business-name-generator', plugin_dir_url(__FILE__) . 'business-name-generator.css?cache-breaker=' . time());
    wp_enqueue_style('business-name-generator');

    wp_register_script('business-name-generator', plugin_dir_url(__FILE__) . 'business-name-generator.js?cache-breaker=' . time());
    wp_enqueue_script('business-name-generator');
    wp_localize_script(
        'business-name-generator',
        'business_name_generator',
        array(
            'url' => $atts['url']
        )
    );

    return "
        <div id='business_name_generator' class='alignfull px-5'>
            <div class='p-4'>
                <form method='post' id='business_name_generator_form_home'>
                    <div class='input-group input-group-lg'>
                        <input type='text' id='search_input_home' class='search-input form-control' placeholder='Name...' required>
                        <button type='submit' class='btn btn-primary' type='button' id='search_button_home'>GENERATE NAMES</button>
                    </div>
                </form>
            </div>
            <div id='business_name_generator_result' class='d-none'>
                <div class='row m-0 p-2'>
                    <div class='d-flex flex-column flex-md-row gap-4 p-0'>
                        <form method='post' id='business_name_generator_form' style='width: 100%'>
                            <div class='input-group'>
                                <input type='text' id='search_input' class='search-input form-control' placeholder='Name...' required>
                                <button type='submit' class='btn btn-primary' type='button' id='search_button'>GENERATE NAMES</button>
                            </div>
                        </form>
                        <div class='filter-container text-end'>
                            <button class='btn btn-outline shadow-sm' id='filter_button'>Select Filters</button>
                            <div class='filter-modal p-4 shadow rounded text-start d-none'>
                                <div class='row'>
                                    <div class='col-12 col-md-4'>
                                        <p class='fw-bold'>Words</p>
                                        <div>
                                            <div class='form-check mb-3'>
                                                <input class='form-check-input' type='checkbox' name='one_word' value='1'
                                                    id='filter_one_word' checked>
                                                <label class='form-check-label text-black-50' for='filter_one_word'>
                                                    One word
                                                </label>
                                            </div>
                                            <div class='form-check mb-3'>
                                                <input class='form-check-input' type='checkbox' name='two_words' value='1'
                                                    id='filter_two_words' checked>
                                                <label class='form-check-label text-black-50' for='filter_two_words'>
                                                    Two words
                                                </label>
                                            </div>
                                            <div class='form-check mb-3'>
                                                <input class='form-check-input' type='checkbox' name='multiple_words' value='1'
                                                    id='filter_multiple_words' checked>
                                                <label class='form-check-label text-black-50' for='filter_multiple_words'>
                                                    Multiple Words
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class='col-12 col-md-4'>
                                        <p class='fw-bold'>Style</p>
                                        <div>
                                            <div class='form-check form-switch mb-3'>
                                                <input class='form-check-input' type='checkbox' id='prefix' name='prefix'
                                                    value='1' checked>
                                                <label class='form-check-label text-black-50' for='prefix'>Prefix</label>
                                            </div>
                                            <div class='form-check form-switch mb-3'>
                                                <input class='form-check-input' type='checkbox' id='suffix' name='suffix'
                                                    value='1' checked>
                                                <label class='form-check-label text-black-50' for='suffix'>Suffix</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div class='col-12 col-md-4'>
                                        <p class='fw-bold'>Length</p>
                                        <div>
                                            <input type='range' class='form-range' min='4' max='15' step='1' name='len' id='length'>
                                            <label class='text-black-50'><span class='length-value'></span> Characters</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <div class='p-2' style='font-size: 24px;'>
                        <p>Store name suggestions for <b class='search-keyword'>&nbsp;</b> (Click on them to register on Shopify!)</p>
                    </div>
                    <div class='px-2'>
                        <div class='row m-0' id='result'>
                            <div class='col-md-3 p-0 pe-3' id='result_1'>
                                <div class='result-item-wrapper'></div>
                            </div>
                            <div class='col-md-3 p-0 pe-3' id='result_2'>
                                <div class='result-item-wrapper'></div>
                            </div>
                            <div class='col-md-3 p-0 pe-3' id='result_3'>
                                <div class='result-item-wrapper'></div>
                            </div>
                            <div class='col-md-3 p-0 pe-3' id='result_4'>
                                <div class='result-item-wrapper'></div>
                            </div>
                        </div>
                    </div>
                    
                    <div class='business_name_generator_pagination'>
                        <div class='btn-prev-wrapper'></div>
                        <div class='business_name_generator_pagination_nav'></div>
                        <div class='btn-next-wrapper'></div>
                    </div>
                </div>
            </div>
        </div>
    ";
});