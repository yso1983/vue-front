<template>
    <div>
        <h2>Find Address</h2>
        <v-text-field
          v-model="address"
          label="Please type your address"
        ></v-text-field>
        
        <GmapMap
          ref="mapRef"
          :center="center"
          :zoom="zoom"
          style="width: 95vw; height: 70vh; margin:auto;"
          :options="options"
        >
          <GMapMarker
              :key="index"
              v-for="(m, index) in markers"
              :animation="1"
              :position="m"
              :clickable="true"
              :draggable="true"
              @click="center=m"
              :styles="clusterIcon"
          >
          </GMapMarker>
        </GmapMap>
    </div>
</template>

<script>
  import axios from 'axios';
  export default {
      data: function () {
          return {
            address: '',
            center: {
              lat: 37.5642135,
              lng: 127.0016985
            },
            zoom: 15,
            options: {
              zoomControl: true,
              //mapTypeControl: true,
              //scaleControl: true,
              //streetViewControl: true,
              //rotateControl: true,
              //fullscreenControl: true,
            },
            markers: [
              {
                lat: 37.4042323211101,
                lng: 126.920035247538,
                label: 'home'
              }
            ],
            debouncedGetAddress: null,

          };
      },
      watch: {
        // 질문이 변경될 때 마다 이 기능이 실행됩니다.
        address: function () {
          this.debouncedGetAddress();
        }
      },
      mounted() {
      },
      methods: {
          getCurrentPosition() {

            const success = (position) => {
              console.log("위도 : " + position.coords.latitude);
              console.log("경도 : " + position.coords.longitude);
              this.center.lat=position.coords.latitude;
              this.center.lng=position.coords.longitude;

              // Do something with the position
            };

            const error = (err) => {
                console.log(err);
            };

            // This will open permission popup
            navigator.geolocation.getCurrentPosition(success, error, {
              enableHighAccuracy: true,
              maximumAge: 10000,
              timeout: 10000
            });

          },
          getAddressInfo() {            
            // address: 강원도 강릉시 남부로17번길 38 강릉시보건소
            const encodedAddress = encodeURIComponent(this.address);
            axios({
              method: "GET",
              url: `https://dapi.kakao.com/v2/local/search/address.json?analyze_type=similar&query=${encodedAddress}`,
              headers: {
                Authorization: `KakaoAK ${process.env.VUE_APP_KAKAO_RESTAPI_KEY}`,
              },
            }).then(response => {
              if(response.data.documents && response.data.documents.length > 0){
                let addressData = response.data.documents[0];

                //console.log(addressData);
                this.center.lat=parseFloat(addressData.y);
                this.center.lng=parseFloat(addressData.x);
                this.zoom = 18;
                this.markers[0] = this.center;
                // this.markers.push(
                //   {
                //     lat: parseFloat(addressData.y),
                //     lng: parseFloat(addressData.x)
                //   }
                // );
              }
            });
          }
      },
      created() {
        this.getCurrentPosition();
        // _.debounce는 lodash가 제공하는 기능으로
        // 특히 시간이 많이 소요되는 작업을 실행할 수 있는 빈도를 제한합니다.
        // 이 경우, 우리는 yesno.wtf/api 에 액세스 하는 빈도를 제한하고,
        // 사용자가 ajax요청을 하기 전에 타이핑을 완전히 마칠 때까지 기다리길 바랍니다.
        // _.debounce 함수(또는 이와 유사한 _.throttle)에 대한
        // 자세한 내용을 보려면 https://lodash.com/docs#debounce 를 방문하세요.
        this.debouncedGetAddress = this._.debounce(this.getAddressInfo, 500);
      },
    };
</script> 