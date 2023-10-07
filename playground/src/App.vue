<script setup lang="ts">
import axios from "bch-axios";
const instance=  axios.create({
  message:(msg)=>{
    console.log("err",msg);
  },
  apiResponseAdapter(data) {
      return {
        code:1,
        data,
        success:false
      }
  },
  apiErrorHandler(data, res) {
      if(data){
        window.alert("11111")
      }

  },
})
const instance2 =  axios.create({
  message:(msg)=>{
    console.log("err1111",msg);
  },
 
})

instance.request({
  method:'get',
  url:"https://mock.apifox.cn/m1/3367071-0-default/pet/6",
}).then((res)=>{
  console.log("success",res);
}) .catch(err=>{
  console.log("err",err);
})

instance2.request({
  method:'get',
  url:"https://mock.apifox.cn/m1/3367071-0-default/pet/6",
}).then(()=>{
  console.log("success");
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
