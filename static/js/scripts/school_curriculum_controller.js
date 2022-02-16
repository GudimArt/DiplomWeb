
function switch_next_block(current_id_block){
    return current_id_block = current_id_block + 1
}
function switch_previous_block(current_id_block){
    return current_id_block = current_id_block - 1
}


function switch_previous_item(controller_next_item, controller_previous_item, current_id_block, content_wrappers) {
    for(let i=0; i<content_wrappers.length; i++){
        if (i != current_id_block){

            content_wrappers[i].style.display = "none"
        }
        else{
            content_wrappers[i].style.display = "block"
        }
    }   
    if (current_id_block == content_wrappers.length -1){
        controller_next_item.style.display = "none"
    }
    else{
        controller_next_item.style.display = "block"
    }
    if(current_id_block == 0){
        controller_previous_item.style.display = "none"
    }
    else{
        controller_previous_item.style.display = "block"
    }

}

function switch_next_item(controller_next_item, controller_previous_item, current_id_block, content_wrappers){
    for(let i=0; i<content_wrappers.length; i++){
        if (i != current_id_block){

            content_wrappers[i].style.display = "none"
        }
        else{
            content_wrappers[i].style.display = "block"
        }
    }  
    if (current_id_block == content_wrappers.length -1){
        controller_next_item.style.display = "none"
    }
    else{
        controller_next_item.style.display = "block"
    }
    if(current_id_block == 0){
        controller_previous_item.style.display = "none"
    }
    else{
        controller_previous_item.style.display = "block"
    }
}


function switch_previous_camera_positions(previous_id_block, camera_positions, camera_rotantions, camera) {
    new_camera_position = find_previous_camera_position(previous_id_block, camera_positions)
    new_camera_rotation = find_previous_camera_rotantion(previous_id_block, camera_rotantions)
    gsap.to(camera.position, {x: new_camera_position.x, y: new_camera_position.y, z: new_camera_position.z, duration: 1}) 
    gsap.to(camera.rotation, {x: new_camera_rotation.x, y: new_camera_rotation.y, z:new_camera_rotation.z, duration: 1})

}

function switch_next_camera_positions(next_id_block, camera_positions, camera_rotantions, camera) {
    new_camera_position = finf_next_camera_position(next_id_block, camera_positions)
    new_camera_rotation = find_next_camera_rotantion(next_id_block, camera_rotantions)
    gsap.to(camera.position, {x: new_camera_position.x, y: new_camera_position.y, z: new_camera_position.z, duration: 1}) 
    gsap.to(camera.rotation, {x: new_camera_rotation.x, y: new_camera_rotation.y, z: new_camera_rotation.z,  duration: 1})
   
}
    
function finf_next_camera_position(next_id_block, camera_positions){
    let new_current_camera_position
    let next_id_block_for_positions = next_id_block % camera_positions.length
    new_current_camera_position = camera_positions[next_id_block_for_positions]
    return new_current_camera_position
}


function find_previous_camera_position(previous_id_block, camera_positions){
    let new_current_camera_position
    let previous_id_block_for_positions = previous_id_block % camera_positions.length
    new_current_camera_position = camera_positions[previous_id_block_for_positions]
    return new_current_camera_position
}


function find_next_camera_rotantion(next_id_block, camera_rotantions){
    let new_camera_rotantion
    let next_id_block_for_positions = next_id_block % camera_rotantions.length
    if ((next_id_block_for_positions == 0) && (next_id_block!=0)){
        for(let i =0; i <camera_rotantions.length; i++){
            camera_rotantions[i].z =  camera_rotantions[i].z + 2*Math.PI ;
        }
    }
    new_camera_rotantion = camera_rotantions[next_id_block_for_positions]
    return new_camera_rotantion
}

function find_previous_camera_rotantion(previous_id_block, camera_rotantions){
    let new_camera_rotantion
    let previou_id_block_for_positions = previous_id_block % camera_rotantions.length
    if ((previou_id_block_for_positions == camera_rotantions.length-1) && (previous_id_block!=0)){
        for(let i =0; i <camera_rotantions.length; i++){
            camera_rotantions[i].z =  camera_rotantions[i].z -  2*Math.PI;
        }
    }
    new_camera_rotantion = camera_rotantions[previou_id_block_for_positions]
    return new_camera_rotantion
}