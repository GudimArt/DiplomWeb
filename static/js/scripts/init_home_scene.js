window.onload = function(){

	const canvas = document.getElementById('home-canvas-block__canvas');
	const width = canvas.clientWidth;
	const height = canvas.clientHeight;

	const renderer = new THREE.WebGLRenderer({canvas});
  	renderer.setSize(width,height);
	renderer.setClearColor(0x000000);
    
	const scene = new THREE.Scene();
	scene.background = new THREE.Color(0xDDDDDC);
    
	const camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000);
    camera.position.set(34, 10, 0);
	camera.lookAt(0,0,0)
    

	const skyColor = 0xFFFFFF;  
	const groundColor = 0xB97A20;  
	const hemisphere_light = new THREE.HemisphereLight(skyColor, groundColor, 2);
	hemisphere_light.position.set(20,15,20)
	scene.add(hemisphere_light);

	const spot_light = new THREE.SpotLight(0xffa95c,4);
	spot_light.position.set(-50,50,50);
	spot_light.castShadow = true;
	scene.add( spot_light );

    scene.add(new THREE.AxesHelper(500));

	const controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.enableZoom = false;
	controls.maxPolarAngle = Math.PI/2; 

	const loader = new THREE.GLTFLoader();
	loader.load( '/static/models/main_scene.gltf', function ( gltf ) {

		number_obj = gltf.scene.children.length
		for(let i = 0; i<number_obj; i++){
			scene.add( gltf.scene.children[0] );
			
		}
		renderer.render( scene, camera );		
	}, undefined, function ( error ) {
		console.error( error );
		renderer.render( scene, camera );
	} );

	function render() {

		window.requestAnimationFrame( render );
		renderer.render( scene, camera );
	}
	
	render();
}
