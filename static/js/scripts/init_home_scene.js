window.onload = function(){

	const canvas = document.getElementById('home-canvas-block__canvas');
	const width = canvas.clientWidth;
	const height = canvas.clientHeight;

	let renderer = new THREE.WebGLRenderer({canvas:canvas, antialias:true, alpha: true});
  	renderer.setSize(width,height);
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	renderer.outputEncoding = THREE.sRGBEncoding;
    
	const scene = new THREE.Scene();
	scene.background = new THREE.Color(0xffffff);
    
	const camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000);
    camera.position.set(34, 10, 0);
	camera.lookAt(0,0,0)
    

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

	const controls = new THREE.OrbitControls( camera, renderer.domElement );
	controls.enableZoom = false;
	controls.maxPolarAngle = Math.PI/2; 

	const loader = new THREE.GLTFLoader();
	const clock = new THREE.Clock();

	let mixer;

	loader.load( '/static/models/main_scene.gltf', function ( gltf ) {
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
				} 
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
