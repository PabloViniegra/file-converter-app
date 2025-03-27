<script>
import FormFile from "./components/FormFile.vue";
import Layout from "./layouts/Layout.vue";
export default {
  name: "App",
  components: { FormFile, Layout },
};
</script>
<template>
  <Layout>
    <FormFile />
  </Layout>
</template>
