function init_first_block(controller_next_item, controller_previous_item, content_wrappers){	
    if (content_wrappers.length >0 ){
		content_wrappers[0].style.display = "block"
		controller_next_item.style.display = "block"
		controller_previous_item.style.display = "none"
    }
    else{
		controller_next_item.style.display = "none"
		controller_previous_item.style.display = "none"
    }
}

function init_controller_types_school_class_items(content_wrappers){

	for(let content_wrapper of content_wrappers){
		const tabLinks = content_wrapper.querySelectorAll(".school-curriculum-main-block-content-controller-types-school-class__item");
		const tabPanels = content_wrapper.querySelectorAll(".school-curriculum-main-block-content__subsection");

		for (let tabLink of tabLinks){
			tabLink.classList.remove('active');
		}
		for (let tabPanel of tabPanels){
			tabPanel.classList.remove('active');
		}
	}
	for (let content_wrapper of content_wrappers){
		if( content_wrapper.style.display == "block"){
			const tabLinks = content_wrapper.querySelectorAll(".school-curriculum-main-block-content-controller-types-school-class__item");
			const tabPanels = content_wrapper.querySelectorAll(".school-curriculum-main-block-content__subsection");

			tabLinks[0].classList.add('active');
			tabPanels[0].classList.add('active');
		}
	}
}

function first_init_controller_types_school_class_items(){
	let tabLinks = document.querySelectorAll(".school-curriculum-main-block-content-controller-types-school-class__item");
	let tabPanels = document.querySelectorAll(".school-curriculum-main-block-content__subsection");

	tabLinks[0].classList.add('active');
	tabPanels[0].classList.add('active');
}

function find_camera_rotantions(camera_positions, width, height){
	camera_rotantions = []
	for(let i=0; i<camera_positions.length;i++){
		copy_camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000);
		copy_camera.position.set(camera_positions[i].x,camera_positions[i].y, camera_positions[i].z);
		copy_camera.lookAt(0,0,0)
		camera_rotantions.push({x:copy_camera.rotation.x, y:copy_camera.rotation.y, z:copy_camera.rotation.z})
	}
	return camera_rotantions
}

function find_camera_positions(content_wrappers){
	if (content_wrappers.length > 3)
	{
		camera_positions = [{x:0, y:10, z:-55}, {x:-55, y:10, z:0}, {x:0, y:10, z:55}, {x:55, y:10, z:0}]
	}
	else if (content_wrappers.length > 2){
		camera_positions = [{x:0, y:10, z:-55}, {x:0, y:55, z:0}, {x:0, y:10, z:55}]
	}
	else if (content_wrappers.length > 1){
		camera_positions = [{x:0, y:10, z:-55}, {x:0, y:55, z:0}]
	}
	else{
		camera_positions = [{x:0, y:10, z:-55}]
	}
	return camera_positions
}


window.onload = function(){
	let content_wrappers = document.getElementsByClassName("school-curriculum-main-block__content-wrapper")
	let current_id_block = 0
	let controller_previous_item = document.getElementById('controller__previous-item');
	let controller_next_item = document.getElementById('controller__next-item');

	init_first_block(controller_next_item, controller_previous_item, content_wrappers)
	first_init_controller_types_school_class_items()

	let canvas = document.getElementById('school-curriculum-main-block__canvas');
	let width = canvas.clientWidth;
	let height = canvas.clientHeight;

	let renderer = new THREE.WebGLRenderer({canvas:canvas, antialias:true, alpha: true});
  	renderer.setSize(width,height);
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	renderer.outputEncoding = THREE.sRGBEncoding;

	let scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xdddddc );

	var directional_light = new THREE.DirectionalLight( 0xffffff, 0.8 );
	directional_light.position.set( 0, 10, 0 );
	directional_light.castShadow = true;
	directional_light.shadow.mapSize.set( 512, 512 );
	directional_light.shadow.camera.top = 25;
	directional_light.shadow.camera.bottom = -25;
	directional_light.shadow.camera.left = 25;
	directional_light.shadow.camera.right = -25;
	directional_light.shadow.camera.far = 50;
	scene.add( directional_light );
	//scene.add( new THREE.CameraHelper( directional_light.shadow.camera ) );

	var spot_light_1 = new THREE.SpotLight( 0xffffff, 0.3 );
	spot_light_1.position.set( -35, 10, 0 );
	scene.add( spot_light_1 );
	var spot_light_2 = new THREE.SpotLight( 0xffffff, 0.3 );
	spot_light_2.position.set( 35, 10, 0 );
	scene.add( spot_light_2 );
	var spot_light_3 = new THREE.SpotLight( 0xffffff, 0.3 );
	spot_light_3.position.set( 0, 10, 35 );
	scene.add( spot_light_3 );
	var spot_light_4 = new THREE.SpotLight( 0xffffff, 0.3 );
	spot_light_4.position.set( 0, 10, -35 );
	scene.add( spot_light_4 );

    
	let camera_positions = find_camera_positions(content_wrappers)
	let camera_rotantions = find_camera_rotantions(camera_positions, width, height);
 	let camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000);

	let controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.enableZoom = true;
	controls.maxPolarAngle = Math.PI/2; 

	let loader = new THREE.GLTFLoader();
	const clock = new THREE.Clock();

	let mixer;

	loader.load( '/static/models/school_curriculum_scene.gltf', function ( gltf ) {
		model = gltf.scene;
		gltf.scene.traverse( function ( node ) {
			if ( node.isMesh ) {
				if (node.name == "Plane"  || node.name == "Cylinder")
					{
						node.castShadow = false;
						node.receiveShadow = true;
					}
				else 
				{
				node.castShadow = true;
				node.receiveShadow = false;
				node.material.metalness = 0;
				} // undo this change if you apply an env map
			}
		} );
		
		mixer = new THREE.AnimationMixer( gltf.scene );
		var action = mixer.clipAction( gltf.animations[ 0 ] );
		action.play();
		scene.add( model );
		animate();
		
	}, undefined, function ( error ) {
		console.error( error );
		renderer.render( scene, camera );
	} );


	camera.position.set(camera_positions[0].x, camera_positions[0].y, camera_positions[0].z);
	camera.rotation.set(camera_rotantions[0].x, camera_rotantions[0].y, camera_rotantions[0].z)
	

	controller_previous_item.addEventListener("click",  function(){ 
		current_id_block = switch_previous_block(current_id_block);
		switch_previous_item(controller_next_item, controller_previous_item, current_id_block, content_wrappers);
		switch_previous_camera_positions(current_id_block, camera_positions, camera_rotantions, camera);
		init_controller_types_school_class_items(content_wrappers);
	})
	controller_next_item.addEventListener("click", function(){ 
		current_id_block = switch_next_block(current_id_block);
		switch_next_item(controller_next_item, controller_previous_item, current_id_block, content_wrappers);
		switch_next_camera_positions(current_id_block, camera_positions, camera_rotantions, camera);
		init_controller_types_school_class_items(content_wrappers);
	})

	function render() {
		renderer.render(scene, camera);
	}

	function animate() {
		delta = clock.getDelta();
		if (mixer) mixer.update(delta);
		requestAnimationFrame(animate);
		controls.update();
		render();
	}
	render()
}
