<template>
    <div>
        <!-- <div>
        <GmapAutocomplete
            @place_changed="setPlace"
        />
        </div>
        <br/> -->
        <GmapMap 
            :center="coordinates"
            :zoom="15"
            style="width:100%; height:300px;"

        >
            <GmapMarker
                :position="coordinates"
                @click="center=coordinates"
                :draggable="true"
                @dragend="setPlace"
            />
        </GmapMap>
    </div>
</template>
<script>

export default {
    created(){
        //get user's coordinates from browser request
        this.$getLocation({})
        .then(coordinates => {
            console.log(coordinates)
            this.coordinates = coordinates;
        })
        .catch(error => {
            this.$notify({type:'danger', message:error})
        })
    },
    data(){
        return{
            coordinates : {
                lat:0,
                lng:0
            }
        }
    },
    methods : {
        setPlace(place){
            this.coordinates = {
                lat: place.latLng.lat(),
                lng: place.latLng.lng(),
            };
        },

        getAddressName(latlng){{
            console.log(latlng)
        }}
    }
}
</script>
<style scoped>

</style>