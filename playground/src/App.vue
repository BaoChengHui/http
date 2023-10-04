<script setup lang="ts">
import axios from "bch-axios";
const instance=  axios.create({
  message:(msg)=>{
    console.log(msg);
  }
})

instance.download({
  method:'get',
  url:"http://localhost:3000/files",
  filename:"333.json"
}).then(()=>{
  console.log("success");
}) .catch(err=>{
  console.log("err",err);
  
})



// instance.get("http://rap2api.taobao.org/app/mock/262868/test11111").then(res=>{
//   console.log("111",res);
  
// })

// instance
// .interceptors.response.use((res)=>{
//    console.log("res",res.config);
//     return res
// })



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
