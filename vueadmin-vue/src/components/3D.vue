<template>
    <div>test</div>
</template>

<script>
    import * as THREE from 'three'
    export default{
        data(){
            return{}
        }
        method(){
            function demo(){
                let MTLLoader = new THREE.MTLLoader()
                let OBJLoader = new THREE.OBJLoader()

                console.log(OBJLoader)
                console.log(MTLLoader)
            }
        }
    }
</script>

<style scoped>
</style>