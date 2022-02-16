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

	let canvas = document.getElementById('school-curriculum-main-block__canvas');
	let width = canvas.clientWidth;
	let height = canvas.clientHeight;

	let renderer = new THREE.WebGLRenderer({canvas});
  	renderer.setSize(width,height);
	renderer.setClearColor(0x000000);
    
	let scene = new THREE.Scene();
	scene.background = new THREE.Color(0xDDDDDC);
    
	let camera_positions = find_camera_positions(content_wrappers)
	let camera_rotantions = find_camera_rotantions(camera_positions, width, height);
 	let camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000);
	
	const skyColor = 0xB1E1FF;  
	const groundColor = 0xB97A20;  
	let hemisphere_light = new THREE.HemisphereLight(skyColor, groundColor, 1);
	hemisphere_light.position.set(0,15,0)
	scene.add(hemisphere_light);

	let spot_light = new THREE.SpotLight(0xffa95c,4);
	spot_light.position.set(-50,50,50);
	spot_light.castShadow = true;
	scene.add( spot_light );

    scene.add(new THREE.AxesHelper(500));

	let controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.enableZoom = false;
	controls.maxPolarAngle = Math.PI/2; 

	let loader = new THREE.GLTFLoader();
	loader.load( '/static/models/floorv3.gltf', function ( gltf ) {

		number_obj = gltf.scene.children.length
		for(let i = 0; i<number_obj; i++){
			scene.add( gltf.scene.children[0] );
			
		}
		renderer.render( scene, camera );		
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
	})
	controller_next_item.addEventListener("click", function(){ 
		current_id_block = switch_next_block(current_id_block);
		switch_next_item(controller_next_item, controller_previous_item, current_id_block, content_wrappers);
		switch_next_camera_positions(current_id_block, camera_positions, camera_rotantions, camera);
	})
	function render() {
		window.requestAnimationFrame( render );
		renderer.render( scene, camera );
	}
	render();
}
