<script setup lang="ts">
import axios from "@baochh/http";
const instance=  axios.create({
  message:(msg)=>{
    console.log("err",msg);
  },
  alert(msg) {
      window.alert(msg)
  },
  apiErrorHandler(data, res) {
      if(data.code === 401){
        window.alert("11111")
      }
  },
})

instance.request({
  method:'get',
  url:"http://localhost:3000/pet",
  messageType:'alert'
}).then((res)=>{
  console.log("success",res);
}) .catch(err=>{
  console.log("err",err);
})

</script>

<template>
  
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
