<?php
//everything between open and close php is interpreted on server

//step 1. tell WP api to load our parent theme's css styles
//in 2 parts: (1) calling a built-function in wp api named add_action() that extend the wp api with custom code
//add_action() takes 2 args: string for the api hook we want to extend
add_action('wp_enqueue_scripts', 'enqueue_parent_styles');

//(2) define our own custom function that holds the code we a re using to extend the wp api
function enqueue_parent_styles() {
    wp_enqueue_style('parent-style', get_template_directory_uri() . '/style.css');
}

//step 2. tell wp api to register a new REST url endpoint
//in 2 parts: (1) calling built-in add_action() to extend the wp api with custom code
add_action('rest_api_init','register_my_route');

//(2)our custom function to register the new REST endpoint URL
function register_my_route() { 
    //register_rest_route() takes 3 arguments
    //1 root url for our rest route
    //2 rest of url for our rest route, including any URL parameter we want to get
    //3 associative array with two named elements methods and callback
    register_rest_route(
        'twentytwentyone-child/v1',
        '/latest-posts/(?P<category_id>\d+)',
        array(
            'methods' => 'GET',
            'callback' => 'get_latest_posts_by_category'
        )
        );
	
}
//step 3. define our custom callback function that wp will run when the REST API endpoint URL we defined is recieved 
function get_latest_posts_by_category($request) {
    //we need to get out of the $request the category_id value WP passed us
    $args = array(
        'category' => $request['category_id'],
    );
    //now we can call the built-in function in the wp api named get_posts()
    //get_posts() takes a single associative array as an argument
    $posts = get_posts( $args );
    
    //check to make sure wp returned at least one post
    if ( empty($posts) ) {
        return new WP_Error(
            'empty_category',
            'There are no posts to display',
            array('status' => 404)
        );
    }
    //if we make it to here. wp get_posts() returned at least one post
    //so let us send back the data for the found post(s)
    $response = new WP_REST_Response($posts);
    $response -> set_status(200); //HTTP ok status

    //now we send back the rest response object filled up with all of the posts we found
    return $response;
}

//Week 13 : part 1
//tell wp api to register a new REST url endpoint
add_action('rest_api_init','register_my_route2');
//our custom function to register the new REST end point URL
function register_my_route2() { 
    register_rest_route(
        'twentytwentyone-child/v1',
        '/contacts',
        array(
            'methods' => 'GET',
            'callback' => 'get_contacts_via_sql'
        )
        );
}
//tell wp api to register a new REST url endpoint
add_action('rest_api_init','register_my_route3');
//our custom function to register the new REST end point URL
function register_my_route3() { 
	 register_rest_route(
        'twentytwentyone-child/v1',
        '/products',
        array(
            'methods' => 'GET',
            'callback' => 'get_products_via_sql'
        )
        );	
}

//tell wp api to register a new REST url endpoint
add_action('rest_api_init','register_my_route4');
//our custom function to register the new REST end point URL
function register_my_route4() { 
	 register_rest_route(
        'twentytwentyone-child/v1',
        '/addresses',
        array(
            'methods' => 'GET',
            'callback' => 'get_addresses_via_sql'
        )
        );
	
}

//Contacts
//ur custom callback function that wp will run when the REST API endpoint RUL we defined is recieved
function get_contacts_via_sql() {
    // step 1: we need to get access to the $wpdb global variable
    global $wpdb;

    //step 2: get wordpress sql table prefix string to use in query, typ "wp_"
    $pre = $wpdb -> prefix;

    //Step 3 : define a sql query string that uses inner join to merge results across two tables
    //Example: $query = "SELECT * FROM wp_posts";
    //$query = "SELECT * FROM " . $pre . "posts";

    //SELECT wp_posts.ID, wp_posts.post_title, wp_posts.post_content, wp_users.user_login 
    //FROM wp_posts 
    //INNER JOIN wp_users
    //ON  wp_posts.post_author = wp_users.ID
    //WHERE wp_posts.post_status = 'publish'
    
     /*$query = "SELECT ". $pre ."posts.ID,";
    $query .= $pre ."posts.post_title,";
    $query .= $pre ."posts.post_date,";
    $query .= $pre ."posts.post_content,";
    $query .= $pre ."users.user_login ";
    $query .= "FROM " . $pre ."posts ";
    $query .= "INNER JOIN " . $pre ."users ";
    $query .= "ON ". $pre ."posts.post_author = ". $pre ."users.ID ";
    $query .= "WHERE ". $pre ."posts.post_status = 'publish';";*/

    $query = "SELECT wp_posts.ID,wp_posts.post_title,";
    $query .= "GROUP_CONCAT( wp_postmeta.meta_key, ':', REPLACE(REPLACE(wp_postmeta.meta_value,',',''),':','')) AS acf_fields ";
    $query .= "FROM wp_posts ";
    $query .= "INNER JOIN wp_postmeta ";
    $query .= "ON wp_posts.ID = wp_postmeta.post_id ";
    $query .= "WHERE wp_posts.post_status = 'publish'";
	$query .= "AND wp_posts.post_type = 'contact'";
    $query .= "AND wp_postmeta.meta_key NOT LIKE '\_%'";
    $query .= "GROUP BY wp_posts.ID";

    $query = str_replace("wp_", $pre, $query);

    //step: 4 send the sql query via built-in method get_results() in the $wpdb global object
    $results = $wpdb -> get_results( $query );

    //step :5  send back the data for the found post(s) using wp rest api
    $response = new WP_REST_Response($results);
    $response -> set_status(200);
    return $response;
}

//Product
//ur custom callback function that wp will run when the REST API endpoint RUL we defined is recieved
function get_products_via_sql() {
    global $wpdb;
    $pre = $wpdb -> prefix;
    $query = "SELECT wp_posts.ID,wp_posts.post_title,";
    $query .= "GROUP_CONCAT( wp_postmeta.meta_key, ':', REPLACE(REPLACE(wp_postmeta.meta_value,',',''),':','')) AS acf_fields ";
    $query .= "FROM wp_posts ";
    $query .= "INNER JOIN wp_postmeta ";
    $query .= "ON wp_posts.ID = wp_postmeta.post_id ";
    $query .= "WHERE wp_posts.post_status = 'publish'";
	$query .= "AND wp_posts.post_type = 'product'";
    $query .= "AND wp_postmeta.meta_key NOT LIKE '\_%'";
    $query .= "GROUP BY wp_posts.ID";

    $query = str_replace("wp_", $pre, $query);

    //step: 4 send the sql query via built-in method get_results() in the $wpdb global object
    $results = $wpdb -> get_results( $query );

    //step :5  send back the data for the found post(s) using wp rest api
    $response = new WP_REST_Response($results);
    $response -> set_status(200);
    return $response;
}

//Address
//ur custom callback function that wp will run when the REST API endpoint RUL we defined is recieved
function get_addresses_via_sql() {
    global $wpdb;
    $pre = $wpdb -> prefix;
    $query = "SELECT wp_posts.ID,wp_posts.post_title,";
    $query .= "GROUP_CONCAT( wp_postmeta.meta_key, ':', REPLACE(REPLACE(wp_postmeta.meta_value,',',''),':','')) AS acf_fields ";
    $query .= "FROM wp_posts ";
    $query .= "INNER JOIN wp_postmeta ";
    $query .= "ON wp_posts.ID = wp_postmeta.post_id ";
    $query .= "WHERE wp_posts.post_status = 'publish'";
	$query .= "AND wp_posts.post_type = 'address'";
    $query .= "AND wp_postmeta.meta_key NOT LIKE '\_%'";
    $query .= "GROUP BY wp_posts.ID";

    $query = str_replace("wp_", $pre, $query);

    //step: 4 send the sql query via built-in method get_results() in the $wpdb global object
    $results = $wpdb -> get_results( $query );

    //step :5  send back the data for the found post(s) using wp rest api
    $response = new WP_REST_Response($results);
    $response -> set_status(200);
    return $response;
}



// Week 13 part 2 : add two new custom post types via wp api
function add_custom_post_types() {
    //post type named 'contact'
    register_post_type(
        'contact',
        array(
'labels' => array(
    'name' => __('Contacts', 'textdomain'),
    'singular_name' => __('Contact', 'textdomain')
),
'public' => true,
'has_archive' => true
        )
        );
        //post type named 'product'
    register_post_type(
        'product',
        array(
'labels' => array(
    'name' => __('Products', 'textdomain'),
    'singular_name' => __('Product', 'textdomain')
),
'public' => true,
'has_archive' => true
        )
        );
	//post type named 'Address'
    register_post_type(
        'address',
        array(
'labels' => array(
    'name' => __('Addresses', 'textdomain'),
    'singular_name' => __('Address', 'textdomain')
),
'public' => true,
'has_archive' => true
        )
        );
}
add_action('init', 'add_custom_post_types');
?>